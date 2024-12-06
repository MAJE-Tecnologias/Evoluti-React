import axios from 'axios';

// Configurar a instância do axios
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

// Função para validar e autenticar o usuário
export const login = async (email, senha) => {
  try {
    const userResponse = await api.get(`/Usuario?Email=${email}`);
    const usuario = userResponse.data[0];

    if (!usuario) {
      throw new Error('E-mail não encontrado.');
    }

    if (usuario.Senha !== senha) {
      throw new Error('Senha incorreta.');
    }

    const clinicaResponse = await api.get(`/Clinica/${usuario.fk_clinica}`);
    const clinica = clinicaResponse.data;

    const profissaoIndex = clinica.profissoes.indexOf(usuario.Profissao);
    if (profissaoIndex === -1) {
      throw new Error('Erro ao encontrar profissão.');
    }

    return {
      usuario,
      clinica,
      nivel: clinica.nivel[profissaoIndex],
    };
  } catch (error) {
    throw error;
  }
};

export const verificarCodigo = async (codigo, navigate) => {
  try {
    const response = await axios.get('http://localhost:3000/Clinica?_sort=-id');
    const respostas = response.data;

    if (respostas && respostas.length > 0) {
      for (let i = 0; i < respostas.length; i++) {
        if (codigo === respostas[i].id) {
          alert("Acessando clínica " + respostas[i].nome);
          sessionStorage.setItem("idClinica", respostas[i].id);
          navigate("/cadastrofunc");
          return;
        }
      }
      alert("Código inválido.");
    } else {
      alert("Nenhuma clínica encontrada.");
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // Repassa o erro para ser tratado onde a função for chamada
  }
};
