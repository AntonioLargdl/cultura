import express from 'express';
import { createCategory, deleteCategory, getAllCategorys, getCategorys, getRecentCategorys } from '../controllers/categoria.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getCategorys)
    .post(createCategory)
router.route('/all/:id').get(getAllCategorys)    
router.route('/recent').get(getRecentCategorys)    
router.route('/delete/:id').delete(deleteCategory)    

export default router; 