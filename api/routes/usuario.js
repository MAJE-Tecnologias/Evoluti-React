import express from 'express';
import { adicionarUsuario, buscarUsuarios, editarUsuarios, excluirUsuarios, usuariosPorClinica } from '../controllers/usuarioController.js';


const router = express.Router();

router.post('/usuarios', adicionarUsuario);
router.get('/usuarios', buscarUsuarios);
router.get('/usuarios/clinica/:clinicaId', usuariosPorClinica);
router.delete('/usuarios/id=:id', excluirUsuarios);
router.put('/usuarios/id=:id', editarUsuarios);

export default router;
