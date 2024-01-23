import mongoose, { Types } from 'mongoose';
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import { Readable } from 'stream';
import sharp from 'sharp';
import tagModel from '../mongodb/models/tag.js';
import petModel from '../mongodb/models/pet.js';
import usuarioModel from '../mongodb/models/usuario.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

dotenv.config();

// ------------------------------ Editar Pet ------------------------------
const EditPet = async (req,res) => {
    try {
        const { id, especie, sexo, nombre, descripcion, photo, colorBG, esterilizado, notificationTag } = req.body

        const tagAdded = await tagModel.findOne({ _id: id}).populate('pet')
        // Tag existe
        if(!tagAdded) {
            return res.status(409).json({
                success: false,
                message: "El tag no es correcto",
              }); 
        }

        let photoUrl = null; 
        const isUrl = (str) => {
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            return urlRegex.test(str);
        };

        if (photo && !isUrl(photo)) {
            // Elimina la imagen actual de Cloudinary
            await cloudinary.uploader.destroy(tagAdded._id);
            // Subir Fotografía
            if(photo){
                // Convertir la imagen a un objeto buffer
                const photoBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    
                // Comprimir la imagen antes de subirla a Cloudinary
                let compressedImageBuffer = await sharp(photoBuffer)
                .resize({ width: 400 })
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
                        public_id: tagAdded._id,
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
        }

        const updateFields = {
            'especie': especie,
            'sexo': sexo,
            'nombre': nombre,
            'descripcion': descripcion,
            'colorBG': colorBG,
            'esterilizado': esterilizado,
            'notificationTag': notificationTag
        };

        if (photoUrl !== null) {
            updateFields['photo'] = photoUrl;
        }

        await petModel.findByIdAndUpdate(
            tagAdded.pet[0]._id,
            { $set: updateFields }
        );

        if(notificationTag) {
            await usuarioModel.findByIdAndUpdate(
                tagAdded.usuario[0],
                {'visible':notificationTag}
            )
        }

        res.status(200).json({success:true, message: "Ediciones realizadas exitosamente" });
    } catch (error){
        res.status(500).json({success:false, error: error.message})
    }
}

// ------------------------------ Crear Pet ------------------------------
const createNewPet = async (req,res) => {
    try {
        const { id, especie, sexo, nombre, descripcion, photo, colorBG, esterilizado, notificationTag, raza, procedencia, peso, birth} = req.body

        const tagAdded = await tagModel.findOne({ _id: id})
        // Tag existe
        if(!tagAdded) {
            return res.status(409).json({
                success: false,
                message: "El tag no es correcto",
              }); 
        }
        // Tag no tiene registrado otro animal
        if (tagAdded.pet && tagAdded.pet.length > 0) {
            return res.status(401).json({ success: false, message: "No se puede registrar otro animal en este tag" });
        }

        // Iniciar sesión y transacción en mongodb
        const session = await mongoose.startSession();
        session.startTransaction();

        // Subir Fotografía
        let photoUrl = null; 
        if(photo){
            // Convertir la imagen a un objeto buffer
            const photoBuffer = Buffer.from(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64');

            // Comprimir la imagen antes de subirla a Cloudinary
            let compressedImageBuffer = await sharp(photoBuffer)
            .resize({ width: 400 })
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
                    public_id: tagAdded._id,
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

        const newPet = await petModel.create({
            especie,
            sexo,
            nombre,
            descripcion,
            photo: photoUrl,
            colorBG,
            esterilizado,
            raza,
            procedencia,
            peso,
            birth,
            notificationTag,
            tag: tagAdded._id
        })

        tagAdded.pet.push(newPet._id);
        await tagAdded.save({ session });

        await session.commitTransaction();

        res.status(200).json({success:true, message: "Animal de compañía creado exitosamente" });
    } catch (error){
        res.status(500).json({success:false, error: error.message})
    }
}

export {
    createNewPet,
    EditPet,
}