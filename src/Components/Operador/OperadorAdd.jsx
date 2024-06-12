// Importações de componentes e ícones necessários
import { useRef, useEffect, useState } from "react";

import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import "../CSS/AnimacaoFlutuar.css";
import { FaUsers, FaUserInjured, FaFileAlt, FaUserCheck } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import axios from "axios";

// Definindo o componente OperadorAdd
export default function OperadorAdd() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rg, setRG] = useState("");
  const [cpf, setCPF] = useState("");

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      axios
        .get("http://localhost:3000/Paciente?_sort=-id")
        .then((response) => {
          const respostas = response.data;
          if (respostas && respostas.length > 0) {
            setId(respostas[0].id);
          }
        })
        .catch((error) => console.error("Erro ao buscar Pacientes:", error));
    }

    return () => {
      mounted.current = false;
    };
  }, [idClinica]);

  const createPaciente = async (e) => {
    e.preventDefault();
    const newId = parseInt(id) + 1;
    const body = {
      id: newId,
      nome,
      email,
      data,
      genero,
      telefone,
      rg,
      cpf,
      fk_clinica: idClinica,
    };

    axios.post("http://localhost:3000/Paciente", body)
        .then(() => {
          alert("Cadastrado com sucesso");
        })
        .catch((error) => console.log("error", error));
  };

  return (
    <>
      {/* Sidebar do administrador com itens de navegação */}
      <AdminHomeSidebar>
        <ItemsSidebar
          icon={<FaUserCheck size={30} />}
          text="Adicionar Paciente"
          route="/OperadorAdd"
        />
        <ItemsSidebar
          icon={<FaUsers size={30} />}
          text="Usuários"
          route="/AdminUsuarios"
        />
        <ItemsSidebar icon={<FaUserInjured size={30} />} text="Pacientes" />
        <ItemsSidebar icon={<FaFileAlt size={30} />} text="Documentos" />
        <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
      </AdminHomeSidebar>

      {/* Seção principal do formulário de adição de paciente */}
      <section
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <form onSubmit={createPaciente}>
          <h1>Criar novo paciente</h1>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            onChange={(e) => setCPF(e.target.value)}
          />
          <br />
          <label htmlFor="rg">RG:</label>
          <input
            type="text"
            id="rg"
            name="rg"
            onChange={(e) => setRG(e.target.value)}
          />
          <br />
          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            onChange={(e) => setData(e.target.value)}
          />
          <br />
          <label htmlFor="cadastroGeneroClinica" className="dark:text-white">
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
          <br />
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            onChange={(e) => setTelefone(e.target.value)}
          />
          <br />
          <input type="submit" />
        </form>
      </section>
    </>
  );
}
