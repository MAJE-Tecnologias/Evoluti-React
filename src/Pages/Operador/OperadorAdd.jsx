// Importações de componentes e ícones necessários
import { useRef, useEffect, useState } from "react";

import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";
import {
  FaUsers,
  FaUserInjured,
  FaFileAlt,
  FaUserCheck,
  FaCamera,
} from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import axios from "axios";

// Definindo o componente OperadorAdd
export default function OperadorAdd() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRG] = useState("");
  const [cpf, setCPF] = useState("");

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      axios
        .get("http://localhost:3000/Paciente?_sort=-id")
        .then((response) => {
          const respostas = response.data;
          if (respostas && respostas.length > 0) {
            setId(respostas[0].id);
          }
        })
        .catch((error) => console.error("Erro ao buscar Pacientes:", error));
    }

    return () => {
      mounted.current = false;
    };
  }, [idClinica]);

  const createPaciente = async (e) => {
    e.preventDefault();
    const newId = parseInt(id) + 1;
    const body = {
      id: newId,
      nome,
      email,
      data,
      genero,
      telefone,
      rg,
      cpf,
      fk_clinica: idClinica,
    };

    axios
      .post("http://localhost:3000/Paciente", body)
      .then(() => {
        alert("Cadastrado com sucesso");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {/* Sidebar do administrador com itens de navegação */}
      <Sidebar>
        <ItemsSidebar
          icon={<FaUserCheck size={30} />}
          text="Adicionar Paciente"
          route="/OperadorAdd"
        />
        <ItemsSidebar
          icon={<FaUsers size={30} />}
          text="Usuários"
          route="/AdminUsuarios"
        />
        <ItemsSidebar icon={<FaUserInjured size={30} />} text="Pacientes" />
        <ItemsSidebar icon={<FaFileAlt size={30} />} text="Documentos" />
        <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
      </Sidebar>

      {/* Seção principal do formulário de adição de paciente */}
      <section
        id="FuncHome"
        className="flex md:flex-col flex-col h-full pl-[78px] justify-center items-center dark:bg-neutral-800 transition-all"
      >
        <div className="w-full h-full py-10 md:px-10 md:pt-10">
          <h1 className="flex flex-col justify-center items-center gap-x-2 text-4xl text-center font-extrabold text-evolutiLightGreen pb-10">
            <FaUserCheck size={40} />
            <span>Adicionar Pacientes</span>
          </h1>
          <div
            className="bg-neutral-100 flex flex-col border-2 border-b-0 w-full h-fit rounded-bl-none rounded-br-none
          shadow-black shadow-md p-5 gap-x-8 md:gap-x-0 md:flex-row md:rounded-3xl dark:bg-neutral-900 dark:border-gray-800"
          >
            <form onSubmit={createPaciente}>
              <div className="flex justify-center pb-5">
                <div className="relative flex flex-col items-center justify-center border border-gray-300 rounded-full w-28 h-28 shadow-md cursor-pointer group">
                  <div
                    className="bg-black w-28 h-28 rounded-full text-white flex flex-col items-center justify-center
                  transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-opacity-50 z-10"
                  >
                    <FaCamera size={20} className="text-white" />
                    <span className="text-xs ">Adicionar Foto</span>
                  </div>
                  <img
                    src="https://picsum.photos/112"
                    className="absolute w-28 h-28 rounded-full"
                    alt="default image"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="nome" className="font-bold">
                    Nome:
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                            p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                    placeholder="Insira o nome do paciente"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="email" className="font-bold">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                    placeholder="Insira o email do paciente"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="cpf" className="font-bold">
                    CPF:
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    className="w-full bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                    placeholder="Insira o CPF do paciente"
                    onChange={(e) => setCPF(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="rg" className="font-bold">
                    RG:
                  </label>
                  <input
                    type="text"
                    id="rg"
                    name="rg"
                    className="w-full bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                    placeholder="Insira o RG do paciente"
                    onChange={(e) => setRG(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="dataNascimento" className="font-bold">
                    Data de Nascimento:
                  </label>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    className="w-full bg-loginButtonsBackground text-evolutiGreenDarker
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="cadastroGeneroClinica" className="font-bold">
                    Gênero
                  </label>
                  <select
                    id="cadastroGeneroClinica"
                    name="genero"
                    onChange={(e) => setGenero(e.target.value)}
                    className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen text-evolutiGreenDarker
                            p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                  >
                    <option defaultValue="">Selecione o gênero</option>
                    <option value="1" className="text-black">
                      Homem-Cis
                    </option>
                    <option value="2" className="text-black">
                      Mulher-Cis
                    </option>
                    <option value="3" className="text-black">
                      Homem-Trans
                    </option>
                    <option value="4" className="text-black">
                      Mulher-Trans
                    </option>
                    <option value="5" className="text-black">
                      Outro
                    </option>
                  </select>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="telefone" className="font-bold">Telefone:</label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    className="w-full bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                    placeholder="Insira o nome do paciente"
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="submit"
                    className="px-8 py-1 bg-evolutiGreen text-white rounded-md font-semibold"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
