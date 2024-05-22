import Clinica from '../models/clinica.js';

export const criarClinica = async (req, res) => {
  const {cnpj, nome, email, profissoes, verificadorProf, nivel } = req.body;

  try {
    let clinica = await Clinica.findOne({ email });
    if (!clinica) {
      clinica = new Clinica({cnpj, nome, email, profissoes, verificadorProf, nivel });
    } else {
      clinica.cnpj = cnpj;
      clinica.nome = nome;
      clinica.profissoes = profissoes;
      clinica.verificadorProf = verificadorProf;
      clinica.nivel = nivel;
    }

    await clinica.save();
    res.status(200).json(clinica);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const buscarClinica = async (req, res) => {
  try {
    const clinica = await Clinica.find().populate('clinicaId');  // Populando os dados da clínica
    res.status(200).json(clinica);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const excluirClinica = async (req, res) => {
  try {
    const clinica = await Clinica.findByIdAndDelete(req.params.id); // Supondo que você passe o ID do usuário a ser excluído através dos parâmetros da requisição
    if (!clinica) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(202).json(clinica);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editarClinica = async (req, res) => {
  try {
    const clinica = await Clinica.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Supondo que você passe o ID do usuário a ser editado através dos parâmetros da requisição e as atualizações no corpo da requisição
    if (!clinica) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(clinica);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

