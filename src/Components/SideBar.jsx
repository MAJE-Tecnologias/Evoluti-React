import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { IoMdMore, IoIosMore } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import Modal from "./Modal";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const id = sessionStorage.getItem("idUsuario");
  const [usuario, setUsuario] = useState(null);
  const [expandido, setExpandido] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
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
  }, [modoEscuro]);

  function handleCloseSidebar() {
    setExpandido(false)
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
        className="h-full fixed flex flex-col bg-evolutiGreen shadow-sm z-50 transition-colors dark:bg-gray-900"
        initial={{ width: 78 }}
        animate={{ width: expandido ? 298 : 78 }}
        transition={{ duration: 0.3 }}
        id="sidebar"
      >
        <div
          className={`p-4 pb-2 flex items-center ${
            expandido ? "justify-between" : "justify-center"
          }`}
        >
          <motion.img
            src="/src/assets/LogoBranco.png"
            className={`${expandido ? "w-32" : "w-0"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: expandido ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <div className="group">
            <button
              onClick={() => setExpandido((curr) => !curr)}
              className="p-1.5 rounded-lg"
            >
              {expandido ? (
                <IoArrowBackCircle className="text-white" size={30} />
              ) : (
                <IoArrowForwardCircle className="text-white" size={30} />
              )}
              {!expandido && (
                <div
                  className="absolute left-full rounded-md px-2 py-1 ml-5 mt-[-30px] bg-evolutiGoldenLighter 
                  text-evolutiGoldenSuperDarker text-sm opacity-20 -translate-x-3 transition-all 
                  invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
                >
                  Expandir
                </div>
              )}
            </button>
          </div>
        </div>

        <SidebarContext.Provider value={{ expandido }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="px-3 group" onClick={ativarModoEscuro}>
          <div
            className={`relative flex items-center px-3 my-3 rounded-md cursor-pointer transition-colors
            font-medium hover:bg-evolutiGoldenSuperLight hover:text-evolutiGoldenSuperDarker ${
              expandido ? "py-3" : "py-[12px]"
            }
            ${
              modoEscuro
                ? "bg-evolutiGoldenSuperLight text-evolutiGoldenSuperDarker"
                : "text-white"
            }`}
          >
            <div className="flex items-center justify-center transition-transform scale-100">
              {modoEscuro ? <FaSun size={30} /> : <FaMoon size={30} />}
            </div>
            <span
              className={`overflow-hidden whitespace-nowrap transition-all ${
                expandido ? "w-52 ml-3" : "w-0"
              }`}
            >
              {modoEscuro ? "Modo Claro" : "Modo Escuro"}
            </span>
            {!expandido && (
              <div
                className={`absolute left-full rounded-md px-2 py-1 ml-6 whitespace-nowrap bg-evolutiGoldenLighter 
                text-evolutiGoldenSuperDarker text-sm opacity-20 -translate-x-3 transition-all 
                invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 ${
                  modoEscuro ? "font-bold" : ""
                }`}
              >
                {modoEscuro ? "Modo Claro" : "Modo Escuro"}
              </div>
            )}
          </div>
        </div>

        <div
          className={`border-t flex py-3 justify-center bg-evolutiGoldenLighter ${
            !expandido ? "flex-col justify-center items-center gap-y-1" : ""
          }`}
        >
          <img
            src="https://picsum.photos/48"
            className="w-12 h-12 rounded-md border-2 border-white bg-white"
            alt="User Avatar"
          />
          <div
            className={`flex ${
              expandido ? "justify-between items-center" : "justify-center"
            } transition-all ${expandido ? "w-52 ml-3" : "w-full"}`}
          >
            {!expandido && (
              <button
                className="hover:text-white transition-all"
                onClick={openModal}
              >
                <IoIosMore size={30} />
              </button>
            )}
            {expandido && usuario && (
              <>
                <div className="leading-4 overflow-hidden">
                  <h4 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                    {usuario.Nome}
                  </h4>
                  <span className="text-sm text-gray-600">
                    {usuario.Profissao}
                  </span>
                </div>
                <button
                  className="hover:text-white transition-all"
                  onClick={openModal}
                >
                  <IoMdMore size={30} />
                </button>
              </>
            )}
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
        initial={{ width: 78 }}
        animate={{ width: expandido ? 298 : 78 }}
        transition={{ duration: 0.4 }}
        className={`relative flex items-center py-3 px-3 my-1 rounded-md cursor-pointer transition-colors group ${
          ativo
            ? "bg-gradient-to-tr from-evolutiGoldenSuperLight to-evolutiGoldenLighter text-evolutiGoldenSuperDarker font-bold"
            : "text-white font-medium hover:bg-evolutiGoldenSuperLight hover:text-evolutiGoldenSuperDarker"
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
            className={`absolute left-full whitespace-nowrap rounded-md px-2 py-1 ml-6 bg-evolutiGoldenLighter 
              text-evolutiGoldenSuperDarker text-sm opacity-20 -translate-x-3 transition-all 
              invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </motion.li>
    </Link>
  );
}
