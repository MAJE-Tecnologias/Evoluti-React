import { useEffect, useRef, useState } from "react";
import { FaEye, FaSearch, FaTrash, FaUserInjured } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import { fetchUsuarios } from "../../services/adminServices"; // Importar o serviço
import "../CSS/AnimacaoFlutuar.css";
import { LuBookPlus, LuHome, LuUserCheck, LuUsers } from "react-icons/lu";
import NavBar from "../../Components/NavBar";
import { ItemsNavBar } from "../../Components/ItemsNavBar";

export default function AdminUsuarios() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      const fetchData = async () => {
        try {
          const usuariosData = await fetchUsuarios(idClinica);
          setUsuarios(usuariosData);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      };

      fetchData();
      mounted.current = true;
    }
  }, [idClinica]);

  const showUsuarios = (usuarios) => {
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
                  <div className="h-full w-full rounded-full bg-gray-200">
                    {" "}
                    <img
                      className="rounded-full"
                      src="https://picsum.photos/48/48"
                      alt="User Avatar"
                    />
                  </div>
                </div>
                {usuario.nome}
              </th>
              <td className="px-6 py-4">{usuario.Profissao}</td>
              <td className="px-6 py-4 max-w-96 truncate">{usuario.Email}</td>
              <td className="px-6 py-4 text-center">
                <button className="p-1 rounded-lg transition-all hover:bg-evolutiLightBlueText hover:text-white">
                  <FaEye size={20} />
                </button>
                <button className="p-1 rounded-lg transition-all hover:bg-red-500 hover:text-white">
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </>
    );
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
      <Sidebar>
        <ItemsSidebar
          icon={<LuHome size={24} />}
          text="Home"
          route={"/AdminHome"}
        />
        <ItemsSidebar
          icon={<LuUserCheck size={24} />}
          text="Aceitar"
          route={"/AdminAceitar"}
        />
        <ItemsSidebar
          icon={<LuBookPlus size={24} />}
          text="Adicionar Profissão"
          route={"/AdminAdd"}
        />
        <ItemsSidebar
          icon={<LuUsers size={24} />}
          text="Usuários"
          ativo
          route={"/AdminUsuarios"}
        />
        <ItemsSidebar
          icon={<FaUserInjured size={24} />}
          text="Pacientes"
          route={"/AdminPaciente"}
        />
      </Sidebar>
      <NavBar icon={<LuUsers size={24} />} title={"Visualização de Usuários"}>
        <ItemsNavBar
          icon={<LuHome size={24} />}
          text="Home"
          route="/AdminHome"
        />
        <ItemsNavBar
          icon={<LuUserCheck size={24} />}
          text="Aceitar Usuários"
          route={"/AdminAceitar"}
          
        />
        <ItemsNavBar
          icon={<LuBookPlus size={24} />}
          text="Adicionar Profissão"
          route={"/AdminAdd"}
        />
        <ItemsNavBar
          icon={<LuUserCheck size={24} />}
          text="Usuários"
          route="/AdminUsuarios"
          ativo
        />
      </NavBar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-full min-h-screen pl-[89px] pt-[89px] items-center dark:bg-neutral-800"
      >
        <div>
          <h1 className="flex justify-center items-center gap-x-2 text-4xl font-extrabold text-evolutiLightGreen pt-10">
            <FaUsers size={40} /> Visualização de Usuários
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
         dark:text-white border rounded-lg border-separate shadow-md shadow-black dark:shadow-none mt-4"
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
