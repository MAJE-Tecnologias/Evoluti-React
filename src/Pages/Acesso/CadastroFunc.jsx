import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  gerarCodigo,
  fetchNextId,
  fetchProfissoes,
  enviarEmail,
  criarUsuario
} from "../../services/cadastroServices"; // Importe os serviços

import Modal from "./ModalEmail";

export default function CadastroFunc() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRG] = useState("");
  const [profissao, setProfissao] = useState("");
  const [senha, setSenha] = useState("");
  const [verificador, setVerificador] = useState("");
  const [profissoes, setProfissoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [codigoEmail, setCodigoEmail] = useState("");

  const [modoEscuro, setModoEscuro] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const verificadorRef = useRef();
  const navigate = useNavigate();
  const mounted = useRef(false);

  useEffect(() => {
    document.body.classList.toggle("dark", modoEscuro);
  }, [modoEscuro]);

  const toggleDarkMode = () => setModoEscuro(!modoEscuro);

  useEffect(() => {
    if (!mounted.current) {
      if (profissao) {
        debouncedVerificaProf();
      }
      mounted.current = true;
      fetchNextId().then(setId).catch(console.error);
      fetchProfissoes(idClinica)
        .then(setProfissoes)
        .catch(error => console.log("Erro ao buscar profissões:", error));
    }

    return () => {
      mounted.current = false;
    };
  }, [idClinica, profissao]);

  const handleModalSubmit = async (value) => {
    if (validaEmail(value)) {
      const newId = id;
      const usuarioData = {
        id: newId,
        Nome: nome,
        Email: email,
        Telefone: telefone,
        Senha: senha,
        RG: rg,
        DataNascimento: data,
        Profissao: profissao,
        Verificador: verificador,
        Genero: genero,
        stats: false,
        fk_clinica: idClinica,
      };

      try {
        await criarUsuario(usuarioData);
        alert("Cadastrado com sucesso");
        sessionStorage.setItem("idUsuario", newId);
        navigate("/FuncHome");
      } catch (error) {
        console.log("Erro ao criar usuário:", error);
      }
    }
  };

  const validaEmail = (value) => {
    if (codigoEmail === value) {
      return true;
    } else {
      alert("Código Inválido");
      return false;
    }
  };

  const debouncedVerificaProf = debounce(verificaProf, 500);

  function verificaProf() {
    const prof = profissoes.find((p) => p.profissao === profissao);
    if (prof && !prof.verificado) {
      verificadorRef.current.disabled = true;
      setVerificador("");
    } else {
      verificadorRef.current.disabled = false;
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const criarFunc = (e) => {
    e.preventDefault();
    const codigo = gerarCodigo(4);
    setCodigoEmail(codigo);
    enviarEmail(email, codigo)
      .then(() => {
        setModalMessage(
          "O e-mail foi enviado com sucesso! Por favor, insira o código recebido."
        );
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Erro ao enviar o e-mail:", error);
        setModalMessage("Erro ao enviar o e-mail.");
      });
  };

  function GerarOptions(profissoes) {
    return profissoes.map((item, index) => (
      <option key={index} value={item.profissao}>
        {item.profissao}
      </option>
    ));
  }
  return (
    <>
      <main className="bg-[url('src/assets/Fundo.png')] dark:bg-[url('src/assets/FundoInverso.png')] bg-cover transition-all w-screen h-screen flex items-center justify-center">
        <img
          src="src/assets/Logo_Sem_fundo.png"
          alt="Logo da Clínica"
          className="absolute w-1/12 top-0 left-0 m-5"
        />
        <section className="h-full w-full rounded-3xl flex items-center justify-center px-12">
          <div className="w-full rounded-3xl p-10 flex flex-col items-center">
            <form onSubmit={criarFunc}>
              <div className="flex flex-wrap flex-col w-full">
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-evolutiDarkBlueText font-medium text-4xl dark:text-evolutiLightBlueText">
                    Dados do Funcionario
                  </h1>
                  <div className="flex items-center gap-x-4">
                    <p className="text-xl font-medium dark:text-white">
                      Nome da Clínica:{" "}
                    </p>
                    <p className="dark:text-white">Placeholder</p>
                  </div>
                </div>

                <span className="w-full border border-black rounded-3xl mt-5 mb-5 dark:border-white"></span>

                <div className="flex flex-wrap flex-col w-full gap-y-10">
                  <div className="flex w-full gap-x-5 h-fit justify-evenly">
                    <div className="w-full">
                      <label
                        htmlFor="cadastroNomeAdmin"
                        className="dark:text-white"
                      >
                        Nome Completo
                      </label>
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
                      <label
                        htmlFor="cadastroEmailAdmin"
                        className="dark:text-white"
                      >
                        E-mail
                      </label>
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
                      <label
                        htmlFor="dtNascClinica"
                        className="dark:text-white"
                      >
                        Data de nascimento
                      </label>
                      <input
                        type="date"
                        name="nasc"
                        id="dtNascClinica"
                        onChange={(e) => setData(e.target.value)}
                        className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen placeholder-evolutiGreen 
                            p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cadastroProfissaoClinica"
                        className="dark:text-white"
                      >
                        Profissão
                      </label>
                      <select
                        id="cadastroProfissaoClinica"
                        name="Profissao"
                        onChange={(e) => {
                          setProfissao(e.target.value);
                          verificaProf();
                        }}
                        className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen 
                            p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker"
                      >
                        {GerarOptions(profissoes)}
                      </select>
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="cadastroVerificadorClinica"
                        className="dark:text-white"
                      >
                        Verificador
                      </label>
                      <input
                        ref={verificadorRef}
                        type="text"
                        name="Verificador"
                        id="cadastroVerificadorClinica"
                        placeholder="Digite o Verificador"
                        onChange={(e) => setVerificador(e.target.value)}
                        className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen placeholder-evolutiGreen 
                            p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                      />
                    </div>

                    <div className="flex w-full gap-x-5 h-fit justify-evenly">
                      <div>
                        <label
                          htmlFor="cadastroGeneroClinica"
                          className="dark:text-white"
                        >
                          Gênero
                        </label>
                        <select
                          id="cadastroGeneroClinica"
                          name="genero"
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
                        <label
                          htmlFor="telefoneClinica"
                          className="dark:text-white"
                        >
                          Telefone
                        </label>
                        <input
                          type="text"
                          name="telefone"
                          id="telefoneClinica"
                          placeholder="(00) 0000-0000"
                          onChange={(e) => setTelefone(e.target.value)}
                          className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen placeholder-evolutiGreen 
                            p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                        />
                      </div>
                    </div>

                    <div className="flex w-full gap-x-5 h-fit justify-evenly">
                      <div className="w-full">
                        <label
                          htmlFor="cadastroRGClinica"
                          className="dark:text-white"
                        >
                          RG
                        </label>
                        <input
                          type="text"
                          name="rg"
                          id="cadastroRGClinica"
                          placeholder="Digite o RG"
                          onChange={(e) => setRG(e.target.value)}
                          className="w-full bg-loginButtonsBackground 
                            border border-evolutiLightGreen placeholder-evolutiGreen 
                            p-3.5 rounded-lg shadow-md focus:outline-evolutiGreenDarker focus:placeholder-transparent"
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="cadastroSenhaClinica"
                          className="dark:text-white"
                        >
                          Senha
                        </label>
                        <input
                          type="password"
                          name="Senha"
                          id="cadastroSenhaClinica"
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
              </div>
            </form>
          </div>
          <button
            onClick={toggleDarkMode}
            className="fixed flex justify-center transition-all items-center top-0 right-0 m-5 font-bold bg-gray-800 text-white px-4 py-2 rounded-full shadow-md dark:bg-white dark:text-evolutiDarkBlueText"
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
        <Modal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          message={modalMessage}
          onSubmit={handleModalSubmit}
        />
      </main>
    </>
  );
}
