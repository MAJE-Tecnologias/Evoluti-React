import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import {
  FaLink,
  FaPlus,
  FaStethoscope,
  FaCaretDown,
} from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { CiPill } from "react-icons/ci";
import { MdAssignment } from "react-icons/md";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { fetchPacienteById, fetchAtendimentosByPacienteId } from '../../services/funcServices';
import "../CSS/ScrollStyle.css";
import { LuClipboard, LuHome } from "react-icons/lu";
import NavBar from "../../Components/NavBar";

export default function FuncAtend() {
  const id = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacienteData = await fetchPacienteById(id);
        if (pacienteData.length > 0) {
          setPaciente({
            nome: pacienteData[0].nome,
            cpf: pacienteData[0].cpf,
            nascimento: pacienteData[0].data,
          });
        } else {
          setPaciente(null);
        }

        const atendimentosData = await fetchAtendimentosByPacienteId(id);
        const sortedAtendimentos = atendimentosData.sort((a, b) => {
          const dateA = new Date(a.data);
          const dateB = new Date(b.data);
          return dateA - dateB;
        });
        setAtendimentos(sortedAtendimentos);
      } catch (error) {
        console.error("Fetch error:", error);
        setPaciente(null);
        setAtendimentos([]);
      }
    };

    fetchData();
  }, [id]);

  const showAtendimentos = (atendimentos) => {
    return (
      <>
        {atendimentos.length > 0 ? (
          atendimentos.map((atendimento) => (
            <div key={atendimento.id} className="py-2">
              <button className="w-full text-left p-4 border-2 border-black rounded-2xl">
                {format(new Date(atendimento.data), 'dd MMMM yyyy HH:mm', { locale: ptBR }) || "No Title"}
              </button>
            </div>
          ))
        ) : (
          <p>No atendimentos found</p>
        )}
      </>
    );
  };

  const redirectAtendimento = (e) => {
    e.preventDefault();
    navigate("/funcatendform");
  };

  return (
    <>
      <Sidebar>
        <ItemsSidebar
          icon={<LuHome size={24} />}
          text="Home"
          route="/FuncHome"
        />
        <ItemsSidebar
          icon={<LuClipboard size={24} />}
          text="Atendimentos"
          route="/FuncAtend"
          ativo
        />
      </Sidebar>

      <NavBar icon={<LuClipboard size={24}/>} title={"Atendimentos"}/>

      <section
        id="FuncHome"
        className="flex md:flex-col flex-col h-screen pl-[89px] pt-[89px] justify-center items-center dark:bg-neutral-800"
      >
        <div className="w-full h-full pt-20 md:px-10 md:pt-10">
          <div
            className="bg-neutral-100 flex flex-col border-2 border-b-0 w-full h-full rounded-3xl rounded-bl-none rounded-br-none 
            shadow-gray-500 shadow-md p-5 gap-x-8 md:gap-x-0 md:flex-row dark:bg-neutral-900 dark:border-transparent"
          >
            <div className="flex flex-col items-center md:w-full">
              <div
                className="flex flex-col justify-center items-center text-center gap-x-2 
                md:flex-row md:text-left md:justify-normal md:pb-8"
              >
                <div className="w-32 h-32 rounded-full bg-gray-400"></div>
                <div className="flex flex-col justify-center dark:text-white">
                  <h1 className="text-2xl font-bold pb-2 md:pb-0">
                    {paciente ? paciente.nome : "Loading..."}
                  </h1>
                  <p>
                    <b>Data de nascimento: </b>
                    <span>
                      {paciente
                        ? format(new Date(paciente.nascimento), "dd/MM/yyyy", {
                            locale: ptBR,
                          })
                        : "Loading..."}
                    </span>
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

              <div
                className="hidden md:flex flex-col w-full h-full p-5 mt-8 bg-[#D9D9D9] 
              rounded-xl"
              >
                <h1 className="w-full text-xl text-center font-bold border-gray-500">
                  Histórico de tratamentos
                </h1>
                <div className="h-full flex flex-col overflow-y-scroll scrollable-container border-2 border-gray-500">
                  {showAtendimentos(atendimentos)}
                  <button
                    className="bg-blue text-black border-2 border-black px-4 py-2 rounded-md mt-auto w-fit
                    transition-colors hover:bg-black hover:text-white"
                    onClick={redirectAtendimento}
                  >
                    Novo Tratamento
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-x-4 pt-6 md:hidden">
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
