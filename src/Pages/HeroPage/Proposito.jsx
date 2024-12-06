import HomeButton from "./Components/HomeButton";

export default function Proposito2() {
  return (
    <section id="Proposito" className="h-fit md:px-4">
      <div
        className="flex flex-col relative h-fit bg-[#96C8D2] w-full gap-x-4
      md:rounded-3xl md:rounded-b-none p-5 md:flex-row md:h-[626px] md:p-10"
      >
        <img
          src="src\assets\Line.png"
          alt=""
          className="absolute left-0 top-20"
        />
        <div className="w-full flex flex-col h-full z-10 md:w-1/2">
          <p className="w-fit px-10 py-1.5 bg-evolutiDarkBlue rounded-full text-white">
            Nosso Propósito
          </p>

          <h1 className="text-3xl text-center text-evolutiDarkBlue pt-4 mt-auto pb-4 md:text-5xl md:text-left md:pt-0">
            Do tratamento para uma nova vida
          </h1>
          <p className="text-lg opacity-50 pb-4 text-center md:text-left md:pb-0">
            Nossa missão é simples: transformar o cuidado com a saúde,
            tornando-o mais humano, personalizado e eficiente.
          </p>
        </div>

        <div className="w-full flex flex-col z-10 lg:w-1/2">
          <div className="relative flex w-full h-[420px] bg-white p-4 rounded-3xl">
            <div className="w-full bg-[url('/src/assets/LegislacaoImg.jpg')] bg-cover rounded-3xl">
              <div className="absolute inset-0 bg-black opacity-30 rounded-3xl m-4"></div>
              <div
                className="flex justify-center absolute bottom-0 right-0 z-10 p-4 bg-white rounded-b-3xl w-full 
              xs:m-3 xs:pr-1 xs:pb-1 xs:rounded-tl-3xl xs:rounded-b-none xs:w-fit xs:block"
              >
                <HomeButton
                  href="/cadastro"
                  text="Saiba mais"
                  bgColor="bg-evolutiDarkBlueText"
                  hoverColor="hover:bg-evolutiDarkBlue"
                />
              </div>
              <div
                className="hidden absolute bottom-0 left-0 m-4 p-4 pr-0 mr-0 text-white xs:block"
                style={{ width: "calc(100% - 250px)" }}
              >
                <p className="text-3xl pb-2">Legislação</p>
                <p className="font-light text-sm">
                  Tratamentos seguros e dentro das conformidades.
                </p>
              </div>

              <div className="absolute bottom-12 left-0 mb-8 px-4 w-full text-white xs:hidden">
                <p className="text-3xl pb-2 text-center xs:text-left">
                  Legislação
                </p>
                <p className="font-light text-sm text-center xs:text-left">
                  Tratamentos seguros e dentro das conformidades.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <div className="py-4 border-b border-evolutiDarkBlue font-bold text-xl">
              <div className="flex justify-between">
                <p>CRM</p>
                <img src="src/assets/BlackLongArrow.svg" alt="Arrow Icon" />
              </div>
            </div>
            <div className="py-4 border-b border-evolutiDarkBlue font-bold text-xl">
              <div className="flex justify-between">
                <p>CREFITO</p>
                <img src="src/assets/BlackLongArrow.svg" alt="Arrow Icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
