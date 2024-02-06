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
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import blogModel from "../mongodb/models/blog.js";
import categoriasModel from "../mongodb/models/categoria.js";

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

// ------------------------------ Crear Blogs ------------------------------
const createBlog = async (req, res) => {
    try {
        const { esT, esA, esC, slug, photo, username, _id, date, place } = req.body

        const usuario = await usuarioModel.findOne({username})
        if (!usuario) {
            return res.status(409).json({
              success: false,
              message: "user"
            });
        }

        const categoryId = await categoriasModel.findOne({_id})
        console.log(categoryId)
        if (!categoryId) {
            return res.status(409).json({
              success: false,
              message: "category"
            });
        }

    // Translate Title
        // Traduce el texto al inglés
        const enTitle = await translate.translate(esT, 'en');
        const enT = enTitle[0];  // El resultado se encuentra en la primera posición del array
        // Traduce el texto al francés
        const frTitle = await translate.translate(esT, 'fr');
        const frT = frTitle[0];  // El resultado se encuentra en la primera posición del array

    // Translate Abstract
        // Traduce el texto al inglés
        const enAbstract = await translate.translate(esA, 'en');
        const enA = enAbstract[0];  // El resultado se encuentra en la primera posición del array
        // Traduce el texto al francés
        const frAbstract = await translate.translate(esA, 'fr');
        const frA = frAbstract[0];  // El resultado se encuentra en la primera posición del array

    // Translate Content
        // Traduce el texto al inglés
        const enContent = await translate.translate(esC, 'en');
        const enC = enContent[0];  // El resultado se encuentra en la primera posición del array
        // Traduce el texto al francés
        const frContent = await translate.translate(esC, 'fr');
        const frC = frContent[0];  // El resultado se encuentra en la primera posición del array

        let photoUrl = null; 
        if(photo) {
          // Convertir la imagen a un objeto buffer
          const photoBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    
          // Comprimir la imagen antes de subirla a Cloudinary
          let compressedImageBuffer = await sharp(photoBuffer)
          .resize({width: 1200})
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
        }

        const newBlog = await blogModel.create({
            title: {
                es: esT,
                en: enT,
                fr: frT,
            },
            slug,
            abstract: {
                es: esA,
                en: enA,
                fr: frA,
            },
            content: {
                es: esC,
                en: enC,
                fr: frC,
            },
            author: usuario,
            category: categoryId,
            image: photoUrl,
            date,
            place,
        })

        const savedBlog = await newBlog.save();

        categoryId.blogs.push(savedBlog._id)

        await categoryId.save();

        res.status(201).json({ success: true, message: "Usuario Creado exitosamente" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};

// ------------------------------ Obtener Blogs recientes ------------------------------
const getRecentBlogs = async (req, res) => {
    try {
      // Obtén los 3 blogs más recientes ordenados por fecha descendente
      const blogs = await blogModel.find().populate('category').sort({ date: -1 }).limit(3);
  
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  

export {
    createBlog,
    getRecentBlogs,
}