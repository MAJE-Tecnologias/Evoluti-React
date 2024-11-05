import React from 'react'
import { FaEnvelope, FaPhoneAlt, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {

    return (
        <footer id="Footer" className='flex md:flex-col flex-col h-[50vh] w-full'>
            <div className="flex items-center justify-evenly p-6">
            <img src="src/assets/Nova_Logo_Verde.svg" className="w-1/3"></img>
            <div className="flex justify-center">
                <ul className='mr-6 whitespace-nowrap'>
                    <h1 className='font-bold text-base'>
                        <li>Explorar</li>
                    </h1>
                    <li className='mb-1'><a href="#Hero">Início</a></li>
                    <li className='mb-1'><a href="#Servicos">Serviços</a></li>
                    <li className='mb-1'><a href="#Proposito">Nosso propósito</a></li>
                    <li><a href="#QuemSomos">Quem somos</a></li>
                </ul>
                <ul className='mr-6'>
                    <h1  className='font-bold text-base'>
                        <li>Termos</li>
                    </h1>
                    <li className='mb-1'><a href="">Legais</a></li>
                    <li><a href="">Privacidade</a></li>
                </ul>
                <ul>
                    <h1 className='font-bold text-base'>
                        <li>Contato</li>
                    </h1>
                    <li><a href="" className='flex items-center gap-x-1 mb-1'><FaEnvelope /> projeto.integrador6@gmail.com</a></li>
                    <li><a href="" className='flex items-center gap-x-1'><FaPhoneAlt /> (11) 95280-4623</a></li>
                </ul>
            </div>
        </div>

        <div className='w-full flex justify-center items-center'>
            <h2 className='content-none w-5/6 h-[3px] my-8 border rounded-2xl bg-evolutiLightGreen '></h2>
        </div>

        <div className='w-full flex justify-center text-xl'>
            <h2 className='flex justify-evenly text-center gap-x-16 text-evolutiLightGreen text-3xl'><a href=""><FaTwitter/></a><a href=""><FaLinkedin/></a><a href=""><FaInstagram/></a></h2>
        </div>

        <div className=' text-center w-full pt-8'>
            <p>© 2023 Evoluti. Todos os direitos reservados.</p>
        </div>
    
        </footer>
    )
        
}