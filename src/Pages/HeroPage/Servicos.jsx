import { LuClipboardList, LuHeartPulse, LuLock } from "react-icons/lu";
import HomeButton from "./Components/HomeButton";

export default function Servicos() {
  return (
    <section
      id="Servicos"
      className="flex h-full py-16 md:px-8 md:h-fit"
    >
      <div className="w-full h-fit flex flex-col gap-x-11 gap-y-4 md:gap-y-0 md:flex-row">
        <div
          className="w-[calc(100vw-24px)] h-[calc(100vw-24px)] bg-gradient-to-b from-[#4794a479] to-[#658E96] 
        rounded-3xl mt-auto self-center ss:w-[75vw] ss:h-[75vw] md:h-[70vh] md:w-[70vh]"
        ><img src="src\assets\ServicesImageTest.png" alt="" className="w-full h-full"/></div>
        <div className="flex flex-col w-full mt-auto px-4 md:px-0 md:w-7/12">
          <h1 className="font-medium text-4xl pb-4 text-center md:text-left md:text-5xl">
            Serviços que transformam seu dia a dia
          </h1>
          <p className="pb-10 text-lg text-justify">
            Com o Evoluti, oferecemos flexibilidade total para profissionais da
            saúde. Nossa plataforma permite que o administrador crie profissões
            em diversas áreas de atuação, adaptando-se às necessidades de cada
            equipe.
          </p>
          <HomeButton
            href="/cadastro"
            text="Começar"
            bgColor="bg-evolutiDarkBlueText"
            hoverColor="hover:bg-evolutiDarkBlue"
          />
          <div className="flex flex-col gap-y-5 pt-10 sm:px-2 md:gap-y-0 md:gap-x-5 md:flex-row">
            <div
              className="flex flex-col gap-y-4 w-full h-auto rounded-3xl border drop-shadow-xl p-6 group 
              hover:bg-evolutiDarkBlue hover:text-white transition-all hover:scale-105"
            >
              <div
                className="flex justify-center items-center rounded-full w-fit p-2.5 bg-black 
              group-hover:bg-white"
              >
                <LuLock className="text-white group-hover:text-evolutiDarkBlue" />
              </div>

              <div>
                <p className="font-bold pb-1">Prontuário Eletrônico</p>
                <p>
                  Simplifique o acesso e organização das informações clínicas.
                </p>
              </div>
            </div>
            <div
              className="flex flex-col gap-y-4 w-full h-auto rounded-3xl border drop-shadow-xl p-6 group 
              hover:bg-evolutiDarkBlue hover:text-white transition-all hover:scale-105"
            >
              <div
                className="flex justify-center items-center rounded-full w-fit p-2.5 bg-black
              group-hover:bg-white"
              >
                <LuHeartPulse className="text-white group-hover:text-evolutiDarkBlue" />
              </div>

              <div>
                <p className="font-bold pb-1">Questionários</p>
                <p>Avalie a dor do paciente de forma precisa.</p>
              </div>
            </div>
            <div
              className="flex flex-col gap-y-4 w-full h-auto rounded-3xl border drop-shadow-xl p-6 group 
              hover:bg-evolutiDarkBlue hover:text-white transition-all hover:scale-105"
            >
              <div
                className="flex justify-center items-center rounded-full w-fit p-2.5 bg-black
              group-hover:bg-white"
              >
                <LuClipboardList className="text-white group-hover:text-evolutiDarkBlue" />
              </div>

              <div>
                <p className="font-bold pb-1">Relatórios</p>
                <p>Transforme os questionários em insights claros.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
