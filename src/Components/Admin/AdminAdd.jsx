import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAdd() {
  const [clinica, setClinica] = useState(null);
  const [nome, setNome] = useState("");
  const [verificador, setVerificador] = useState(false);
  const [nivel, setNivel] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/Clinica?id=${localStorage.getItem("idClinica")}`
      )
      .then((response) => {
        setClinica(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados da clínica:", error);
      });
  }, []);

  const addProf = (e) => {
    e.preventDefault();

    const changes = {};

    if (nome) {
      changes.profissoes = [...(clinica?.profissoes || []), nome];
    }

    if (verificador) {
      changes.verificadorProf = [...(clinica?.verificadorProf || []), verificador];
    }

    if (nivel) {
      changes.nivel = [...(clinica?.nivel || []), nivel];
    }

    axios
      .put(
        `http://localhost:3000/Clinica?id=${localStorage.getItem("idClinica")}`,
        changes
      )
      .then((response) => {
        console.log("Dados da clínica atualizados com sucesso:", response.data);
        setClinica(response.data);
      })
      .catch((error) => {
        console.error("Erro ao atualizar os dados da clínica:", error);
      });
  };

  console.log(clinica);

  return (
    <>
      <form onSubmit={addProf}>
        <input type="text" onChange={(e) => setNome(e.target.value)} />
        <input
          type="checkbox"
          onChange={(e) => setVerificador(e.target.checked)}
          checked={verificador}
        />
        <select onChange={(e) => setNivel(e.target.value)}>
          <option value="1">Operador</option>
          <option value="2">Profissional</option>
          <option value="3">Estagiario</option>
        </select>
        <input type="submit" />
      </form>
    </>
  );
}
