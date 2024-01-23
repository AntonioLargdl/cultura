import express from 'express';
import { getCode } from '../controllers/codigo.controller.js';

const router = express.Router();

// Obtener el código
router.route('/codigo')
    .get(getCode)

export default router;