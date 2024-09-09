import { useRef, useEffect, useState } from "react";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";
import {
  FaUsers,
  FaUserInjured,
  FaFileAlt,
  FaUserCheck,
  FaCamera,
  FaUpload,
} from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { fetchPacienteWithMaxId, createPaciente } from '../../services/operadorServices'; // Importando os serviços

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
      fetchPacienteWithMaxId()
        .then((respostas) => {
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

  const handleCreatePaciente = async (e) => {
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

    try {
      await createPaciente(body);
      alert("Cadastrado com sucesso");
    } catch (error) {
      console.log("Error creating paciente:", error);
    }
  };

  return (
    <>
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

      <section
        id="FuncHome"
        className="flex md:flex-col flex-col h-full pl-[78px] justify-center items-center transition-all
        dark:bg-neutral-800 "
      >
        <div className="w-full h-full pt-10 md:px-10 md:pt-10 sm:px-5">
          <h1 className="flex flex-col justify-center items-center gap-x-2 text-4xl text-center font-extrabold text-evolutiLightGreen pb-10">
            <FaUserCheck size={40} />
            <span>Adicionar Pacientes</span>
          </h1>
          <div
            className="bg-neutral-100 flex flex-col border-t-2 border-b-0 w-full h-fit rounded-bl-none rounded-br-none
             sm:border-b-0 sm:border-2 sm:rounded-t-3xl
          shadow-black shadow-md p-5 gap-x-8 md:gap-x-0 md:flex-row
          dark:bg-neutral-900 dark:border-gray-300 dark:shadow-white dark:shadow-2xl"
          >
            <form onSubmit={handleCreatePaciente} className="md:w-full md:flex md:gap-x-8">
              <div
                className="flex flex-col items-center justify-center pb-5 border-b-2 border-gray-300 
              md:w-1/4 md:border-b-0 md:justify-normal"
              >
                <p className="font-bold pb-4 dark:text-white lg:text-xl">
                  Imagem do paciente
                </p>
                <div
                  className="relative flex flex-col items-center justify-center border-gray-300 rounded-full w-28 h-28 shadow-lg cursor-pointer group
                md:w-full md:h-fit"
                >
                  <div
                    className="absolute bg-black w-28 h-28 rounded-full text-white flex flex-col items-center justify-center
                  transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-opacity-50 z-10 md:w-full md:h-full"
                  >
                    <FaCamera className="text-white size-5 lg:size-10" />
                    <span className="text-xs lg:text-xl">Adicionar Foto</span>
                  </div>
                  <img
                    src="https://picsum.photos/240/240"
                    className="relative w-28 h-28 rounded-full border-2 dark:border-white border-evolutiGreen md:w-full md:h-fit"
                    alt="default image"
                  />
                </div>
                <button type="button" className="w-fit px-2 flex justify-center items-center gap-x-2 font-bold bg-white py-2 transition-all
                border-2 rounded-lg border-evolutiGreen mt-5 lg:w-full lg:px-0 lg:text-lg lg:py-3
                hover:bg-evolutiGreen hover:text-white"> <FaUpload/> Adicionar Foto</button>
              </div>
              <div className="flex flex-col gap-y-4 pt-5 md:w-3/4 md:pt-0">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="nome" className="font-bold dark:text-white lg:text-xl">
                    Nome:
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                            p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker lg:text-lg lg:p-3"
                    placeholder="Insira o nome do paciente"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="email" className="font-bold dark:text-white lg:text-xl">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker lg:text-lg lg:p-3"
                    placeholder="Insira o email do paciente"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="cpf" className="font-bold dark:text-white lg:text-xl">
                    CPF:
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    name="cpf"
                    className="w-full bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker lg:text-lg lg:p-3"
                    placeholder="Insira o CPF do paciente"
                    onChange={(e) => setCPF(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="rg" className="font-bold dark:text-white lg:text-xl">
                    RG:
                  </label>
                  <input
                    type="text"
                    id="rg"
                    name="rg"
                    className="w-full bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker lg:text-lg lg:p-3"
                    placeholder="Insira o RG do paciente"
                    onChange={(e) => setRG(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="dataNascimento" className="font-bold dark:text-white lg:text-xl">
                    Data de Nascimento:
                  </label>
                  <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    className="w-full bg-loginButtonsBackground text-evolutiGreenDarker
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker lg:text-lg lg:p-3"
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="cadastroGeneroClinica" className="font-bold dark:text-white lg:text-xl">
                    Gênero
                  </label>
                  <select
                    id="cadastroGeneroClinica"
                    name="genero"
                    onChange={(e) => setGenero(e.target.value)}
                    className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen text-evolutiGreenDarker
                            p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker lg:text-lg lg:p-3"
                  >
                    <option defaultValue="">Selecione o gênero</option>
                    <option value="1" className="text-black">Homem-Cis</option>
                    <option value="2" className="text-black">Mulher-Cis</option>
                    <option value="3" className="text-black">Homem-Trans</option>
                    <option value="4" className="text-black">Mulher-Trans</option>
                    <option value="5" className="text-black">Outro</option>
                  </select>
                </div>

                <div className="flex flex-col gap-y-2">
                  <label htmlFor="telefone" className="font-bold dark:text-white lg:text-xl">
                    Telefone:
                  </label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    className="w-full bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder:text-evolutiGreenDarker
                p-2 rounded-lg shadow-md focus:outline-evolutiGreenDarker lg:text-lg lg:p-3"
                    placeholder="Insira o telefone do paciente"
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
                <div className="flex justify-center lg:justify-normal">
                  <input
                    type="submit"
                    className="px-8 py-2 bg-evolutiGreen text-white rounded-md font-semibold lg:px-20 lg:py-3"
                    value="Cadastrar"
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
