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
