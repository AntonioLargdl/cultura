import express from 'express';
import { createDirectorio, deleteProfile, getDirectorio, getDirectorios } from '../controllers/directorios.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getDirectorios)
    .post(createDirectorio)
router.route('/show/:id').get(getDirectorio)    
router.route('/delete/:id').delete(deleteProfile)    

export default router; 