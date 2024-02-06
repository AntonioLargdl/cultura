import express from 'express';
import { createBlog, getRecentBlogs } from '../controllers/blog.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    // .get(getCategorys)
    .post(createBlog)
router.route('/recent').get(getRecentBlogs)    
// router.route('/delete/:id').delete(deleteCategory)    

export default router; 