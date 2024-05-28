import Endereco from '../models/endereco.js';


// Adicionar novo usuário
export const criarEndereco = async (req, res) => {
  try {
    const {logradouro, tipoLogradouro, numero, complemento, bairro, cidade, cep, uf} = req.body;

    const novoEndereco = new Endereco({logradouro, tipoLogradouro, numero, complemento, bairro, cidade, cep, uf});
    await novoEndereco.save();
    res.status(201).json(novoEndereco);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const buscarEndereco = async (req, res) => {
  try {
    if (req.params.id) {
      const endereco = await Endereco.findById(req.params.id);
      if (!endereco) {
        return res.status(404).json({ message: "Endereço não encontrado" });
      }
      res.status(200).json(endereco);
    } else {
      const enderecos = await Endereco.find();
      res.status(200).json(enderecos);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const excluirEndereco = async (req, res) => {
  try {
    const endereco = await Endereco.findByIdAndDelete(req.params.id);
    if (!endereco) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }
    res.status(202).json(endereco);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editarEndereco = async (req, res) => {
  try {
    const endereco = await Endereco.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!endereco) {
      return res.status(404).json({ message: "Endereço não encontrado" });
    }
    res.status(200).json(endereco);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};