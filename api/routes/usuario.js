import express from 'express';
import { adicionarUsuario, buscarUsuarios } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', adicionarUsuario);
router.get('/usuarios', buscarUsuarios);

export default router;
