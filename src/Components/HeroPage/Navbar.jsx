import React from 'react'
import { useState } from 'react'
import Logo from "/src/assets/Logo.jpeg"

export default function Navbar(){

  return (
    <nav className="fixed w-full flex py-6 px-20 justify-center items-center z-20 border-b-2"> 
      <img src={Logo} className="w-fit h-[32px] flex items-center"></img>

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

      </ul>



    </nav>
  )
}