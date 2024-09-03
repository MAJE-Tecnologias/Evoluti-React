import React from "react";
import FancyText from "@carefully-coded/react-text-gradient";

export default function Hero() {
  sessionStorage.setItem("acess", 0);

  return (
    <section
      id="Hero"
      className="flex md:flex-col bg-white flex-col h-fit -z-10"
    >
      <div className="relative w-full">
        <img src="src\assets\HeroNewImage.png" alt="" />
        <div className="absolute bottom-0 left-0 z-10 text-[76px] h-fit">
          <p className="">A Evolução</p>
          <p>em cada passo</p>
        </div>

        {/* <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight
        md:text-4xl lg:text-5xl text-white whitespace-nowrap">Seja bem-vindo(a) ao <FancyText
       gradient={{from: '#30EED6', to: '#30A8EE', type: 'linear'}} animate animateDuration={1000} 
       >Evoluti</FancyText>.</h1> */}

        {/* <div className='flex py-12 gap-x-8 items-center text-center md:text-justify'>
          <button className='border-2 text-white p-2 font-bold text-xl w-full overflow-hidden group relative'>
              <span className='absolute h-0 group-hover:h-full transition-all ease-out duration-300 w-full bg-white left-0 bottom-0'></span>
              <span className='relative text-white group-hover:text-black transition-all ease-out duration-300'>COMEÇAR</span>
          </button>
        </div> */}
      </div>
    </section>
  );
}
