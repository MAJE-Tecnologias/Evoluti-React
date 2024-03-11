import React from 'react'
import Navbar from '/src/Components/HeroPage/Navbar'
import Hero from '/src/Components/HeroPage/Hero'
import Servicos from '/src/Components/HeroPage/Servicos'
import Transicao from '/src/Components/HeroPage/Transicao'
import QuemSomos from '/src/Components/HeroPage/QuemSomos'
import SobreNos from '/src/Components/HeroPage/SobreNos'
import Footer from '/src/Components/HeroPage/Footer'

export default function Home() {

    return (
        <div className=' w-full overflow-hidden'>

        <Navbar></Navbar>

        <div className='bg-evolutiDarkBlue flex justify-center items-start'>
        <div className=' w-full'>
          <Hero/>
        </div>
      </div>

      <div className='relative bg-gradient-to-tr from-evolutiLightGreen to-evolutiDarkBlue flex justify-center items-start sm:px-16 px6 z-10'>
        
        <div className='w-full'>
        <Servicos/>
        </div>
        
    </div>

    <div className='relative flex justify-center items-start'>
        <div className='w-full'>
            <Transicao/>
        </div>
        
    </div>

    <div className='relative flex justify-center items-start'>
        <div className='w-full'>
            <QuemSomos/>
        </div>
        
    </div>

    <div className='bg-evolutiDarkBlue flex justify-center items-start'>
        <div className=' w-full'>
          <SobreNos/>
        </div>
      </div>

      <div className=' flex justify-center items-start'>
        <div className=' w-full'>
          <Footer/>
        </div>
      </div>

      </div>

    )

}
