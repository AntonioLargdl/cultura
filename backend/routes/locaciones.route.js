import express from 'express';
import { createLocaciones, getLocacion, getLocaciones } from '../controllers/locaciones.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getLocaciones)
    .post(createLocaciones)
router.route('/show/:id').get(getLocacion)    

export default router; 