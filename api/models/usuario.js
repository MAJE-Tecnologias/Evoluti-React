import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  cpf: { type: String, unique: true },
  nome: String,
  nascimento: Date,
  rg: String,
  genero: String,
  email: {type: String, unique: true},
  senha: String,
  user: String,
  telefone: String,
  tipoUsuario: Number,
  clinicaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinica' } 
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
