import { useUser } from "../Contexts/UserProvider";
import React, { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = ({ title, icon, children }) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const toggleMenu = () => setMenuAberto(!menuAberto);
  const usuario = useUser();

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
          <LuMenu size={40} />
        </button>
      </div>

      <AnimatePresence>
        {menuAberto && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-20 flex flex-col items-center justify-center"
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
