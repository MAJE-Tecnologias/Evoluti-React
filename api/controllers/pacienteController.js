import Paciente from '../models/paciente.js';
import Endereco from '../models/endereco.js';

export const criarPaciente = async (req, res) => {
  try {
    const { cpf, nome, email, nascimento, rg, genero, telefone, enderecoId } = req.body;
    let paciente = await Paciente.findOne({ cpf });
    if (!paciente) {
      const novoPaciente = new Paciente({ cpf, nome, email, nascimento, rg, genero, telefone, enderecoId });
      await novoPaciente.save();
      res.status(201).json(novoPaciente);
    } else {
      res.status(400).json({ message: "Paciente já existe" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const buscarPaciente = async (req, res) => {
  try {
    if (!req.params.id) {
      const pacientes = await Paciente.find().populate('enderecoId');
      res.status(200).json(pacientes);
    } else {
      const paciente = await Paciente.findById(req.params.id).populate('enderecoId');
      if (!paciente) {
        return res.status(404).json({ message: "Paciente não encontrado" });
      }
      res.status(200).json(paciente);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const excluirPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndDelete(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }
    res.status(202).json(paciente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paciente) {
      return res.status(404).json({ message: "Paciente não encontrado" });
    }
    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
