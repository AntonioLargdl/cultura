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
import carteleraModel from '../mongodb/models/cartelera.js';

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

// ------------------------------ Crear Cartelera ------------------------------
const createCartelera = async (req,res) => { 
    try {
    const { name, date, begin, end, location, photo } = req.body

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
    }
        
    const newCartelera = await carteleraModel.create({ 
        name, 
        date,
        begin,
        end,
        location,
        image: photoUrl
    })

    const savedCartelera = await newCartelera.save();

    res.status(200).json({success:true, message: "Cartelera creada exitosamente" });
    } catch (error) {
    res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Obtener Carteleras por mes ------------------------------
const getCarteleras = async (req, res) => {
    try {
        const { month, year } = req.query;

        // Crear una expresión regular para hacer coincidir el mes y año en formato ISO 8601
        const regex = new RegExp(`^${year}-${month < 10 ? '0' : ''}${month}`);

        // Realizar la consulta
        const cartelera = await carteleraModel.find({ date: { $regex: regex } });
        
        if (!cartelera || cartelera.length === 0) {
            return res.status(404).json({ success: false, message: "No se encontraron carteleras para el mes y año especificados" });
        }

        res.status(200).json(cartelera);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ------------------------------ Obtener Cartelera ------------------------------
const getCartelera = async (req,res) => {
    try {
        const {id} = req.params

        const cartelera = await carteleraModel.findOne({_id: id})

        if(!cartelera){
            return res.status(404).json({ success: false, message: "locación no encontrada" });
        }
  
        res.status(200).json(cartelera)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Eliminar Cartelera ------------------------------
const deleteCartelera = async (req, res) => {
    try {
        const { id } = req.params
    
        const cartelera = await carteleraModel.findOne({ _id: id })
    
        if(!cartelera) {
            return res.status(401).json({ success: false, message: "La cartelera no existe" });
        }

        // Dividir la URL usando '/' como separador y obtener la última parte
        const partesEnlace = cartelera.image.split('/');
        const ultimaParte = partesEnlace[partesEnlace.length - 1];
        // Dividir la última parte usando '.' como separador y obtener la primera parte
        const publicNameArray = ultimaParte.split('.');
        // Obtener el primer elemento del array (que es el nombre público)
        const publicName = publicNameArray[0];

        // Eliminar imágenes de cloudinary
        try {
            await cloudinary.uploader.destroy(publicName);
        } catch (cloudinaryError) {
            console.error('Error al eliminar la imagen de Cloudinary:', cloudinaryError);
        }
        
        await cartelera.deleteOne({_id: id});
        
        return res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
    } catch(error) {
      res.status(500).json({success: false, error: error.message})
    }
  }


export {
    createCartelera,
    getCarteleras,
    getCartelera,
    deleteCartelera,
}  