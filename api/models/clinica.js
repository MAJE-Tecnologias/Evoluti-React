import mongoose from 'mongoose';

const clinicaSchema = new mongoose.Schema({
  cnpj: { type: String, unique: true },
  nome: String,
  email: { type: String, unique: true },
  adicionadoEm: { type: Date, default: Date.now },
  profissoes: [String],
  verificadorProf: [Boolean],
  nivel: [Number]
});

const Clinica = mongoose.model('Clinica', clinicaSchema);

export default Clinica;
