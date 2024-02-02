import express from 'express';
import { createLocaciones, deleteLocation, getLocacion, getLocaciones } from '../controllers/locaciones.controller.js';

const router = express.Router();

router.route('/')
    .get(getLocaciones)
    .post(createLocaciones)
router.route('/show/:id').get(getLocacion)    
router.route('/delete/:id').delete(deleteLocation)    

export default router; 