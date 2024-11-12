import { useEffect, useState } from "react";
import {
  fetchClinicaData,
  updateClinicaData,
} from "../../services/adminServices"; // Importar as funções do serviço
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";
import { FaUserInjured } from "react-icons/fa";
import { LuBookPlus, LuHome, LuUserCheck, LuUsers } from "react-icons/lu";
import NavBar from "../../Components/NavBar";

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
      changes.verificadorProf = [
        ...(clinica?.verificadorProf || []),
        verificador,
      ];
    }

    if (nivel.length > 0) {
      changes.nivel = [...(clinica?.nivel || []), ...nivel];
    }

    try {
      const updatedClinica = await updateClinicaData(
        localStorage.getItem("idClinica"),
        changes
      );
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
      <Sidebar>
        <ItemsSidebar
          icon={<LuHome size={24} />}
          text="Home"
          route={"/AdminHome"}
        />
        <ItemsSidebar
          icon={<LuUserCheck size={24} />}
          text="Aceitar Usuários"
          route={"/AdminAceitar"}
        />
        <ItemsSidebar
          icon={<LuBookPlus size={24} />}
          text="Adicionar Profissão"
          route={"/AdminAdd"}
          ativo
        />
        <ItemsSidebar
          icon={<LuUsers size={24} />}
          text="Usuários"
          route={"/AdminUsuarios"}
        />
        <ItemsSidebar
          icon={<FaUserInjured size={24} />}
          text="Pacientes"
          route={"/AdminPaciente"}
        />
      </Sidebar>
      <NavBar icon={<LuBookPlus size={24} />} title={"Adicionar Profissão"} />

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-screen sm:pl-[89px] pt-[89px] justify-center items-center transition-all bg-slate-100
        dark:bg-neutral-800 dark:text-white"
      >
        <h1
          className="flex flex-col gap-y-2 text-evolutiGreen font-semibold text-2xl items-center
        md:flex-row md:gap-x-2 md:items-start"
        >
          <LuBookPlus size={24} />
          Adicionar nova profissão
        </h1>
        <div className=" w-full bg-white p-4">
          <form onSubmit={addProf}>
            <div className="flex flex-col gap-y-3.5">
              <label
                htmlFor="NomeProf"
                className="text-lg font-semibold text-neutral-600"
              >
                Nome da Profissão
              </label>
              <input
                type="text"
                name="NomeProf"
                className="px-4 py-2 border border-neutral-400 rounded-lg"
                placeholder="Fisioterapeuta"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="NomeProf"
                className="text-lg font-semibold text-neutral-600"
              >
                Órgão regulador
              </label>
              <input
                type="checkbox"
                onChange={(e) => setVerificador(e.target.checked)}
                checked={verificador}
              />

              <select
                multiple
                value={nivel}
                onChange={(e) =>
                  setNivel(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                <option value="1">Operador</option>
                <option value="2">Profissional</option>
                <option value="3">Estagiario</option>
              </select>
            </div>
            <input type="submit" />
          </form>
        </div>
      </section>
    </>
  );
}
