import { useState } from "react";
import { FaArrowCircleLeft, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import darkModeButton from "../../Components/darkModeButton";
import { verificarCodigo } from "../../services/authServices";

export default function CadastroCod() {
  const usenavigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const [modoEscuro, toggleDarkMode] = darkModeButton();

  const verificaCodigo = async (event) => {
    event.preventDefault();
    try {
      await verificarCodigo(codigo, navigate);
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
    }
  }

  const redirectLogin = () => {
    usenavigate("/Login");
  };

  return (
    <>
      <main
        className="bg-[url('src/assets/Fundo.png')] dark:bg-[url('src/assets/FundoInverso.png')] transition-all bg-cover w-screen 
        h-screen flex items-center justify-center"
      >
        <img
          src="src/assets/Logo_Sem_fundo.png"
          className="absolute w-1/12 top-0 left-0 m-5"
          alt="Logo"
        ></img>
        <section className="flex w-full h-full">
          <div className="w-full py-24 px-12 h-full rounded flex flex-col items-center justify-center gap-y-4">
            <div className="w-1/2 text-center">
              <form onSubmit={verificaCodigo}>
                <p className="mb-20 font-bold text-3xl text-evolutiGreen dark:text-evolutiLightGreen">
                  Insira o código de acesso
                </p>
                <input
                  type="text"
                  onChange={(e) => setCodigo(e.target.value)}
                  className="peer w-full placeholder-transparent bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder-evolutiGreen 
                p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                />

                <input
                  type="submit"
                  value={"Enviar"}
                  className="mt-20 border-2 cursor-pointer border-evolutiLightGreen text-evolutiGreen w-1/2 h-12 rounded font-medium 
                transition-all hover:bg-evolutiLightGreen hover:text-white"
                />
              </form>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className="fixed flex justify-center transition-all items-center top-0 right-0 m-5 font-bold 
            bg-gray-800 text-white px-4 py-2 rounded-full shadow-md dark:bg-white dark:text-evolutiDarkBlueText"
          >
            {modoEscuro ? (
              <>
                <FaSun className="mr-2" /> Modo Claro
              </>
            ) : (
              <>
                <FaMoon className="mr-2" /> Modo Escuro
              </>
            )}
          </button>

          <button
            onClick={redirectLogin}
            className="fixed flex justify-center transition-all items-center bottom-0 left-0 m-5 font-bold 
            bg-gray-800 text-white px-4 py-2 rounded-full shadow-md dark:bg-white dark:text-evolutiDarkBlueText"
          >
            <FaArrowCircleLeft className="mr-2" />Voltar
          </button>
        </section>
      </main>
    </>
  );
}
