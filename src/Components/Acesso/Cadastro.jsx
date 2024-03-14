export default function Cadastro() {
    return (
        <>
            <main className='bg-evolutiDarkBlue w-screen h-screen flex items-center justify-center'>
                <section className="bg-white w-3/5 h-3/4 rounded flex items-center justify-center   ">
                    <div className="w-1/2 h-full rounded flex flex-col items-center justify-center space-y-6">
                        <h1 className="font-bold text-3xl ">Cadastre-se</h1>
                        <input type="text" placeholder="Nome da Clinica" className="bg-cinza rounded-lg text-sm h-9 px-2"/>
                        <input type="text" placeholder="Nome da Administrador" className="bg-cinza rounded-lg text-sm h-9 px-2"/>
                        <input type="email" placeholder='Insira o email' name="" id="" className="bg-cinza rounded-lg text-sm h-9 px-2"/>
                        <input type="password" placeholder="Insira a senha" id="" className="bg-cinza rounded-lg text-sm h-9 px-2"/>
                        <input type="submit" value="Cadastrar" className="bg-[#45D496] w-32 h-12 rounded font-bold"/>
                    </div>
                    <div className="bg-gradient-to-r from-[#45D496] to-[#51F680] w-1/2 h-full rounded rounded flex flex-col items-center justify-center space-y-6">
                    <h1 className="font-bold text-3xl ">Já possuí login?</h1>
                        <p>Pronto para retomar o controle? Faça login na sua conta agora</p>
                        <input type="submit" value="Clique Aqui" className="bg-[#45D496] w-32 h-12 rounded font-bold"/>
                    </div>
                </section>
            </main>
        </>
    )
}