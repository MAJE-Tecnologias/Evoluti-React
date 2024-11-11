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
  LuBookPlus,
  LuCheckCircle,
  LuCopy,
  LuHome,
  LuMoveRight,
  LuSearch,
  LuSettings,
  LuUserCheck,
  LuUsers,
} from "react-icons/lu";
import NavBar from "../../Components/NavBar";
import axios from "axios";
import { ItemsNavBar } from "../../Components/ItemsNavBar";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

export default function AdminHome() {
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [copied, setCopied] = useState(false);
  const idClinica = sessionStorage.getItem("idClinica");
  const mounted = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const id = sessionStorage.getItem("idUsuario");
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/Usuario?id=${id}`
        );
        if (response.data && response.data.length > 0) {
          const usuarioData = response.data[0];
          setUsuario({
            Nome: usuarioData.Nome,
            Email: usuarioData.Email,
            Profissao: usuarioData.Profissao,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário", error);
      }
    };
    fetchUsuario();
  }, []);

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

  const showUsuarios = (usuarios) => {
    const currentUsers = usuarios.slice(0, 5);

    return (
      <>
        {currentUsers.map((usuario, index) => (
          <div
            key={index}
            className="w-full my-3 border rounded-3xl shadow dark:bg-neutral-800 dark:shadow-none"
          >
            <div className="flex gap-x-2 items-center p-2 truncate">
              <div className="min-h-16 min-w-16">
                <img
                  className="rounded-full"
                  src="https://picsum.photos/80/80"
                  alt="User Avatar"
                />
              </div>
              <div className="flex flex-col truncate">
                <p className="text-lg text-evolutiDarkBlueText font-semibold truncate dark:text-white">
                  {usuario.nome}
                </p>
                <p className="text-sm text-neutral-400">{usuario.Profissao}</p>
              </div>
            </div>
            <div className="flex border-t text-center">
              <button
                onClick={(e) => handleAceitarUsuario(e, usuario.id)}
                className="w-1/2 flex items-center justify-center gap-x-2 p-1 transition-all border-r rounded-bl-3xl bg-neutral-50
                  hover:bg-evolutiGreen hover:text-white dark:bg-neutral-900 dark:hover:bg-evolutiGreen"
              >
                <FaRegCheckCircle size={20} /> Aceitar
              </button>
              <button
                onClick={(e) => handleNegarUsuario(e, usuario.id)}
                className="w-1/2 flex items-center justify-center gap-x-2 transition-all rounded-br-3xl bg-neutral-50
                  hover:bg-red-500 hover:text-white dark:bg-neutral-900 dark:hover:bg-red-500"
              >
                <FaRegTimesCircle size={20} /> Rejeitar
              </button>
            </div>
          </div>
        ))}
      </>
    );
  };

  const showUsuariosCadastrados = (usuarios) => {
    const currentUsers = usuarios.slice(0, 5);

    return (
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        loop={true}
        autoplay={{ delay: 2000 }}
        className="w-full"
      >
        {currentUsers.map((usuario, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="w-full my-3 border rounded-xl shadow bg-white dark:bg-neutral-800 max-w-[320px] dark:shadow-none">
              <div className="flex justify-between bg-neutral-500 text-sm text-white rounded-t-xl py-1 px-4">
                <p>Aceito em:</p>
                <p>10/11/2024</p>
              </div>
              <div className="flex gap-x-2 items-center p-4 truncate">
                <div className="min-h-16 min-w-16">
                  <img
                    className="rounded-xl"
                    src="https://picsum.photos/80/80"
                    alt="User Avatar"
                  />
                </div>
                <div className="flex flex-col truncate">
                  <p className="text-evolutiDarkBlueText font-semibold truncate dark:text-white">
                    {usuario.nome}
                  </p>
                  <p className="text-sm text-neutral-400">
                    {usuario.Profissao}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  const handleCopyToClipboard = () => {
    const clinicCode = sessionStorage.getItem("idClinica");

    if (clinicCode) {
      navigator.clipboard
        .writeText(clinicCode)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 5000);
        })
        .catch((err) => {
          console.error("Erro ao copiar o código:", err);
        });
    }
  };

  return (
    <>
      <Sidebar>
        <ItemsSidebar
          icon={<LuHome size={24} />}
          text="Home"
          route={"/AdminHome"}
          ativo
        />
        <ItemsSidebar
          icon={<LuUserCheck size={24} />}
          text="Aceitar Usuários"
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
      <NavBar icon={<LuHome size={24} />} title={"Home - Admin"}>
        <ItemsNavBar
          icon={<LuHome size={24} />}
          text="Home"
          route="/AdminHome"
          ativo
        />
        <ItemsNavBar
          icon={<LuUserCheck size={24} />}
          text="Usuários"
          route="/AdminUsuarios"
        />
        <ItemsNavBar
          icon={<LuSettings size={24} />}
          text="Configurações"
          route="/AdminConfig"
        />
      </NavBar>

      <section
        id="AdminHome"
        className="flex md:flex-col flex-col h-full pt-[89px] transition-all bg-slate-100
        dark:bg-neutral-800 dark:text-white sm:pl-[89px]"
      >
        {usuario ? (
          <h1 className="text-3xl my-4 text-center">Olá, {usuario.Nome}.</h1>
        ) : (
          <p>Carregando dados do usuário...</p>
        )}

        <p className="text-center pb-4">
          Seja bem-vindo(a) a sua página inicial!
        </p>

        <div className=" text-white bg-evolutiGreenDarker rounded-3xl p-4 mx-2 mb-12 font-bold text-center sm:mx-8">
          <p>Código da sua Clínica Evoluti:</p>
          <div className="relative w-full flex flex-col items-center">
            <p
              className="flex gap-x-2 text-4xl cursor-pointer w-fit p-1 rounded-xl transition-all 
              hover:bg-black hover:bg-opacity-15 hover:shadow"
              onClick={handleCopyToClipboard}
            >
              {sessionStorage.getItem("idClinica")}
              {copied ? (
                <LuCheckCircle size={16} className="self-end mb-2" />
              ) : (
                <LuCopy size={16} className="self-end mb-2" />
              )}
            </p>
            {copied && (
              <p className=" rounded-lg p-1  font-normal">
                Código copiado para a área de transferência.
              </p>
            )}
          </div>
          <p className="font-normal mt-4">
            Envie esse código para os funcionários que deseja adicionar à
            clínica!
          </p>
        </div>

        <div className="px-2">
          <div className="bg-white w-full h-full rounded-3xl p-2 dark:bg-neutral-900 mb-12">
            <p className="text-center text-2xl font-semibold text-evolutiDarkBlueText dark:text-white">
              Aceitar novos usuários
            </p>
            <div className="flex relative items-center pt-3">
              <input
                type="text"
                className="border w-full pl-8 pr-14 py-2 rounded-xl"
                placeholder="Procurar"
              />
              <LuSearch className="absolute right-8"></LuSearch>
            </div>
            {showUsuarios(usuarios)}

            <a
              href={"/AdminAceitar"}
              className="flex items-center place-self-end gap-x-2 w-fit py-1 px-3 rounded-lg transition-all
          border-2 border-evolutiDarkBlue hover:text-white hover:bg-evolutiDarkBlueText 
          dark:border-white dark:text-white dark:bg-none dark:hover:bg-white dark:hover:text-black"
            >
              Ver todos <LuMoveRight />
            </a>
          </div>
        </div>

        <p className="text-center text-2xl font-semibold text-evolutiDarkBlueText px-2 dark:text-white">
          Usuários aceitos recentemente:
        </p>
        <div className="flex w-full h-fit items-center px-2 mb-12">
          {showUsuariosCadastrados(usuarios)}
        </div>

        <div className="w-full h-fit px-5 pt-5 bg-white dark:bg-neutral-900 dark:border-t">
          <p className="font-semibold text-2xl">Dúvidas?</p>
          <p>Acesse os tutoriais:</p>

          <button
            className="px-6 py-3 my-6 bg-[#6FCFD4] text-evolutiDarkBlueText font-semibold rounded-xl 
          transition-all hover:scale-105 hover:bg-[#5bb7b3]"
            onClick={openModal}
          >
            Como faço para aceitar um novo funcionário?
          </button>

          <img
            src="src\assets\ImgTutoriaisAdminHome.png"
            alt=""
            className="xs:justify-self-end"
          />
        </div>
      </section>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-slate-200 rounded-lg max-w-4xl h-[50vh] w-full relative xss:h-3/4 dark:bg-neutral-800 dark:text-white"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              <p className="text-center w-full bg-[#6FCFD4] py-6 text-evolutiDarkBlueText font-bold rounded-t-lg">
                Como aceitar um novo funcionário?
              </p>

              <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
                className="w-full h-full"
              >
                <SwiperSlide className="flex flex-col gap-y-4 items-center justify-center">
                  <img
                    src="src\assets\Tutoriais\Print1_AceitarUsuarios.png"
                    className="rounded-2xl w-fit h-[50vh] border-2 border-neutral-500 dark:border-transparent"
                  />
                  <p className="text-center">
                    Acesse “aceitar novos usuários” no menu lateral
                  </p>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col gap-y-4 items-center justify-center">
                  <img
                    src="src\assets\Tutoriais\Print2_AceitarUsuarios.png"
                    className="rounded-2xl w-fit h-1/2 border-2 border-neutral-500 dark:border-transparent"
                  />
                  <p className="text-center">
                    Localize o usuário que gostaria de aceitar
                  </p>
                </SwiperSlide>
                <SwiperSlide className="flex flex-col gap-y-4 items-center justify-center">
                  <img
                    src="src\assets\Tutoriais\Print3_AceitarUsuarios.png"
                    className="rounded-2xl w-fit h-1/2 border-2 border-neutral-500 dark:border-transparent"
                  />
                  <p className="text-center">
                    Clique em ✔ e seu usuário será adicionado
                  </p>
                </SwiperSlide>
              </Swiper>
            </div>

            <button
              className="absolute top-1 right-1 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              <IoMdClose size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
