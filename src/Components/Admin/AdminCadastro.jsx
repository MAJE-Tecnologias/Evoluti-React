import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../Suplementares/MainNavbar";
import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import "../CSS/AnimacaoFlutuar.css";

import { FiPlusCircle } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { FaUserInjured, FaFileAlt, FaFileUpload } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";

export default function AdminCadastro() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRG] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [crefito, setCrefito] = useState("");
  const [emissao, setEmissao] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  const [tipoUsuario, setTipoUsuario] = useState("administrador");

  // Hook para navegação de rotas
  const usenavigate = useNavigate();

  // Hook useRef para verificar se o componente está montado
  const mounted = useRef(false);

  // useEffect(() => {
  //   if (!mounted.current) {
  //     console.log(sessionStorage.getItem("acess"));
  //     if (sessionStorage.getItem("acess") != 1) {
  //       usenavigate("/aba");
  //     }
  //     mounted.current = true;
  //   }
  // }, []);

  // Função para criar uma nova clínica
  const criarUser = (e) => {
    e.preventDefault();
    if (validaCadastro()) {
      variaveisAPI = {};
      switch (tipoUsuario) {
        case "administrador":
          var variaveisAPI = {
            method: "POST",
            body: JSON.stringify({
              nome: nome,
              nascimento: nascimento,
              cpf: cpf,
              rg: rg,
              genero: genero,
              email: email,
              user: user,
              telefone: telefone,
              senha: senha,
              tipoUsuario: tipoUsuario,
            }),
          };
          break;
        case "fisioterapeuta":
          var variaveisAPI = {
            method: "POST",
            body: JSON.stringify({
              nome: nome,
              nascimento: nascimento,
              cpf: cpf,
              rg: rg,
              genero: genero,
              email: email,
              user: user,
              telefone: telefone,
              senha: senha,
              tipoUsuario: tipoUsuario,
              crefito: crefito,
              especialidade: especialidade,
              emissao: emissao,
            }),
          };
          break;
        case "estagiario":
          var variaveisAPI = {
            method: "POST",
            body: JSON.stringify({
              nome: nome,
              nascimento: nascimento,
              cpf: cpf,
              rg: rg,
              genero: genero,
              email: email,
              user: user,
              telefone: telefone,
              senha: senha,
              tipoUsuario: tipoUsuario,
              especialidade: especialidade,
              emissao: emissao,
            }),
          };
          break;
        default:
          alert("Erro ao definir o perfil!");
      }

      fetch(`http://localhost:3000/Usuario`, variaveisAPI) // Envia a requisição POST
        .then((response) => response.json()) // Converte a resposta em JSON
        .then(alert("Cadastrado com sucesso")) // Exibe mensagem de sucesso
        .then(usenavigate("")) // Redireciona para a página de cadastro de administrador
        .catch((error) => console.log("error", error)); // Trata erros
    }
  };

  // Função para validar o cadastro
  const validaCadastro = () => {
    let resultados = true;
    if (
      nome.length === 0 ||
      email.length === 0 ||
      nascimento.length === 0 ||
      cpf.length === 0 ||
      rg.length === 0 ||
      genero.length === 0 ||
      user.length === 0 ||
      telefone.length === 0 ||
      senha.length === 0
    ) {
      resultados = false;
      alert("Preencha todos os campos");
    }
    return resultados;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const mudarTipoUsuario = (tipo) => {
    setTipoUsuario(tipo);
  };

  return (
    <>
      <MainNavbar></MainNavbar>

      <AdminHomeSidebar>
        <ItemsSidebar
          icon={<FiPlusCircle size={30} />}
          text="Cadastros"
          ativo
        />
        <ItemsSidebar icon={<FaUsers size={30} />} text="Usuários" />
        <ItemsSidebar icon={<FaUserInjured size={30} />} text="Pacientes" />
        <ItemsSidebar icon={<FaFileAlt size={30} />} text="Documentos" />
        <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
      </AdminHomeSidebar>
      <section
        id="AdminCadastro"
        className="flex md:flex-col flex-col h-fit pt-20 pl-[78px] justify-center items-center dark:bg-neutral-800 transition-all"
      >
        <h1 className="flex justify-center items-center gap-x-2 text-4xl font-extrabold text-evolutiLightGreen pt-10">
          <FiPlusCircle size={40} /> Cadastro de Usuários
        </h1>

        <div className="flex mt-10 bg-white rounded-2xl shadow-lg">
          <button
            className={`py-2 px-16 rounded-l-2xl transition-all hover:bg-evolutiLightGreen hover:font-bold dark:hover:text-white ${
              tipoUsuario === "administrador"
                ? "bg-evolutiLightGreen font-bold dark:text-white"
                : ""
            }`}
            onClick={() => mudarTipoUsuario("administrador")}
          >
            Administrador
          </button>
          <button
            className={`py-2 px-16 transition-all hover:bg-evolutiLightGreen hover:font-bold dark:hover:text-white ${
              tipoUsuario === "fisioterapeuta"
                ? "bg-evolutiLightGreen font-bold dark:text-white"
                : ""
            }`}
            onClick={() => mudarTipoUsuario("fisioterapeuta")}
          >
            Fisioterapeuta
          </button>
          <button
            className={`py-2 px-16 rounded-r-2xl transition-all hover:bg-evolutiLightGreen hover:font-bold dark:hover:text-white ${
              tipoUsuario === "estagiario"
                ? "bg-evolutiLightGreen font-bold dark:text-white"
                : ""
            }`}
            onClick={() => mudarTipoUsuario("estagiario")}
          >
            Estagiário
          </button>
        </div>

        {/* Container Principal */}
        <div className="w-full h-full px-20 pt-10">
          {/* Container Forms */}
          <form onSubmit={criarUser}>
            <div
              className="bg-neutral-100 flex border-2 border-b-0 w-full h-full rounded-3xl 
          rounded-bl-none rounded-br-none shadow-black shadow-md p-5 gap-x-8 dark:bg-neutral-900 dark:border-gray-800"
            >
              {/* Formulário - Parte Esquerda */}
              <div className="w-1/4">
                <div className="flex justify-center">
                  <img
                    src="https://picsum.photos/300/300"
                    alt="FotoUsuario"
                    className="rounded-full mb-4 border-2"
                  />
                </div>
                <div className="flex flex-col justify-center gap-y-2">
                  <label
                    htmlFor="Arquivo"
                    className="flex justify-center items-center gap-x-2 border rounded-md bg-white shadow py-3 px-5 whitespace-nowrap 
                    transition-all hover:bg-zinc-200"
                  >
                    Carregue um arquivo <FaFileUpload size={15} />
                  </label>
                  <input
                    type="file"
                    id="Arquivo"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <span
                    id="NomeArquivo"
                    className="text-center dark:text-white"
                  >
                    {selectedFile ? (
                      <>
                        <strong>Arquivo:</strong> {selectedFile.name}
                      </>
                    ) : (
                      "Nenhum arquivo selecionado"
                    )}
                  </span>

                  <span className=" bg-neutral-100 border-2 p-4 border-black rounded-xl mt-8 shadow-md dark:border-neutral-300">
                    <b>Formatos aceitos:</b> JPG, JPEG, PNG.{" "}
                  </span>
                </div>
              </div>

              {/* Formulário - Parte Direita*/}
              <div className="flex flex-col w-3/4 h-full">
                <h1 className="font-bold text-2xl border-b-2 border-evolutiGoldenSuperDarker text-evolutiGoldenDarker mb-3">
                  Dados Pessoais
                </h1>

                {/* Container Dados Pessoais */}
                <div className="flex flex-col gap-y-4 mb-8 ">
                  {/* LINHA 1 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="NomeCompleto"
                        className="text-xl font-bold dark:text-white"
                      >
                        Nome completo
                      </label>
                      <br></br>
                      <input
                        id="NomeCompleto"
                        type="text"
                        placeholder="Insira o nome completo"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="dtNasc"
                        className="text-xl font-bold whitespace-nowrap dark:text-white"
                      >
                        Data de nascimento
                      </label>
                      <input
                        id="dtNasc"
                        type="date"
                        placeholder="Insira o nome completo"
                        className="w-full border rounded-md bg-white shadow py-3 px-5 text-black"
                        value={nascimento}
                        onChange={(e) => setNascimento(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* FIM DA LINHA 1 */}

                  {/* LINHA 2 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/3">
                      <label
                        htmlFor="CPF"
                        className="text-xl font-bold dark:text-white"
                      >
                        CPF
                      </label>
                      <input
                        id="CPF"
                        type="number"
                        placeholder="123.456.789-10"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                      />
                    </div>

                    <div className="w-1/3">
                      <label
                        htmlFor="RG"
                        className="text-xl font-bold dark:text-white"
                      >
                        RG
                      </label>
                      <input
                        id="RG"
                        type="number"
                        placeholder="12.345.678-9"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                        value={rg}
                        onChange={(e) => setRG(e.target.value)}
                      />
                    </div>

                    <div className="w-1/3">
                      <label
                        htmlFor="Genero"
                        className="text-xl font-bold dark:text-white"
                      >
                        Gênero
                      </label>
                      <select
                        id="Genero"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                      >
                        <option defaultValue="">Selecione o gênero</option>
                        <option value="1">Masculino</option>
                        <option value="2">Feminino</option>
                        <option value="3">Outro</option>
                      </select>
                    </div>
                  </div>
                  {/* FIM DA LINHA 2 */}
                </div>
                {/* Fim Container Dados Pessoais */}

                <h1 className="font-bold text-2xl border-b-2 border-evolutiGoldenSuperDarker text-evolutiGoldenDarker mb-3">
                  Contato
                </h1>

                {/* Container Contato */}
                <div className="flex flex-col gap-y-4 mb-8">
                  {/* LINHA 1 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="Email"
                        className="text-xl font-bold dark:text-white"
                      >
                        E-mail
                      </label>
                      <br></br>
                      <input
                        id="Email"
                        type="email"
                        placeholder="Digite o e-mail"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="NomeUser"
                        className="text-xl font-bold whitespace-nowrap dark:text-white"
                      >
                        Nome de usuário
                      </label>
                      <input
                        id="NomeUser"
                        type="text"
                        placeholder="Crie um nome de usuário"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* FIM DA LINHA 1 */}

                  {/* LINHA 2 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="Telefone"
                        className="text-xl font-bold dark:text-white"
                      >
                        Telefone
                      </label>
                      <br></br>
                      <input
                        id="Telefone"
                        type="tel"
                        placeholder="11 3456-7890"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                      />
                    </div>

                    <div className="w-1/2">
                      <label
                        htmlFor="Senha"
                        className="text-xl font-bold whitespace-nowrap dark:text-white"
                      >
                        Senha
                      </label>
                      <input
                        id="Senha"
                        type="password"
                        placeholder="Crie uma senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                      />
                    </div>
                  </div>
                  {/* FIM DA LINHA 2 */}
                </div>
                {/* Fim Container Contato */}

                {/* CONTAINER REGISTRO PROFISSIONAL - SÓ FICARÁ VISIVEL AO CLICAR NO BOTÃO "FISIOTERAPEUTA" */}

                {tipoUsuario === "fisioterapeuta" && (
                  <>
                    <h1 className="font-bold text-2xl border-b-2 border-evolutiGoldenSuperDarker text-evolutiGoldenDarker mb-3">
                      Registro Profissional
                    </h1>

                    <div className="flex flex-col gap-y-4 mb-8">
                      {/* LINHA 1 */}
                      <div className="flex gap-x-4">
                        <div className="w-1/3">
                          <label
                            htmlFor="CREFITO"
                            className="text-xl font-bold dark:text-white"
                          >
                            CREFITO
                          </label>
                          <br></br>
                          <input
                            id="CREFITO"
                            type="text"
                            placeholder="12345678"
                            value={crefito}
                            onChange={(e) => setCrefito(e.target.value)}
                            className="w-full border rounded-md bg-white shadow py-3 px-5"
                          />
                        </div>

                        <div className="w-1/3">
                          <label
                            htmlFor="dtEmissao"
                            className="text-xl font-bold whitespace-nowrap dark:text-white"
                          >
                            Data de emissão
                          </label>
                          <input
                            id="dtEmissao"
                            type="date"
                            value={emissao}
                            onChange={(e) => setEmissao(e.target.value)}
                            className="w-full border rounded-md bg-white shadow py-3 px-5 text-black"
                          />
                        </div>

                        <div className="w-1/3">
                          <label
                            htmlFor="Especialidade"
                            className="text-xl font-bold dark:text-white"
                          >
                            Especialidade
                          </label>
                          <br></br>
                          <input
                            id="Especialidade"
                            type="text"
                            placeholder="Insira a especialidade"
                            value={especialidade}
                            onChange={(e) => setEspecialidade(e.target.value)}
                            className="w-full border rounded-md bg-white shadow py-3 px-5"
                          />
                        </div>
                      </div>
                    </div>
                    {/* FIM DA LINHA 1 */}
                  </>
                )}

                {/* FIM DO CONTAINER */}

                {/* CONTAINER REGISTRO PROFISSIONAL - SÓ FICARÁ VISIVEL AO CLICAR NO BOTÃO "ESTAGIÁRIO" */}

                {tipoUsuario === "estagiario" && (
                  <>
                    <h1 className="font-bold text-2xl border-b-2 border-evolutiGoldenSuperDarker text-evolutiGoldenDarker mb-3">
                      Registro Profissional
                    </h1>

                    <div className="flex flex-col gap-y-4 mb-8">
                      {/* LINHA 1 */}
                      <div className="flex gap-x-4">
                        <div className="w-1/3">
                          <label
                            htmlFor="instituicao"
                            className="text-xl font-bold dark:text-white"
                          >
                            Instituição
                          </label>
                          <br></br>
                          <input
                            id="instituicao"
                            type="text"
                            placeholder="12345678"
                            className="w-full border rounded-md bg-white shadow py-3 px-5"
                          />
                        </div>

                        <div className="w-1/3">
                          <label
                            htmlFor="inicioContrato"
                            className="text-xl font-bold whitespace-nowrap dark:text-white"
                          >
                            Início do contrato
                          </label>
                          <input
                            id="inicioContrato"
                            type="date"
                            className="w-full border rounded-md bg-white shadow py-3 px-5 text-black"
                          />
                        </div>

                        <div className="w-1/3">
                          <label
                            htmlFor="fimContrato"
                            className="text-xl font-bold whitespace-nowrap dark:text-white"
                          >
                            Fim do contrato
                          </label>
                          <input
                            id="fimContrato"
                            type="date"
                            className="w-full border rounded-md bg-white shadow py-3 px-5 text-black"
                          />
                        </div>
                      </div>
                    </div>
                    {/* FIM DA LINHA 1 */}
                  </>
                )}

                {/* FIM DO CONTAINER */}

                <h1 className="font-bold text-2xl border-b-2 border-evolutiGoldenSuperDarker text-evolutiGoldenDarker mb-3">
                  Endereço
                </h1>

                {/* Container Endereço */}
                <div className="flex flex-col gap-y-4 mb-8">
                  {/* LINHA 1 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/3">
                      <label
                        htmlFor="Rua"
                        className="text-xl font-bold dark:text-white"
                      >
                        Rua
                      </label>
                      <br></br>
                      <input
                        id="Rua"
                        type="text"
                        placeholder="Digite a rua"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                      />
                    </div>

                    <div className="w-1/3">
                      <label
                        htmlFor="CEP"
                        className="text-xl font-bold whitespace-nowrap dark:text-white"
                      >
                        CEP
                      </label>
                      <input
                        id="CEP"
                        type="number"
                        placeholder="Digite o CEP"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                      />
                    </div>

                    <div className="w-1/3">
                      <label
                        htmlFor="Numero"
                        className="text-xl font-bold whitespace-nowrap dark:text-white"
                      >
                        Número
                      </label>
                      <input
                        id="Numero"
                        type="number"
                        placeholder="Digite o número"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                      />
                    </div>
                  </div>
                  {/* FIM DA LINHA 1 */}

                  {/* LINHA 2 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/3">
                      <label
                        htmlFor="Complemento"
                        className="text-xl font-bold dark:text-white"
                      >
                        Complemento
                      </label>
                      <br></br>
                      <input
                        id="Complemento"
                        type="text"
                        placeholder="Digite o complemento"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                      />
                    </div>

                    <div className="w-1/3">
                      <label
                        htmlFor="Bairro"
                        className="text-xl font-bold whitespace-nowrap dark:text-white"
                      >
                        Bairro
                      </label>
                      <input
                        id="Bairro"
                        type="text"
                        placeholder="Digite o bairro"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                      />
                    </div>

                    <div className="w-1/3">
                      <label
                        htmlFor="Cidade"
                        className="text-xl font-bold whitespace-nowrap dark:text-white"
                      >
                        Cidade
                      </label>
                      <input
                        id="Cidade"
                        type="text"
                        placeholder="Digite a cidade"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                      />
                    </div>
                  </div>
                  {/* FIM DA LINHA 2 */}
                </div>
                {/* Fim Container Endereço */}

                {/* Container Botao Submit */}
                <div className="flex w-full justify-center">
                  <input
                    type="submit"
                    className="border-0 rounded-md font-bold bg-evolutiLightGreen text-white py-3 px-5 
                    shadow-sm shadow-black hover:bg-evolutiGreenDarker transition-all"
                    value="Cadastrar"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
