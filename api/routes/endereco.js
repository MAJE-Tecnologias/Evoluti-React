import express from 'express';
import {criarEndereco, buscarEndereco, excluirEndereco, editarEndereco} from '../controllers/enderecoController.js';

const router = express.Router();

router.post('/enderecos', criarEndereco);
router.get('/enderecos/id=:id?', buscarEndereco);
router.delete('/enderecos/id=:id', excluirEndereco);
router.put('/enderecos/id=:id', editarEndereco);

export default router;