import { useEffect, useState } from "react";
import { fetchClinicaData, updateClinicaData } from '../../services/adminServices'; // Importar as funções do serviço

export default function AdminAdd() {
  const [clinica, setClinica] = useState(null);
  const [nome, setNome] = useState("");
  const [verificador, setVerificador] = useState(false);
  const [nivel, setNivel] = useState([]);

  useEffect(() => {
    const idClinica = localStorage.getItem("idClinica");
    const fetchData = async () => {
      try {
        const clinicaData = await fetchClinicaData(idClinica);
        setClinica(clinicaData);
      } catch (error) {
        console.error("Erro ao buscar os dados da clínica:", error);
      }
    };

    fetchData();
  }, []);

  const addProf = async (e) => {
    e.preventDefault();

    const changes = {};

    if (nome) {
      changes.profissoes = [...(clinica?.profissoes || []), nome];
    }

    if (verificador !== false) {
      changes.verificadorProf = [...(clinica?.verificadorProf || []), verificador];
    }

    if (nivel.length > 0) {
      changes.nivel = [...(clinica?.nivel || []), ...nivel];
    }

    try {
      const updatedClinica = await updateClinicaData(localStorage.getItem("idClinica"), changes);
      console.log("Dados da clínica atualizados com sucesso:", updatedClinica);
      setClinica(updatedClinica);
      setNome("");
      setNivel([]);
    } catch (error) {
      console.error("Erro ao atualizar os dados da clínica:", error);
    }
  };

  return (
    <>
      <form onSubmit={addProf}>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input
          type="checkbox"
          onChange={(e) => setVerificador(e.target.checked)}
          checked={verificador}
        />
        <select multiple value={nivel} onChange={(e) => setNivel(Array.from(e.target.selectedOptions, option => option.value))}>
          <option value="1">Operador</option>
          <option value="2">Profissional</option>
          <option value="3">Estagiario</option>
        </select>
        <input type="submit" />
      </form>
    </>
  );
}
