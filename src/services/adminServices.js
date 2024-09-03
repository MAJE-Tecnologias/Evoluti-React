import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
});
// Função para buscar dados dos usuários
export const fetchUsuarios = async (idClinica) => {
    try {
        const response = await api.get(`/Usuario?fk_clinica=${idClinica}`);
        const respostas = response.data;
        return respostas
            .map((usuario) => ({
                id: usuario.id,
                nome: usuario.Nome,
                Profissao: usuario.Profissao,
                Email: usuario.Email,
            }));
    } catch (error) {
        console.error("Falha ao obter dados:", error);
        throw error;
    }
};

// Função para aceitar um usuário
export const aceitarUsuario = async (idUsuario) => {
    try {
        const changes = { stats: true };
        await api.patch(`/Usuario/${idUsuario}`, changes);
    } catch (error) {
        console.error("Erro ao aceitar usuário:", error);
        throw error;
    }
};

// Função para negar um usuário
export const negarUsuario = async (idUsuario) => {
    try {
        await api.delete(`/Usuario/${idUsuario}`);
    } catch (error) {
        console.error("Erro ao negar usuário:", error);
        throw error;
    }
};


// Função para buscar dados da clínica
export const fetchClinicaData = async (idClinica) => {
    try {
        const response = await api.get(`/Clinica/${idClinica}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os dados da clínica:", error);
        throw error;
    }
};

// Função para atualizar os dados da clínica
export const updateClinicaData = async (idClinica, changes) => {
    try {
        const response = await api.patch(`/Clinica/${idClinica}`, changes);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar os dados da clínica:", error);
        throw error;
    }
};

// Função para buscar dados dos pacientes
export const fetchPacientes = async (idClinica) => {
    try {
        const response = await api.get(`/Paciente?fk_clinica=${idClinica}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar dados dos pacientes:", error);
        throw error;
    }
};

