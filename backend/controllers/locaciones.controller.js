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
import locacionesModel from '../mongodb/models/locaciones.js';
import sharp from 'sharp';
import { Readable } from 'stream';

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

// ------------------------------ Crear Locaciones ------------------------------
const createLocaciones = async (req,res) => { 
    try {
        const {
            name, category, phone, email, address, 
            photos, latitude, longitude, 
            // Access
            privat, tin, rock, center, pav, old, main, natural,
            // Infrastructure
            park, load, set, backlots, closet, bath, office, security, signals, garden, out, roof, pool, events,
            // Services
            water, energy, internet, tables, workStations, screen, cleaning, basic, health, technic, copy, catering, fridge
        } = req.body
        
        const photoUrls = [];
        
        for (const photo of photos) {
            let photoUrl = null; 
            if(photo){
                // Convertir la imagen a un objeto buffer
                const photoBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    
                // Comprimir la imagen antes de subirla a Cloudinary
                let compressedImageBuffer = await sharp(photoBuffer)
                .resize({ width: 500 })
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
                // Agregar la URL de la foto al array
                photoUrls.push(photoUrl);
            }
        }
        
// Termina subir fotos ------------------------------ 
        const newLocacion = await locacionesModel.create({
            name, 
            category, 
            phone, 
            email, 
            address,
            location:{
                latitude,longitude,
            },
            access: {
                privat, tin, rock, center, pav, old, main, natural,
            },
            infrastructure: {
                park, load, set, backlots, closet, bath, office, security, signals, garden, out, roof, pool, events,
            },
            services: {
                water, energy, internet, tables, workStations, screen, cleaning, basic, health, technic, copy, catering, fridge
            },
            photos: photoUrls
        })

        const savedLocation = await newLocacion.save();
    
        res.status(200).json({success:true, message: "Locación creada exitosamente" });
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Obtener Locaciones ------------------------------
const getLocaciones = async (req,res) => {
    try {
      const locaciones = await locacionesModel.find()

      if(!locaciones) {
        return res.status(404).json({ success: false, message: "no se encontraron locaciones" });
      }
  
      res.status(200).json(locaciones)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Obtener Locación ------------------------------
const getLocacion = async (req,res) => {
    try {
        const {id} = req.params

        const locacion = await locacionesModel.findOne({_id: id})

        if(!locacion){
            return res.status(404).json({ success: false, message: "locación no encontrada" });
        }
  
        res.status(200).json(locacion)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

export {
    getLocaciones,
    getLocacion,
    createLocaciones,
}  