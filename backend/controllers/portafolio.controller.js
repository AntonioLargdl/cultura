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
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import portafoliosModel from '../mongodb/models/portafolio.js';

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

// ------------------------------ Crear Portafolio ------------------------------
const createPortafolio = async (req,res) => { 
    try {
        const {
            name, type, gender, es, esCV, photos, phone, email, video,
            youtube, pdf, web, ig, fb, tiktok, 
            spotify, apple, amazon
        } = req.body
        const photoUrls = [];

        // Traducir Semblanza
        // Traduce el texto al inglés
        const enResult = await translate.translate(es, 'en');
        const en = enResult[0];  
        // Traduce el texto al francés
        const frResult = await translate.translate(es, 'fr');
        const fr = frResult[0];  

        // Traducir CV
        // Traduce el texto al inglés
        const enResult2 = await translate.translate(esCV, 'en');
        const enCV = enResult2[0];  
        // Traduce el texto al francés
        const frResult2 = await translate.translate(esCV, 'fr');
        const frCV = frResult2[0];  

        for (const photo of photos) {
            let photoUrl = null; 
            if(photo){
                // Convertir la imagen a un objeto buffer
                const photoBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    
                // Comprimir la imagen antes de subirla a Cloudinary
                let compressedImageBuffer = await sharp(photoBuffer)
                .resize({ width: 450 })
                .png({ quality: 90 })
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

        const newPortfolio = await portafoliosModel.create({
            name,
            type, 
            gender,
            semblanza: {
                es, en, fr,
            },
            cv: {
                es: esCV, en: enCV, fr: frCV
            },
            phone,
            email,
            social: {
                ig,
                fb,
                tiktok,
                youtube,
                pdf,
                web,
                spotify,
                apple,
                amazon,
            },
            video,
            photos: photoUrls
        })

        const savedPortfolio = await newPortfolio.save();
  
        res.status(200).json({success:true, message: "Portafolio creada exitosamente" });
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }    
}

// ------------------------------ Obtener Portafolios ------------------------------
const getPortafolios = async (req,res) => {
    try {
      const portafolios = await portafoliosModel.find()

      if(!portafolios) {
        return res.status(404).json({ success: false, message: "no se encontraron portafolios" });
      }
  
      res.status(200).json(portafolios)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Obtener Portafolio ------------------------------
const getPortafolio = async (req,res) => {
    try {
        const {id} = req.params

        const portafolio = await portafoliosModel.findOne({_id: id})

        if(!portafolio){
            return res.status(404).json({ success: false, message: "portafolio no encontrado" });
        }
  
        res.status(200).json(portafolio)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Eliminar Portafolio ------------------------------
const deletePortafolio = async (req, res) => {
    try {
        const { id } = req.params
    
        const portafolio = await portafoliosModel.findOne({ _id: id })

        if(!portafolio) {
            return res.status(401).json({ success: false, message: "El portafolio no existe" });
        }
        
        // Obtener public id de las fotos
        const partesDeseadas = [];
        if(portafolio.photos){
            portafolio.photos.forEach((enlace) => {
                // Dividir la URL usando '/' como separador y obtener la última parte
                const partesEnlace = enlace.split('/');
                const ultimaParte = partesEnlace[partesEnlace.length - 1];
                // Dividir la última parte usando '.' como separador y obtener la primera parte
                const partesUltimaParte = ultimaParte.split('.');
                const parteDeseada = partesUltimaParte[0];
                partesDeseadas.push(parteDeseada);
            });
        }

        // Eliminar imágenes de Cloudinary
        for (const name of partesDeseadas) {
            try {
                await cloudinary.uploader.destroy(name);
            } catch (cloudinaryError) {
                console.error('Error al eliminar la imagen de Cloudinary:', cloudinaryError);
            }
        }
      
      await portafolio.deleteOne({_id: id});
      
      return res.status(200).json({ success: true, message: 'Portafolio eliminado correctamente' });
    } catch(error) {
      res.status(500).json({success: false, error: error.message})
    }
}

export {
    createPortafolio,
    getPortafolios,
    getPortafolio,
    deletePortafolio,
}