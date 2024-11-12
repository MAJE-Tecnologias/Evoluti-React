import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus, LuPlusCircle } from "react-icons/lu";

const Modal = ({ show, onClose, onSubmit, selectedColor, onColorChange }) => {
  const [titulo, setTitulo] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ titulo, description, selectedColor });
    setTitulo("");
    setDescription("");
    onClose();
  };

  const handleColorChange = (color) => {
    onColorChange(color);
  };

  // Definindo cores de acordo com os níveis de dor
  const colorScale = [
    { color: "#22c55e", label: "0" },
    { color: "#22c55e", label: "1" },
    { color: "#22c55e", label: "2" },
    { color: "#22c55e", label: "3" },
    { color: "#eab308", label: "4" },
    { color: "#eab308", label: "5" },
    { color: "#eab308", label: "6" },
    { color: "#dc2626", label: "7" },
    { color: "#dc2626", label: "8" },
    { color: "#dc2626", label: "9" },
    { color: "#dc2626", label: "10" },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gray-900 opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <motion.div
            className="bg-white rounded-3xl w-[672px] max-w-2xl min-w-[320px] relative z-10 dark:bg-neutral-900"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between py-4 px-6 border-b border-slate-200">
              <h1 className="flex items-center gap-x-2 text-slate-500 font-medium text-xl dark:text-white">
                <LuPlusCircle /> Novo ponto de dor
              </h1>
              <button
                className="text-slate-600 hover:text-slate-700 dark:text-white"
                onClick={onClose}
              >
                <IoClose size={25} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col px-6 pt-4 pb-8 gap-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="modalTitle"
                    className="text-slate-500 mb-2 dark:text-white"
                  >
                    Título do Tratamento:
                  </label>
                  <input
                    id="modalTitle"
                    type="text"
                    className="flex-grow outline-none rounded-xl p-3 border border-slate-200 dark:bg-neutral-900 dark:text-white"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Insira o título do ponto de dor"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="descricaoPonto"
                    className="text-slate-500 mb-2 dark:text-white"
                  >
                    Descrição do tratamento:
                  </label>
                  <textarea
                    name="descricaoPonto"
                    id="descricaoPonto"
                    className="flex-grow resize-none p-2 h-24 border border-slate-200 rounded-xl dark:bg-neutral-900 dark:text-white"
                    value={description}
                    placeholder="Insira a descrição do ponto de dor"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <p className="text-slate-500 mb-2 dark:text-white">
                  Nível de dor:
                </p>
                <div className="flex justify-center gap-x-2">
                  {colorScale.map(({ color, label }, index) => (
                    <ColorButton
                      key={index}
                      color={color}
                      label={label}
                      onClick={() => handleColorChange(color)}
                      isSelected={selectedColor === color}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center p-6 gap-x-6 border-t border-slate-200">
                <button
                  type="button"
                  className="border border-slate-200 py-3 w-1/2 rounded-lg text-red-600 font-medium transition-colors
                  hover:bg-slate-100 dark:bg-slate-100 dark:hover:bg-slate-200"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="border border-slate-200 bg-evolutiGreen py-3 w-1/2 rounded-lg font-medium dark:text-white
                  transition-colors hover:bg-evolutiGreenDarker"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ColorButton = ({ color, onClick, isSelected, label }) => {
  return (
    <button
      className={`flex items-center justify-center w-12 h-12 rounded-lg border border-transparent transition-all
        hover:brightness-75 hover:border-black hover:shadow-md`}
      style={{
        backgroundColor: color,
        border: isSelected ? "2px solid #333" : "",
      }}
      onClick={onClick}
    >
      <span className="text-white font-bold">{label}</span>
    </button>
  );
};

export default Modal;
