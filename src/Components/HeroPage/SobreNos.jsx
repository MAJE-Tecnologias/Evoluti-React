import React from 'react'
import { FaLinkedin, FaGithub, FaInstagram, FaDribbble } from "react-icons/fa";

export default function SobreNos() {

    return (
        <section id="SobreNos" className='flex md:flex-col flex-col h-full py-8'>
            <div className='grid grid-cols-3 gap-y-8 h-full w-full justify-center items-center'>
                <div className='flex justify-center items-center flex-col'>
                    <img src="src\assets\Juliana.png" alt="" className='w-9/12'/>
                    <h1 className='flex text-white font-bold text-center mb-4 text-2xl'>Juliana Araujo</h1>
                    <div className='flex-col text-base'>

                        
                            <div className='text-center text-white mb-4'>
                                <p>Gerente de Projetos</p>
                                <p>Product Owner</p>
                                <p>Designer</p>
                            </div>

                            <p className='flex justify-center text-4xl text-evolutiGolden gap-x-2'>
                                <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/"><FaLinkedin /></a>
                                <a href="https://github.com/RenatoAC2004"><FaGithub /></a>
                                <a href="l1nk.dev/linkedinlucas"><FaInstagram/></a>
                                <a href="l1nk.dev/linkedinlucas"><FaDribbble/></a>
                            </p>

                    </div>


                </div>
                <div className='flex justify-center items-center flex-col'>

                    <img src="src\assets\Renato.png" alt="" className='w-9/12'/>
                    <h1 className='flex text-white font-bold text-center mb-4 text-2xl'>Renato Carvalho</h1>
                    <div className='flex-col text-base'>

                        
                            <div className='text-center text-white mb-4'>
                                <p>Programador Front-End</p>
                                <p>Designer</p>
                            </div>

                            <p className='flex justify-center text-4xl text-evolutiGolden gap-x-2'>
                                <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/"><FaLinkedin /></a>
                                <a href="https://github.com/RenatoAC2004"><FaGithub /></a>
                                <a href="l1nk.dev/linkedinlucas"><FaInstagram/></a>
                            </p>

                    </div>


                </div>
                <div className='flex-col justify-center items-center'>
                    <p className='font-bold text-5xl mb-4 text-evolutiLightGreen flex-col justify-center items-center'>MAJE 
                        <br></br><span className='text-evolutiLightGreen'> Tecnologias</span>
                    </p>
                    <p className='text-white text-center'>Nosso compromisso com a excelência clínica é inabalável. Trabalhamos em estreita colaboração com 
                        fisioterapeutas e profissionais de saúde para garantir que nossos métodos e recursos sejam baseados 
                        nas melhores práticas da área. </p>
                </div>
                <div className='flex justify-center items-center flex-col'>

                    <img src="src\assets\PielichInvertido.png" alt="" className='w-9/12'/>
                    <h1 className='flex text-white font-bold text-center mb-4 text-2xl'>Eduardo Pielich</h1>
                    <div className='flex-col text-base'>

                        
                            <div className='text-center text-white mb-4'>
                                <p>Programador Back-End</p>
                            </div>

                            <p className='flex justify-center text-4xl text-evolutiGolden gap-x-2'>
                                <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/"><FaLinkedin /></a>
                                <a href="https://github.com/RenatoAC2004"><FaGithub /></a>
                                <a href="l1nk.dev/linkedinlucas"><FaInstagram/></a>
                            </p>

                    </div>


                </div>

                <div className='flex justify-center items-center flex-col'>

                    <img src="src\assets\Bruno.png" alt="" className='w-9/12'/>
                    <h1 className='flex text-white font-bold text-center mb-4 text-2xl'>Bruno Martins</h1>
                    <div className='flex-col text-base'>

                        
                            <div className='text-center text-white mb-4'>
                                <p>Especialista em Banco de Dados</p>
                            </div>

                            <p className='flex justify-center text-4xl text-evolutiGolden gap-x-2'>
                                <a href="https://www.linkedin.com/in/carolina-pavan-570a0a215/"><FaLinkedin /></a>
                                <a href="https://github.com/RenatoAC2004"><FaGithub /></a>
                                <a href="l1nk.dev/linkedinlucas"><FaInstagram/></a>
                            </p>

                    </div>


                </div>


            </div>
        </section>
    )
        
}