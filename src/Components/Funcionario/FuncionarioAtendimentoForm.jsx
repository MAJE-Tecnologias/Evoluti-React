import { useState } from "react";
import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import { FiPlusCircle } from "react-icons/fi";
import {
  FaUsers,
  FaUserInjured,
  FaFileAlt,
  FaStethoscope,
} from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { AiFillFileAdd } from "react-icons/ai";
import { CiPill } from "react-icons/ci";
import { MdAdsClick } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MarcacaoPontosDor from "./FuncionarioHome";

export default function FuncAtendForm() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [titulo, setTitulo] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [corpo, setCorpo] = useState("");
  const [marcacaoOpen, setMarcacaoOpen] = useState(false);

  const navigate = useNavigate();
  const id = sessionStorage.getItem("id")

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

  const criarAtend = (e) => {
    e.preventDefault();
    if (validaCadastro()) {
      const body = {
        titulo,
        tipo: selectedOption,
        diagnostico,
        corpo,
        idPaciente: id, 
        data: new Date()
      };

      axios
        .post(`http://localhost:3000/Atendimento`, body)
        .then(() => {
          alert("Cadastrado com sucesso");
          navigate("/Funcatend");
        })
        .catch((error) => console.error("Error:", error));
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

  const toggleMarcacaoPontosDor = () => {
    setMarcacaoOpen(!marcacaoOpen)
  }

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
        <div className="w-full h-full pt-20 md:px-10 md:pt-10">
          <div
            className="bg-neutral-100 flex flex-col border-2 border-b-0 w-full h-fit rounded-bl-none rounded-br-none 
          shadow-black shadow-md p-5 gap-x-8 md:gap-x-0 md:flex-row md:rounded-3xl dark:bg-neutral-900 dark:border-gray-800"
          >
            <div className="sm:px-8 md:px-0 md:w-1/2 h-full">
              <form onSubmit={criarAtend}>
                <div className="relative flex w-full h-12 border rounded-t-md items-center bg-gray-300 px-4 gap-x-4">
                  <div className="flex gap-x-3 items-center w-full">
                    <label htmlFor="title" className="font-bold text-xl">
                      Título:
                    </label>
                    <input
                      type="text"
                      className="outline-none rounded-md py-1 px-2 w-full"
                      id="title"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>
                  <div className="relative w-fit">
                    <button type="button"
                      onClick={toggleDropdown}
                      className="w-fit h-fit bg-white border border-gray-400 rounded-md py-1 px-2 outline-none shadow-md text-nowrap"
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
                  rows="20"
                  className="w-full h-full rounded-lg rounded-t-none resize-none bg-[#E7E5E5] outline-none p-4"
                  value={corpo}
                  onChange={(e) => setCorpo(e.target.value)}
                ></textarea>
                <div className="flex flex-col gap-y-5 h-fit bg-[#d2cfcf] rounded-lg p-4">
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-center items-center">
                      <button
                        className="flex flex-col justify-center items-center p-4 border border-transparent rounded-xl 
                    transition-all ease-in-out hover:bg-opacity-10 hover:bg-black"
                      >
                        <AiFillFileAdd size={30} className="pb-1" />
                        Novo anexo
                      </button>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        className="flex flex-col justify-center items-center p-4 border border-transparent rounded-xl 
                    transition-all ease-in-out hover:bg-opacity-10 hover:bg-black"
                      >
                        <FaStethoscope size={30} className="pb-1" />
                        Novo pedido
                      </button>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <button
                        className="flex flex-col justify-center items-center p-4 border border-transparent rounded-xl 
                    transition-all ease-in-out hover:bg-opacity-10 hover:bg-black"
                      >
                        <CiPill size={30} className="pb-1" />
                        Nova receita
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-x-3 justify-center items-center">
                    <h1 className="text-xl font-bold">Diagnóstico:</h1>
                    <input
                      type="text"
                      className="peer w-full placeholder-transparent bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder-evolutiGreen 
                p-3.5 rounded-lg focus:outline-evolutiGreenDarker"
                      value={diagnostico}
                      onChange={(e) => setDiagnostico(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Salvar Tratamento"
                    className="py-2 px-4 w-fit bg-evolutiLightGreen rounded-lg font-bold text-white self-center 
                  cursor-pointer transition-all ease-in-out hover:bg-evolutiGreen"
                  />
                </div>
                <div className="w-full flex justify-center items-center pt-5">
                  <button type="button" onClick={toggleMarcacaoPontosDor}
                    className="w-fit h-20 bg-white rounded-3xl flex justify-center items-center gap-x-4 p-4 
                border border-evolutiGreen transition-all ease-in-out hover:shadow-md hover:bg-gray-100"
                  >
                    <div className="flex justify-center items-center p-2 rounded-full bg-evolutiGreen text-white">
                      <MdAdsClick size={30} />
                    </div>
                    <span className="font-bold text-2xl text-evolutiGreen">
                      Marcação de pontos de dor
                    </span>
                  </button>
                </div>
              </form>
            </div>
            {marcacaoOpen && (
                      <div className="flex h-full w-full justify-center md:w-1/2">
                          <MarcacaoPontosDor/>
                      </div>
                    )}
          </div>
        </div>
      </section>
    </>
  );
}
