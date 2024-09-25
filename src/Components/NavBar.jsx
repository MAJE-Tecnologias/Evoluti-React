import React from "react";
import { useUser } from "../Contexts/UserProvider";

const NavBar = ({ title, icon }) => {
  const usuario = useUser();

  return (
    <nav className="fixed h-[89px] w-full bg-white border-b border-slate-200 
    pl-[121px] pr-16 z-10 dark:bg-neutral-900 dark:text-white">
      <div className="h-full flex justify-between items-center">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="flex gap-x-4">
          <img
            className="rounded-full h-12 w-12"
            src="https://picsum.photos/48/48"
            alt="User Avatar"
          />
          {usuario && (
            <div className="flex flex-col justify-center">
              <p className="font-semibold">{usuario.Nome}</p>
              <p>{usuario.Profissao}</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
