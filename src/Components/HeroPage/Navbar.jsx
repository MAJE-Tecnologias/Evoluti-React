import React from 'react'
import { useState } from 'react'
import { IoMenu, IoClose } from "react-icons/io5";
import Logo from "/src/assets/Logo_Sem_fundo.png"

export default function Navbar(){
  const [nav, setNav] = useState(false)

  const controlNav = () =>{
    setNav(!nav)
  }
  return (
    <nav className="bg-white fixed w-full flex px-20 justify-between items-center z-20 border-b-2 border-gray-400"> 
      
      <img src={Logo} className="w-fit h-20 flex items-center py-3"></img>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1 gap-x-10'>
          <li>
            <a href='#Hero'>Início</a>
          </li>

          <li>
            <a href='#Servicos'>Serviços</a>
          </li>

          <li>
            <a href='#Proposito'>Nosso Propósito</a>
          </li>

          <li>
            <a href='#SobreNos'>Sobre Nós</a>
          </li>

          <li>
            <a href='/cadastro' className='border-2 border-black rounded-md p-1'>Cadastrar</a>
          </li>

      </ul>

      <div className='block sm:hidden' onClick={controlNav}>
      {nav ?  <IoClose size={30}/> : <IoMenu size={30}/>}

    </div>

      <ul className={nav ? 'fixed left-0 top-0 w-[40%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500' : 'ease-in-out duration-500 fixed top-0 left-[-100%] h-full w-[40%]'}>
          <li className='p-4 border-b border-gray-600'>
            <a href="#Home">Início</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Programador">Serviços</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Gamedev">Nosso propósito</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Designer">Sobre nós</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Contato">Contato</a>
          </li>
      </ul>
    </nav>



    
  )
}