import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import { Readable } from 'stream';
import sharp from 'sharp';

import socioModel from '../mongodb/models/socio.js';
import codigoModel from '../mongodb/models/codigo.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// // ------------------------------ Obtener socio ------------------------------
// const getSocio = async(req, res) => {
//     try {
//       const { codigo, no } = req.query
//       const socio = await socioModel.findOne({ codigo: codigo});
//       res.status(200).json({success: true, socio})
//     } catch(error) {
//         res.status(500).json({error})
//     }
//   }

// ------------------------------ Obtener socio ------------------------------
const getSocio = async(req, res) => {
    try {
      const { no } = req.query
      const socio = await socioModel.findOne({ no: no});
      res.status(200).json({success: true, socio})
    } catch(error) {
        res.status(500).json({error})
    }
  }

// ------------------------------ Crear Orden ------------------------------
const createSocio = async (req, res) => {
    try {
        const {name, email, description, photo, codigo, no, createdAt} = req.body

        // Iniciar sesión y transacción en mongodb
        const session = await mongoose.startSession();
        session.startTransaction();

        // Validar código
        const validarCodigo = await codigoModel.findOne({ codigo: codigo });
        if (!validarCodigo) throw new Error("Código no valido");
        if(validarCodigo.status === true) {
            return res.status(409).json({
                success: false,
                message: "El código que intentas ingresar ya está registrado"
              });
        }

        // Subir Fotografía
        let photoUrl = null; 
        if(photo){
            // Convertir la imagen a un objeto buffer
            const photoBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            // Comprimir la imagen antes de subirla a Cloudinary
            const compressedImageBuffer = await sharp(photoBuffer)
            .resize({ width: 350 })
            .png({ quality: 100 })
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
                    folder: 'socios',
                    use_filename:true,
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
            console.log('subida', photoUrl)
        }

        // Crear Orden
        const newOrder = await socioModel.create({
            name,
            email,
            description,
            photo: photoUrl,
            codigo,
            no,
            createdAt,
        })

        const actualizarCodigo = await codigoModel.findOneAndUpdate({ codigo: codigo }, {$set:{ status: true, email: email}});
  
        await session.commitTransaction();
        res.status(200).json({success: true, mesOksage: 'Socio registrado exitosamente'})
      } catch (error) {
        res.status(500).json({message: error.message})
      }
};

export { 
    createSocio,
    getSocio,
};