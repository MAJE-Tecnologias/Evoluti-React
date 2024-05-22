import Usuario from '../models/usuario.js';

export const criarUsuario = async (req, res) => {
  const { cnpj, nome, email, profissoes, verificadorProf, nivel } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      usuario = new Usuario({ cnpj, nome, email, profissoes, verificadorProf, nivel });
    } else {
      usuario.cnpj = cnpj;
      usuario.nome = nome;
      usuario.profissoes = profissoes;
      usuario.verificadorProf = verificadorProf;
      usuario.nivel = nivel;
    }

    await usuario.save();
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
