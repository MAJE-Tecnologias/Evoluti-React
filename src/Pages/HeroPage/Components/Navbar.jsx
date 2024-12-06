import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Logo from "/src/assets/Nova_Logo_Branca.svg";
import { LuArrowUp } from "react-icons/lu";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const controlNav = () => {
    setNav(!nav);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }

    if (window.scrollY > 200) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`fixed h-fit py-2 w-full flex px-10 justify-between items-center text-white z-50 transition-all duration-300 md:px-12 
        ${scroll ? "bg-evolutiGreenDarker pt-2 bg-opacity-85 filter backdrop-blur" : "bg-transparent pt-0 md:pt-8"}`}
      >
        <img
          src={Logo}
          className="w-fit h-16 flex items-center py-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          alt="Logo"
        />

        <ul className="list-none sm:flex hidden justify-evenly items-center flex-1 font-light md:justify-center md:gap-x-32">
          <li>
            <a href="#Servicos" className="hover:underline">
              Serviços
            </a>
          </li>

          <li>
            <a href="#Proposito" className="hover:underline">
              Nosso propósito
            </a>
          </li>

          <li>
            <a href="#SobreNos" className="hover:underline">
              Quem somos
            </a>
          </li>
        </ul>

        <a
          href="/cadastro"
          className="border border-white rounded-3xl py-1.5 px-10 overflow-hidden group relative hidden sm:block"
        >
          <span className="absolute h-0 group-hover:h-full transition-all ease-out duration-300 w-full bg-white left-0 bottom-0"></span>
          <span className="relative text-white group-hover:text-black transition-all ease-out duration-300">
            Entrar
          </span>
        </a>

        <div
          className="block sm:hidden transition-all cursor-pointer rounded-lg border-2 border-transparent hover:border-black hover:shadow-md"
          onClick={controlNav}
        >
          {nav ? <IoClose size={24} /> : <IoMenu size={24} />}
        </div>

        <ul
          className={
            nav
              ? "fixed left-0 top-0 w-[40%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
              : "ease-in-out duration-500 fixed top-0 left-[-100%] h-full w-[40%]"
          }
        >
          <li className="p-4 border-b border-gray-600">
            <a href="#Hero">Início</a>
          </li>

          <li className="p-4 border-b border-gray-600">
            <a href="#Servicos">Serviços</a>
          </li>

          <li className="p-4 border-b border-gray-600">
            <a href="#Proposito">Nosso propósito</a>
          </li>

          <li className="p-4 border-b border-gray-600">
            <a href="#SobreNos">Sobre nós</a>
          </li>

          <li className="p-4 border-b border-gray-600">
            <a href="#Footer">Contato</a>
          </li>
        </ul>
      </nav>

      {showScrollTopButton && (
        <div className="fixed flex items-center group bottom-10 right-10 z-50">
          <button
            onClick={scrollToTop}
            className="p-6 bg-evolutiGreen text-white rounded-full shadow-md
          hover:bg-evolutiGreenDarker transition-colors"
          >
            <LuArrowUp size={30}></LuArrowUp>
          </button>
          <div className="absolute right-full mr-3 py-1 px-3 bg-evolutiGreenDarker text-white rounded-md 
          text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
            Voltar ao topo
          </div>
        </div>
      )}
    </div>
  );
}
