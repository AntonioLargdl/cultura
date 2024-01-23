import express from 'express';
import { deletePet, getPet, getPublicPet, getTags, sendLocation, subirCodigosDesdeExcel, vincularTag } from '../controllers/tag.controller.js';


const router = express.Router();

// router.route('/codigos').post(subirCodigosDesdeExcel);
router.route('/').get(getTags)
router.route('/location').post(sendLocation);
router.route('/vincular-tag').post(vincularTag)
router.route('/show/:id').get(getPet);
router.route('/id/:id').get(getPublicPet);
router.route('/desvincular-tag/:id').delete(deletePet)

export default router;  