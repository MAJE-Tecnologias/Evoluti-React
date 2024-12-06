import { LuHome, LuUserPlus } from "react-icons/lu";
import Sidebar, {
  ItemsSidebar,
} from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";

import { FaQuestion } from "react-icons/fa";
import NavBar from "../../Components/NavBar";

export default function OperadorHome() {
  return (
    <>
      <Sidebar>
      <ItemsSidebar
          icon={<LuHome size={24} />}
          text="Home"
          route="/OperadorHome"
          ativo
        />
        <ItemsSidebar
          icon={<LuUserPlus size={24} />}
          text="Adicionar Paciente"
          route="/OperadorAdd"
        />
      </Sidebar>

      <NavBar icon={<LuHome size={24}/>} title={"Home - Operador"}/>

      <section
        className="flex md:flex-col flex-col h-screen pl-[89px] pt-[89px] justify-center items-center transition-all 
          dark:bg-neutral-800 dark:text-white"
      >
        <img
          src="src\assets\Nova_Logo_Verde.svg"
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
