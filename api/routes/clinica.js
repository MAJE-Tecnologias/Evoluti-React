import express from 'express';
import { buscarClinica, criarClinica, editarClinica, editarProfissoes, excluirClinica } from '../controllers/clinicaController.js';

const router = express.Router();

router.post('/clinicas', criarClinica);
router.get('/clinicas', buscarClinica);
router.delete('/clinicas/id=:id', excluirClinica);
router.put('/clinicas/id=:id', editarClinica);
router.put('/clinicas/profissoes/id=:id', editarProfissoes);

export default router;
