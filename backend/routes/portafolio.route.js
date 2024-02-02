import express from 'express';
import { createPortafolio, deletePortafolio, getPortafolio, getPortafolios } from '../controllers/portafolio.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getPortafolios)
    .post(createPortafolio)
router.route('/show/:id').get(getPortafolio)    
router.route('/delete/:id').delete(deletePortafolio)    

export default router; 