import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Importando AnimatePresence e motion
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import { createAtendimento } from "../../services/funcServices";
import MarcacaoPontosDor from "./MarcacaoPontosDor";
import "../CSS/ScrollStyle.css";
import {
  LuChevronDown,
  LuClipboard,
  LuClipboardList,
  LuFilePlus,
  LuHome,
  LuList,
  LuPill,
  LuStethoscope,
  LuUser,
} from "react-icons/lu";
import NavBar from "../../Components/NavBar";
import { usePontos } from "../../Contexts/PontosProvider";

export default function FuncAtendForm() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPontosDorOpen, setDropdownPontosDorOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [titulo, setTitulo] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [corpo, setCorpo] = useState("");
  const { circulos } = usePontos();

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

  const togglePontosDorDropdown = () => {
    setDropdownPontosDorOpen(!dropdownPontosDorOpen); // Função para alternar o dropdown dos Pontos de Dor
  };

  const validaCadastro = () => {
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

      <NavBar
        icon={<LuClipboard size={24} />}
        title={"Atendimento - Formulário"}
      />

      <section className="flex h-screen pl-[89px] pt-[89px] justify-center items-center bg-slate-100 dark:bg-neutral-800">
        <div className="relative flex h-full w-7/12 items-center justify-center">
          <MarcacaoPontosDor />
        </div>
        <div
          className="h-full w-5/12 bg-white border-l border-slate-200 overflow-y-auto scrollable-container
        dark:bg-neutral-900 dark:border-l-white"
        >
          <button
            onClick={toggleDropdown}
            className="relative z-10 flex w-full h-[72px] border-b border-slate-200 px-8 gap-x-3 items-center 
            transition-colors hover:bg-slate-50 dark:hover:bg-neutral-800"
          >
            <LuClipboardList size={32} className="text-evolutiGreen" />
            <span className="font-medium text-xl text-slate-500 dark:text-white">
              Formulário de tratamento
            </span>
            <LuChevronDown className="ml-auto text-evolutiGreen" size={24} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ y: -72, height: 0 }}
                animate={{ y: 0, height: "auto" }}
                exit={{ y: -72, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col px-8 py-6 gap-y-4 overflow-hidden"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="title"
                    className="text-slate-500 mb-2 dark:text-white"
                  >
                    Título do Tratamento:
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="flex-grow outline-none rounded-xl p-3 border border-slate-200 
                    dark:bg-neutral-900 dark:text-white"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Digite o título"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="diagnostico"
                    className="text-slate-500 mb-2 dark:text-white"
                  >
                    Diagnóstico:
                  </label>
                  <input
                    type="text"
                    id="diagnostico"
                    className="flex-grow outline-none rounded-xl p-3 border border-slate-200 
                    dark:bg-neutral-900 dark:text-white"
                    value={diagnostico}
                    onChange={(e) => setDiagnostico(e.target.value)}
                    placeholder="Digite o diagnóstico"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="tipo"
                    className="text-slate-500 mb-2 dark:text-white"
                  >
                    Tipo:
                  </label>
                  <select
                    id="tipo"
                    className="flex-grow outline-none rounded-xl p-3 border border-slate-200 
                    dark:bg-neutral-900 dark:text-white"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {DropdownOptions.map((option) => (
                      <option key={option.id} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="descricao"
                    className="text-slate-500 mb-2 dark:text-white"
                  >
                    Descrição do tratamento:
                  </label>
                  <textarea
                    id="descricao"
                    className="flex-grow resize-none p-2 h-36 border border-slate-200 rounded-xl
                    dark:bg-neutral-900 dark:text-white"
                    value={corpo}
                    onChange={(e) => setCorpo(e.target.value)}
                    placeholder="Digite aqui o tratamento..."
                  ></textarea>
                </div>

                <div className="flex justify-center gap-x-6 dark:text-white">
                  {[
                    { icon: <LuPill size={24} />, label: "Nova receita" },
                    { icon: <LuStethoscope size={24} />, label: "Novo pedido" },
                    { icon: <LuFilePlus size={24} />, label: "Novo anexo" },
                  ].map((button, index) => (
                    <button
                      key={index}
                      className="flex flex-col items-center gap-y-2 py-4 px-2 w-full text-slate-500 
                      border border-slate-200 rounded-lg transition-colors 
                      hover:bg-slate-100 dark:text-white dark:hover:bg-neutral-800"
                    >
                      {button.icon}
                      <span>{button.label}</span>
                    </button>
                  ))}
                </div>
                <button
                  className="w-full bg-evolutiGreen py-3 rounded-lg font-medium text-white 
                transition-colors hover:bg-evolutiGreenDarker"
                  onSubmit={criarAtend}
                >
                  Salvar Formulário
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={togglePontosDorDropdown}
            className="relative z-10  bg-white flex w-full h-[72px] border-y border-slate-200 px-8 gap-x-3 items-center 
          hover:bg-slate-50 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <LuList size={32} className="text-evolutiGreen" />
            <span className="font-medium text-xl text-slate-500 dark:text-white">
              Lista de Pontos de Dor
            </span>
            <LuChevronDown className="ml-auto text-evolutiGreen" size={24} />
          </button>

          <AnimatePresence>
            {dropdownPontosDorOpen && (
              <motion.div
                initial={{ y: -72, height: 0 }}
                animate={{ y: 0, height: "auto" }}
                exit={{ y: -72, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col px-8 py-6 gap-y-4 overflow-hidden max-h-screen overflow-y-auto scrollable-container"
                style={{ direction: "rtl" }}
              >
                <div
                  className="flex flex-col gap-y-4 text-slate-500 dark:text-white"
                  style={{ direction: "ltr" }}
                >
                  {/* Mensagem de instrução */}
                  {circulos.length === 0 ? (
                    <p className="text-center text-red-500">
                      Nenhum ponto de dor cadastrado.
                    </p>
                  ) : (
                    <>
                      <p className="text-center text-slate-500 dark:text-white">
                        Clique em um ponto de dor para ver mais detalhes,
                        editá-lo ou excluí-lo.
                      </p>
                      {circulos.map((circulo, indice) => (
                        <button
                          key={circulo.id}
                          className="w-full text-left bg-white border-2 py-4 px-7 rounded-lg transition-all truncate
                          hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                        >
                          <div className="flex items-center justify-between pb-5">
                            <span className="font-semibold text-xl">
                              Marcação #{indice + 1}
                            </span>
                            <div
                              className="flex items-center justify-center text-white w-6 h-6 rounded-lg font-bold"
                              style={{ backgroundColor: circulo.cor }}
                            >
                              {indice + 1}
                            </div>
                          </div>

                          <p className="font-medium font-poppins truncate text-slate-700 dark:text-slate-400 pb-2 ">
                            Título:{" "}
                            <span className="font-normal text-slate-400 dark:text-slate-300 ">
                              {circulo.titulo}
                            </span>
                          </p>
                          <p className="font-medium font-poppins truncate text-slate-700 dark:text-slate-400">
                            Descrição do ponto de dor:{" "}
                          </p>
                          <span className="font-normal text-slate-400 dark:text-slate-300">
                            {circulo.desc}
                          </span>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="flex w-full h-[72px] border-y border-slate-200 px-8 gap-x-3 items-center 
          hover:bg-slate-50 dark:hover:bg-neutral-800"
          >
            <LuUser size={32} className="text-evolutiGreen" />
            <span className="font-medium text-xl text-slate-500 dark:text-white">
              Informações do Paciente
            </span>
            <LuChevronDown className="ml-auto text-evolutiGreen" size={24} />
          </button>
        </div>
      </section>
    </>
  );
}
