import express from 'express';
import { createCategory, deleteCategory, getCategorys } from '../controllers/categoria.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getCategorys)
    .post(createCategory)
router.route('/delete/:id').delete(deleteCategory)    

export default router; 