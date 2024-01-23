import express from 'express';
import { EditPet, createNewPet } from '../controllers/pet.controller.js';

const router = express.Router();

router.route('/')
    .patch(EditPet)
    .post(createNewPet);

export default router; 