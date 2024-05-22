import express from 'express';
import { criarClinica } from '../controllers/clinicaController.js';

const router = express.Router();

router.post('/clinicas', criarClinica);

export default router;


