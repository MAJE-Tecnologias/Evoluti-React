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
    <nav className="fixed w-full flex px-20 justify-between items-center z-20 border-b-2 shadow-md shadow-green-300"> 
      
      <img src={Logo} className="w-fit h-20 flex items-center py-3"></img>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1 gap-x-10'>
          <li>
            <a href='#hero'>Início</a>
          </li>

          <li>
            <a href='#servicos'>Serviços</a>
          </li>

          <li>
            <a href='#proposito'>Nosso Propósito</a>
          </li>

          <li>
            <a href='#quemSomos'>Quem somos?</a>
          </li>

          <li>
            <a href='/cadastro' className='border-2 border-black rounded-md border p-1'>Cadastrar</a>
          </li>

      </ul>

      <div className='block sm:hidden' onClick={controlNav}>
      {nav ?  <IoClose size={20}/> : <IoMenu size={20}/>}

    </div>

      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
          <li className='p-4 border-b border-gray-600'>
            <a href="#Home">Home</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Programador">Programador</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Gamedev">Game-Dev</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Designer">Designer</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Sobre">Sobre</a>
          </li>

          <li className='p-4 border-b border-gray-600'>
            <a href="#Contato">Contato</a>
          </li>
      </ul>
    </nav>



    
  )
}