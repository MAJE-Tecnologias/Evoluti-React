import React from 'react'

export default function Footer() {

    return (
        <footer id="Footer" className='flex md:flex-col flex-col h-[50vh] w-full'>
            <div>
            <p alt="Logotipo"><img src="/Imagens/Logo.jpeg" class="logotipo_rodape"></img></p>
            <div>
                <ul>
                    <h1>
                        <li>Explorar</li>
                    </h1>
                    <li><a href="#home">Início</a></li>
                    <li><a href="#servicos">Serviços</a></li>
                    <li><a href="#Login">Nosso propósito</a></li>
                    <li><a href="#Sobre">Quem somos</a></li>
                </ul>
                <ul>
                    <h1>
                        <li>Termos</li>
                    </h1>
                    <li><a href="">Legais</a></li>
                    <li><a href="">Privacidade</a></li>
                </ul>
                <ul>
                    <h1>
                        <li>Contato</li>
                    </h1>
                    <li><a href=""><i class="fa-solid fa-envelope"></i> projeto.integrador6@gmail.com</a></li>
                    <li><a href=""><i class="fa-solid fa-phone"></i> (11) 95280-4623</a></li>
                </ul>
            </div>
        </div>

        <h2></h2>
        <p alt="Logotipo"><img src="/Imagens/Logo.jpeg"></img></p>
        <h2></h2>

        <div>
            <h2 ></h2>
        </div>

        <div>
            <p>© 2023 Evoluti. Todos os direitos reservados.</p>
        </div>
    
        </footer>
    )
        
}