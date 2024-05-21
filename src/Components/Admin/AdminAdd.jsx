import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAdd() {
  const [clinica, setClinica] = useState(null);
  const [nome, setNome] = useState("");
  const [verificador, setVerificador] = useState(false); // Alterado para iniciar como false diretamente
  const [nivel, setNivel] = useState("1"); // Corrigido para iniciar com 'Operador'

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/Clinica/${localStorage.getItem("idClinica")}`
      )
      .then((response) => {
        setClinica(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados da clínica:", error);
      });
  }, []);

  const addProf = async (e) => {
    e.preventDefault();

    const changes = {};

    if (nome) {
      changes.profissoes = [...(clinica?.profissoes || []), nome];
    }

    if (verificador) {
      changes.verificadorProf = [...(clinica?.verificadorProf || []), verificador];
    }

    if (nivel) {
      changes.nivel = [...(clinica?.nivel || []), nivel]; // Corrigido para tratar 'nivel' como uma única escolha
    }

    console.log(clinica);

    try {
      const response = await axios.put(
        `http://localhost:3000/Clinica/${localStorage.getItem("idClinica")}`,
        changes
      );
      console.log("Dados da clínica atualizados com sucesso:", response.data);
      setClinica(response.data);
    } catch (error) {
      console.error("Erro ao atualizar os dados da clínica:", error);
    }
  };

  return (
    <>
      <form onSubmit={addProf}>
        <input type="text" onChange={(e) => setNome(e.target.value)} />
        <input
          type="checkbox"
          onChange={(e) => setVerificador(e.target.checked)}
          checked={verificador}
        />
        <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
          <option value="1">Operador</option>
          <option value="2">Profissional</option>
          <option value="3">Estagiario</option>
        </select>
        <input type="submit" />
      </form>
    </>
  );
}
