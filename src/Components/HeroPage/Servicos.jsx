import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import "./swiperStyle.css"

export default function Servicos() {

    return (
        <section id="Servicos" className='flex md:flex-col flex-col h-screen pt-20'>
            <div className='flex flex-col items-center px-6 py-6 h-full'>

            <h1 className="mb-4 text-3xl font-normal leading-none tracking-tight
             md:text-3xl  dark:text-white text-white text-center"><b className='text-white'>Serviços</b> que oferecem o 
             <b className='text-white'> melhor ecossistema</b> para o seu dia-a-dia</h1>

            <div className='h-full w-full'>
            <Swiper 
            spaceBetween={30} 
            centeredSlides={true} 
            slidesPerView={1}
            grabCursor={true}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="shadow-2xl"
            >
                <SwiperSlide>
                    <div><b><p>Prontuário Eletrônico</p></b></div>
                    <div>
                    <p>Nosso software de evolução fisioterapêutica prioriza a organização e o acesso rápido às informações clínicas. 
                        Os prontuários eletrônicos fornecem uma solução digital e segura para armazenar e gerenciar todas as 
                        informações essenciais do paciente.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div><b><p>Marcação de pontos de dor</p></b></div>
                    <div>
                    <p>Nossa plataforma oferece uma ferramenta de marcação de pontos de dor, permitindo que os fisioterapeutas
                         registrem com precisão a localização e a intensidade da dor dos pacientes.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div><b><p>Documentação</p></b></div>
                    <div>
                    <p>Os fisioterapeutas podem registrar o progresso do paciente, anotar observações importantes, 
                        detalhar os exercícios recomendados e acompanhar as respostas aos tratamentos.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                <div><b><p>Relatórios</p></b></div>
                    <div>
                    <p>Nossos relatórios são projetados para serem claros e informativos, contribuindo para uma 
                        melhor tomada de decisões clínicas e uma experiência mais envolvente para os pacientes.</p>
                    </div>
                </SwiperSlide>
            </Swiper>
            </div>

            </div>
        </section>
    )

}