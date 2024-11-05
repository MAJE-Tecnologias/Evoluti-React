import React from "react";
import Navbar from "/src/Pages/HeroPage/Components/Navbar";
import Hero from "/src/Pages/HeroPage/Hero";
import Servicos from "/src/Pages/HeroPage/Servicos";
import SobreNos from "/src/Pages/HeroPage/SobreNos";
import Footer from "/src/Pages/HeroPage/Footer";
import Proposito from "/src/Pages/HeroPage/Proposito";
import Proposito2 from "/src/Pages/HeroPage/Proposito2";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className=" w-full overflow-hidden bg-white">
        <div className="flex justify-center items-start md:p-4">
          <div className=" w-full">
            <Hero />
          </div>
        </div>

        <div className="relative flex justify-center items-start z-10">
          <div className="w-full">
            <Servicos />
          </div>
        </div>

        <div className="relative flex justify-center items-start">
          <div className="w-full">
            <Proposito />
          </div>
        </div>

        <div className="relative flex justify-center items-start">
          <div className="w-full">
            <Proposito2 />
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
