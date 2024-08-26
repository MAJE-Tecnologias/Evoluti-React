import React from "react";

export default function Transicao() {
  return (
    <section id="Transicao" className="flex md:flex-col flex-col h-screen">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-[url('src/assets/Idoso.png')] bg-no-repeat bg-cover w-full h-full flex justify-center items-center bg-center px-14">
          <div className="border p-10 rounded-xl backdrop-blur-md">
            <h1 className="text-white text-3xl text-center">
              Possibilitando você a guiar o paciente à plenitude de uma vida
              <b className="text-white"> sem limitações</b>.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
