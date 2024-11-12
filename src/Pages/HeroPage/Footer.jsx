import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="Footer" className="flex md:flex-col flex-col h-fit w-full ">
      <div className="flex flex-col items-center justify-evenly pt-6 px-6 sm:flex-row">
        <img
          src="src/assets/Nova_Logo_Verde.svg"
          className="sm:w-[25vh] lg:w-[50vh]"
        ></img>
        <div className="flex flex-col justify-center w-full sm:w-fit sm:flex-row">
          <ul className="mr-6 whitespace-nowrap">
            <h1 className="font-bold text-base">
              <li>Explorar</li>
            </h1>
            <li className="mb-1">
              <a href="#Hero">Início</a>
            </li>
            <li className="mb-1">
              <a href="#Servicos">Serviços</a>
            </li>
            <li className="mb-1">
              <a href="#Proposito">Nosso propósito</a>
            </li>
            <li>
              <a href="#QuemSomos">Quem somos</a>
            </li>
          </ul>
          <hr className="border border-evolutiGreen my-4 sm:hidden" />
          <ul className="mr-6">
            <h1 className="font-bold text-base">
              <li>Termos</li>
            </h1>
            <li className="mb-1">
              <a href="">Legais</a>
            </li>
            <li>
              <a href="">Privacidade</a>
            </li>
          </ul>
          <hr className="border border-evolutiGreen my-4 sm:hidden" />
          <ul>
            <h1 className="font-bold text-base">
              <li>Contato</li>
            </h1>
            <li>
              <a href="" className="flex items-center gap-x-1 mb-1">
                <FaEnvelope /> projeto.integrador6@gmail.com
              </a>
            </li>
            <li>
              <a href="" className="flex items-center gap-x-1">
                <FaPhoneAlt /> (11) 95280-4623
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full justify-center items-center hidden sm:flex">
        <h2 className="content-none w-5/6 h-[3px] my-8 border rounded-2xl bg-evolutiGreen "></h2>
      </div>

      <div className="px-6">
        <hr className="border border-evolutiGreen my-4 sm:hidden" />

        <div className="w-full flex justify-center text-xl">
          <h2 className="flex justify-evenly text-center gap-x-16 text-evolutiGreen text-3xl">
            <a href="">
              <FaTwitter />
            </a>
            <a href="">
              <FaLinkedin />
            </a>
            <a href="">
              <FaInstagram />
            </a>
          </h2>
        </div>

        <div className=" text-center w-full py-8">
          <p>© 2023 Evoluti. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
