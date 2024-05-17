import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import FancyText from "@carefully-coded/react-text-gradient";

export default function Cadastro() {
  localStorage.setItem("idClinica", null);
  const [email, setEmail] = useState("");
  const [emailValidacao, setEmailValidacao] = useState([]);
  const [cnpj, setCNPJ] = useState(""); // Changed to string
  const [nome, setNome] = useState("");
  const [modoEscuro, setModoEscuro] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const navigate = useNavigate();
  const mounted = useRef(true);

  useEffect(() => {
    document.body.classList.toggle("dark", modoEscuro);
    return () => {
      document.body.classList.remove("dark");
    };
  }, [modoEscuro]);

  const toggleDarkMode = () => {
    setModoEscuro(!modoEscuro);
  };

  useEffect(() => {
    if (mounted.current) {
      fetch(`http://localhost:3000/Clinica?_sort=-id`, { method: "GET" })
        .then((response) => response.json())
        .then((respostas) => {
          setEmailValidacao(respostas.map((resp) => resp.Email));
          if (respostas.length > 0) {
            setCNPJ(respostas[0].cnpj); // Assuming you want to set the CNPJ from the response
          }
        })
        .catch((error) => console.error("Failed to fetch data:", error));
    }
    return () => {
      mounted.current = false;
    };
  }, []); // Added empty dependency array

  const guardarIdClinica = () => {
    fetch(`http://localhost:3000/Clinica?_sort=-adicionadoEm`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((respostas) => {
        localStorage.setItem("idClinica", respostas[0].id);
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  };

  const criarClinica = (e) => {
    e.preventDefault();
    if (validaCadastro()) {
      const dataAtual = new Date().toISOString(); // Cria um timestamp ISO para o momento atual
      const variaveisAPI = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cnpj,
          nome,
          email,
          adicionadoEm: dataAtual, // Adiciona o campo createdAt ao corpo da requisição
        }),
      };

      fetch(`http://localhost:3000/Clinica`, variaveisAPI)
        .then((response) => response.json())
        .then(() => {
          alert("Cadastrado com sucesso");
          guardarIdClinica();
          navigate("/CadastroAdmKey"); // Assegure-se de que navigate está definido corretamente, geralmente deve ser: const navigate = useNavigate();
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const validaCadastro = () => {
    if (!nome || !email || !cnpj) {
      alert("Preencha todos os campos");
      return false;
    }
    if (emailValidacao.includes(email)) {
      alert("Email já cadastrado");
      return false;
    }
    return true;
  };

  const redirectLogin = () => {
    navigate("/Login");
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
