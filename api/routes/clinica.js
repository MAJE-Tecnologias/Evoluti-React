import express from 'express';
import { buscarClinica, criarClinica, editarClinica, excluirClinica } from '../controllers/clinicaController.js';

const router = express.Router();

router.post('/clinicas', criarClinica);
router.get('/clinicas', buscarClinica);
router.delete('/clinica:id', excluirClinica);
router.put('/clinicas:id', editarClinica);

export default router;


