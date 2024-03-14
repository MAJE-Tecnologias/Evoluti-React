import { useState, React } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const usenavigate = useNavigate();

  const criarClinica = (e) => {
    var variaveisAPI = {
      method: "POST",
      body: JSON.stringify({
        Id: 2,
        Nome: nome,
        Email: email,
      }),
    };

    e.preventDefault();
    fetch(`http://localhost:3000/Clinica`, variaveisAPI)
      .then((response) => response.json())
      .then(alert("Cadastrado com sucesso"))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <main className="bg-evolutiDarkBlue w-screen h-screen flex items-center justify-center">
        <section className="bg-white w-3/5 h-3/4 rounded flex items-center justify-center   ">
          <div className="w-1/2 h-full rounded flex flex-col items-center justify-center">
            <form
              onSubmit={criarClinica}
              className="flex flex-col items-center justify-center space-y-6"
            >
              <h1 className="font-bold text-3xl ">Cadastre-se</h1>
              <input
                type="text"
                placeholder="Nome da Clinica"
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
          <div className="bg-gradient-to-r from-[#45D496] to-[#51F680] w-1/2 h-full rounded rounded flex flex-col items-center justify-center space-y-6">
            <h1 className="font-bold text-3xl ">Já possuí login?</h1>
            <p>Pronto para retomar o controle? Faça login na sua conta agora</p>
            <input
              type="submit"
              value="Clique Aqui"
              className="bg-[#45D496] w-32 h-12 rounded font-bold"
            />
          </div>
        </section>
      </main>
    </>
  );
}
