import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "./Modal";
import {
  LuChevronLeft,
  LuChevronRight,
  LuLogOut,
  LuMoon,
  LuSettings,
  LuSun,
} from "react-icons/lu";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const id = sessionStorage.getItem("idUsuario");
  const [usuario, setUsuario] = useState(null);
  const [expandido, setExpandido] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(() => {
    const modoSalvo = localStorage.getItem("modoEscuro");
    return (
      modoSalvo === "true" ||
      (modoSalvo === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Usuario?id=${id}`
        );
        const respostas = response.data;
        if (respostas.length > 0) {
          const usuarioData = respostas[0];
          setUsuario({
            Nome: usuarioData.Nome,
            Email: usuarioData.Email,
            Profissao: usuarioData.Profissao,
          });
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUsuario(null);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setModoEscuro(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    fetchUsuario();

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [id]);

  useEffect(() => {
    if (modoEscuro) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("modoEscuro", modoEscuro);
  }, [modoEscuro]);

  function handleCloseSidebar() {
    setExpandido(false);
  }

  const ativarModoEscuro = () => {
    setModoEscuro((prevMode) => !prevMode);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div
        className="fixed opacity-0 data-[is-open=true]:pointer-events-auto data-[is-open=true]:opacity-100 h-screen inset-0 z-10 
        transition-opacity bg-black bg-opacity-50 pointer-events-none"
        data-is-open={expandido}
        onClick={handleCloseSidebar}
      />
      <motion.nav
        className="h-full fixed flex flex-col bg-white shadow-sm z-50 px-3 pt-6
        transition-colors dark:bg-neutral-900 min-w-[89px] border-r border-slate-200"
        initial={{ width: 89 }}
        animate={{ width: expandido ? 298 : 89 }}
        transition={{ duration: 0.3 }}
        id="sidebar"
      >
        <div>
          <img
            src="src\assets\Evoluti_GreenLogo.svg"
            alt="Evoluti Logo"
            className="w-[130px]"
          />
        </div>
        <hr className="bg-slate-200 my-8"></hr>
        <div className="relative group">
          <button
            onClick={() => setExpandido((curr) => !curr)}
            className="absolute -top-7 -right-[26px] p-1 rounded-full border-2 bg-white border-slate-200 dark:bg-neutral-800"
          >
            {expandido ? (
              <LuChevronLeft
                className="text-slate-500 dark:text-white"
                size={16}
              />
            ) : (
              <LuChevronRight
                className=" text-slate-500 dark:text-white"
                size={16}
              />
            )}
            {!expandido && (
              <div
                className="absolute left-full rounded-md px-2 py-1 ml-5 mt-[-25px] bg-emerald-600 
                  text-white text-sm opacity-20 -translate-x-3 transition-all 
                  invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
              >
                Expandir
              </div>
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expandido }}>
          <ul
            className={`flex flex-col gap-y-4 ${expandido ? "px-0" : "px-2"}`}
          >
            {children}
          </ul>
        </SidebarContext.Provider>

        <hr className="bg-slate-200 my-8" />

        <div className={`flex flex-col gap-y-4 ${expandido ? "px-0" : "px-2"}`}>
          <div className="flex text-slate-400 ">
            <motion.div
              initial={{ width: 50 }}
              animate={{ width: expandido ? 273 : 50 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center p-3 rounded-xl cursor-pointer 
                transition-colors group border border-transparent text-slate-400 font-medium 
                hover:border hover:border-slate-200 hover:text-emerald-600 
              dark:text-white dark:bg-neutral-800 dark:border-neutral-700"
              onClick={ativarModoEscuro}
            >
              <div className="flex items-center justify-center">
                {modoEscuro ? <LuMoon size={24} /> : <LuSun size={24} />}
              </div>
              <span
                className={`overflow-hidden whitespace-nowrap transition-all ${
                  expandido ? "w-52 ml-3" : "w-0"
                }`}
              >
                {modoEscuro ? "Tema Escuro" : "Tema Claro"}
              </span>
              {!expandido && (
                <div
                  className={`absolute left-full rounded-md px-2 py-1 ml-6 whitespace-nowrap bg-emerald-600
    text-white text-sm opacity-20 -translate-x-3 transition-all 
    invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 ${
      modoEscuro ? "font-bold" : ""
    }`}
                >
                  {modoEscuro ? "Tema Escuro" : "Tema Claro"}
                </div>
              )}
            </motion.div>
          </div>

          <div className="flex">
            <motion.div
              initial={{ width: 50 }}
              animate={{ width: expandido ? 273 : 50 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center p-3 rounded-xl cursor-pointer 
  transition-colors group border border-transparent text-slate-400 font-medium 
  hover:border hover:border-slate-200 hover:text-emerald-600 hover:bg-slate-50 
  dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
              onClick={openModal}
            >
              <span>
                <LuSettings size={24} />
              </span>
              <span
                className={`overflow-hidden whitespace-nowrap transition-all ${
                  expandido ? "w-52 ml-3" : "w-0"
                }`}
              >
                Configurações
              </span>
              {!expandido && (
                <div
                  className="absolute left-full rounded-md px-2 py-1 ml-6 whitespace-nowrap bg-emerald-600
    text-white text-sm opacity-20 -translate-x-3 transition-all 
    invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                >
                  Configurações
                </div>
              )}
            </motion.div>
          </div>

          <div className="flex">
            <motion.div
              initial={{ width: 50 }}
              animate={{ width: expandido ? 273 : 50 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center p-3 rounded-xl cursor-pointer 
  transition-colors group border border-transparent text-slate-400 font-medium 
  hover:border hover:border-slate-200 hover:text-emerald-600 hover:bg-slate-50 
  dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
              onClick={""}
            >
              <span>
                <LuLogOut size={24} />
              </span>
              <span
                className={`overflow-hidden whitespace-nowrap transition-all ${
                  expandido ? "w-52 ml-3" : "w-0"
                }`}
              >
                Sair
              </span>
              {!expandido && (
                <div
                  className="absolute left-full rounded-md px-2 py-1 ml-6 whitespace-nowrap bg-emerald-600
    text-white text-sm opacity-20 -translate-x-3 transition-all 
    invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                >
                  Sair
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-xl font-bold">Informações do Usuário</h2>
          {usuario && (
            <div>
              <p>
                <strong>Nome:</strong> {usuario.Nome}
              </p>
              <p>
                <strong>Email:</strong> {usuario.Email}
              </p>
              <p>
                <strong>Profissão:</strong> {usuario.Profissao}
              </p>
            </div>
          )}
        </Modal>
      </motion.nav>
    </div>
  );
}

export function ItemsSidebar({ icon, text, ativo, route }) {
  const { expandido } = useContext(SidebarContext);

  return (
    <Link to={route} className="flex items-center">
      <motion.li
        initial={{ width: 50 }}
        animate={{ width: expandido ? 273 : 50 }}
        transition={{ duration: 0.4 }}
        className={`relative flex items-center p-3 rounded-xl cursor-pointer transition-colors group border border-transparent ${
          ativo
            ? "border border-slate-200 text-emerald-600 font-bold bg-slate-50 dark:bg-neutral-800 dark:text-white dark:border-neutral-600"
            : "text-slate-400 font-medium hover:border hover:border-slate-200 hover:text-emerald-600 hover:bg-slate-50 dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
        }`}
      >
        <span>{icon}</span>
        <span
          className={`overflow-hidden whitespace-nowrap transition-all ${
            expandido ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {!expandido && (
          <div
            className={`absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-8 bg-emerald-600 
              text-white text-sm opacity-20 -translate-x-3 transition-all 
              invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </motion.li>
    </Link>
  );
}
