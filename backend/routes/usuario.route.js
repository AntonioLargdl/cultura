import express from 'express';

import { createUser, forgotPassword, getProfiles, loginUser, updatePassword } from '../controllers/usuario.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getProfiles)
router.route('/login').post(loginUser);
// TODO: Actualizar y hacer estas rutas / Delete
router.route('/register').post(createUser);
router.route('/forgot-password').post(forgotPassword);
router.route('/update-password').post(updatePassword);

export default router; 