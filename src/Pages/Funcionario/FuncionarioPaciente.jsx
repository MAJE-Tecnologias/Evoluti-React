import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";

import { FiPlusCircle } from "react-icons/fi";
import { FaUsers, FaUserInjured, FaFileAlt, FaSearch, FaEye } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { fetchPacientes } from "../../services/funcServices";

export default function AdminUsuarios() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [paciente, setPaciente] = useState([]);

  const mounted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mounted.current) {
      sessionStorage.setItem("id", null);
      const loadPacientes = async () => {
        try {
          const pacientesData = await fetchPacientes(idClinica);
          const pacienteArray = pacientesData.map((paciente) => ({
            id: paciente.id,
            nome: paciente.nome,
            email: paciente.email,
          }));
          setPaciente(pacienteArray);
        } catch (error) {
          console.error("Error loading pacientes:", error);
        }
      };

      loadPacientes();
      mounted.current = true;
    }
  }, [idClinica]);

  function showPaciente(paciente) {
    return (
      <>
        {paciente.map((paciente, index) => (
          <tbody key={index}>
            <tr className="bg-white border-b dark:bg-neutral-900 dark:border-gray-800">
              <th
                scope="row"
                className="flex gap-x-2 px-6 items-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="h-10 w-10">
                  <div className="h-full w-full rounded-full bg-gray-200"></div>
                </div>
                {paciente.nome}
              </th>
              <td className="px-6 py-4">Profissão</td>
              <td className="px-6 py-4">{paciente.email}</td>
              <td className="px-6 py-4">
                <button
                  onClick={(e) => redirectAtendimento(paciente.id, e)}
                  className="p-1 rounded-lg transition-all hover:bg-evolutiLightBlueText hover:text-white"
                >
                  <FaEye size={20} />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </>
    );
  }

  const redirectAtendimento = (idPaciente, e) => {
    e.preventDefault();
    sessionStorage.setItem("id", idPaciente);
    navigate("/funcatend");
  };

  return (
    <>
      <Sidebar>
        <ItemsSidebar
          icon={<FiPlusCircle size={24} />}
          text="Cadastros"
          route={"/AdminCadastro"}
        />
        <ItemsSidebar
          icon={<FaUsers size={24} />}
          text="Usuários"
          ativo
          route={"/AdminUsuarios"}
        />
        <ItemsSidebar icon={<FaUserInjured size={24} />} text="Pacientes" />
        <ItemsSidebar icon={<FaFileAlt size={24} />} text="Documentos" />
        <ItemsSidebar icon={<VscGraph size={24} />} text="Relatórios" />
      </Sidebar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-full pl-[89px] pt-[89px] items-center dark:bg-neutral-800"
      >
        <div>
          <h1 className="flex justify-center items-center gap-x-2 text-4xl font-extrabold text-evolutiLightGreen pt-10">
            <FaUsers size={40} /> Visualização de Usuários
          </h1>

          <div className=" flex mt-10 justify-center items-center gap-x-3 dark:text-white">
            <FaSearch size={20} />
            <input
              type="text"
              className="w-1/2 rounded py-1 px-4"
              placeholder="Pesquisar usuário"
            ></input>
          </div>
        </div>

        <div className="relative overflow-x-auto w-full px-16 mt-10"></div>

        <table className="w-3/4 text-sm text-left rtl:text-right text-black dark:text-white border rounded-lg border-separate">
          <thead className="text-xs dark:text-white uppercase bg-gray-200 dark:bg-neutral-950 dark:border-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nome Completo
              </th>
              <th scope="col" className="px-6 py-3">
                PROFISSÃO
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                AÇÕES
              </th>
            </tr>
          </thead>
          {showPaciente(paciente)}
        </table>
      </section>
    </>
  );
}
