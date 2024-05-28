import mongoose from 'mongoose';
import Endereco from './endereco.js';

const pacienteSchema = new mongoose.Schema({
  cpf: { type: String, unique: true },
  nome: String,
  email: { type: String, unique: true },
  nascimento: Date,
  rg: { type: String, unique: true },
  genero: String,
  telefone: String,
  enderecoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Endereco' }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente;
