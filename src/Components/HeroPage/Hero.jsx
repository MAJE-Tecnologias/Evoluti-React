import React from 'react'
import FancyText from '@carefully-coded/react-text-gradient';

export default function Hero() {

    return (
        
<section id="Hero" className='flex md:flex-col flex-col h-screen pt-20 -z-10'>
      <div className='flex-1 flex justify-center items-center xl:pl-16 sm:pl-16 pl-6 h-full gap-x-6'>
        <div className='w-full'>
            <img src="src\assets\Logo_Sem_fundo.png" alt="" className='mb-8'/>
      <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight
       text-gray-900 md:text-4xl lg:text-5xl dark:text-white whitespace-nowrap">Seja bem-vindo(a) ao <FancyText
       gradient={{from: '#30EED6', to: '#30A8EE', type: 'linear'}} animate animateDuration={1000} 
       >Evoluti</FancyText>.</h1>

       <p className='text-justify text-white text-lg'>Analise o progresso dos seus pacientes mergulhando em gráficos e dados que revelam insights valiosos.</p>
       
        <div className='flex py-12 gap-x-8 items-center'>
          <button className='border-2 text-white p-2 font-bold text-xl w-full overflow-hidden group relative'>
              <span className='absolute h-0 group-hover:h-full transition-all ease-out duration-300 w-full bg-white left-0 bottom-0'></span>
              <span className='relative text-white group-hover:text-black transition-all ease-out duration-300'>COMEÇAR</span>
          </button>
        </div>

       </div>

       <div className='flex h-full w-full mt-auto justify-end relative'>
          <img src="src\assets\Card_Img2.png" alt="Descrição da Imagem" className='mt-auto h-full z-10 shadow-[-30px_0px_200px_0px_0] shadow-white'/>
       </div>

       
      </div>
    </section>
    )

}
