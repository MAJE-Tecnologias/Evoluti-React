// Importando os hooks e componentes necessários do React
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import FancyText from "@carefully-coded/react-text-gradient";

// Componente para o cadastro de uma nova clínica
export default function Cadastro() {
  // Declaração de estado para o email, id, emailValidacao e nome da clínica
  const [email, setEmail] = useState("");
  const [emailValidacao, setEmailValidacao] = useState([]);
  const [cnpj, setCNPJ] = useState();
  const [nome, setNome] = useState("");
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

  // Hook para navegação de rotas
  const usenavigate = useNavigate();

  // Hook useRef para verificar se o componente está montado
  const mounted = useRef(false);

  // Hook useEffect para carregar dados iniciais quando o componente é montado
  useEffect(() => {
    if (!mounted.current) {
      let variaveisAPI = {
        method: "GET",
      };
      fetch(`http://localhost:3000/Clinica?_sort=-id`, variaveisAPI)
        .then((response) => response.json())
        .then((respostas) => {
          for (let index = 0; index < respostas.length; index++) {
            setEmailValidacao((prevList) => [
              ...prevList,
              respostas[index].Email,
            ]);
          }
          setId(respostas[0].id);
        });
      mounted.current = true;
    }
  });

  // Função para criar uma nova clínica
  const criarClinica = (e) => {
    e.preventDefault();
    // Configuração da requisição POST para criar uma nova clínica
    if (validaCadastro()) {
      var variaveisAPI = {
        method: "POST",
        body: JSON.stringify({
          cnpj: cnpj, // ID da clínica
          Nome: nome, // Nome da clínica
          Email: email, // Email da clínica
        }),
      };

      fetch(`http://localhost:3000/Clinica?_sort=`, variaveisAPI) // Envia a requisição POST
        .then((response) => response.json()) // Converte a resposta em JSON
        .then(alert("Cadastrado com sucesso")) // Exibe mensagem de sucesso
        .then(usenavigate("/CadastroAdmKey")) // Redireciona para a página de cadastro de administrador
        .catch((error) => console.log("error", error)); // Trata erros
    }
  };

  // Função para validar o cadastro
  const validaCadastro = () => {
    let resultados = true;
    if (nome.length === 0 || email.length === 0 || cnpj.length === 0) {
      resultados = false;
      alert("Preencha todos os campos");
    }
    emailValidacao.forEach((valid) => {
      if (email === valid) {
        resultados = false;
        alert("Email já cadastrado");
      }
    });
    return resultados;
  };

  // Função para redirecionar para a página de login
  const redirectLogin = () => {
    usenavigate("/Login");
  };

  // Renderização do componente
  return (
    <>
      {/* Estrutura do formulário de cadastro */}
      <main className="bg-[url('src/assets/Fundo.png')] dark:bg-[url('src/assets/FundoInverso.png')] transition-all bg-cover w-screen h-screen flex items-center justify-center">
        <img
          src="src\assets\Logo_Sem_fundo.png"
          className="absolute w-1/12 top-0 left-0 m-5"
        ></img>
        <section className="flex w-full h-full">
          <div className="w-1/2 py-24 px-12 h-full rounded flex flex-col items-center justify-center gap-y-4">
            <div className="w-full md:w-4/5">
              <div className="flex-col space-y-4">
                <h1 className="text-evolutiDarkBlueText font-semibold text-5xl sm:text-nowrap dark:text-evolutiLightBlueText">
                  Seja Bem-vindo ao{" "}
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
                </h1>
                <p className="font-medium text-2xl md:text-nowrap dark:text-white">
                  Otimize sua gestão fisioterápica.
                </p>
              </div>

              <div className="flex flex-col w-full justify-center gap-y-2">
                <p className="mt-10 dark:text-white">
                  Caso já tenha uma conta,{" "}
                </p>
                {/* Formulário para redirecionar para a página de login */}
                <form onSubmit={redirectLogin} className="w-full">
                  <input
                    type="submit"
                    value="Faça login aqui!"
                    className="border-2 cursor-pointer border-evolutiLightGreen text-evolutiGreen w-full h-12 rounded font-medium 
                  transition-all hover:bg-evolutiLightGreen hover:text-white"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="w-1/2 py-24 px-12 h-full flex flex-col items-center justify-center">
            <form
              onSubmit={criarClinica}
              className="flex flex-col w-full items-center justify-center space-y-8 md:w-2/3"
            >
              <h1 className="font-medium text-4xl text-center md:text-nowrap dark:text-white">
                Cadastre sua clínica
              </h1>

              {/* Input para o nome da clínica */}
              <div className="w-full relative">
                <input
                  type="text"
                  name="nomeClinica"
                  placeholder="Nome da Clínica"
                  className="peer w-full placeholder-transparent bg-loginButtonsBackground 
                  border border-evolutiLightGreen placeholder-evolutiGreen 
                  p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                {/* Label flutuante */}
                <label
                  htmlFor="nomeClinica"
                  className="absolute left-0 text-evolutiGreen text-sm -top-5 select-none pointer-events-none transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-evolutiGreen 
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:pl-3.5 
                  peer-focus:-top-5 peer-focus:text-sm peer-focus:pl-0 peer-focus:text-evolutiGreenDarker"
                >
                  Nome da Clínica
                </label>
              </div>

              {/* Input para o CNPJ da clínica */}
              <div className="w-full relative">
                <input
                  type="number"
                  placeholder="CNPJ da Clínica"
                  name="CNPJClinica"
                  id=""
                  className="peer w-full placeholder-transparent bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder-evolutiGreen 
                p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                  value={cnpj}
                  onChange={(e) => setCNPJ(e.target.value)}
                />
                {/* Label flutuante */}
                <label
                  htmlFor="CNPJClinica"
                  className="absolute left-0 text-evolutiGreen text-sm -top-5 select-none pointer-events-none transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-evolutiGreen 
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:pl-3.5 
                  peer-focus:-top-5 peer-focus:text-sm peer-focus:pl-0 peer-focus:text-evolutiGreenDarker"
                >
                  CNPJ da Clínica
                </label>
              </div>

              {/* Input para o email da clínica */}
              <div className="w-full relative">
                <input
                  type="email"
                  placeholder="E-mail da Clínica"
                  name="emailClinica"
                  id=""
                  className="peer w-full placeholder-transparent bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder-evolutiGreen 
                p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* Label flutuante */}
                <label
                  htmlFor="emailClinica"
                  className="absolute left-0 text-evolutiGreen text-sm -top-5 select-none pointer-events-none transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-evolutiGreen 
                  peer-placeholder-shown:top-3.5 peer-placeholder-shown:pl-3.5 
                  peer-focus:-top-5 peer-focus:text-sm peer-focus:pl-0 peer-focus:text-evolutiGreenDarker"
                >
                  E-mail da Clínica
                </label>
              </div>

              <p className="text-xs underline underline-offset-2 cursor-pointer md:text-nowrap hover:font-bold dark:text-white">
                Ao criar uma conta, você concorda com os nossos Termos de Uso.
              </p>

              {/* Botão para submeter o formulário */}
              <input
                type="submit"
                value="Cadastro administrativo"
                className="bg-evolutiLightGreen text-white w-full h-12 rounded font-medium transition-all hover:bg-evolutiGreenDarker hover:shadow-xl"
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
