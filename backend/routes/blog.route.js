import express from 'express';
import { createBlog, getBlog, getRecentBlogs } from '../controllers/blog.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    // .get(getCategorys)
    .post(createBlog)
router.route('/show/:id').get(getBlog)    
router.route('/recent').get(getRecentBlogs)
// router.route('/delete/:id').delete(deleteCategory)

export default router; 