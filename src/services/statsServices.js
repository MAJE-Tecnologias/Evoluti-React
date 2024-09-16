import axios from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const API_BASE_URL = "http://localhost:3000";

export const fetchPacientesAtend = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/Paciente?fk_clinica=${id}`
    );
    const pacientes = response.data;

    const informacaoPromises = pacientes.map(async (paciente) => {
      const atendimentoResponse = await axios.get(
        `${API_BASE_URL}/Atendimento?idPaciente=${paciente.id}`
      );
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

import { parseISO } from "date-fns";

export const fetchAtendData = async (idClinica) => {
  try {
    const respostaPacientes = await axios.get(
      `${API_BASE_URL}/Paciente?fk_clinica=${idClinica}`
    );
    const pacientes = respostaPacientes.data;

    const atendimentosPromises = pacientes.map(async (paciente) => {
      const respostaAtendimentos = await axios.get(
        `${API_BASE_URL}/Atendimento?idPaciente=${paciente.id}`
      );
      return respostaAtendimentos.data;
    });

    const atendimentos = (await Promise.all(atendimentosPromises)).flat();

    const contagemAtendimentosPorData = {};

    atendimentos.forEach((atendimento) => {
      const date = parseISO(atendimento.data);
      const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });

      if (!contagemAtendimentosPorData[formattedDate]) {
        contagemAtendimentosPorData[formattedDate] = 0;
      }
      contagemAtendimentosPorData[formattedDate] += 1;
    });

    const informacaoAtendimentos = Object.entries(
      contagemAtendimentosPorData
    ).map(([data, contagem]) => ({
      data: data,
      atendimentos: contagem,
    }));

    return informacaoAtendimentos;
  } catch (error) {
    console.error("Erro ao buscar atendimentos:", error);
    throw error;
  }
};

export const fetchAtendimentosPorPacienteStacked = async (idClinica) => {
  try {
    const resposta = await axios.get(
      `${API_BASE_URL}/Atendimento?fk_clinica=${idClinica}`
    );
    const atendimentos = resposta.data;

    const agregacaoPorPaciente = atendimentos.reduce((acc, atendimento) => {
      const pacienteId = atendimento.idPaciente || "Sem ID";
      const tipo = atendimento.tipo || "Sem Tipo";

      if (!acc[pacienteId]) {
        acc[pacienteId] = {};
      }

      if (!acc[pacienteId][tipo]) {
        acc[pacienteId][tipo] = 0;
      }

      acc[pacienteId][tipo] += 1;

      return acc;
    }, {});

    // Prepare data for each patient
    const informacaoAtendimentos = Object.keys(agregacaoPorPaciente).map(
      (pacienteId) => {
        const tipos = agregacaoPorPaciente[pacienteId];
        return {
          paciente: pacienteId,
          atendimentos: Object.keys(tipos).map((tipo) => ({
            tipo: tipo,
            quantidade: tipos[tipo],
          })),
        };
      }
    );

    return informacaoAtendimentos;
  } catch (error) {
    console.error("Erro ao buscar atendimentos:", error);
    throw error;
  }
};
