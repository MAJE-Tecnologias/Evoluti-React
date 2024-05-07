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
} from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";

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
        <div className="w-full h-full pt-20 md:px-20 md:pt-10">
          <div className="bg-neutral-100 flex flex-col border-2 border-b-0 w-full h-full rounded-bl-none rounded-br-none shadow-black shadow-md p-5 gap-x-8 md:flex-row md:rounded-3xl dark:bg-neutral-900 dark:border-gray-800">
            <div className="md:w-1/2">
              <div className="flex flex-col justify-center items-center text-center gap-x-2 md:flex-row">
                <div className="w-32 h-32 rounded-full bg-gray-400"></div>
                <div className="flex flex-col justify-center dark:text-white">
                  <h1 className="text-2xl font-bold pb-2 md:pb-0">
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
            </div>
            <div className="h-0.5 bg-gray-500 rounded-full my-3"></div>
            <div className="flex gap-x-4 pb-10 md:hidden">
              <button className="w-1/2 py-4 px-4 border-2 border-transparent rounded-xl bg-evolutiLightGreen font-bold flex justify-center items-center gap-x-2 shadow-md shadow-gray-600">
                <FaLink size={20} />
                Anexos
              </button>
              <button className="w-1/2 py-4 px-4 border-2 border-transparent rounded-xl bg-evolutiLightBlueText font-bold flex justify-center items-center gap-x-2 shadow-md shadow-gray-600">
                <FaLink size={20} />
                Histórico de Tratamento
              </button>
            </div>

            <h1 className="flex justify-center items-center gap-x-2 w-full text-center text-2xl font-bold text-evolutiLightGreen">
              <FaPlus />
              Novo Tratamento
            </h1>
            <div className="px-8">
              <div className="w-full h-8 border border-black rounded-t-lg justify-center items-center bg-gray-300 flex">
                <button
                  className={`w-1/2 h-full transition-all border-r border-black rounded-tl-md hover:bg-evolutiGreen ${
                    ativo ? "bg-evolutiGreen font-bold" : ""
                  }`}
                  onClick={() => setAtivo(true)}
                >
                  Avaliação
                </button>
                <button
                  className={`w-1/2 h-full transition-all border-l border-black rounded-tr-md hover:bg-evolutiGreen ${
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
              <div className="w-full h-8 bg-[#b7b2b2]"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
