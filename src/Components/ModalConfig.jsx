import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const Modal = ({ isOpen, onClose }) => {
  const [usuario, setUsuario] = useState(null);

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white h-[640px] rounded-xl max-w-4xl w-full relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <IoMdClose size={24} />
              </button>

              <div className="relative w-full bg-evolutiGreenDarker h-36 rounded-t-xl text-center"></div>
              <div className="absolute w-full h-full pb-16 top-16 dark:text-black">
                <div className="flex flex-col text-center items-center w-full pb-11 z-50">
                  <img
                    className="rounded-full h-36 w-36"
                    src="https://picsum.photos/48/48"
                    alt="User Avatar"
                  />
                  <p className="font-medium text-3xl pb-4">{usuario.Nome}</p>
                  <p className="text-2xl">{usuario.Profissao}</p>
                </div>
                <div className="p-8 pt-0">
                  <p className="truncate">Email: {usuario.Email}</p>
                  <hr className="my-6 border-neutral-400" />
                  <div className="flex flex-col items-center pb-6 w-full">
                    <a href="">Termos e Política de Privacidade</a>
                    <a href="" className="w-fit">Ajuda</a>
                  </div>
                  <div className="flex gap-x-2">
                    <button
                      className="py-2 w-full bg-evolutiGreen text-white rounded-xl hover:bg-evolutiGreenDarker transition-colors"
                      onClick={onClose}
                    >
                      Voltar
                    </button>
                    <button className="py-2 w-full bg-neutral-400 text-white rounded-xl hover:bg-neutral-500 transition-colors">
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
