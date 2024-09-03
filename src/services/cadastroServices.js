import axios from 'axios';

// Definir a base URL da API
const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

// Função para buscar emails e CNPJ das clínicas existentes
export const fetchClinicas = async () => {
  try {
    const response = await api.get('/Clinica?_sort=-id');
    const clinicas = response.data;
    return {
      emails: clinicas.map((clinica) => clinica.Email),
      cnpj: clinicas.length > 0 ? clinicas[0].cnpj : null,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

// Função para criar uma nova clínica
export const createClinica = async (cnpj, nome, email) => {
  try {
    const dataAtual = new Date().toISOString();
    await api.post('/Clinica', {
      cnpj,
      nome,
      email,
      adicionadoEm: dataAtual,
    });
    return await fetchLatestClinicaId();
  } catch (error) {
    console.error('Error creating clinic:', error);
    throw error;
  }
};

// Função para buscar o ID da clínica mais recentemente adicionada
const fetchLatestClinicaId = async () => {
  try {
    const response = await api.get('/Clinica?_sort=-adicionadoEm');
    const latestClinica = response.data[0];
    return latestClinica.id;
  } catch (error) {
    console.error('Failed to fetch latest clinic ID:', error);
    throw error;
  }
};

// Função para gerar um código aleatório
export function gerarCodigo(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// Função para enviar o e-mail de confirmação
export async function enviarEmail(email, codigo) {
  const data = {
    email,
    subject: "Email de confirmação Evoluti",
    message: `Código para validar sua conta é ${codigo}`,
  };

  try {
    const response = await axios.post("https://emailhandler.onrender.com/send-email", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    throw error;
  }
}

// Função para obter o ID do próximo usuário
export async function obterProximoId() {
  try {
    const response = await api.get('/Usuario?_sort=-id');
    return response.data && response.data.length > 0 ? response.data[0].id + 1 : 1;
  } catch (error) {
    console.error("Erro ao obter o próximo ID do usuário:", error);
    throw error;
  }
}

// Função para cadastrar um novo administrador
export async function criarAdministrador(adminData) {
  try {
    await api.post('/Usuario', adminData);
  } catch (error) {
    console.error("Erro ao cadastrar o administrador:", error);
    throw error;
  }
}

// função para criar novo Usuario

export const criarUsuario = async (usuarioData) => {
  try {
    const response = await api.post('/Usuario', usuarioData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    throw error;
  }
};
