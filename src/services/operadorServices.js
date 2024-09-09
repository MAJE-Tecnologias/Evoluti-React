import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Função para buscar o paciente com o maior ID
export const fetchPacienteWithMaxId = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Paciente?_sort=-id`);
        return response.data;
    } catch (error) {
        console.error("Error fetching pacientes:", error);
        throw error;
    }
};

// Função para criar um novo paciente
export const createPaciente = async (pacienteData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Paciente`, pacienteData);
        return response.data;
    } catch (error) {
        console.error("Error creating paciente:", error);
        throw error;
    }
};
