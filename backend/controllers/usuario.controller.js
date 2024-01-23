import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import usuarioModel from '../mongodb/models/usuario.js';
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// Codificar JWT
const base64UrlEncode = (input) => {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};
// Decodificar JWT
const base64UrlDecode = (input) => {
  // Reemplaza los caracteres '-' con '+' y '_' con '/'
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  // Decodifica la cadena base64 URL
  const base64 = Buffer.from(padded, 'base64').toString();
  return base64;
};

// ------------------------------ Actualizar Contraseña ------------------------------
const updatePassword = async (req,res) => {
  try {
    const {password, id, token} = req.body
    const user = await usuarioModel.findOne({_id:id})
    if (!user) {
      return res.status(401).json({ success: false, message: "El correo o usuario no está registrado" });
    }
    // Decodificar Token
    const tokenDecoded = base64UrlDecode(token);
    
    // Verificar Token
    const verify = jwt.verify(tokenDecoded, process.env.JWT_KEY)

    if (verify) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await usuarioModel.findByIdAndUpdate(user._id, { $set: { 'password': hashedPassword } });
    } else {
      console.error('Token inválido o expirado');
    }
  
    res.status(200).json({success: true, result:{_id:user._id}, message: 'Contraseña actualizada con éxito'})
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

// ------------------------------ Olvidar Contraseña ------------------------------
const forgotPassword = async (req,res) => {
  try {
      const {email} = req.body
      const user = await usuarioModel.findOne({email});
      if (!user) {
        return res.status(401).json({ success: false, message: "El correo ingresado no está registrado" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '1h' }); 
      const tokenEncoded = base64UrlEncode(token);
      const link = `http://mi.dukes.mx/update-password/${user._id}/${tokenEncoded}`

      // Aquí inicia el envío de correo electrónico
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER, 
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Recupera la contraseña de tu cuenta',
        html: 
        `
          <h3><b>Hola,</h3>
          <p> Da click en el siguiente botón para actualizar tu contraseña<p>
          <a href="${link}" target="_blank" rel="noreferrer">
              <img src='https://res.cloudinary.com/dblv4yokz/image/upload/v1695921842/source/password_rw2qvr.png' alt='dukes' width='250px'/>
          </a> 
          <a href="${link}" target="_blank" rel="noreferrer" download>${link}"</a>
        `,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado:' + info.response);
        }
      });

      res.status(200).json({success: true, message: 'Correo de restablecimiento de contraseña enviado' });
  } catch {
      res.status(500).json({ success: false, message: error.message });
  }
}  


// ------------------------------ Registro de Usuarios ------------------------------
const createUser = async (req, res) => {
  try {
    const { email, password, createdAt } = req.body;
    // Verificar correo único
    const existingEmail = await usuarioModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "email"
      });
    }
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crear Usuario
    const newUser = new usuarioModel({
      email,
      password: hashedPassword, 
      createdAt,
    });
    const savedUser = await newUser.save();
    //  Enviar correo de bienvenida
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const emailTemplatePath = path.join(__dirname, '../mailer/welcome.html');
    const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Tu dirección de correo
        pass: process.env.GMAIL_PASSWORD, // Tu contraseña
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Bienvenido a mi Dukes, tu nuevo microchip inteligente',
      html: emailTemplate,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado:' + info.response);
      }
    });

    res.status(201).json({ success: true, message: "Usuario Creado exitosamente", user: savedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------ Login de Usuarios ------------------------------
const loginUser = async (req, res) => {
  let existingUser

  try {
    const { email, password } = req.body;
    
    const existingUser = await usuarioModel.findOne({ email });

    if (!existingUser) {
        return res.status(401).json({ success: false, message: "correo" });
    }
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return res.status(401).json({ success: false, message: "password" });
    }

    const emailToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_KEY,
      { expiresIn: "100h" } 
    );

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      emailToken,
      user: {
        email,
      }
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error en el servidor"
    });
  }
};

// ------------------------------ Perfil de Usuario ------------------------------
const updateProfile = async (req,res) => {
  try {
    const {email, visible, name, lastname, phone, phoneTwo, adress} = req.body
    const user = await usuarioModel.findOne({email})

    await usuarioModel.findByIdAndUpdate(
      user._id, 
        {$set: { 
          'visible': visible, 
          'profile.name': name, 
          'profile.lastname': lastname, 
          'profile.phone': phone, 
          'profile.phoneTwo': phoneTwo, 
          'profile.adress': adress
        }});

    res.status(200).json({success: true, message: 'Ediciones realizadas exitosamente'})
  } catch(error) {
    res.status(500).json({success: false, message: error.message})
  }
}
// ------------------------------ Obtener Perfil ------------------------------
const getProfile = async (req,res) => {
  try {
    const  email  = req.query.email;

    const user = await usuarioModel
      .findOne({email})
      .select('-password')

      if(!user) {
          res.status(200).json("Usuario no encontrado")
      }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

export {
    getProfile,
    updateProfile,
    createUser,
    loginUser,
    forgotPassword,
    updatePassword,
}