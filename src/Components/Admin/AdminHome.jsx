import React from "react";
import MainNavbar from "../Suplementares/MainNavbar";
import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import "../CSS/AnimacaoFlutuar.css";

import { FiPlusCircle } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { FaUserInjured, FaFileAlt, FaCog } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";

import { FaQuestion } from "react-icons/fa";

export default function AdminHome() {
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
      </AdminHomeSidebar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-screen pt-20 pl-[78px] justify-center items-center"
      >
        <img
          src="src\assets\Logo_Sem_fundo.png"
          alt="Logo"
          className="w-1/2 anima-flutuar"
        />

        <h1 className="mt-10 font-bold text-4xl mb-4">
          Seja bem-vindo(a) a sua tela inicial!
        </h1>
        <p>
          Sinta-se livre para abrir o menu lateral e escolher uma opção, ou
          clique no botão na parte inferior direita da tela para ver os
          tutoriais do sistema.
        </p>

        <div className="absolute flex justify-center items-center right-0 bottom-0 p-5 gap-x-2">
          <h1 className="font-extrabold text-2xl">TUTORIAIS</h1>
          <div className="rounded-full p-3 border-4 border-black">
            <FaQuestion size={20} />
          </div>
        </div>

      </section>
    </>
  );
}
