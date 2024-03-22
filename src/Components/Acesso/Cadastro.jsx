// Importando os hooks e componentes necessários do React
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componente para o cadastro de uma nova clínica
export default function Cadastro() {
  // Declaração de estado para o email, id, emailValidacao e nome da clínica
  const [email, setEmail] = useState("");
  const [id, setId] = useState();
  const [emailValidacao, setEmailValidacao] = useState([]);
  const [nome, setNome] = useState("");

  // Hook para navegação de rotas
  const usenavigate = useNavigate();

  // Hook useRef para verificar se o componente está montado
  const mounted = useRef(false);

  // Hook useEffect para carregar dados iniciais quando o componente é montado
  useEffect(() => {
    if (!mounted.current) {
      console.log(sessionStorage.getItem("user"));
      if (sessionStorage.getItem("user") != "0") {
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
          id: id + 1, // ID da clínica
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
    if (nome.length === 0 || email.length === 0) {
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

  // Armazenando o ID da clínica na sessionStorage
  sessionStorage.setItem("idClinica", id + 1);

  // Renderização do componente
  return (
    <>
      {/* Estrutura do formulário de cadastro */}
      <main className="bg-evolutiDarkBlue w-screen h-screen flex items-center justify-center">
        <section className="bg-white w-3/5 h-3/4 rounded flex items-center justify-center">
          <div className="w-1/2 h-full rounded flex flex-col items-center justify-center">
            <form
              onSubmit={criarClinica}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <h1 className="font-bold text-3xl ">Cadastre-se</h1>
              {/* Input para o nome da clínica */}
              <input
                type="text"
                placeholder="Nome da Clínica"
                className="bg-cinza rounded-lg text-sm h-9 px-2"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              {/* Input para o email da clínica */}
              <input
                type="email"
                placeholder="Insira o email"
                name=""
                id=""
                className="bg-cinza rounded-lg text-sm h-9 px-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Botão para submeter o formulário */}
              <input
                type="submit"
                value="Cadastrar"
                className="bg-[#45D496] w-32 h-12 rounded font-bold"
              />
            </form>
          </div>
          <div className="bg-gradient-to-r from-[#45D496] to-[#51F680] w-1/2 h-full rounded flex flex-col items-center justify-center space-y-6">
            <h1 className="font-bold text-3xl ">Já possuí login?</h1>
            <p>Pronto para retomar o controle? Faça login na sua conta agora</p>
            {/* Formulário para redirecionar para a página de login */}
            <form onSubmit={redirectLogin}>
              <input
                type="submit"
                value="Clique Aqui"
                className="bg-[#45D496] w-32 h-12 rounded font-bold"
              />
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
