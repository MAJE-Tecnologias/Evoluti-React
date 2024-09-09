import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { fetchPacientesAtend } from "../../services/statsServices";

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
  const [pacientesInfo, setPacientesInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPacientesAtendimentos = async () => {
      try {
        const data = await fetchPacientesAtend(idClinica);
        setPacientesInfo(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadPacientesAtendimentos();
  }, [idClinica]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Prepare data for the chart
  const labels = pacientesInfo.map((paciente) => paciente.nome);
  const data = pacientesInfo.map((paciente) => paciente.atendimentos);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Número de Atendimentos",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div>
        <h1>Atendimentos por Paciente</h1>
        <Bar
          data={chartData}
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
