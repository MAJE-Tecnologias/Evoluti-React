import React from 'react'
import { useState } from 'react'
import { IoMenu, IoClose } from "react-icons/io5";
import Logo from "/src/assets/LogoBranco.png"

export default function Navbar(){
  const [nav, setNav] = useState(false)

  const controlNav = () =>{
    setNav(!nav)
  }
  return (
    <nav className="fixed h-32 w-full flex px-10 justify-between items-center text-white z-50 md:px-12"> 
      
      <img src={Logo} className="w-fit h-16 flex items-center py-3"></img>

      <ul className='list-none sm:flex hidden justify-center items-center flex-1 gap-x-32 font-light'>

          <li>
            <a href='#Servicos'>Serviços</a>
          </li>

          <li>
            <a href='#Proposito'>Nosso propósito</a>
          </li>

          <li>
            <a href='#SobreNos'>Quem somos</a>
          </li>

      </ul>

      <a href='/cadastro' className='border border-white rounded-3xl py-1.5 px-10 overflow-hidden group relative'>
              <span className='absolute h-0 group-hover:h-full transition-all ease-out duration-300 w-full bg-white left-0 bottom-0'></span>
              <span className='relative text-white group-hover:text-black transition-all ease-out duration-300'>Entrar</span>
          </a>

      <div className='block sm:hidden transition-all cursor-pointer rounded-lg border-2 border-transparent hover:border-black hover:shadow-md' onClick={controlNav}>
      {nav ?  <IoClose size={30}/> : <IoMenu size={30}/>}

    </div>

      <ul className={nav ? 'fixed left-0 top-0 w-[40%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500' : 'ease-in-out duration-500 fixed top-0 left-[-100%] h-full w-[40%]'}>
          <li className='p-4 border-b border-gray-600'>
            <a href="#Hero">Início</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Servicos">Serviços</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Proposito">Nosso propósito</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#SobreNos">Sobre nós</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Footer">Contato</a>
          </li>
      </ul>
    </nav>



    
  )
}