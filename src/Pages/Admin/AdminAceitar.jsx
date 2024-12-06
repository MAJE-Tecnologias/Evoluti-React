import { useEffect, useRef, useState } from "react";
import {
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaUserInjured,
} from "react-icons/fa";
import Sidebar, { ItemsSidebar } from "../../Components/SideBar";
import {
  aceitarUsuario,
  fetchUsuarios,
  negarUsuario,
} from "../../services/adminServices";
import {
  LuArrowDownAZ,
  LuBookPlus,
  LuFilter,
  LuHome,
  LuSearch,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";
import NavBar from "../../Components/NavBar";
import { ItemsNavBar } from "../../Components/ItemsNavBar";

export default function AdminAceitar() {
  const idClinica = sessionStorage.getItem("idClinica");
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const mounted = useRef(false);

  const buscarDados = async () => {
    try {
      const usuariosArray = await fetchUsuarios(idClinica);
      setUsuarios(usuariosArray);
      mounted.current = true;
    } catch (error) {
      console.error("Falha ao obter dados:", error);
    }
  };

  useEffect(() => {
    buscarDados();
    const intervalo = setInterval(buscarDados, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const handleAceitarUsuario = async (e, idUsuario) => {
    e.preventDefault();
    try {
      await aceitarUsuario(idUsuario);
      alert("Usuário aceito no sistema");
      buscarDados();
    } catch (error) {
      console.error("Erro ao aceitar usuário:", error);
    }
  };

  const handleNegarUsuario = async (e, idUsuario) => {
    e.preventDefault();
    try {
      await negarUsuario(idUsuario);
      alert("Usuário apagado do sistema");
      buscarDados();
    } catch (error) {
      console.error("Erro ao negar usuário:", error);
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
          className={`text-white px-3 py-1 mx-1 border rounded-lg ${
            currentPage === i ? "bg-evolutiGreen" : "bg-neutral-300"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const showUsuarios = (usuarios) => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usuarios.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <>
        {currentUsers.map((usuario, index) => (
          <tbody key={index}>
            <tr className="bg-white dark:bg-neutral-900 border-b transition-all max-w-48 hover:bg-slate-100 dark:hover:bg-neutral-800">
              <td
                scope="row"
                className="flex gap-x-2 items-center pl-3 md:pl-6 py-4 font-medium text-gray-900 dark:text-white truncate"
              >
                <div className="h-10 w-10">
                  <img
                    className="rounded-full"
                    src="https://picsum.photos/48/48"
                    alt="User Avatar"
                  />
                </div>
                {usuario.nome}
              </td>
              <td className="pl-3 md:pl-6">{usuario.Profissao}</td>
              <td className="pl-3 md:pl-6 max-w-48 truncate">
                {usuario.Email}
              </td>
              <td className="px-3 text-center">
                <button
                  onClick={(e) => handleAceitarUsuario(e, usuario.id)}
                  className="p-1 rounded-lg transition-all hover:bg-evolutiLightGreen hover:text-white"
                >
                  <FaRegCheckCircle size={20} />
                </button>
                <button
                  onClick={(e) => handleNegarUsuario(e, usuario.id)}
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
  };

  const totalRecords = usuarios.length;
  const startRecord = (currentPage - 1) * usersPerPage + 1;
  const endRecord = Math.min(currentPage * usersPerPage, totalRecords);

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
          ativo
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
          route={"/AdminUsuarios"}
        />
        <ItemsSidebar
          icon={<FaUserInjured size={24} />}
          text="Pacientes"
          route={"/AdminPaciente"}
        />
      </Sidebar>

      <NavBar icon={<LuUserCheck size={24} />} title={"Aceitar Novos Usuários"}>
        <ItemsNavBar
          icon={<LuHome size={24} />}
          text="Home"
          route="/AdminHome"
        />
        <ItemsNavBar
          icon={<LuUserCheck size={24} />}
          text="Aceitar Usuários"
          route={"/AdminAceitar"}
          ativo
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
        />
      </NavBar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col min-h-screen h-full pl-[89px] pt-[89px] items-center justify-center dark:bg-neutral-800"
      >
        <div className="w-full h-full pt-8 pb-4 px-4 md:px-12 ">
          <div className="flex flex-col gap-y-4">
            <p className="text-center font-medium text-lg dark:text-white">
              Utilize a tabela abaixo para aceitar ou recusar novos usuários que
              solicitaram acesso à sua clínica.
            </p>

            <div className="flex justify-center items-center gap-x-3 dark:text-white">
              <LuSearch size={24} />
              <input
                type="text"
                className="w-1/2 rounded py-1 px-4 border border-neutral-500 dark:text-black"
                placeholder="Pesquisar usuário"
              ></input>
            </div>
          </div>

          <div className="w-full pt-4">
            <div className="flex items-center justify-between dark:text-white">
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
              <div className="flex items-center gap-x-2">
                <p>Filtrar:</p>
                <button
                  className="border border-transparent p-1 transition-all rounded-xl hover:border-slate-300 hover:text-emerald-600 hover:bg-slate-50 dark:text-white 
              dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
                >
                  <LuFilter size={24} />
                </button>
                <button
                  className="border border-transparent p-1 transition-all rounded-xl hover:border-slate-300 hover:text-emerald-600 hover:bg-slate-50 dark:text-white 
              dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
                >
                  <LuArrowDownAZ size={24} />
                </button>
              </div>
            </div>
            <table
              className="w-full rounded-t-lg text-sm text-left border-black text-black
         dark:text-white shadow-md shadow-neutral-600 mt-4 "
            >
              <thead className="text-xs dark:text-white uppercase bg-gray-200 dark:bg-neutral-950 dark:border-gray-800 rounded-t-lg">
                <tr className="rounded-t-lg border-b">
                  <th className="px-3 md:px-6 py-3 rounded-tl-lg border-r">
                    Nome Completo
                  </th>
                  <th className="px-3 md:px-6 py-3 border-r">PROFISSÃO</th>
                  <th className="px-3 md:px-6 py-3 border-r">EMAIL</th>
                  <th className="px-3 md:px-6 py-3 text-center rounded-tr-lg">
                    AÇÕES
                  </th>
                </tr>
              </thead>
              {showUsuarios(usuarios)}
            </table>
          </div>

          <div className="flex justify-between w-full items-center mt-4 dark:text-white">
            <div>
              <span>
                Mostrando {startRecord} a {endRecord} de um total de{" "}
                {totalRecords} registros
              </span>
            </div>

            <div>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="mr-2 px-4 py-2 text-white bg-evolutiGreen rounded-lg disabled:bg-gray-400"
              >
                Anterior
              </button>
              {renderPageNumbers()}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="ml-2 px-4 py-2 text-white bg-evolutiGreen rounded-lg disabled:bg-gray-400"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
