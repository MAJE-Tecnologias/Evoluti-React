import Sidebar, {
  ItemsSidebar,
} from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";
import { FaHome, FaUserPlus } from "react-icons/fa";

import { FaQuestion } from "react-icons/fa";

export default function OperadorHome() {
  return (
    <>
      <Sidebar>
      <ItemsSidebar
          icon={<FaHome size={30} />}
          text="Home"
          route="/OperadorHome"
          ativo
        />
        <ItemsSidebar
          icon={<FaUserPlus size={30} />}
          text="Adicionar Paciente"
          route="/OperadorAdd"
        />
      </Sidebar>

      <section
        className="flex md:flex-col flex-col h-screen pl-[78px] justify-center items-center transition-all 
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
