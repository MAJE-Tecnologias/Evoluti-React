
const express = require('express');
const router = express.Router();
const Clinica = require('../models/clinica');

// Rota para listar todas as clínicas
router.get("/", async (req, res) => {
    const clinicas = await Clinica.find();
    res.send(clinicas);
});

// Rota para adicionar uma nova clínica
router.post("/", async(req, res) => {
    const novaClinica = new Clinica(req.body);
    await novaClinica.save();
    res.send(novaClinica);
});

// Outras rotas para atualizar e excluir clínicas
module.exports = router;
