import mongoose from 'mongoose';
import codigoModel from '../mongodb/models/codigo.js';
import * as dotenv from 'dotenv';

dotenv.config();

// ------------------------------------- Validar Código -------------------------------------
const getCode = async(req,res) => {
    try {
        const { codigo } = req.query
      
        const validarCodigo = await codigoModel.findOne({ codigo: codigo });
        if(validarCodigo.status === true) {
            return res.status(409).json({
                success: false,
                message: "El código que intentas ingresar ya está registrado"
              });
        }
  
        res.status(200).json({success: true, validarCodigo})
    } catch(error) {
        res.status(500).json({error})
    }
}

// ------------------------------------- Generar Códigos -------------------------------------
// Crear código único 
const generarCodigoUnico = (length) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(randomIndex);
    }
    return codigo;
};
  
// Generar n cantidad de códigos únicos
const generarCodigosUnicos = async (cantidad) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const codigosGenerados = new Set();
        while (codigosGenerados.size < cantidad) {
        const nuevoCodigo = generarCodigoUnico(7);
        codigosGenerados.add(nuevoCodigo);
        }

        const codigosNoDuplicados = Array.from(codigosGenerados);

        const codigosParaGuardar = codigosNoDuplicados.map((codigo, index) => ({
        codigo,
        status: false,
        no: index + 1,
        }));

        try {        
            const result = await codigoModel.insertMany(codigosParaGuardar);
            console.log(`Se generaron y guardaron ${result} códigos.`);
          } catch (error) {
            // Capturar y mostrar detalles del error
            console.error('Error al insertar códigos:', error);
          }

    } catch (error) {
        console.error('Error al generar códigos:', error);
    }
};

export { 
    generarCodigosUnicos,
    getCode,
};