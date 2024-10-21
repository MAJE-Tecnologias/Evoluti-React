import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";
import { FaUserInjured } from "react-icons/fa";
import {
  LuBookPlus,
  LuHome,
  LuSettings,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";

import { FaQuestion } from "react-icons/fa";
import NavBar from "../../Components/NavBar";
import { ItemsNavBar } from "../../Components/ItemsNavBar";

export default function AdminHome() {
  return (
    <>
      <Sidebar>
        <ItemsSidebar
          icon={<LuHome size={24} />}
          text="Home"
          route={"/AdminHome"}
          ativo
        />
        <ItemsSidebar
          icon={<LuUserCheck size={24} />}
          text="Aceitar Usuários"
          route={"/AdminAceitar"}
        />
        <ItemsSidebar
          icon={<LuBookPlus size={24} />}
          text="Adicionar Profissão"
          route={"/AdminAdd"}
        />
        <ItemsSidebar
          icon={<LuUsers size={24} />}
          text="Usuários"
          route={"/AdminUsuarios"}
        />
        <ItemsSidebar
          icon={<FaUserInjured size={24} />}
          text="Pacientes"
          route={"/AdminPaciente"}
        />
      </Sidebar>
      <NavBar icon={<LuHome size={24} />} title={"Home - Admin"}>
        <ItemsNavBar
          icon={<LuHome size={24} />}
          text="Home"
          route="/AdminHome"
          ativo
        />
        <ItemsNavBar
          icon={<LuUserCheck size={24} />}
          text="Usuários"
          route="/AdminUsuarios"
        />
        <ItemsNavBar
          icon={<LuSettings size={24} />}
          text="Configurações"
          route="/AdminConfig"
        />
      </NavBar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-screen pl-[89px] pt-[89px] justify-center items-center transition-all bg-slate-100
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
