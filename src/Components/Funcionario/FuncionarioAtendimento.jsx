import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHomeSidebar, { ItemsSidebar } from "../Suplementares/AdminHomeSidebar";
import { FiPlusCircle } from "react-icons/fi";
import {
  FaUsers,
  FaUserInjured,
  FaFileAlt,
  FaLink,
  FaPlus,
  FaStethoscope,
  FaCaretDown,
} from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { AiFillFileAdd } from "react-icons/ai";
import { CiPill } from "react-icons/ci";
import { MdAssignment } from "react-icons/md";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export default function FuncAtend() {
  const id = sessionStorage.getItem("id");
  const mounted = useRef(false);
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null); // Initialize as null

  useEffect(() => {
    if (!mounted.current) {
      const fetchPaciente = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/Paciente?id=${id}`);
          const respostas = response.data;
          if (respostas.length > 0) {
            const pacienteData = respostas[0]; // Assuming a single patient object
            setPaciente({
              nome: pacienteData.nome,
              cpf: pacienteData.cpf,
              nascimento: pacienteData.data,
            });
          } else {
            setPaciente(null); // No patient data found
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setPaciente(null); // Handle fetch errors
        }
      };

      fetchPaciente();
      mounted.current = true;
    }
  }, [id]); // Add id as a dependency

  const redirectAtendimento = (e) => {
    e.preventDefault();
    navigate("/funcatendform");
  };

  return (
    <>
      <AdminHomeSidebar>
        <ItemsSidebar
          icon={<FiPlusCircle size={30} />}
          text="Cadastros"
          alert
          route={"/FuncCadastro"}
        />
        <ItemsSidebar
          icon={<FaUsers size={30} />}
          text="Usuários"
          route={"/FuncUsuarios"}
        />
        <ItemsSidebar icon={<FaUserInjured size={30} />} text="Pacientes" />
        <ItemsSidebar icon={<FaFileAlt size={30} />} text="Documentos" />
        <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
      </AdminHomeSidebar>

      <section
        id="FuncHome"
        className="flex md:flex-col flex-col h-full pl-[78px] justify-center items-center dark:bg-neutral-800"
      >
        <div
          className="w-full h-full pt-20 md:px-10 md:pt-10"
        >
          <div
            className="bg-neutral-100 flex flex-col border-2 border-b-0 w-full h-full rounded-bl-none rounded-br-none 
          shadow-black shadow-md p-5 gap-x-8 md:gap-x-0 md:flex-row md:rounded-3xl dark:bg-neutral-900 dark:border-gray-800"
          >
            <div className="flex flex-col justify-center items-center md:w-full">
              <div
                className="flex flex-col justify-center items-center text-center gap-x-2 
              md:flex-row md:text-left md:justify-normal md:pb-8"
              >
                <div className="w-32 h-32 rounded-full bg-gray-400"></div>
                <div className="flex flex-col justify-center dark:text-white">
                  <h1
                    className="text-2xl font-bold pb-2 
                  md:pb-0"
                  >
                    {paciente ? paciente.nome : "Loading..."}
                  </h1>
                  <p>
                    <b>Data de nascimento: </b>
                    <span>{paciente ? format(new Date(paciente.nascimento), 'dd/MM/yyyy', { locale: ptBR }) : "Loading..."}</span>
                  </p>
                  <p>
                    <b>CPF: </b>
                    <span>{paciente ? paciente.cpf : "Loading..."}</span>
                  </p>
                </div>
              </div>
              <div className="hidden md:flex flex-col w-full p-5 bg-EvolutiLightGreenLighter rounded-xl">
                <div className="flex items-center py-2 border-b-2 border-gray-500">
                  <button className="font-bold">Diagnósticos</button>
                  <FaCaretDown size={20} />
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-500">
                  <div className="flex items-center ">
                    <button className="font-bold">Receitas</button>
                    <FaCaretDown size={20} />
                  </div>
                  <CiPill size={25} className="mr-2" />
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-500">
                  <div className="flex items-center ">
                    <button className="font-bold">Pedidos de exame</button>
                    <FaCaretDown size={20} />
                  </div>
                  <FaStethoscope size={25} className="mr-2" />
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-500">
                  <div className="flex items-center">
                    <button className="font-bold">Questionários</button>
                    <FaCaretDown size={20} />
                  </div>
                  <MdAssignment size={25} className="mr-2" />
                </div>
                <div className="flex items-center justify-between py-2 border-gray-500">
                  <div className="flex items-center">
                    <button className="font-bold">Arquivos atrelados</button>
                    <FaCaretDown size={20} />
                  </div>
                  <AiFillFileAdd size={25} className="mr-2" />
                </div>
              </div>

              <div className="hidden md:flex flex-col w-full h-fit p-5 mt-8 bg-[#D9D9D9] rounded-xl overflow-y-auto">
                <h1 className="w-full text-xl text-center font-bold border-b-2 border-gray-500">
                  Histórico de tratamentos
                </h1>
                <div className="py-2">
                  <button className="w-full text-left p-4 border-2 border-black rounded-2xl">
                    03/02/2024
                  </button>
                </div>
                {/* Additional buttons */}
                <button
                  className="bg-blue"
                  onClick={(e) => redirectAtendimento(e)}
                >
                  <h1>Poggers</h1>
                </button>
              </div>
            </div>

            <div
              className="flex gap-x-4 pt-6 
            md:hidden"
            >
              <button
                className="w-1/2 py-4 px-4 border-2 border-transparent rounded-xl bg-evolutiLightGreen font-bold flex justify-center 
                items-center gap-x-2 shadow-md shadow-gray-600 transition-all ease-in-out hover:bg-evolutiGreen"
              >
                <FaLink size={20} />
                Anexos
              </button>
              <button
                className="w-1/2 py-4 px-4 border-2 border-transparent rounded-xl bg-evolutiLightBlueText font-bold flex 
              justify-center items-center gap-x-2 shadow-md shadow-gray-600 transition-all ease-in-out hover:bg-evolutiBlueText"
              >
                <FaLink size={20} />
                Histórico de Tratamento
              </button>
            </div>
            <div className="md:hidden h-0.5 bg-gray-500 rounded-full my-6"></div>
            <h1 className="md:hidden flex justify-center items-center gap-x-2 w-full text-center text-2xl font-bold text-evolutiLightGreen">
              <FaPlus />
              Novo Tratamento
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
