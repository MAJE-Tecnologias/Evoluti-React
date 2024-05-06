import AdminHomeSidebar, {
    ItemsSidebar,
  } from "../Suplementares/AdminHomeSidebar";
  import "../CSS/AnimacaoFlutuar.css";
  
  import { useRef, useEffect, useState } from "react";
  import { FiPlusCircle } from "react-icons/fi";
  import { FaUsers } from "react-icons/fa6";
  import {
    FaUserInjured,
    FaFileAlt,
    FaSearch,
    FaEye,
    FaTrash,
  } from "react-icons/fa";
  import { VscGraph } from "react-icons/vsc";
  
  export default function AdminUsuarios() {
    const idClinica = localStorage.getItem("idClinica");
    const [tipoUsuario, setTipoUsuario] = useState("tudo");
    const [usuarios, setUsuarios] = useState([]);
    
  
    const mounted = useRef(false);
  
    useEffect(() => {
      if (!mounted.current) {
        let variaveisAPI = {
          method: "GET",
        };
        fetch(
          `http://localhost:3000/Usuario?fk_clinica=${idClinica}`,
          variaveisAPI
        )
          .then((response) => response.json())
          .then((respostas) => {
            console.log(respostas);
            const usuariosArray = respostas.map((usuario) => ({
              nome: usuario.Nome,
              Profissao: usuario.Profissao,
            }));
            setUsuarios(usuariosArray);
            mounted.current = true;
          });
      }
    });
  
    function showUsuarios(usuarios) {
  
      return (
        <>
          {usuarios.map((usuario, index) => (
            <tbody>
              <tr class="bg-white border-b dark:bg-neutral-900 dark:border-gray-800">
                <th
                  scope="row"
                  className="flex gap-x-2 px-6 items-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="h-10 w-10">
                    <div className="h-full w-full rounded-full bg-gray-200"></div>
                  </div>
                  {usuario.nome}
                </th>
                <td class="px-6 py-4">{usuario.Profissao}</td>
                <td class="px-6 py-4">renatofisio@gmail.com</td>
                <td class="px-6 py-4">
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
    }
  
    return (
      <>
        <AdminHomeSidebar>
          <ItemsSidebar
            icon={<FiPlusCircle size={30} />}
            text="Cadastros"
            route={"/AdminCadastro"}
          />
          <ItemsSidebar
            icon={<FaUsers size={30} />}
            text="Usuários"
            ativo
            route={"/AdminUsuarios"}
          />
          <ItemsSidebar icon={<FaUserInjured size={30} />} text="Pacientes" />
          <ItemsSidebar icon={<FaFileAlt size={30} />} text="Documentos" />
          <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
        </AdminHomeSidebar>
  
        <section
          id="AdminHome"
          className="flex md:flex-col flex-col h-full pl-[78px] items-center dark:bg-neutral-800"
        >
          <div>
            <h1 className="flex justify-center items-center gap-x-2 text-4xl font-extrabold text-evolutiLightGreen pt-10">
              <FaUsers size={40} /> Visualização de Usuários
            </h1>
  
            <div className=" flex mt-10 justify-center items-center gap-x-3 dark:text-white">
              <FaSearch size={20} />
              <input
                type="text"
                className="w-1/2 rounded py-1 px-4"
                placeholder="Pesquisar usuário"
              ></input>
            </div>
          </div>
  
          <div className="relative overflow-x-auto w-full px-16 mt-10"></div>
  
          <table class="w-3/4 text-sm text-left rtl:text-right text-black dark:text-white border rounded-lg border-separate">
            <thead class="text-xs dark:text-white uppercase bg-gray-200 dark:bg-neutral-950 dark:border-gray-800">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Nome Completo
                </th>
                <th scope="col" class="px-6 py-3">
                  PROFISSÃO
                </th>
                <th scope="col" class="px-6 py-3">
                  EMAIL
                </th>
                <th scope="col" class="px-6 py-3">
                  AÇÕES
                </th>
              </tr>
            </thead>
            {showUsuarios(usuarios)}
          </table>
        </section>
      </>
    );
  }
  