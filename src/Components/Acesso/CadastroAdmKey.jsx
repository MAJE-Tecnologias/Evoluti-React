import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from "axios"; // Importando o Axios

export default function CadastroAdmKey() {
  const idClinica = localStorage.getItem("idClinica");
  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRG] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const [modoEscuro, setModoEscuro] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const navigate = useNavigate();
  const mounted = useRef(false);

  useEffect(() => {
    document.body.classList.toggle("dark", modoEscuro);
  }, [modoEscuro]);

  const toggleDarkMode = () => setModoEscuro(!modoEscuro);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      // Utilizando o Axios para fazer a requisição GET
      axios.get(`http://localhost:3000/Usuario?_sort=-id`)
        .then(response => {
          if (response.data && response.data.length > 0) {
            setId(response.data[0].id);
          }
        })
        .catch(error => console.error("Erro ao buscar dados de usuário:", error));
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  const criarAdm = (e) => {
    e.preventDefault();
    if (validaCadastro()) {
      // Configurando o corpo da requisição
      const body = {
        id: parseInt(id) + 1,
        Nome: nome,
        Email: email,
        Telefone: telefone,
        Senha: senha,
        RG: rg,
        DataNascimento: data,
        fk_clinica: idClinica,
        nivelAcesso: 1
      };

      // Utilizando o Axios para fazer a requisição POST
      axios.post(`http://localhost:3000/Usuario`, body)
        .then(() => {
          alert("Cadastrado com sucesso");
          navigate("/AdminHome");
        })
        .catch(error => console.error("Erro ao cadastrar administrador:", error));
    }
  };

  const validaCadastro = () => {
    if (!nome || !email || !data || !genero || !telefone || !rg || !senha) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um endereço de e-mail válido.");
      return false;
    }
    return true;
  };

  return (
    <>
      <main className="bg-[url('src/assets/Fundo.png')] dark:bg-[url('src/assets/FundoInverso.png')] bg-cover transition-all w-screen h-screen flex items-center justify-center">
        <img src="src/assets/Logo_Sem_fundo.png" alt="Logo da Clínica" className="absolute w-1/12 top-0 left-0 m-5" />
        <section className="h-full w-full rounded-3xl flex items-center justify-center px-12">
          <div className="w-full rounded-3xl p-10 flex flex-col items-center">
            <form onSubmit={criarAdm}>
              <div className="flex flex-wrap flex-col w-full">
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-evolutiDarkBlueText font-medium text-4xl dark:text-evolutiLightBlueText">
                    Dados do Administrador
                  </h1>
                  <div className="flex items-center gap-x-4">
                    <p className="text-xl font-medium dark:text-white">Nome da Clínica: </p>
                    <p className="dark:text-white">{}</p>
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
                        onChange={(e) => setNome(e.target.value)}
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
                        onChange={(e) => setEmail(e.target.value)}
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
                      <label htmlFor="cadastroCPFClinica" className="dark:text-white">Senha</label>
                      <input
                        type="password"
                        name="cpf"
                        id="cadastroCPFClinica"
                        placeholder="Digite a sua senha"
                        onChange={(e) => setSenha(e.target.value)}
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
          <button onClick={toggleDarkMode} className="fixed flex justify-center transition-all items-center top-0 right-0 m-5 font-bold bg-gray-800 text-white px-4 py-2 rounded-full shadow-md dark:bg-white dark:text-evolutiDarkBlueText">
            {modoEscuro ? <><FaSun className="mr-2" /> Modo Claro</> : <><FaMoon className="mr-2" /> Modo Escuro</>}
          </button>
        </section>
      </main>
    </>
  );
}
