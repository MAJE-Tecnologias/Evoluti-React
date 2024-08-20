import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { IoMdMore, IoIosMore } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from "axios"; // Import axios

const SidebarContext = createContext();

export default function AdminHomeSidebar({ children }) {
  const id = sessionStorage.getItem("idUsuario");
  const [usuario, setUsuario] = useState(null);
  const [expandido, setExpandido] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Usuario?id=${id}`);
        const respostas = response.data;
        if (respostas.length > 0) {
          const usuarioData = respostas[0];
          setUsuario({
            Nome: usuarioData.Nome,
            Email: usuarioData.Email,
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

    mediaQuery.addEventListener('change', handleChange);
    fetchUsuario();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [id]);

  useEffect(() => {
    if (modoEscuro) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [modoEscuro]);

  const ativarModoEscuro = () => {
    setModoEscuro((prevMode) => !prevMode);
  };

  return (
    <aside className="absolute h-screen w-fit">
      <nav className="h-full fixed flex flex-col bg-evolutiLightGreen shadow-sm z-20">
        <div
          className={`p-4 pb-2 flex items-center ${expandido ? "justify-between" : "justify-center"}`}
        >
          <img
            src="/src/assets/LogoBranco.png"
            className={`overflow-hidden transition-all ${expandido ? "w-32" : "w-0"}`}
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
            font-medium hover:bg-evolutiGoldenSuperLight hover:text-evolutiGoldenSuperDarker ${expandido ? "py-3" : "py-[6px]"}
            ${modoEscuro ? "bg-evolutiGoldenSuperLight text-evolutiGoldenSuperDarker" : "text-white"}`}
          >
            {modoEscuro ? <FaSun size={30} /> : <FaMoon size={30} />}
            <span className={`overflow-hidden transition-all ${expandido ? "w-52 ml-3" : "w-0"}`}>
              {modoEscuro ? "Modo Claro" : "Modo Escuro"}
            </span>
            {!expandido && (
              <div
                className={`absolute left-full rounded-md px-2 py-1 ml-6 whitespace-nowrap bg-evolutiGoldenLighter 
                text-evolutiGoldenSuperDarker text-sm opacity-20 -translate-x-3 transition-all 
                invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 ${modoEscuro ? "font-bold" : ""}`}
              >
                {modoEscuro ? "Modo Claro" : "Modo Escuro"}
              </div>
            )}
          </div>
        </div>

        <div className={`border-t flex p-3 justify-center bg-evolutiGoldenLighter ${!expandido ? "flex-col justify-center items-center gap-y-1" : ""}`}>
          <img
            src="https://picsum.photos/48"
            className="w-12 h-12 rounded-md border-2 border-white bg-white"
            alt="User Avatar"
          />
          <div
            className={`flex ${expandido ? "justify-between items-center" : "justify-center"} overflow-hidden transition-all ${expandido ? "w-52 ml-3" : "w-full"}`}
          >
            {!expandido && (
              <button className="hover:text-white transition-all">
                <IoIosMore size={30} />
              </button>
            )}
            {expandido && usuario && (
              <>
                <div className="leading-4">
                  <h4 className="font-bold">{usuario.Nome}</h4>
                  <span className="text-xs text-gray-600">{usuario.Email}</span>
                </div>
                <button className="hover:text-white transition-all">
                  <IoMdMore size={30} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function ItemsSidebar({ icon, text, ativo, route }) {
  const { expandido } = useContext(SidebarContext);

  return (
    <Link to={route} className="flex items-center">
      <li
        className={`relative flex items-center py-3 px-3 my-1 rounded-md cursor-pointer transition-colors group ${ativo
          ? "bg-gradient-to-tr from-evolutiGoldenSuperLight to-evolutiGoldenLighter text-evolutiGoldenSuperDarker font-bold"
          : "text-white font-medium hover:bg-evolutiGoldenSuperLight hover:text-evolutiGoldenSuperDarker"
          }`}
      >
        {icon}
        <span className={`overflow-hidden transition-all ${expandido ? "w-52 ml-3" : "w-0"}`}>
          {text}
        </span>
        {!expandido && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-evolutiGoldenLighter 
            text-evolutiGoldenSuperDarker text-sm opacity-20 -translate-x-3 transition-all 
            invisible group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
