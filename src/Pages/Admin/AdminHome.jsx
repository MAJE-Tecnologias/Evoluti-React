import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";
import { FaUsers } from "react-icons/fa6";
import { FaUserInjured, FaFileAlt, FaUserCheck, FaHome } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";

import { FaQuestion } from "react-icons/fa";

export default function AdminHome() {
  return (
    <>
      <Sidebar>
        <ItemsSidebar
          icon={<FaHome size={30} />}
          text="Home"
          route={"/AdminHome"}
          ativo
        />
        <ItemsSidebar
          icon={<FaUserCheck size={30} />}
          text="Aceitar"
          route={"/AdminAceitar"}
        />
        <ItemsSidebar
          icon={<FaUsers size={30} />}
          text="Usuários"
          route={"/AdminUsuarios"}
        />
        <ItemsSidebar
          icon={<FaUserInjured size={30} />}
          text="Pacientes"
          route={"/AdminPaciente"}
        />
      </Sidebar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-screen pl-[78px] justify-center items-center transition-all 
        dark:bg-neutral-800 dark:text-white"
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
          Codigo de clinica: {localStorage.getItem("idClinica")}
          <br></br>
          Envie esse codio para seus funcionarios
        </p>

        <div className="absolute flex justify-center items-center right-0 bottom-0 p-5 gap-x-2">
          <h1 className="font-extrabold text-2xl">TUTORIAIS</h1>
          <div className="rounded-full p-3 border-4 border-black dark:border-white">
            <FaQuestion size={20} />
          </div>
        </div>
      </section>
    </>
  );
}
