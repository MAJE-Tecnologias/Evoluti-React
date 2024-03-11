import Logo from "/src/assets/Logo_Sem_fundo.png";

export default function NotFound() {
    return (
        <>
            <main className='bg-#213040 w-screen h-screen flex items-center justify-center'>
                <section className="bg-white w-3/5 h-3/4 rounded flex items-center justify-center   ">
                    <div className="w-1/2 h-full rounded flex flex-col items-center justify-center space-y-6">

                        <img src={Logo} className="w-fit h-20 flex items-center py-3"></img>
                        <h1 className="font-bold text-3xl">Pagina não encontrada</h1>

                    </div>

                </section>
            </main>


        </>
    )
}