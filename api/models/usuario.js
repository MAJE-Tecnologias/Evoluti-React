import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  cnpj: { type: String, unique: true },
  nome: String,
  email: { type: String, unique: true },
  adicionadoEm: { type: Date, default: Date.now },
  profissoes: [String],
  verificadorProf: [Boolean],
  nivel: [Number],
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
