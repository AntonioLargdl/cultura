import mongoose from 'mongoose';
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import categoriasModel from '../mongodb/models/categoria.js';
import usuarioModel from '../mongodb/models/usuario.js';
import blogModel from '../mongodb/models/blog.js';

// Traducción
const translate = new Translate({
    keyFilename: process.env.GOOGLE_TRANSLATE_KEY_FILE,
});


// ------------------------------ Crear Categoría ------------------------------
const createCategory = async (req,res) => { 
    try { 
        const {es, type, slug, user } = req.body

        const existingCategory = await categoriasModel.findOne({ slug })
        if(existingCategory) {
            return res.status(409).json({
                success: false,
                message: "category exists"
            });
        }

        const usuario = await usuarioModel.findOne({username: user})
        if(!usuario) {
            return res.status(409).json({
                success: false,
                message: "category exists"
            });
        }

        // Traduce el texto al inglés
        const enResult = await translate.translate(es, 'en');
        const en = enResult[0];  // El resultado se encuentra en la primera posición del array

        // Traduce el texto al francés
        const frResult = await translate.translate(es, 'fr');
        const fr = frResult[0];  // El resultado se encuentra en la primera posición del array

        const newCategory = await categoriasModel.create({
            name: {
                es,
                en,
                fr,
            },
            slug,
            type,
            user: usuario
        })
        res.status(200).json({success:true, message: "Categoría creada exitosamente" });
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }    
}


// ------------------------------ Obtener Categorías ------------------------------
const getCategorys = async (req,res) => {
    try {
      const categorias = await categoriasModel.find().populate('user')

      if(!categorias) {
        return res.status(404).json({ success: false, message: "no se encontraron directorios" });
      }
  
      res.status(200).json(categorias)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Obtener Categorías Recientes ------------------------------
const getRecentCategorys = async (req,res) => {
    try {
      const categorias = await categoriasModel.find().sort({ date: -1 }).limit(4);

      if(!categorias) {
        return res.status(404).json({ success: false, message: "no se encontraron categorias" });
      }
  
      res.status(200).json(categorias)
    } catch (error) {
      res.status(500).json({success: false, message: error.message})
    }
}

// ------------------------------ Eliminar Categoría ------------------------------
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params
    
        const categoria = await categoriasModel.findOne({ _id: id })

        if(!categoria) {
            return res.status(401).json({ success: false, message: "La categoría no existe" });
        }

        // Eliminar referencia en Blogs
        await blogModel.updateMany(
          { category: categoria._id },
          { $pull: { category: categoria._id } }
        );
        
        await categoria.deleteOne({_id: id});
      
      return res.status(200).json({ success: true, message: 'Perfil eliminado correctamente' });
    } catch(error) {
      res.status(500).json({success: false, error: error.message})
    }
}

export {
    createCategory,
    getCategorys,
    getRecentCategorys,
    deleteCategory,
}