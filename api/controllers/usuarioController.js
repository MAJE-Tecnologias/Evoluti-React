import Usuario from '../models/usuario.js';
import Clinica from '../models/clinica.js';

// Adicionar novo usuário
export const adicionarUsuario = async (req, res) => {
  try {
    const { cpf, nome, nascimento, rg, genero, email, senha, user, telefone, tipoUsuario, clinicaId } = req.body;

    // Verifica se a clínica existe
    const clinica = await Clinica.findById(clinicaId);
    if (!clinica) {
      return res.status(404).json({ message: 'Clínica não encontrada' });
    }

    const novoUsuario = new Usuario({ cpf, nome, nascimento, rg, genero, email, senha, user, telefone, tipoUsuario, clinicaId });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const buscarUsuarios = async (req, res) => {
  try {
    if(!req.params.id){
      const usuarios = await Usuario.find().populate('clinicaId');  // Populando os dados da clínica
      res.status(200).json(usuarios);
    } else {
      const usuarios = await Usuario.findById(req.params.id).populate('clinicaId');  // Populando os dados da clínica
      res.status(200).json(usuarios);
    }
    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const usuariosPorClinica = async (req, res) => {
  try {
    const usuarios = await Usuario.find({ clinicaId: req.params.clinicaId });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const excluirUsuarios = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(202).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editarUsuarios = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};