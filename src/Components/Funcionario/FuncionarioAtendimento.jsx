import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import "../CSS/AnimacaoFlutuar.css";

import { FiPlusCircle } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { FaUserInjured, FaFileAlt, FaFileUpload } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";

export default function FuncAtend() {
  // Hook para navegação de rotas
  const navigate = useNavigate();

  // Hook useRef para verificar se o componente está montado
  const mounted = useRef(false);

  // useEffect(() => {
  //   if (!mounted.current) {
  //     console.log(sessionStorage.getItem('acess'))
  //     if (sessionStorage.getItem('acess') != 1){
  //       navigate("/aba");
  //     }
  //     mounted.current = true;
  //   }
  // }, []);

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
        className="flex md:flex-col flex-col h-screen pl-[78px] justify-center items-center"
      ></section>
    </>
  );
}
