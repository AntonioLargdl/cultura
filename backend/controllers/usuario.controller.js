import mongoose from "mongoose";
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
import { Readable } from 'stream';
import sharp from 'sharp';

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
      const link = `https://cultura.morelia.gob.mx/update-password/${user._id}/${tokenEncoded}`

      //  Enviar correo de bienvenida
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const emailTemplatePath = path.join(__dirname, '../mailer/password.html');
      const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

      // Reemplazar los marcadores de posición en la plantilla con datos reales
      const personalizedEmail = emailTemplate
      .replace('%link%', link);

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
        subject: 'Restablecer contrasela',
        html: personalizedEmail,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado:' + info.response);
        }
      })


      res.status(200).json({success: true, message: 'Correo de restablecimiento de contraseña enviado' });
  } catch {
      res.status(500).json({ success: false, message: error.message });
  }
}  


// ------------------------------ Registro de Usuarios ------------------------------
const createUser = async (req, res) => {
  try {
    const { email, password, username, rol, photo, name } = req.body;
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
    let photoUrl = null; 
    if(photo){
      // Convertir la imagen a un objeto buffer
      const photoBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      // Comprimir la imagen antes de subirla a Cloudinary
      let compressedImageBuffer = await sharp(photoBuffer)
      .resize({ width: 250 })
      .png({ quality: 80 })
      .toBuffer();

      // Obtener la orientación EXIF de la imagen
      const exifData = await sharp(photoBuffer).metadata();

      // Calcular la rotación necesaria basada en la orientación EXIF
      let rotation = 0;
      if (exifData && exifData.orientation) {
          switch (exifData.orientation) {
              case 3:
              rotation = 180;
              break;
              case 6:
              rotation = 90;
              break;
              case 8:
              rotation = -90;
              break;
          }
      }

      // Rotar la imagen si es necesario
      if (rotation !== 0) {
      compressedImageBuffer = await sharp(compressedImageBuffer)
          .rotate(rotation)
          .toBuffer();
      }

      // Convertir el buffer en un stream de lectura
      const readablePhotoStream = new Readable();
      readablePhotoStream.push(compressedImageBuffer);
      readablePhotoStream.push(null);

      // Subir la imagen a Cloudinary
      photoUrl = await new Promise((resolve, reject) => {
        const cloudinaryStream = cloudinary.uploader.upload_stream(
        {
            resource_type: 'image',
            public_id: username,
            format: 'png',
        },
        (error, result) => {
            if (error) {
            reject(error);
            } else {
            resolve(result.secure_url);
            }
        }
        );
        readablePhotoStream.pipe(cloudinaryStream);
      });
      // Crear Usuario
      const newUser = new usuarioModel({
        email,
        password: hashedPassword, 
        username,
        rol,
        image: photoUrl,
        name,
      });

      const savedUser = await newUser.save();

      //  Enviar correo de bienvenida
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const emailTemplatePath = path.join(__dirname, '../mailer/welcome.html');
      const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');

      // Reemplazar los marcadores de posición en la plantilla con datos reales
      const personalizedEmail = emailTemplate
      .replace('%USERNAME%', username)
      .replace('%PASSWORD%', password);

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
        subject: 'Bienvenido a Morelia Ciudad Cultura',
        html: personalizedEmail,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado:' + info.response);
        }
      });
    }

    res.status(201).json({ success: true, message: "Usuario Creado exitosamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------------------ Login de Usuarios ------------------------------
const loginUser = async (req, res) => {
  let existingUser

  try {
    const { access, password } = req.body;
    
    existingUser = await usuarioModel.findOne({ email: access });
    if (!existingUser) {
      existingUser = await usuarioModel.findOne({ username: access });
      if (!existingUser) {
        return res.status(401).json({ success: false, message: "El correo o usuario no está registrado" });
      }
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "password" });
    }

    const { email, username, rol, image } = existingUser;

    const accessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_KEY,
      { expiresIn: "5000h" } 
    );

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      accessToken,
      user: {
        email,
        username,
        rol,
        image
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

// ------------------------------ Obtener Perfiles ------------------------------
const getProfiles = async (req,res) => {
  try {
    const usuarios = await usuarioModel.find().select('-password')

    res.status(200).json(usuarios)
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}


// ------------------------------ Eliminar Usuario ------------------------------
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const usuario = await usuarioModel.findOne({ _id: id })

    if(!usuario) {
      return res.status(401).json({ success: false, message: "El usuario no existe" });
    }
    // Eliminar imágenes de cloudinary
    try {
      await cloudinary.uploader.destroy(usuario.username);
    } catch (cloudinaryError) {
      console.error('Error al eliminar la imagen de Cloudinary:', cloudinaryError);
    }
    
    await usuario.deleteOne({_id: id});
    
    return res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch(error) {
    res.status(500).json({success: false, error: error})
  }
}


export {
    loginUser,
    getProfiles,
    deleteUser,
    // TODO: Actualizar las siguientes funciones
    createUser,
    forgotPassword,
    updatePassword,
}