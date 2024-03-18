import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [senha, setSenha] = useState("")

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
      <main className="bg-evolutiDarkBlue w-screen h-screen flex items-center justify-center px-24">
        <section className="bg-white h-full w-full rounded-3xl flex items-center justify-center   ">
          <div className="w-full h-full rounded-3xl p-10 flex flex-col items-center">
            <img src="src/assets/Logo_Sem_fundo.png" alt="" className="w-1/6" />

            <div>
              <form>
                <div className="flex w-full items-center justify-center gap-x-16 mt-5">
                  <div className="flex gap-x-5">
                    <label className="font-bold">Nome Completo: </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-x-5">
                    <label className="font-bold">Nome da Clínica: </label>
                    <input type="text" />
                  </div>
                </div>

                <div className="flex w-full items-center justify-center gap-x-16 mt-5">
                  <div className="flex gap-x-5">
                    <label className="font-bold">E-mail: </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>

            <span className="w-full border bg-evolutiLightGreen rounded-3xl mt-5 mb-5"></span>

            <div className="flex w-full h-full justify-center items-center">
              <form action="" method="POST">
                <div className="flex flex-wrap flex-col w-full gap-y-5">
                  <div className="flex w-full gap-x-5 h-fit justify-between">
                    <div>
                      <label className="font-bold" htmlFor="dtNascClinica">
                        Data de nascimento
                      </label>
                      <input
                        type="date"
                        name="nasc"
                        id="dtNascClinica"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      />
                    </div>

                    <div>
                      <label
                        className="font-bold"
                        htmlFor="cadastroGeneroClinica"
                      >
                        Gênero
                      </label>
                      <select
                        id="cadastroGeneroClinica"
                        name="genero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      >
                        <option defaultValue="">Selecione o gênero</option>
                        <option value="1">Homem-Cis</option>
                        <option value="2">Mulher-Cis</option>
                        <option value="3">Homem-Trans</option>
                        <option value="4">Mulher-Trans</option>
                        <option value="5">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold" htmlFor="telefoneClinica">
                        Telefone
                      </label>
                      <input
                        type="text"
                        name="telefone"
                        id="telefoneClinica"
                        placeholder="(00) 0000-0000"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex w-full gap-x-5 h-fit justify-evenly">
                    <div className="w-full">
                      <label className="font-bold" htmlFor="cadastroRGClinica">
                        RG
                      </label>
                      <input
                        type="text"
                        name="rg"
                        id="cadastroRGClinica"
                        placeholder="Digite o RG"
                        value={rg}
                        onChange={(e) => setRG(e.target.value)}
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      />
                    </div>

                    <div className="w-full">
                      <label className="font-bold" htmlFor="cadastroCPFClinica">
                        CPF
                      </label>
                      <input
                        type="text"
                        name="cpf"
                        id="cadastroCPFClinica"
                        placeholder="Digite o CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-full"
                      />
                    </div>
                  </div>

                  <div className="flex w-full gap-x-5 h-fit justify-evenly">
                    <div className="w-full">
                      <label
                        className="font-bold"
                        htmlFor="cadastroCNPJClinica"
                      >
                        CNPJ da clínica
                      </label>
                      <input
                        type="text"
                        name="cnpj"
                        id="cadastroCNPJClinica"
                        placeholder="Digite CNPJ"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-[calc(100%)]"
                      />
                    </div>

                    <div className="w-full">
                      <label
                        className="font-bold"
                        htmlFor="cadastroEmailClinica"
                      >
                        E-mail da clínica
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="cadastroEmailClinica"
                        placeholder="Digite o E-mail"
                        className="rounded-md bg-[#D9D9D9] py-3 px-5 my-2 w-[calc(100%)]"
                      />
                    </div>
                  </div>

                  <div className="flex w-full h-fit justify-center items-center">
                    <input
                      type="submit"
                      name="botaoCadastroClinica"
                      id="btnCadastroClinica"
                      value="Cadastrar"
                      className="rounded-md bg-evolutiLightGreen py-3 px-5 my-2 w-auto font-bold"
                    ></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
