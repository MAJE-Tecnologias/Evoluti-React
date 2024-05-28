import express from 'express';
import {criarPaciente, buscarPaciente, excluirPaciente, editarPaciente} from '../controllers/pacienteController.js';

const router = express.Router();

router.post('/pacientes', criarPaciente);
router.get('/pacientes/id=:id?', buscarPaciente);
router.delete('/pacientes/id=:id', excluirPaciente);
router.put('/pacientes/id=:id', editarPaciente);

export default router;