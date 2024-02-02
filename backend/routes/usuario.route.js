import express from 'express';

import { createUser, deleteUser, forgotPassword, getProfiles, loginUser, updatePassword } from '../controllers/usuario.controller.js';

const router = express.Router();

// Autenticación
router.route('/')
    .get(getProfiles)
    .post(createUser)
router.route('/login').post(loginUser);
router.route('/eliminar/:id').delete(deleteUser);
router.route('/forgot-password').post(forgotPassword);
router.route('/update-password').post(updatePassword);

export default router; 