import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaDribbble } from "react-icons/fa";

export default function SobreNos() {
  return (
    <section id="SobreNos" className="flex flex-col h-full pb-8 pt-20">
      <div
        className="h-full w-full justify-center items-center px-8
            md:grid md:grid-cols-3 md:gap-y-8 md:w-full md:p-0"
      >
        <div className="flex-col justify-center items-center block pb-8 md:hidden">
          <p className="font-bold text-4xl mb-4 text-evolutiLightGreen flex-col justify-center items-center text-right xs:text-6xl">
            <span className="text-6xl xs:text-9xl">MAJE</span>
            <br /> Tecnologias
          </p>
          <p className="text-white text-justify text-lg">
            Nosso compromisso com a excelência clínica é inabalável. Trabalhamos
            em estreita colaboração com fisioterapeutas e profissionais de saúde
            para garantir que nossos métodos e recursos sejam baseados nas
            melhores práticas da área.
          </p>
        </div>
        <div className="flex justify-center items-center md:flex-col">
          <img
            src="src\assets\teste.svg"
            alt=""
            className="w-3/4 md:w-9/12 md:hidden"
          />
          <img
            src="src\assets\Juliana.png"
            alt=""
            className="w-1/2 md:w-9/12 hidden md:block"
          />
          <h1 className="hidden text-white font-bold text-center mb-4 text-2xl md:flex">
            Juliana Araujo
          </h1>
          <div
            className="flex-col text-base h-full px-8
          sm:px-16
          md:px-0"
          >
            <div className="text-center text-white mb-4 hidden md:block">
              <p>Gerente de Projetos</p>
              <p>Product Owner</p>
              <p>Designer</p>
            </div>

            <p
              className="flex flex-col gap-y-6 text-4xl justify-center  text-evolutiGolden
            sm:gap-y-12 sm:text-5xl
            md:flex md:flex-row md:gap-x-2 md:text-4xl"
            >
              <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/">
                <FaLinkedin />
              </a>
              <a href="https://github.com/RenatoAC2004">
                <FaGithub />
              </a>
              <a href="l1nk.dev/linkedinlucas">
                <FaInstagram />
              </a>
              <a href="l1nk.dev/linkedinlucas">
                <FaDribbble />
              </a>
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center md:flex-col md:hidden">
          <div
            className="flex-col text-base h-full px-8
          sm:px-16
          md:px-0"
          >
            <p
              className="flex flex-col gap-y-6 text-4xl justify-center  text-evolutiGolden
            sm:gap-y-12 sm:text-5xl"
            >
              <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/">
                <FaLinkedin />
              </a>
              <a href="https://github.com/RenatoAC2004">
                <FaGithub />
              </a>
              <a href="l1nk.dev/linkedinlucas">
                <FaInstagram />
              </a>
            </p>
          </div>
          <img
            src="src\assets\RenatoMobile.svg"
            alt=""
            className="w-3/4 md:w-9/12 md:hidden"
          />
        </div>

        <div className="hidden md:flex justify-center items-center flex-col">
          <img src="src\assets\Renato.png" alt="" className="w-9/12" />
          <h1 className="flex text-white font-bold text-center mb-4 text-2xl">
            Renato Carvalho
          </h1>
          <div className="flex-col text-base">
            <div className="text-center text-white mb-4">
              <p>Programador Front-End</p>
              <p>Designer</p>
            </div>

            <p className="flex justify-center text-4xl text-evolutiGolden gap-x-2">
              <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/">
                <FaLinkedin />
              </a>
              <a href="https://github.com/RenatoAC2004">
                <FaGithub />
              </a>
              <a href="l1nk.dev/linkedinlucas">
                <FaInstagram />
              </a>
            </p>
          </div>
        </div>
        <div className="flex-col justify-center items-center hidden md:block">
          <p className="font-bold text-5xl mb-4 text-evolutiLightGreen flex-col justify-center items-center">
            MAJE
            <br></br>
            <span className="text-evolutiLightGreen"> Tecnologias</span>
          </p>
          <p className="text-white text-center">
            Nosso compromisso com a excelência clínica é inabalável. Trabalhamos
            em estreita colaboração com fisioterapeutas e profissionais de saúde
            para garantir que nossos métodos e recursos sejam baseados nas
            melhores práticas da área.{" "}
          </p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <img
            src="src\assets\PielichInvertido.png"
            alt=""
            className="w-9/12"
          />
          <h1 className="flex text-white font-bold text-center mb-4 text-2xl">
            Eduardo Pielich
          </h1>
          <div className="flex-col text-base">
            <div className="text-center text-white mb-4">
              <p>Programador Back-End</p>
            </div>

            <p className="flex justify-center text-4xl text-evolutiGolden gap-x-2">
              <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/">
                <FaLinkedin />
              </a>
              <a href="https://github.com/RenatoAC2004">
                <FaGithub />
              </a>
              <a href="l1nk.dev/linkedinlucas">
                <FaInstagram />
              </a>
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col">
          <img src="src\assets\Bruno.png" alt="" className="w-9/12" />
          <h1 className="flex text-white font-bold text-center mb-4 text-2xl">
            Bruno Martins
          </h1>
          <div className="flex-col text-base">
            <div className="text-center text-white mb-4">
              <p>Especialista em Banco de Dados</p>
            </div>

            <p className="flex justify-center text-4xl text-evolutiGolden gap-x-2">
              <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/">
                <FaLinkedin />
              </a>
              <a href="https://github.com/RenatoAC2004">
                <FaGithub />
              </a>
              <a href="l1nk.dev/linkedinlucas">
                <FaInstagram />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
