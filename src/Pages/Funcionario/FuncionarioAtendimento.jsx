import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import { FaLink, FaPlus, FaStethoscope, FaCaretDown } from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { CiPill } from "react-icons/ci";
import { MdAssignment } from "react-icons/md";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  fetchPacienteById,
  fetchAtendimentosByPacienteId,
} from "../../services/funcServices";
import "../CSS/ScrollStyle.css";
import { LuClipboard, LuHome } from "react-icons/lu";
import NavBar from "../../Components/NavBar";
import { ItemsNavBar } from "../../Components/ItemsNavBar";

export default function FuncAtend() {
  const id = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);
  const [selectedAtendimento, setSelectedAtendimento] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (atendimento) => {
    setSelectedAtendimento(atendimento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAtendimento(null);
    setIsModalOpen(false);
  };

  const showAtendimentos = (atendimentos) => {
    return (
      <>
        {atendimentos.length > 0 ? (
          atendimentos.map((atendimento) => (
            <div key={atendimento.id} className="py-2">
              <button
                className="w-full text-left p-4 border border-slate-400 shadow-md rounded-2xl font-medium bg-white transition-all
                hover:bg-slate-100"
                onClick={() => openModal(atendimento)}
              >
                {format(new Date(atendimento.data), "dd MMMM yyyy HH:mm", {
                  locale: ptBR,
                }) || "No Title"}
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
          route="/FuncPaciente"
          ativo
        />
      </Sidebar>

      <NavBar icon={<LuHome size={24} />} title={"Atendimentos"}>
        <ItemsNavBar
          icon={<LuHome size={24} />}
          text="Home"
          route="/FuncHome"
        />
        <ItemsNavBar
          icon={<LuClipboard size={24} />}
          text="Atendimentos"
          route="/FuncPaciente"
          ativo
        />
      </NavBar>

      <section
        id="FuncHome"
        className="flex flex-col h-full min-h-screen pl-0 sm:pl-[89px] pt-[89px] justify-center items-center dark:bg-neutral-800"
      >
        <div className="w-full h-full pt-20 md:px-10 md:pt-10">
          <div
            className="bg-white flex flex-col border-2 w-full h-full md:border-b-0 md:rounded-3xl
            shadow-gray-500 p-5 gap-x-8 md:gap-x-0 md:flex-row dark:bg-neutral-900 dark:border-transparent"
          >
            <div className="flex flex-col items-center md:w-full">
              <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row w-full">
                <div className="w-full flex flex-col justify-center items-center text-center gap-x-2 md:mr-4 md:border-r-2">
                  <div className="w-32 h-32 rounded-full bg-gray-400 mb-4"></div>
                  <div className="flex flex-col justify-center dark:text-white">
                    <h1 className="text-2xl font-bold pb-2 md:pb-0">
                      {paciente ? paciente.nome : "Loading..."}
                    </h1>
                    <p>
                      <b>Data de nascimento: </b>
                      <span>
                        {paciente
                          ? format(
                              new Date(paciente.nascimento),
                              "dd/MM/yyyy",
                              {
                                locale: ptBR,
                              }
                            )
                          : "Loading..."}
                      </span>
                    </p>
                    <p>
                      <b>CPF: </b>
                      <span>{paciente ? paciente.cpf : "Loading..."}</span>
                    </p>
                  </div>
                </div>
                <div className="md:flex flex-col w-full p-5 bg-EvolutiLightGreenLighter rounded-xl">
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
              </div>

              <div
                className="md:flex flex-col w-full h-full p-5 mt-8 bg-neutral-200
              rounded-xl"
              >
                <h1 className="w-full text-xl text-center font-bold border-gray-500">
                  Histórico de tratamentos
                </h1>
                <div className="border-2 border-gray-500 rounded-3xl p-3 my-4">
                  <div className="max-h-[300px] flex flex-col overflow-y-auto scrollable-container border-2 p-3">
                    {showAtendimentos(atendimentos)}
                  </div>
                </div>
                <button
                  className="bg-blue text-black border-2 border-black px-4 py-2 rounded-md mt-auto w-fit self-center
                    transition-colors hover:bg-black hover:text-white"
                  onClick={redirectAtendimento}
                >
                  Novo Tratamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && selectedAtendimento && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold">Detalhes do Atendimento</h2>
            <hr className="mb-4 bg-black"></hr>
            <p>
              <strong>Data:</strong>{" "}
              {format(
                new Date(selectedAtendimento.data),
                "dd MMMM yyyy HH:mm",
                { locale: ptBR }
              )}
            </p>
            <p>
              <strong>Diagnóstico:</strong> {selectedAtendimento.diagnostico}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
