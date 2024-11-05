import HomeButton from "./Components/HomeButton";

export default function Proposito2() {
  return (
    <section id="Proposito" className="h-fit md:px-4">
      <div className="flex relative h-[626px] bg-[#96C8D2] w-full md:rounded-3xl md:rounded-b-none p-10">
        <img
          src="src\assets\Line.png"
          alt=""
          className="absolute left-0 top-20"
        />
        <div className="flex flex-col h-full w-1/2">
          <p className="w-fit px-10 py-1.5 bg-evolutiDarkBlue rounded-full text-white">
            Nosso Propósito
          </p>

          <h1 className="text-5xl text-evolutiDarkBlue mt-auto pb-4">
            Do tratamento para uma nova vida
          </h1>
          <p className="text-lg opacity-50">
            Nossa missão é simples: transformar o cuidado com a saúde,
            tornando-o mais humano, personalizado e eficiente.
          </p>
        </div>

        <div className="w-1/2 flex flex-col z-10">
          <div className="relative flex w-full h-[420px] bg-white p-4 rounded-3xl">
            <div className="absolute bottom-0 right-0 z-10 m-4">
              <HomeButton
                href="/cadastro"
                text="Saiba mais"
                bgColor="bg-evolutiDarkBlueText"
                hoverColor="hover:bg-evolutiDarkBlue"
              />
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
