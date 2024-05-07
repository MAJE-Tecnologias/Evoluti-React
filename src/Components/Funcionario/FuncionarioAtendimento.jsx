import React, { useState } from "react";
import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import { FiPlusCircle } from "react-icons/fi";
import {
  FaUsers,
  FaUserInjured,
  FaFileAlt,
  FaLink,
  FaPlus,
  FaStethoscope,
  FaCaretDown,
} from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";
import { AiFillFileAdd } from "react-icons/ai";
import { CiPill } from "react-icons/ci";
import { MdAdsClick, MdAssignment } from "react-icons/md";

export default function FuncAtend() {
  const [ativo, setAtivo] = useState(true); // Definindo "Avaliação" como ativo inicialmente

  return (
    <>
      <AdminHomeSidebar>
        <ItemsSidebar
          icon={<FiPlusCircle size={30} />}
          text="Cadastros"
          alert
          route={"/FuncCadastro"}
        />
        <ItemsSidebar
          icon={<FaUsers size={30} />}
          text="Usuários"
          route={"/FuncUsuarios"}
        />
        <ItemsSidebar icon={<FaUserInjured size={30} />} text="Pacientes" />
        <ItemsSidebar icon={<FaFileAlt size={30} />} text="Documentos" />
        <ItemsSidebar icon={<VscGraph size={30} />} text="Relatórios" />
      </AdminHomeSidebar>

      <section
        id="FuncHome"
        className="flex md:flex-col flex-col h-full pl-[78px] justify-center items-center dark:bg-neutral-800"
      >
        <div
          className="w-full h-full pt-20 
        md:px-10 md:pt-10"
        >
          <div className="bg-neutral-100 flex flex-col border-2 border-b-0 w-full h-full rounded-bl-none rounded-br-none 
          shadow-black shadow-md p-5 gap-x-8 md:gap-x-0 md:flex-row md:rounded-3xl dark:bg-neutral-900 dark:border-gray-800">
            <div className="md:w-1/2">
              <div
                className="flex flex-col justify-center items-center text-center gap-x-2 
              md:flex-row md:text-left md:justify-normal md:pb-8"
              >
                <div className="w-32 h-32 rounded-full bg-gray-400"></div>
                <div className="flex flex-col justify-center dark:text-white">
                  <h1
                    className="text-2xl font-bold pb-2 
                  md:pb-0"
                  >
                    David Raphael
                  </h1>
                  <p>
                    <b>Data de nascimento: </b>
                    <span>03/05/2005</span>
                  </p>
                  <p>
                    <b>CPF: </b>
                    <span>388.433.990-71</span>
                  </p>
                </div>
              </div>
              <div className="hidden md:flex flex-col w-full p-5 bg-EvolutiLightGreenLighter rounded-xl">
                <div className="flex items-center py-2 border-b-2 border-gray-500">
                  <button className="font-bold">Diagnósticos</button>
                  <FaCaretDown size={20} />
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-500">
                  <div className="flex items-center ">
                    <button className="font-bold">Receitas</button>
                    <FaCaretDown size={20} />
                  </div>
                  <CiPill size={25} className="mr-2"/>
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-500">
                  <div className="flex items-center ">
                    <button className="font-bold">Pedidos de exame</button>
                    <FaCaretDown size={20} />
                  </div>
                  <FaStethoscope size={25} className="mr-2"/>
                </div>
                <div className="flex items-center justify-between py-2 border-b-2 border-gray-500">
                  <div className="flex items-center">
                    <button className="font-bold">Questionários</button>
                    <FaCaretDown size={20} />
                  </div>
                  <MdAssignment size={25} className="mr-2"/>
                </div>
                <div className="flex items-center justify-between py-2 border-gray-500">
                  <div className="flex items-center">
                    <button className="font-bold">Arquivos atrelados</button>
                    <FaCaretDown size={20} />
                  </div>
                  <AiFillFileAdd size={25} className="mr-2"/>
                </div>
              </div>

              <div className="hidden md:flex flex-col w-full h-fit p-5 mt-8 bg-[#D9D9D9] rounded-xl overflow-y-auto">
                <h1 className="w-full text-xl text-center font-bold border-b-2 border-gray-500">Histórico de tratamentos</h1>
                <div className="py-2">
                  <button className="w-full text-left p-4 border-2 border-black rounded-2xl">03/02/2024</button>
                </div>
                <div className="py-2">
                  <button className="w-full text-left p-4 border-2 border-black rounded-2xl">03/02/2024</button>
                </div>
                <div className="py-2">
                  <button className="w-full text-left p-4 border-2 border-black rounded-2xl">03/02/2024</button>
                </div>
                <div className="py-2">
                  <button className="w-full text-left p-4 border-2 border-black rounded-2xl">03/02/2024</button>
                </div>
                <div className="py-2">
                  <button className="w-full text-left p-4 border-2 border-black rounded-2xl">03/02/2024</button>
                </div>
              </div>
            </div>

            <div className="hidden md:flex h-auto w-2 bg-evolutiGreen mx-6 rounded-3xl"></div>

            <div
              className="flex gap-x-4 pt-6 
            md:hidden"
            >
              <button
                className="w-1/2 py-4 px-4 border-2 border-transparent rounded-xl bg-evolutiLightGreen font-bold flex justify-center 
                items-center gap-x-2 shadow-md shadow-gray-600 transition-all ease-in-out hover:bg-evolutiGreen"
              >
                <FaLink size={20} />
                Anexos
              </button>
              <button
                className="w-1/2 py-4 px-4 border-2 border-transparent rounded-xl bg-evolutiLightBlueText font-bold flex 
              justify-center items-center gap-x-2 shadow-md shadow-gray-600 transition-all ease-in-out hover:bg-evolutiBlueText"
              >
                <FaLink size={20} />
                Histórico de Tratamento
              </button>
            </div>
            <div className="md:hidden h-0.5 bg-gray-500 rounded-full my-6"></div>
            <h1 className="md:hidden flex justify-center items-center gap-x-2 w-full text-center text-2xl font-bold text-evolutiLightGreen">
              <FaPlus />
              Novo Tratamento
            </h1>

            <div
              className="sm:px-8 
            md:px-0 md:w-1/2 h-full"
            >
              <div className="w-full h-8 border border-black rounded-t-lg justify-center items-center bg-gray-300 flex">
                <button
                  className={`w-1/2 h-full transition-all ease-in-out border-r border-black rounded-tl-md hover:bg-evolutiGreen ${
                    ativo ? "bg-evolutiGreen font-bold" : ""
                  }`}
                  onClick={() => setAtivo(true)}
                >
                  Avaliação
                </button>
                <button
                  className={`w-1/2 h-full transition-all ease-in-out border-l border-black rounded-tr-md hover:bg-evolutiGreen ${
                    !ativo ? "bg-evolutiGreen font-bold" : ""
                  }`}
                  onClick={() => setAtivo(false)}
                >
                  Evolução
                </button>
              </div>
              <textarea
                name="tratamentoText"
                id="tratamentoText"
                rows="20"
                className="w-full h-full rounded-lg rounded-t-none resize-none bg-[#E7E5E5]"
              ></textarea>
              <div className="flex flex-col gap-y-5 h-fit bg-[#d2cfcf] rounded-lg p-4">
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center items-center">
                    <button
                      className="flex flex-col justify-center items-center p-4 border border-transparent rounded-xl 
                    transition-all ease-in-out hover:bg-opacity-10 hover:bg-black"
                    >
                      <AiFillFileAdd size={30} className="pb-1" />
                      Novo anexo
                    </button>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button
                      className="flex flex-col justify-center items-center p-4 border border-transparent rounded-xl 
                    transition-all ease-in-out hover:bg-opacity-10 hover:bg-black"
                    >
                      <FaStethoscope size={30} className="pb-1" />
                      Novo pedido
                    </button>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <button
                      className="flex flex-col justify-center items-center p-4 border border-transparent rounded-xl 
                    transition-all ease-in-out hover:bg-opacity-10 hover:bg-black"
                    >
                      <CiPill size={30} className="pb-1" />
                      Nova receita
                    </button>
                  </div>
                </div>
                <div className="flex gap-x-3 justify-center items-center  ">
                  <h1 className="text-xl font-bold">Diagnóstico:</h1>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="peer w-full placeholder-transparent bg-loginButtonsBackground 
                border border-evolutiLightGreen placeholder-evolutiGreen 
                p-3.5 rounded-lg focus:outline-evolutiGreenDarker"
                  />
                </div>
                <input
                  type="submit"
                  value="Salvar Tratamento"
                  className="py-2 px-4 w-fit bg-evolutiLightGreen rounded-lg font-bold text-white self-center 
                  cursor-pointer transition-all ease-in-out hover:bg-evolutiGreen"
                />
              </div>
              <div className="w-full flex justify-center items-center pt-5">
                <button
                  className="w-fit h-20 bg-white rounded-3xl flex justify-center items-center gap-x-4 p-4 
                border border-evolutiGreen transition-all ease-in-out hover:shadow-md hover:bg-gray-100"
                >
                  <div className="flex justify-center items-center p-2 rounded-full bg-evolutiGreen text-white">
                    <MdAdsClick size={30} />
                  </div>
                  <span className="font-bold text-2xl text-evolutiGreen">
                    Marcação de pontos de dor
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
