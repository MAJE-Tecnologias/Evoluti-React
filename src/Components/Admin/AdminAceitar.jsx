import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import { useRef, useEffect, useState } from "react";
import { FaUsers, FaUserInjured, FaFileAlt, FaSearch, FaRegCheckCircle, FaRegTimesCircle, FaUserCheck } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import axios from "axios";

export default function AdminAceitar() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      axios
        .get(`http://localhost:3000/Usuario?fk_clinica=${idClinica}`)
        .then((response) => {
          const respostas = response.data;
          const usuariosArray = [];

          for (let i = 0; i < respostas.length; i++) {
            if (respostas[i].stats === false) {
              // adiciona à lista
              usuariosArray.push({
                id: respostas[i].id,
                nome: respostas[i].Nome,
                Profissao: respostas[i].Profissao,
                Email: respostas[i].Email,
              });
            }
            // caso contrário, não faz nada
          }

          setUsuarios(usuariosArray);
          mounted.current = true;
        })
        .catch((error) => console.error("Falha ao obter dados:", error));
    }
  }, []);

  function showUsuarios(usuarios) {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <>
        {currentUsers.map((usuario, index) => (
          <tbody key={index}>
            <tr className="bg-white border-b dark:bg-neutral-900 dark:border-gray-800">
              <th
                scope="row"
                className="flex gap-x-2 px-6 items-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="h-10 w-10">
                  <div className="h-full w-full rounded-full bg-gray-200"></div>
                </div>
                {usuario.nome}
              </th>
              <td className="px-6 py-4">{usuario.Profissao}</td>
              <td className="px-6 py-4">{usuario.Email}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={(e) => aceitarUsuario(e, usuario.id)}
                  className="p-1 rounded-lg transition-all hover:bg-evolutiLightGreen hover:text-white"
                >
                  <FaRegCheckCircle size={20} />
                </button>
                <button
                  onClick={(e) => negarUsuario(e, usuario.id)}
                  className="p-1 rounded-lg transition-all hover:bg-red-500 hover:text-white"
                >
                  <FaRegTimesCircle size={20} />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </>
    );
  }

  const aceitarUsuario = async (e, idUsuario) => {
    e.preventDefault();

    const changes = { stats: true };
    try {
      await axios.patch(
        `http://localhost:3000/Usuario/${idUsuario}`,
        changes
      );
      alert("Usuario aceito no sistema");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar os dados da clínica:", error);
    }
  };

  const negarUsuario = async (e, idUsuario) => {
    e.preventDefault();

    try{
      await axios.delete(
        `http://localhost:3000/Usuario/${idUsuario}`
      )
      alert("Usuario apagado do sistema");
      window.location.reload();
    }catch (error) {
      console.error("Erro ao atualizar os dados da clínica:", error);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const totalPages = Math.ceil(usuarios.length / usersPerPage);

  const handlePerPageChange = (e) => {
    setUsersPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 border rounded-lg ${
            currentPage === i ? "bg-gray-500" : "bg-gray-300"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <AdminHomeSidebar>
        <ItemsSidebar
          icon={<FaUserCheck size={30} />}
          text="Aceitar"
          ativo
          route={"/AdminAceitar"}
        />
        <ItemsSidebar
          icon={<FaUsers size={30} />}
          text="Usuários"
          route={"/AdminUsuarios"}
        />
        <ItemsSidebar icon={<FaUserInjured size={30} />} text="Pacientes" />
        <ItemsSidebar icon={<FaFileAlt size={30} />} text="Documentos" />
        <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
      </AdminHomeSidebar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-screen pl-[78px] items-center dark:bg-neutral-800"
      >
        <div>
          <h1 className="flex justify-center items-center gap-x-2 text-4xl font-extrabold text-evolutiLightGreen pt-10">
            <FaUserCheck size={40} /> Aceitar novos Usuários
          </h1>

          <div className="flex mt-10 justify-center items-center gap-x-3 dark:text-white">
            <FaSearch size={20} />
            <input
              type="text"
              className="w-3/4 rounded py-1 px-4"
              placeholder="Pesquisar usuário"
            ></input>
          </div>
        </div>

        <table
          className="w-3/4 text-sm text-left rtl:text-right border-black text-black dark:border-white
         dark:text-white border rounded-lg border-separate shadow-md shadow-black dark:shadow-white mt-4"
        >
          <thead className="text-xs dark:text-white uppercase bg-gray-200 dark:bg-neutral-950 dark:border-gray-800">
            <tr>
              <th className="px-6 py-3">Nome Completo</th>
              <th className="px-6 py-3">PROFISSÃO</th>
              <th className="px-6 py-3">EMAIL</th>
              <th className="px-6 py-3">AÇÕES</th>
            </tr>
          </thead>
          {showUsuarios(usuarios)}
        </table>
        <div className="flex justify-between w-3/4 items-center mt-4 dark:text-white">
          <div>
            <span>Mostrar</span>
            <select
              value={usersPerPage}
              onChange={handlePerPageChange}
              className="mx-2 border border-gray-300 rounded-md text-black"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <span>registros por página</span>
          </div>
          <div>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 text-white bg-evolutiDarkBlue rounded-lg disabled:bg-gray-400"
            >
              Anterior
            </button>
            {renderPageNumbers()}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="ml-2 px-4 py-2 text-white bg-evolutiDarkBlue rounded-lg disabled:bg-gray-400"
            >
              Próxima
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
