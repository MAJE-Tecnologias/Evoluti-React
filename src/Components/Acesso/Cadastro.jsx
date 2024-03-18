import { useRef, useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";

// Componente para o cadastro de uma nova clínica
export default function Cadastro() {
  // Declaração de estado para o email e o nome da clínica
  const [email, setEmail] = useState("");
  const [id, setId] = useState();
  const [emailValidacao, setEmailValidacao] = useState([]);
  const [nome, setNome] = useState("");

  // Hook para navegação de rotas
  const usenavigate = useNavigate();

  const mounted = useRef(false);

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
  }, []);

  console.log(emailValidacao);
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
        .then(alert("Cadastrado com sucesso"))
        .then(usenavigate("/CadastroAdmKey"))
        .catch((error) => console.log("error", error)); // Trata erros
    }
  };

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

  const redirectLogin = () =>{
    usenavigate("/Login");
  }

  sessionStorage.setItem("idClinica", id + 1);

  return (
    <>
      <main className="bg-evolutiDarkBlue w-screen h-screen flex items-center justify-center">
        <section className="bg-white w-3/5 h-3/4 rounded flex items-center justify-center">
          <div className="w-1/2 h-full rounded flex flex-col items-center justify-center">
            <form
              onSubmit={criarClinica}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <h1 className="font-bold text-3xl ">Cadastre-se</h1>
              <input
                type="text"
                placeholder="Nome da Clínica"
                className="bg-cinza rounded-lg text-sm h-9 px-2"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="email"
                placeholder="Insira o email"
                name=""
                id=""
                className="bg-cinza rounded-lg text-sm h-9 px-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
