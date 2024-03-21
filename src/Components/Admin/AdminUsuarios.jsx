import MainNavbar from "../Suplementares/MainNavbar";
import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import "../CSS/AnimacaoFlutuar.css";

import { FiPlusCircle } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { FaUserInjured, FaFileAlt, FaSearch } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { useState } from "react";

export default function AdminHome() {
  const [tipoUsuario, setTipoUsuario] = useState("tudo");

  const mudarTipoUsuario = (tipo) => {
    setTipoUsuario(tipo);
  };
  return (
    <>
      <MainNavbar></MainNavbar>

      <AdminHomeSidebar>
        <ItemsSidebar
          icon={<FiPlusCircle size={30} />}
          text="Cadastros"
          alert
        />
        <ItemsSidebar icon={<FaUsers size={30} />} text="Usuários" ativo />
        <ItemsSidebar icon={<FaUserInjured size={30} />} text="Pacientes" />
        <ItemsSidebar icon={<FaFileAlt size={30} />} text="Documentos" />
        <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
        <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
      </AdminHomeSidebar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-screen pt-20 pl-[78px] items-center dark:bg-neutral-800"
      >
        <div>
          <h1 className="flex justify-center items-center gap-x-2 text-4xl font-extrabold text-evolutiLightGreen pt-10">
            <FaUsers size={40} /> Visualização de Usuários
          </h1>

          <div className="flex mt-10 bg-white rounded-2xl shadow-lg">
            <button
              className={`py-2 px-16 rounded-l-2xl transition-all hover:bg-evolutiLightGreen hover:font-bold dark:hover:text-white ${
                tipoUsuario === "tudo"
                  ? "bg-evolutiLightGreen font-bold dark:text-white"
                  : ""
              }`}
              onClick={() => mudarTipoUsuario("tudo")}
            >
              Tudo
            </button>
            <button
              className={`py-2 px-16 transition-all hover:bg-evolutiLightGreen hover:font-bold dark:hover:text-white ${
                tipoUsuario === "administrador"
                  ? "bg-evolutiLightGreen font-bold dark:text-white"
                  : ""
              }`}
              onClick={() => mudarTipoUsuario("administrador")}
            >
              Administrador
            </button>
            <button
              className={`py-2 px-16 transition-all hover:bg-evolutiLightGreen hover:font-bold dark:hover:text-white ${
                tipoUsuario === "fisioterapeuta"
                  ? "bg-evolutiLightGreen font-bold dark:text-white"
                  : ""
              }`}
              onClick={() => mudarTipoUsuario("fisioterapeuta")}
            >
              Fisioterapeuta
            </button>
            <button
              className={`py-2 px-16 rounded-r-2xl transition-all hover:bg-evolutiLightGreen hover:font-bold dark:hover:text-white ${
                tipoUsuario === "estagiario"
                  ? "bg-evolutiLightGreen font-bold dark:text-white"
                  : ""
              }`}
              onClick={() => mudarTipoUsuario("estagiario")}
            >
              Estagiário
            </button>
          </div>
          <div className=" flex mt-10 justify-center items-center gap-x-3 dark:text-white">
            <FaSearch size={20}/><input type="text" className="w-1/2 rounded py-1 px-4" placeholder="Pesquisar usuário"></input>
          </div>
        </div>
      </section>
    </>
  );
}
