import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Readable } from 'stream';
import directoriosModel from '../mongodb/models/directorios.js';

import { Translate } from "@google-cloud/translate/build/src/v2/index.js";

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

// Traducción
const translate = new Translate({
    keyFilename: process.env.GOOGLE_TRANSLATE_KEY_FILE,
});

// ------------------------------ Crear Directorio ------------------------------
const createDirectorio = async (req,res) => { 
    try {
        const {
            type, name, photos, es,
            script, rights, translators, creative, casting, academies, actors, voice, models, production, direction, photography, design, makeup, technicalServices, productionHouses, catering, studios, insurance, locations, generalServices, postProduction, visualEffects, labs, sound, advertising, distribution,
            age, height, weight, phone, email, youtube, linkedin, web, fb, ig, tiktok
        } = req.body
        const photoUrls = [];

        // Traduce el texto al inglés
        const enResult = await translate.translate(es, 'en');
        const en = enResult[0];  // El resultado se encuentra en la primera posición del array

        // Traduce el texto al francés
        const frResult = await translate.translate(es, 'fr');
        const fr = frResult[0];  // El resultado se encuentra en la primera posición del array
        
        for (const photo of photos) {
            let photoUrl = null; 
            if(photo){
                // Convertir la imagen a un objeto buffer
                const photoBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    
                // Comprimir la imagen antes de subirla a Cloudinary
                let compressedImageBuffer = await sharp(photoBuffer)
                .resize({ width: 350 })
                .png({ quality: 75 })
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

        const newDirectorio = await directoriosModel.create({
            type, 
            name,
            semblanza: {
                es, en, fr,
            },
            servicios: {
                script, rights, translators, creative, casting, academies, actors, voice, models, production, direction, photography, design, makeup, technicalServices, productionHouses, catering, studios, insurance, locations, generalServices, postProduction, visualEffects, labs, sound, advertising, distribution,
            },
            age,
            height, 
            weight,
            phone,
            email,
            youtube,
            linkedin,
            web,
            fb,
            ig,
            tiktok,
            photos: photoUrls
        })

        const savedDirectorio = await newDirectorio.save();
  
        res.status(200).json({success:true, message: "Usuario creado exitosamente" });
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }    
}

// ------------------------------ Obtener Directorios ------------------------------
const getDirectorios = async (req,res) => {
    try {
      const directorios = await directoriosModel.find()

      if(!directorios) {
        return res.status(404).json({ success: false, message: "no se encontraron directorios" });
      }
  
      res.status(200).json(directorios)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Obtener Directorio ------------------------------
const getDirectorio = async (req,res) => {
    try {
        const {id} = req.params

        const directorio = await directoriosModel.findOne({_id: id})

        if(!directorio){
            return res.status(404).json({ success: false, message: "directorio no encontrado" });
        }
  
        res.status(200).json(directorio)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

export {
    getDirectorios,
    getDirectorio,
    createDirectorio,
}