import { useUser } from "../Contexts/UserProvider";
import React, { useEffect, useState } from "react";
import { LuMenu, LuMoon, LuSettings, LuSun, LuX } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./ModalConfig";

const NavBar = ({ title, icon, children }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(() => {
    const modoSalvo = localStorage.getItem("modoEscuro");
    return (
      modoSalvo === "true" ||
      (modoSalvo === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  const toggleMenu = () => setMenuAberto(!menuAberto);
  const usuario = useUser();

  const toggleModoEscuro = () => {
    setModoEscuro((prev) => {
      const novoModo = !prev;
      localStorage.setItem("modoEscuro", novoModo.toString());
      document.body.classList.toggle("dark", novoModo);
      return novoModo;
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark", modoEscuro);
  }, [modoEscuro]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav
      className="fixed h-[89px] w-full bg-white border-b border-slate-200 
    z-10 dark:bg-neutral-900 dark:text-white sm:pl-[121px] sm:pr-16"
    >
      <div className="h-full justify-between items-center hidden sm:flex">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="flex gap-x-4">
          <img
            className="rounded-full h-12 w-12"
            src="https://picsum.photos/48/48"
            alt="User Avatar"
          />
          {usuario && (
            <div className="flex flex-col justify-center">
              <p className="font-semibold">{usuario.Nome}</p>
              <p>{usuario.Profissao}</p>
            </div>
          )}
        </div>
      </div>

      <div className="h-full sm:hidden flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <button onClick={toggleMenu}>
          {!menuAberto && <LuMenu size={40} />}
        </button>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            className="flex fixed inset-0 bg-black bg-opacity-90 z-20 flex-col items-center justify-center sm:hidden"
            key="menu"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "tween" }}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 text-white"
            >
              <LuX size={40} />
            </button>

            <div className="flex flex-col gap-4 items-center text-white text-lg">
              {children}
            </div>

            <hr className="bg-slate-200 w-full my-8" />

            <div className="flex flex-col gap-4 items-center text-white text-lg"></div>

            <button
              onClick={toggleModoEscuro}
              className="flex items-center gap-2 text-lg font-semibold text-slate-400 p-3 rounded-xl border-transparent transition-colors border
              hover:border-slate-200 hover:text-emerald-600
              dark:text-white dark:bg-neutral-800 dark:border-neutral-700"
            >
              {modoEscuro ? <LuSun size={24} /> : <LuMoon size={24} />}
              <span>{modoEscuro ? "Tema Claro" : "Tema Escuro"}</span>
            </button>

            <div
              className="relative flex items-center p-3 rounded-xl cursor-pointer 
  transition-colors group border border-transparent text-slate-400 font-medium 
  hover:border hover:border-slate-200 hover:text-emerald-600 hover:bg-slate-50 
  dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
              onClick={openModal}
            >
              <span>
                <LuSettings size={24} />
              </span>
              <span className="overflow-hidden whitespace-nowrap transition-all">
                Configurações
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </nav>
  );
};

export default NavBar;
