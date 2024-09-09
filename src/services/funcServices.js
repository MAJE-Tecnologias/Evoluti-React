import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Função para buscar paciente por ID
export const fetchPacienteById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Paciente?id=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching paciente by ID:", error);
        throw error;
    }
};

// Função para buscar atendimentos por ID do paciente
export const fetchAtendimentosByPacienteId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Atendimento?idPaciente=${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching atendimentos by paciente ID:", error);
        throw error;
    }
};

// Função para buscar todos os pacientes de uma clínica
export const fetchPacientes = async (idClinica) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Paciente?fk_clinica=${idClinica}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching pacientes:", error);
        throw error;
    }
};

// Função para criar um novo atendimento
export const createAtendimento = async (atendimentoData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Atendimento`, atendimentoData);
        return response.data;
    } catch (error) {
        console.error("Error creating atendimento:", error);
        throw error;
    }
};

// Função para buscar todos os pontos de dor
export const fetchPontosDor = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/PontosDor/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching pontos de dor:", error);
        throw error;
    }
};

// Função para deletar um ponto de dor pelo ID
export const deletePontoDor = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/PontosDor/${id}`);
    } catch (error) {
        console.error("Error deleting ponto de dor:", error);
        throw error;
    }
};

// Função para adicionar um novo ponto de dor
export const addPontoDor = async (ponto) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/PontosDor`, ponto);
        return response.data;
    } catch (error) {
        console.error("Error adding ponto de dor:", error);
        throw error;
    }
};

// Função para atualizar os pontos de dor de um paciente
export const updatePacientePontosDor = async (id, pontosDor) => {
    try {
        await axios.patch(`${API_BASE_URL}/Paciente/${id}`, { pontosDor });
    } catch (error) {
        console.error("Error updating paciente pontos de dor:", error);
        throw error;
    }
};
