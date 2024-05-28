import mongoose from 'mongoose';

const enderecoSchema = mongoose.Schema({
  logradouro: String,
  tipoLogradouro: String,
  numero: Number,
  complemento: String,
  bairro: String,
  cidade: String,
  cep: Number,
  uf: String
});

const Endereco = mongoose.model('Endereco', enderecoSchema);

export default Endereco;