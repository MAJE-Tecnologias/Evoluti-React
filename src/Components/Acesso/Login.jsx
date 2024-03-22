import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Hook para navegação de rotas
  const usenavigate = useNavigate();

  // Hook useRef para verificar se o componente está montado
  const mounted = useRef(false);

  // Hook useEffect para carregar dados iniciais quando o componente é montado
  useEffect(() => {
    if (!mounted.current) {
      if (sessionStorage.getItem("user") != null) {
        alert("Você já está logado, redirecionando para a home");
        let acesso = sessionStorage.getItem("acess");
        switch (acesso) {
          case '1':
            usenavigate("/AdminHome");
            break;
          case '2':
            usenavigate("/fisioHome");
            break;
          case '3':
            usenavigate("/estagioHome");
            break;
          default:
            console.log("Erro no acesso!");
            break;
        }
      }
      mounted.current = true;
    }
  });
  const passarLogin = (e) => {
    if (validaLogin()) {
      var variaveisAPI = {
        method: "GET",
      };

      e.preventDefault();
      fetch(`http://localhost:3000/Usuario?email=${email}`, variaveisAPI)
        .then((response) => response.json())
        .then((resultado) => {
          if (Object.keys(resultado).length === 0) {
            alert("Usuário não encontrado");
          } else {
            if (resultado[0].senha === senha) {
              sessionStorage.setItem("idClinica", resultado[0].fk_clinica);
              switch (resultado[0].tipoUsuario) {
                case "administrador":
                  sessionStorage.setItem("user", resultado[0].id);
                  sessionStorage.setItem("acess", 1);
                  usenavigate("/AdminHome");
                  break;
                case "fisioterapeuta":
                  sessionStorage.setItem("user", resultado[0].id);
                  sessionStorage.setItem("acess", 2);
                  usenavigate("/fisioHome");
                  break;
                case "estagiario":
                  sessionStorage.setItem("user", resultado[0].id);
                  sessionStorage.setItem("acess", 3);
                  break;
              }
            } else {
              alert("Senha incorreta");
            }
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  const validaLogin = () => {
    if (email.length === 0 || senha.length === 0) {
      alert("Preencha todos os campos");
      return false;
    }
    return true;
  };

  const redirectCadastro = () => {
    usenavigate("/Cadastro");
  };

  return (
    <>
      <main className="bg-evolutiDarkBlue w-screen h-screen flex  items-center justify-center">
        <section className="bg-white w-3/5 h-3/4 rounded flex items-center justify-center">
          <div className="w-1/2 h-full rounded flex flex-col items-center justify-center space-y-6">
            <form
              onSubmit={passarLogin}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <h1 className="font-bold text-3xl ">Login</h1>
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
                type="password"
                placeholder="Insira a senha"
                id=""
                className="bg-cinza rounded-lg text-sm h-9 px-2"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <input
                type="submit"
                value="Entrar"
                className="bg-[#45D496] w-32 h-12 rounded font-bold"
              />
            </form>
          </div>
          <div className="bg-gradient-to-r from-[#45D496] to-[#51F680] w-1/2 h-full rounded flex flex-col items-center justify-center space-y-6">
            <h1 className="font-bold text-3xl ">Cadastre seu clínica</h1>
            <p>Não perca tempo e otimize sua gestão fisioterápica</p>
            <form onSubmit={redirectCadastro}>
              <input
                type="submit"
                value="Cadastrar-se"
                className="bg-[#45D496] w-32 h-12 rounded font-bold"
              />
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
