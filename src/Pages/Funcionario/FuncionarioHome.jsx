import { LuClipboard, LuHome } from "react-icons/lu";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";

import { FaQuestion } from "react-icons/fa";
import NavBar from "../../Components/NavBar";

export default function FuncionarioHome() {
  return (
    <>
      <Sidebar>
        <ItemsSidebar
          icon={<LuHome size={24} />}
          text="Home"
          route="/FuncHome"
          ativo
        />
        <ItemsSidebar
          icon={<LuClipboard size={24} />}
          text="Atendimentos"
          route="/FuncPaciente"
        />
      </Sidebar>

      <NavBar icon={<LuHome size={24}/>} title={"Home - Funcionário"}/>

      <section
        className="flex md:flex-col flex-col h-screen pl-[89px] pt-[89px] justify-center items-center transition-all 
            dark:bg-neutral-800 dark:text-white"
      >
        <img
          src="src\assets\Logo_Sem_fundo.png"
          alt="Logo"
          className="w-1/2 anima-flutuar"
        />

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
