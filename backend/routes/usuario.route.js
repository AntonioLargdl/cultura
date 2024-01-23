import express from 'express';

import { createUser, forgotPassword, getProfile, loginUser, updatePassword, updateProfile } from '../controllers/usuario.controller.js';

const router = express.Router();

// Autenticación
router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/forgot-password').post(forgotPassword);
router.route('/update-password').post(updatePassword);
router.route('/profile')
    .get(getProfile)
    .patch(updateProfile);

export default router; 