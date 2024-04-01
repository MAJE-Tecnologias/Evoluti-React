import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

export default function CadastroAdmKey() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [id, setId] = useState();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRG] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

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
      fetch(`http://localhost:3000/Admin?_sort=-id`, variaveisAPI)
        .then((response) => response.json())
        .then((respostas) => {
          setId(respostas[0].id);
        });
      mounted.current = true;
    }
  }, []);

  const criarAdm = (e) => {
    e.preventDefault();
    // Configuração da requisição POST para criar um novo usuario
    if (validaCadastro()) {
      var variaveisAPI = {
        method: "POST",
        body: JSON.stringify({
          id: id + 1,
          Nome: nome,
          Email: email,
          Senha: senha,
          Telefone: telefone,
          Cpf: cpf,
          RG: rg,
          Genero: genero,
          fk_endereco: 1,
          fk_clinica: idClinica,
        }),
      };

      fetch(`http://localhost:3000/Clinica?_sort=`, variaveisAPI) // Envia a requisição POST
        .then((response) => response.json()) // Converte a resposta em JSON
        .then(alert("Cadastrado com sucesso")) // Exibe mensagem de sucesso
        .then(usenavigate("/CadastroAdmKey")) // Redireciona para a página de cadastro de administrador
        .catch((error) => console.log("error", error)); // Trata erros
    }
  };

  const validaCadastro = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !email || !data || !genero || !telefone || !rg || !cpf) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }

    // Verifica se o email tem um formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return false;
    }

    // Outras validações podem ser adicionadas conforme necessário

    // Retorna verdadeiro se todos os campos estiverem válidos
    return true;
  };

  return (
    <>
      <main
        className="bg-[url('src/assets/Fundo.png')] dark:bg-[url('src/assets/FundoInverso.png')] bg-cover transition-all
      w-screen h-screen flex items-center justify-center "
      >
        <img
          src="src\assets\Logo_Sem_fundo.png"
          className="absolute w-1/12 top-0 left-0 m-5"
        ></img>
        <section className=" h-full w-full rounded-3xl flex items-center justify-center px-12 ">
          <div className="w-full rounded-3xl p-10 flex flex-col items-center">
            <form action="" method="POST">
              <div className="flex flex-wrap flex-col w-full">
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-evolutiDarkBlueText font-medium text-4xl dark:text-evolutiLightBlueText">
                    Dados do Administrador
                  </h1>
                  <div className="flex items-center gap-x-4">
                    <p className="text-xl font-medium dark:text-white">Nome da Clínica: </p>
                    <p className="dark:text-white">Placeholder</p>
                  </div>
                </div>

                <span className="w-full border border-black rounded-3xl mt-5 mb-5 dark:border-white"></span>

                <div className="flex flex-wrap flex-col w-full gap-y-10">
                  <div className="flex w-full gap-x-5 h-fit justify-evenly">
                    <div className="w-full">
                      <label htmlFor="cadastroNomeAdmin" className="dark:text-white">Nome Completo</label>
                      <input
                        type="text"
                        name="nomeAdmin"
                        id="cadastroNomeAdmin"
                        placeholder="Nome completo"
                        className="w-full bg-loginButtonsBackground 
                        border border-evolutiLightGreen placeholder-evolutiGreen 
                        p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="cadastroEmailAdmin" className="dark:text-white">E-mail</label>
                      <input
                        type="email"
                        name="email"
                        id="cadastroEmailAdmin"
                        placeholder="E-mail"
                        className="w-full bg-loginButtonsBackground 
                        border border-evolutiLightGreen placeholder-evolutiGreen 
                        p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex w-full gap-x-5 h-fit justify-between">
                    <div>
                      <label htmlFor="dtNascClinica" className="dark:text-white">Data de nascimento</label>
                      <input
                        type="date"
                        name="nasc"
                        id="dtNascClinica"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="w-full bg-loginButtonsBackground 
                        border border-evolutiLightGreen placeholder-evolutiGreen 
                        p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="cadastroGeneroClinica" className="dark:text-white">Gênero</label>
                      <select
                        id="cadastroGeneroClinica"
                        name="genero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="w-full bg-loginButtonsBackground 
                        border border-evolutiLightGreen 
                        p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                      >
                        <option defaultValue="">Selecione o gênero</option>
                        <option value="1" className="text-black">
                          Homem-Cis
                        </option>
                        <option value="2" className="text-black">
                          Mulher-Cis
                        </option>
                        <option value="3" className="text-black">
                          Homem-Trans
                        </option>
                        <option value="4" className="text-black">
                          Mulher-Trans
                        </option>
                        <option value="5" className="text-black">
                          Outro
                        </option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="telefoneClinica" className="dark:text-white">Telefone</label>
                      <input
                        type="text"
                        name="telefone"
                        id="telefoneClinica"
                        placeholder="(00) 0000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="w-full bg-loginButtonsBackground 
                        border border-evolutiLightGreen placeholder-evolutiGreen 
                        p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex w-full gap-x-5 h-fit justify-evenly">
                    <div className="w-full">
                      <label htmlFor="cadastroRGClinica" className="dark:text-white">RG</label>
                      <input
                        type="text"
                        name="rg"
                        id="cadastroRGClinica"
                        placeholder="Digite o RG"
                        value={rg}
                        onChange={(e) => setRG(e.target.value)}
                        className="w-full bg-loginButtonsBackground 
                        border border-evolutiLightGreen placeholder-evolutiGreen 
                        p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="cadastroCPFClinica" className="dark:text-white">CPF</label>
                      <input
                        type="text"
                        name="cpf"
                        id="cadastroCPFClinica"
                        placeholder="Digite o CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="w-full bg-loginButtonsBackground 
                        border border-evolutiLightGreen placeholder-evolutiGreen 
                        p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex w-full h-fit justify-center items-center">
                    <input
                      type="submit"
                      name="botaoCadastroClinica"
                      id="btnCadastroClinica"
                      value="Cadastrar"
                      className="bg-evolutiLightGreen text-white w-1/3 h-12 rounded-lg font-medium cursor-pointer transition-all 
                        hover:bg-evolutiGreenDarker hover:shadow-xl"
                    ></input>
                  </div>
                </div>
              </div>
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
