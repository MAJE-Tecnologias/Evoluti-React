const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Rota para listar todos os usuários
router.get("/", async (req, res) => {
    const usuarios = await Usuario.find();
    res.send(usuarios);
});

// Rota para adicionar um novo usuário
router.post("/", async(req, res) => {
    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.send(novoUsuario);
});

// Outras rotas para atualizar e excluir usuários

module.exports = router;
