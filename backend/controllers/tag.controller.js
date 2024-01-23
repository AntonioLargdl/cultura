import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import usuarioModel from '../mongodb/models/usuario.js';
import {v2 as cloudinary} from 'cloudinary';
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import csv from 'csv-parser'
import tagModel from '../mongodb/models/tag.js';
import petModel from '../mongodb/models/pet.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


dotenv.config();

// ------------------------------ Eliminar pet y tag ------------------------------
const deletePet = async (req, res) => {
  try {
    const { id } = req.params

    const tag = await tagModel.findOne({ _id: id }).populate('pet')

    if(!tag) {
      return res.status(401).json({ success: false, message: "El tag no existe" });
    }

    const usuario = await usuarioModel.findOne({ allTags: tag._id });
    if (usuario) {
      usuario.allTags = usuario.allTags.filter((tagId) => tagId.toString() !== tag._id.toString());
      await usuario.save();
    }

    try {
      await cloudinary.uploader.destroy(tag._id);
    } catch (cloudinaryError) {
      console.error('Error al eliminar la imagen de Cloudinary:', cloudinaryError);
    }

    tag.usuario = [];
    
    await petModel.deleteMany({ _id: { $in: tag.pet } });
    
    tag.pet = [];
    
    await tag.save();
    
    return res.status(200).json({ success: true, message: 'Tag desvinculado correctamente' });
  } catch(error) {
    res.status(500).json({success: false, error: error})
  }
}
// ------------------------------ Enviar correo con ubicación ------------------------------
const sendLocation = async (req, res) => {
  try {
    const { latitude, longitude, id, name } = req.body;

    const enlace = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=Ubicación de ${name}`

    const usuario = await usuarioModel.findOne({ _id: id })
    
    
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
      to: usuario.email,
      subject: '¡Atención!🆘 Alguien te ha enviado una ubicación, reencuéntrate con tu mejor amig@ ❤️',
      html: 
      `
        <h3><b>¡Noticias de ${name}!</h3>
        <p>Hemos detectado una nueva ubicación desde tu microchip con NFC dukes. ¿Quieres echar un vistazo?<p>
        <a href="${enlace}" target="_blank" rel="noreferrer" download>
          <img src='https://res.cloudinary.com/dblv4yokz/image/upload/v1696554915/source/icono_1_itqusw.png' alt='dukes' width='350px'/>
        </a> 
        <a href="${enlace}" target="_blank" rel="noreferrer" download>${enlace}"</a>
        <p>Esperemos pronto te puedas reencontrar con tu mejor amig@<p>
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
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
// 

// ------------------------------ Obtener Detalles del Tag ------------------------------
const getPublicPet = async (req, res) => {
  try {
      const { id } = req.params

      const tag = await tagModel.findOne({ tag: id }).populate('pet')

      if(!tag) {
        return res.status(401).json({ success: false, message: "El tag no existe" });
      }
      
      const usuario = await usuarioModel.findOne({ _id: tag.usuario })
      const profile = usuario.profile

      if (usuario.visible) {
        res.status(200).json({tag, profile})
      } else {
        res.status(200).json({tag})
      }
    } catch(error) {
      res.status(500).json({success: false, error: 'Error al obtener los detalles del animal de compañía'})
    }
}

// ------------------------------ Obtener Detalles del Tag ------------------------------
const getPet = async (req, res) => {
  try {
      const { id } = req.params

      const tag = await tagModel.findOne({ _id: id }).populate('pet')

      if(!tag) {
        return res.status(401).json({ success: false, message: "El tag no existe" });
      }

      const usuario = await usuarioModel.findOne({ _id: tag.usuario })
      const profile = usuario.profile

      if (usuario.visible) {
        res.status(200).json({tag, profile})
      } else {
        res.status(200).json({tag})
      }
    } catch(error) {
      res.status(500).json({success: false, error: 'Error al obtener los detalles de la edición'})
    }
}

// ------------------------------ Obtener Tags del Usuario ------------------------------
const getTags = async (req,res) => {
    try {
      const  email  = req.query.email;
  
      const user = await usuarioModel
        .findOne({email})
        .select('-password')
        // .populate('allTags')
        .populate({
          path: 'allTags',
          populate: {
            path: 'pet',
            model: 'Pet', // Ajusta esto al nombre de tu modelo Pet
          },
        });
  
        if(!user) {
            res.status(200).json("Usuario no encontrado")
        }
  
      res.status(200).json(user.allTags)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
  }


// ------------------------------ Vincular Tags ------------------------------
const vincularTag = async (req,res) => {
    try {
      const {tag, email} = req.body
  
      const session = await mongoose.startSession();
      session.startTransaction();
  
      const tagAdded = await tagModel.findOne({tag})
      // Validar tag
      if(!tagAdded){
        return res.status(401).json({ success: false, message: "El código QR ingresado no es válido" });
      }
      const user = await usuarioModel.findOne({email})
      // Validar el usuario
      if(!user){
        return res.status(401).json({ success: false, message: "Usuario no encontrado" });
      }
      // Ver si el usuario ya tiene registrado el tag
      if(user.allTags.includes(tagAdded._id)) {
        return res.status(401).json({ success: false, message: "El tag ingresado ya está registrado" })
      }
      // Ver si la orden ya está registrada con otro usuario
      if (tagAdded.usuario && tagAdded.usuario.length > 0) {
        return res.status(401).json({ success: false, message: "El tag ingresado ya está registrado" });
      }
  
      await tagModel.findByIdAndUpdate(tagAdded._id, { $set: { 'usuario': user._id } });

      // Agregar Tarjeta al usuario
      user.allTags.push(tagAdded);
      await user.save({ session });
  
      await session.commitTransaction();
  
      res.status(200).json({success: true, message: 'Tag vinculado con éxito'})
    } catch (error){
      res.status(500).json({ success: false, message: error.message });
    }
  }

// ------------------------------ Subir códigos ------------------------------
const importarYSubirCodigosDesdeExcel = async (rutaArchivoCSV, session) => {
    try {
      // Crear un stream para leer el archivo CSV
      const stream = fs.createReadStream(rutaArchivoCSV)
        .pipe(csv())
        .on('data', async (row) => {
            const value = Object.values(row);
            const codigoValue = value.toString();
            if (codigoValue !== undefined) {
                const newTag = new tagModel({
                  lote: "250823",
                  tag: codigoValue,
                });
                await newTag.save({ session: session });
            } else {
              console.error('El codigo es indefinido');
            }
          });          
    } catch (error) {
      console.error('Error en la importación:', error);
    }
  };
  
  const subirCodigosDesdeExcel = async (req, res) => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const rutaArchivoExcel = path.resolve(__dirname, './codigos.csv');
    
        const session = await mongoose.startSession();
        session.startTransaction();
    
        await importarYSubirCodigosDesdeExcel(rutaArchivoExcel, session);
    
        await session.commitTransaction();
    
        res.status(200).json({ success: true, message: 'Códigos importados con éxito' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
  };

export {
    getTags,
    vincularTag,
    subirCodigosDesdeExcel,
    getPet,
    getPublicPet,
    sendLocation,
    deletePet,
}