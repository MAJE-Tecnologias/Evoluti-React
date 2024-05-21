const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    id: String,
    nome: String,
    nascimento: Date,
    cpf: String,
    rg: String,
    genero: String,
    email: String,
    senha: String,
    user: String,
    telefone: String,
    tipoUsuario: String,
    idClinica: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);
