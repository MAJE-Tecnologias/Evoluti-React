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

// Buscar todos os usuários
export const buscarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('clinicaId');  // Populando os dados da clínica
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
