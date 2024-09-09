import React from "react";
import Navbar from "/src/Pages/HeroPage/Navbar";
import Hero from "/src/Pages/HeroPage/Hero";
import Servicos from "/src/Pages/HeroPage/Servicos";
import Transicao from "/src/Pages/HeroPage/Transicao";
import SobreNos from "/src/Pages/HeroPage/SobreNos";
import Footer from "/src/Pages/HeroPage/Footer";
import Proposito from "/src/Pages/HeroPage/Proposito";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className=" w-full overflow-hidden  p-4 bg-white">
        <div className="bg-evolutiDarkBlue flex justify-center items-start">
          <div className=" w-full">
            <Hero />
          </div>
        </div>

        <div className="relative bg-gradient-to-tr from-evolutiLightGreen to-evolutiDarkBlue flex justify-center items-start sm:px-8 z-10">
          <div className="w-full">
            <Servicos />
          </div>
        </div>

        <div className="relative flex justify-center items-start">
          <div className="w-full">
            <Transicao />
          </div>
        </div>

        <div className="relative flex justify-center items-start">
          <div className="w-full">
            <Proposito />
          </div>
        </div>

        <div className="bg-evolutiDarkBlue flex justify-center items-start">
          <div className=" w-full">
            <SobreNos />
          </div>
        </div>

        <div className=" flex justify-center items-start">
          <div className=" w-full">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
