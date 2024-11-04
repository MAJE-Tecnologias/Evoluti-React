import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "./Components/HomeButton";

export default function Hero() {
  sessionStorage.setItem("acess", 0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="Hero" className="flex md:flex-col bg-white flex-col h-fit">
      <div className="relative w-full">
        <img src="src/assets/HeroNewImage.png" alt="" className="z-10" />
        <img
          src="src/assets/HeroNewImage2.png"
          alt=""
          className="absolute top-0 w-full z-0"
        />
        <div
          className="absolute z-10 bottom-8 left-1/2"
        >
          <HomeButton
            href="/cadastro"
            text="Começar"
            bgColor="bg-evolutiGreen"
            hoverColor="hover:bg-evolutiGreenDarker"
          />
        </div>

        <div className="invisible md:visible absolute right-8 top-28 max-w-[235px] text-white">
          <div className="relative">
            <img
              src="src/assets/Video.png"
              alt="Video Thumbnail"
              className="relative"
            />
            <button className="absolute bottom-0 right-0" onClick={openModal}>
              <img
                src="src/assets/PlayButton.svg"
                alt="Play Button Icon"
                className="hover:brightness-90"
              />
            </button>
          </div>
          <p className="font-light text-base mt-2">
            Bem-vindo ao{" "}
            <span className="font-bold">
              Evoluti: seu software de evolução médica.
            </span>
            Analise o progresso dos seus pacientes mergulhando em gráficos que
            revelam insights valiosos.
          </p>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
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
              className="bg-white p-8 rounded-lg max-w-4xl h-3/4 w-full relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <IoMdClose size={24} />
              </button>

              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/fMd6k-YafbY?autoplay=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
