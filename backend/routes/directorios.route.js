import express from 'express';
import { createDirectorio, getDirectorio, getDirectorios } from '../controllers/directorios.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getDirectorios)
    .post(createDirectorio)
router.route('/show/:id').get(getDirectorio)    

export default router; 