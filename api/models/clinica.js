import { Schema, model } from 'mongoose';

const clinicaSchema = new Schema({
    id: String,
    cnpj: String,
    nome: String,
    email: String,
    adicionadoEm: Date,
    profissoes: [String],
    verificadorProf: [Boolean],
    nivel: [Number]
});

export default model('Clinica', clinicaSchema);
