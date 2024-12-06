import React from "react";
import TextAnimation from "./Typewriter";

export default function Proposito2() {
  return (
    <section
      id="Proposito2"
      className="flex flex-col h-fit items-end pb-16 md:px-4 md:flex-col"
    >
      <div className="w-full h-full bg-evolutiDarkBlue rounded-t-none lg:relative lg:rounded-b-3xl">
        <div className="p-4 h-full sm:p-8 lg:p-14 lg:pb-0">
          <div
            className="flex flex-col h-full 
          lg:flex-row"
          >
            <div className="lg:pr-14 lg:flex lg:flex-col lg:justify-evenly">
              <div className="text-center lg:text-left">
                <TextAnimation></TextAnimation>
              </div>
              <div className="lg:flex lg:justify-center">
                <p className="text-white pt-4 text-lg text-justify">
                  O que torna nosso software único é a fusão perfeita entre a
                  experiência clínica e a tecnologia avançada. Com ele,
                  oferecemos a você a capacidade de controlar a reabilitação de
                  seus pacientes, tornando o processo mais prático e adaptado às
                  suas necessidades individuais. Tudo isso, a qualquer momento e
                  em qualquer lugar, proporcionando maior flexibilidade e
                  conveniência.
                </p>
              </div>
              <img
                src="src\assets\Nova_Logo_Branca.svg"
                alt=""
                className="hidden w-[50vw] lg:block lg:p-8"
              />
            </div>
            <div className="flex mt-6">
              <div
                className="h-full bg-[#96C8D2] z-20 rounded-2xl p-5 flex flex-col gap-y-14 text-justify
              rounded-b-none"
              >
                <div
                  className="relative bg-[#70b3c0] p-10 rounded-2xl text-md text-white
                lg:p-6 lg:w-[250px]"
                >
                  <p>
                    Prontuário eletrônico em acordo com as recomendações da
                    legislação e resolução 414/2012 do COFFITO.
                  </p>
                  <img
                    src="src\assets\Leis.svg"
                    alt=""
                    className="absolute left-0 w-[50px]"
                  />
                </div>

                <div
                  className="relative bg-[#70b3c0] p-10 rounded-2xl text-md text-white
                lg:p-6 lg:w-[250px]"
                >
                  <p>
                    Oferecemos um suporte técnico contínuo e eficiente
                    disponível via telefone e WhatsApp, para garantir uma
                    experiência tranquila e resolver rapidamente quaisquer
                    dúvidas ou problemas.
                  </p>
                  <img
                    src="src\assets\Suporte.svg"
                    alt=""
                    className="absolute left-1/2 transform -translate-x-1/2 w-[50px]"
                  />
                </div>

                <div
                  className="relative bg-[#70b3c0] p-10 rounded-2xl text-md text-white
                lg:p-6 lg:w-[250px]"
                >
                  <p>
                    Nosso software é desenvolvido com total compromisso em
                    relação à proteção de dados. Seguimos rigorosamente as{" "}
                    <b className="text-evolutiDarkBlueText">normas da LGPD </b>
                    para garantir a privacidade e a segurança das informações
                    dos nossos usuários.
                  </p>
                  <img
                    src="src\assets\Seguranca.svg"
                    alt=""
                    className="absolute right-0 w-[50px] lg:-bottom-4"
                  />
                </div>
              </div>
              <div
                className="hidden h-full bg-[#96C8D2] z-20 rounded-2xl flex-col text-justify rounded-b-none 
              lg:flex ml-3 w-[290px]"
              >
                <img
                  src="src\assets\Corredor.png"
                  alt=""
                  className="absolute bottom-0 w-[340px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
