import React from "react";
import TextAnimation from "./Typewriter";

export default function Proposito() {
  return (
    <section
      id="Proposito"
      className="flex md:flex-col flex-col h-fit pt-20 lg:pb-[135px] items-end"
    >
      <div className="w-[95%] h-full bg-evolutiLightGreen rounded-tl-3xl lg:relative lg:rounded-bl-3xl">
        <div className="p-8 h-full lg:p-14 lg:pb-0">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque ac purus ut ipsum elementum consectetur at et leo.
                  Nulla sit amet rutrum tortor, eu faucibus urna. Suspendisse
                  pretium enim ac justo dignissim, nec ullamcorper felis
                  finibus. Proin lobortis sapien ac nulla dictum, sed lacinia
                  leo dictum. Fusce nec arcu nec metus pharetra lacinia. Vivamus
                  semper justo sed tellus commodo, sed aliquam felis tincidunt.
                  Aliquam vestibulum pellentesque dolor, in egestas felis semper
                  ac.
                </p>
              </div>
              <img
                src="src\assets\LogoBranco.png"
                alt=""
                className="hidden lg:block lg:p-8"
              />
            </div>
            <div className="flex mt-6">
            <div className="h-full bg-evolutiBlockLight z-20 rounded-2xl p-5 flex flex-col gap-y-14 text-justify">
              <div className="relative bg-evolutiGolden p-10 rounded-2xl text-md lg:p-6 lg:w-[250px]">
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

              <div className="relative bg-evolutiGolden p-10 rounded-2xl text-md lg:p-6 lg:w-[250px]">
                <p>
                  Oferecemos um suporte técnico contínuo e eficiente disponível
                  via telefone e WhatsApp, para garantir uma experiência
                  tranquila e resolver rapidamente quaisquer dúvidas ou
                  problemas.
                </p>
                <img
                  src="src\assets\Suporte.svg"
                  alt=""
                  className="absolute left-1/2 transform -translate-x-1/2 w-[50px]"
                />
              </div>

              <div className="relative bg-evolutiGolden p-10 rounded-2xl text-md lg:p-6 lg:w-[250px]">
                <p>
                  Nosso software é desenvolvido com total compromisso em relação
                  à proteção de dados. Seguimos rigorosamente as{" "}
                  <b>normas da LGPD </b>
                  para garantir a privacidade e a segurança das informações dos
                  nossos usuários.
                </p>
                <img
                  src="src\assets\Seguranca.svg"
                  alt=""
                  className="absolute right-0 w-[50px] lg:-bottom-4"
                />
              </div>
            </div>
              <div className="hidden h-full bg-evolutiBlockLight z-20 rounded-2xl flex-col text-justify lg:flex ml-3 w-[290px]">
                <img
                  src="src\assets\Corredor.png"
                  alt=""
                  className="absolute w-[340px]"
                />
              </div>
              </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 inline-block w-0 h-0 border-solid border-t-[400px] border-r-0 border-l-[400px] 
        border-b-0 border-l-[#eee] border-r-transparent border-t-transparent border-b-transparent z-10 lg:hidden"
        ></div>

        <div
          className="hidden lg:inline-block absolute bottom-0 right-0 z-10 w-0 h-0 border-solid border-t-0 border-r-0 border-l-[680px] 
        border-b-[680px] border-l-transparent border-r-transparent border-t-transparent border-b-[#eee]"
        ></div>
      </div>
    </section>
  );
}
