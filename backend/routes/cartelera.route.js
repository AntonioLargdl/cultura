import express from 'express';
import { createCartelera, deleteCartelera, getCartelera, getCarteleras } from '../controllers/cartelera.controller.js';

const router = express.Router();

router.route('/')
    .get(getCarteleras)
    .post(createCartelera)
router.route('/show/:id').get(getCartelera)
router.route('/delete/:id').delete(deleteCartelera)

export default router; 