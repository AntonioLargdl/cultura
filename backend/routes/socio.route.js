import express from 'express';
import { createSocio, getSocio } from '../controllers/socio.controller.js';

const router = express.Router();

// Obtener el código
router.route('/')
    .get(getSocio)
    .post(createSocio)

export default router;