import { LuClipboard, LuHome } from "react-icons/lu";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import "../CSS/AnimacaoFlutuar.css";

import NavBar from "../../Components/NavBar";
import { ItemsNavBar } from "../../Components/ItemsNavBar";

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

      <NavBar icon={<LuHome size={24} />} title={"Home - Funcionário"}>
        <ItemsNavBar
          icon={<LuHome size={24} />}
          text="Home"
          route="/FuncHome"
          ativo
        />
        <ItemsNavBar
          icon={<LuClipboard size={24} />}
          text="Atendimentos"
          route="/FuncPaciente"
        />
      </NavBar>

      <section
        className="flex md:flex-col flex-col h-screen pl-[89px] pt-[89px] justify-center items-center transition-all 
            dark:bg-neutral-800 dark:text-white"
      >
        <img
          src="src\assets\Nova_Logo_Verde.svg"
          alt="Logo"
          className="w-1/2 anima-flutuar"
        />

        <p>Seja Bem-vindo a sua tela inicial, funcionário!</p>
      </section>
    </>
  );
}
