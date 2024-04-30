import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaMoon, FaSun } from "react-icons/fa";
import FancyText from "@carefully-coded/react-text-gradient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const [tipo, setTipo] = useState("password");
  const [modoEscuro, setModoEscuro] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (modoEscuro) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [modoEscuro]);

  const toggleDarkMode = () => {
    setModoEscuro(!modoEscuro);
  };

  // FUNÇÃO PARA ESCONDER OU MOSTRAR SENHA
  const esconderSenha = () => {
    if (tipo === "password") {
      setTipo("text");
    } else {
      setTipo("password");
    }
  };

  // Hook para navegação de rotas
  const usenavigate = useNavigate();

  // Hook useRef para verificar se o componente está montado
  const mounted = useRef(false);

  // Hook useEffect para carregar dados iniciais quando o componente é montado
  useEffect(() => {
    if (!mounted.current) {
      if (sessionStorage.getItem("user") != null) {
        alert("Você já está logado, redirecionando para a home");
        let acesso = sessionStorage.getItem("acess");
        switch (acesso) {
          case "1":
            usenavigate("/AdminHome");
            break;
          case "2":
            usenavigate("/fisioHome");
            break;
          case "3":
            usenavigate("/estagioHome");
            break;
          default:
            console.log("Erro no acesso!");
            break;
        }
      }
      mounted.current = true;
    }
  });
  const passarLogin = (e) => {
    e.preventDefault();
    setEmailError("");
    setSenhaError("");

    if (validaLogin()) {
      var variaveisAPI = {
        method: "GET",
      };

      fetch(`http://localhost:5173/Usuario?email=${email}`, variaveisAPI)
        .then((response) => response.json())
        .then((resultado) => {
          if (Object.keys(resultado).length === 0) {
            setEmailError("E-mail não encontrado.");
          } else {
            if (resultado[0].senha === senha) {
              sessionStorage.setItem("idClinica", resultado[0].fk_clinica);
              switch (resultado[0].tipoUsuario) {
                case "administrador":
                  sessionStorage.setItem("user", resultado[0].id);
                  sessionStorage.setItem("acess", 1);
                  usenavigate("/AdminHome");
                  break;
                case "fisioterapeuta":
                  sessionStorage.setItem("user", resultado[0].id);
                  sessionStorage.setItem("acess", 2);
                  usenavigate("/fisioHome");
                  break;
                case "estagiario":
                  sessionStorage.setItem("user", resultado[0].id);
                  sessionStorage.setItem("acess", 3);
                  break;
              }
            } else {
              setSenhaError("Senha incorreta");
            }
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const validaLogin = () => {
    let estaValido = true;
    if (email.trim() === "") {
      setEmailError("E-mail é obrigatório");
      estaValido = false;
    } else if (!isValidEmail(email)) {
      setEmailError("E-mail inválido");
      estaValido = false;
    }
    if (senha.length === 0) {
      setSenhaError("Senha é obrigatória");
      estaValido = false;
    }
    return estaValido;
  };

  const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };


  // REDIRECIONAMENTO
  const redirectCadastro = () => {
    usenavigate("/Cadastro");
  };

  const redirectCadastroCod = () => {
    usenavigate("/CadastroCod");
  };

  return (
    <>
      {/* Estrutura do formulário de cadastro */}
      <main
        className="bg-[url('src/assets/Fundo.png')] dark:bg-[url('src/assets/FundoInverso.png')] transition-all bg-cover w-screen 
        h-screen flex items-center justify-center"
      >
        <img
          src="src\assets\Logo_Sem_fundo.png"
          className="absolute w-1/12 top-0 left-0 m-5"
        ></img>
        <section className="flex w-full h-full">
          <div className="w-1/2 py-24 px-12 h-full rounded flex flex-col items-center justify-center gap-y-4">
            <div className="w-full">
              <div className="flex-col space-y-4 text-center">
                <h1 className="text-evolutiDarkBlueText font-semibold text-5xl mb-3 sm:text-nowrap dark:text-evolutiLightBlueText">
                  Bem-vindo de volta!
                </h1>
                <span className="font-medium text-2xl md:text-nowrap dark:text-white">
                  Transforme com o{" "}
                  <FancyText
                    gradient={{
                      from: "#30EED6",
                      to: "#30A8EE",
                      type: "linear",
                    }}
                    animate
                    animateDuration={1000}
                  >
                    Evoluti.
                  </FancyText>
                </span>
              </div>

              <div className="flex w-full justify-center gap-x-4">
                <div className="flex flex-col w-1/2 text-center gap-y-2">
                  <p className="mt-10 text-nowrap dark:text-white">
                    Não possui uma clínica?
                  </p>
                  <button
                    onClick={redirectCadastro}
                    className="border-2 cursor-pointer border-evolutiLightGreen text-evolutiGreen w-full h-12 rounded font-medium 
                transition-all hover:bg-evolutiLightGreen hover:text-white"
                  >
                    Cadastre sua clínica!
                  </button>
                </div>
                <div className="flex flex-col w-1/2 text-center gap-y-2">
                  <p className="mt-10 dark:text-white text-nowrap">
                    Possui um código de acesso?
                  </p>
                  <button
                    onClick={redirectCadastroCod}
                    className="border-2 cursor-pointer border-evolutiLightGreen text-evolutiGreen w-full h-12 rounded font-medium 
                transition-all hover:bg-evolutiLightGreen hover:text-white"
                  >
                    Faça o primeiro acesso!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 py-24 px-12 h-full flex flex-col items-center justify-center">
            <form
              onSubmit={passarLogin}
              className="flex flex-col w-full items-center justify-center space-y-8 md:w-2/3"
            >
              <h1 className="font-medium text-4xl text-center md:text-nowrap dark:text-white">
                Entrar
              </h1>

              {/* Input para o email */}
              <div className="w-full relative">
                <input
                  type="email"
                  placeholder="E-mail"
                  name="emailLogin"
                  id=""
                  className={`peer w-full placeholder-transparent bg-loginButtonsBackground 
                border ${
                  emailError ? "border-red-500" : "border-evolutiLightGreen"
                } placeholder-evolutiGreen 
                p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {emailError && (
                  <span className="text-red-500 text-xs mt-1">
                    {emailError}
                  </span>
                )}

                {/* Label flutuante */}
                <label
                  htmlFor="emailLogin"
                  className="absolute left-0 text-evolutiGreen text-sm -top-5 select-none pointer-events-none transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-evolutiGreen 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:pl-3.5 
                peer-focus:-top-5 peer-focus:text-sm peer-focus:pl-0 peer-focus:text-evolutiGreenDarker"
                >
                  E-mail
                </label>
              </div>

              {/* Input para a senha */}
              <div className="w-full relative">
                <div>
                  <div className="w-full relative flex">
                    <input
                      type={tipo}
                      placeholder="Insira a senha"
                      name="senhaLogin"
                      id=""
                      className={`peer w-full placeholder-transparent bg-loginButtonsBackground 
                border ${
                  senhaError ? "border-red-500" : "border-evolutiLightGreen"
                } placeholder-evolutiGreen 
                p-3.5 pr-16 rounded-lg shadow-md focus:outline-evolutiGreenDarker`}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                    {/* Mensagem de erro para a senha */}
                    <div
                      className="absolute inset-y-0 right-0 flex items-center cursor-pointer transition-all m-[1px] 
                    border-l rounded-tr-lg rounded-br-lg border-evolutiLightGreen px-3 text-evolutiGreen
                    hover:text-evolutiGreenDarker hover:bg-gray-200"
                      onClick={esconderSenha}
                    >
                      {tipo === "password" ? (
                        <IoEyeOff
                          size={24}
                          className="cursor-pointer transition-colors"
                        />
                      ) : (
                        <IoEye
                          size={24}
                          className="cursor-pointer transition-colors"
                        />
                      )}
                    </div>
                    {/* Label flutuante */}
                    <label
                      htmlFor="senhaLogin"
                      className="absolute left-0 text-evolutiGreen text-sm -top-5 select-none pointer-events-none transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-evolutiGreen 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:pl-3.5 
                peer-focus:-top-5 peer-focus:text-sm peer-focus:pl-0 peer-focus:text-evolutiGreenDarker"
                    >
                      Senha
                    </label>
                  </div>

                  {senhaError && (
                    <span className="text-red-500 text-xs mt-1">
                      {senhaError}
                    </span>
                  )}
                </div>
                <div className="flex justify-end">
                  <p
                    className="w-fit mt-4 text-xs cursor-pointer transition-all text-right md:text-nowrap 
                  hover:font-bold hover:underline dark:text-white"
                  >
                    Esqueceu a senha?
                  </p>
                </div>
              </div>

              {/* Botão para submeter o formulário */}
              <input
                type="submit"
                value="Entrar"
                className="bg-evolutiLightGreen text-white w-full h-12 rounded font-medium transition-all cursor-pointer hover:bg-evolutiGreenDarker hover:shadow-xl"
              />
            </form>
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
        </section>
      </main>
    </>
  );
}
