import express from 'express';
import { createBlog, deleteBlog, getBlog, getBlogByUser, getBlogs, getRecentBlogs } from '../controllers/blog.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getBlogs)
    .post(createBlog)
router.route('/show/:id').get(getBlog)    
router.route('/user/:username').get(getBlogByUser)    
router.route('/recent').get(getRecentBlogs)
router.route('/delete/:id').delete(deleteBlog)

export default router; 