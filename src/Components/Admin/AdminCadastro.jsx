import React, { useState } from "react";
import MainNavbar from "../Suplementares/MainNavbar";
import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import "../CSS/AnimacaoFlutuar.css";

import { FiPlusCircle } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { FaUserInjured, FaFileAlt, FaCog, FaFileUpload } from "react-icons/fa";
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
        className="flex md:flex-col flex-col h-fit pt-20 pl-[78px] justify-center items-center"
      >
        <h1 className="flex justify-center items-center gap-x-2 text-4xl font-extrabold text-evolutiLightGreen pt-10">
          <FiPlusCircle size={40} /> Cadastro de Usuários
        </h1>

        {/* Container Principal */}
        <div className="w-full h-full px-20 pt-10">
          {/* Container Forms */}
          <form>
            <div
              className="flex border-2 border-b-0 w-full h-full rounded-3xl 
          rounded-bl-none rounded-br-none shadow-black shadow-md p-5 gap-x-8"
            >
              {/* Formulário - Parte Esquerda */}
              <div className="w-1/4">
                <div className="flex justify-center">
                  <img
                    src="https://picsum.photos/300/300"
                    alt="FotoUsuario"
                    className="rounded-full mb-4"
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

                  <span id="NomeArquivo" className="text-center">
                    {selectedFile ? (
                      <>
                        <strong>Arquivo:</strong> {selectedFile.name}
                      </>
                    ) : (
                      "Nenhum arquivo selecionado"
                    )}
                  </span>

                  <span className="border-2 p-4 border-black rounded-xl mt-8 shadow-md">
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
                <div className="flex flex-col gap-y-4 mb-8">
                  {/* LINHA 1 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/2">
                      <label
                        htmlFor="NomeCompleto"
                        className="text-xl font-bold"
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
                        className="text-xl font-bold whitespace-nowrap"
                      >
                        Data de nascimento
                      </label>
                      <input
                        id="dtNasc"
                        type="date"
                        placeholder="Insira o nome completo"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                        value={nascimento}
                        onChange={(e) => setNascimento(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* FIM DA LINHA 1 */}

                  {/* LINHA 2 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/3">
                      <label htmlFor="CPF" className="text-xl font-bold">
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
                      <label htmlFor="RG" className="text-xl font-bold">
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
                      <label htmlFor="Genero" className="text-xl font-bold">
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
                      <label htmlFor="Email" className="text-xl font-bold">
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
                        className="text-xl font-bold whitespace-nowrap"
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
                      <label htmlFor="Telefone" className="text-xl font-bold">
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
                        className="text-xl font-bold whitespace-nowrap"
                      >
                        Senha
                      </label>
                      <input
                        id="Senha"
                        type="password"
                        placeholder="Crie uma senha"
                        className="w-full border rounded-md bg-white shadow py-3 px-5"
                      />
                    </div>
                  </div>
                  {/* FIM DA LINHA 2 */}
                </div>
                {/* Fim Container Contato */}

                {/* CONTAINER REGISTRO PROFISSIONAL - SÓ FICARÁ VISIVEL AO CLICAR NO BOTÃO "FISIOTERAPEUTA" */}
                <div className="flex flex-col gap-y-4 mb-8">
                  {/* LINHA 1 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/3">
                      <label htmlFor="Rua" className="text-xl font-bold">
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
                        className="text-xl font-bold whitespace-nowrap"
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
                        className="text-xl font-bold whitespace-nowrap"
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
                {/* FIM DO CONTAINER */}

                <h1 className="font-bold text-2xl border-b-2 border-evolutiGoldenSuperDarker text-evolutiGoldenDarker mb-3">
                  Endereço
                </h1>

                {/* Container Endereço */}
                <div className="flex flex-col gap-y-4 mb-8">
                  {/* LINHA 1 */}
                  <div className="flex gap-x-4">
                    <div className="w-1/3">
                      <label htmlFor="Rua" className="text-xl font-bold">
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
                        className="text-xl font-bold whitespace-nowrap"
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
                        className="text-xl font-bold whitespace-nowrap"
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
                        className="text-xl font-bold"
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
                        className="text-xl font-bold whitespace-nowrap"
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
                        className="text-xl font-bold whitespace-nowrap"
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