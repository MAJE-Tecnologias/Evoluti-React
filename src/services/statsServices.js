import axios from "axios";

const API_BASE_URL = 'http://localhost:3000';

export const fetchPacientesAtend = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Paciente?fk_clinica=${id}`);
        const pacientes = response.data;

        const informacaoPromises = pacientes.map(async (paciente) => {
            const atendimentoResponse = await axios.get(`${API_BASE_URL}/Atendimento?idPaciente=${paciente.id}`);
            const atendimentoCount = atendimentoResponse.data.length;
            return { nome: paciente.nome, atendimentos: atendimentoCount };
        });

        // Esperar que todas as promessas sejam resolvidas
        const informacao = await Promise.all(informacaoPromises);

        return informacao;
    } catch (error) {
        console.error("Error fetching paciente atendimentos:", error);
        throw error;
    }
};