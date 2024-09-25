import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import {

  FaStethoscope,
} from "react-icons/fa";
import { AiFillFileAdd } from "react-icons/ai";
import { CiPill } from "react-icons/ci";
import { MdAdsClick } from "react-icons/md";
import { createAtendimento } from "../../services/funcServices";
import MarcacaoPontosDor from "./MarcacaoPontosDor";
import { LuClipboard, LuHome } from "react-icons/lu";

export default function FuncAtendForm() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [titulo, setTitulo] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [corpo, setCorpo] = useState("");
  const [marcacaoOpen, setMarcacaoOpen] = useState(false);

  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");

  const DropdownOptions = [
    { id: 1, label: "Avaliação" },
    { id: 2, label: "Evolução" },
    { id: 3, label: "Tratamento" },
    { id: 4, label: "Opção 4" },
    { id: 5, label: "Opção 5" },
    { id: 6, label: "Opção 6" },
    { id: 7, label: "Opção 7" },
    { id: 8, label: "Opção 8" },
  ];

  const criarAtend = async (e) => {
    e.preventDefault();
    if (validaCadastro()) {
      const body = {
        titulo,
        tipo: selectedOption,
        diagnostico,
        corpo,
        idPaciente: id,
        data: new Date(),
      };

      try {
        await createAtendimento(body);
        alert("Cadastrado com sucesso");
        navigate("/Funcatend");
      } catch (error) {
        console.error("Error creating atendimento:", error);
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setDropdownOpen(false);
  };

  const validaCadastro = () => {
    // Implement your validation logic here
    return true;
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
        />
      </Sidebar>

      <section className="flex md:flex-col flex-col h-full pl-[89px] justify-center items-center bg-slate-100 dark:bg-neutral-800">
        <div className="w-full min-h-screen pt-20 md:px-10 md:pt-10">
          <div
            className=" flex flex-col w-full h-full rounded-bl-none rounded-br-none 
           p-5 gap-x-8 ld:gap-x-0 lg:flex-row md:rounded-3xl  "
          >
            <div className="lg:w-1/2 items-stretch">
              <form onSubmit={criarAtend} className="flex flex-col h-full shadow">
                <div className="flex items-center h-20 rounded-t-3xl bg-evolutiGreen border px-4 py-2
                dark:bg-gray-900">
                  <label htmlFor="title" className="font-bold text-white text-xl mr-2">
                    Título:
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="flex-grow outline-none rounded-md py-2 px-2"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Digite o título..."
                  />
                  <div className="relative pl-2">
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="bg-white border border-gray-400 rounded-md py-1 px-2 shadow-md"
                    >
                      {selectedOption || "Selecione"}
                    </button>
                    {dropdownOpen && (
                      <div className="absolute mt-1 w-40 max-h-40 overflow-y-auto bg-white border border-gray-400 rounded-md shadow-md z-10 right-0">
                        <ul className="p-1">
                          {DropdownOptions.map((option) => (
                            <li
                              key={option.id}
                              onClick={() => handleOptionClick(option)}
                              className="px-3 py-1 rounded-md cursor-pointer hover:bg-gray-200"
                            >
                              {option.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <textarea
                  name="tratamentoText"
                  id="tratamentoText"
                  className="flex-grow h-96 resize-none bg-[#E7E5E5] outline-none p-4"
                  value={corpo}
                  onChange={(e) => setCorpo(e.target.value)}
                  placeholder="Digite aqui o tratamento..."
                />

                <div className="flex flex-col gap-y-4 bg-evolutiGreen rounded-b-lg p-4 dark:bg-gray-900">
                  <div className="flex justify-between dark:text-white">
                    {[
                      {
                        icon: <AiFillFileAdd size={24} />,
                        label: "Novo anexo",
                      },
                      {
                        icon: <FaStethoscope size={24} />,
                        label: "Novo pedido",
                      },
                      { icon: <CiPill size={24} />, label: "Nova receita" },
                    ].map((button, index) => (
                      <button
                        key={index}
                        className="flex flex-col justify-center items-center p-4 border border-transparent rounded-xl transition-all ease-in-out hover:bg-opacity-10 hover:bg-black"
                      >
                        {button.icon}
                        <span>{button.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-x-3 items-center">
                    <h1 className="text-xl font-bold">Diagnóstico:</h1>
                    <input
                      type="text"
                      className="flex-grow bg-loginButtonsBackground border border-evolutiLightGreen rounded-lg p-3.5 focus:outline-evolutiGreenDarker"
                      value={diagnostico}
                      onChange={(e) => setDiagnostico(e.target.value)}
                      placeholder="Digite o diagnóstico..."
                    />
                  </div>

                  <input
                    type="submit"
                    value="Salvar Tratamento"
                    className="py-2 px-4 w-fit bg-evolutiLightGreen rounded-lg font-bold text-white self-center cursor-pointer transition-all ease-in-out hover:bg-evolutiGreen"
                  />
                </div>
              </form>
            </div>

            <div
              className="w-full md:mt-0 lg:w-1/2 bg-white rounded-t-3xl shadow-gray-300 shadow-lg border border-evolutiGreen rounded-3xl
            overflow-hidden dark:shadow-none dark:bg-zinc-600 dark:border-gray-900"
            >
              <div
                className="w-full h-20 bg-white rounded-t-3xl flex justify-center items-center gap-x-4 p-4 
                border-b border-evolutiGreen dark:bg-zinc-400 dark:border-gray-900"
              >
                <div
                  className="flex justify-center items-center p-2 rounded-full 
                bg-evolutiGreen text-white dark:bg-gray-900"
                >
                  <MdAdsClick size={24} />
                </div>
                <span className="font-bold text-2xl text-evolutiGreen dark:text-white">
                  Marcação de pontos de dor
                </span>
              </div>

              <div className="w-full justify-center flex lg:flex">
                <MarcacaoPontosDor />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
