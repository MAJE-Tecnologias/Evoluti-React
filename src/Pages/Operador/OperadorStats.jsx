import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  fetchAtendData,
  fetchPacientesAtend,
} from "../../services/statsServices";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function OperadorStats() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [dadosAtendimentos, setDadosAtendimentos] = useState([]);
  const [infoPacientes, setInfoPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to load data
  const carregarDados = async () => {
    try {
      const pacientes = await fetchPacientesAtend(idClinica);
      const atendimentos = await fetchAtendData(idClinica);

      setInfoPacientes(pacientes);
      setDadosAtendimentos(atendimentos);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    carregarDados();
  }, [idClinica]);

  // Return loading or error states
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  // Prepare data for the patient chart
  const labelsPacientes = infoPacientes.map((paciente) => paciente.nome);
  const dataPacientes = infoPacientes.map((paciente) => paciente.atendimentos);

  const dadosGraficoPacientes = {
    labels: labelsPacientes,
    datasets: [
      {
        label: "Número de Atendimentos por Paciente",
        data: dataPacientes,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the daily chart
  const labelsDatas = dadosAtendimentos.map((dado) => dado.data);
  const dataDatas = dadosAtendimentos.map((dado) => dado.atendimentos);

  const dadosGraficoDatas = {
    labels: labelsDatas,
    datasets: [
      {
        label: "Número de Atendimentos por Dia",
        data: dataDatas,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div>
        <h1>Atendimentos por Paciente</h1>
        <Bar
          data={dadosGraficoPacientes}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat().format(context.parsed.y);
                    }
                    return label;
                  },
                },
              },
            },
          }}
        />
      </div>
      <div>
        <h1>Atendimentos por Dia</h1>
        <Bar
          data={dadosGraficoDatas}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat().format(context.parsed.y);
                    }
                    return label;
                  },
                },
              },
            },
          }}
        />
      </div>
    </>
  );
}
