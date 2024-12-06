import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAtendimento } from "../../../services/funcServices"; // Import the service

export const FuncionarioCardAtendimento = ({ isOpen, hideDetalhes, detalhes }) => {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const [titulo, setTitulo] = useState(detalhes.titulo || "");
  const [diagnostico, setDiagnostico] = useState(""); // Initialize state as needed
  const [corpo, setCorpo] = useState(""); // Initialize state as needed
  const [selectedOption, setSelectedOption] = useState(""); // Initialize state as needed
  const [id] = useState(""); // Initialize with actual ID or pass it if necessary

  const updatePonto = async (e) => {
    e.preventDefault();
    const body = {
      titulo,
      tipo: selectedOption,
      diagnostico,
      corpo,
      idPaciente: id,
      data: new Date()
    };

    try {
      await createAtendimento(body);
      alert("Cadastrado com sucesso");
      navigate("/Funcatend");
    } catch (error) {
      console.error("Error creating atendimento:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={hideDetalhes}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={hideDetalhes}
          aria-label="Close"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <form onSubmit={updatePonto}>
          <div className="flex items-center justify-center flex-col relative space-y-4">
            <p className="font-bold text-2xl">Detalhes</p>
            <p>Titulo</p>
            <textarea
              className="w-full h-full rounded-lg rounded-t-none resize-none bg-[#E7E5E5] outline-none p-4"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            ></textarea>
            <p>Descrição</p>
            <textarea
              name="tratamentoText"
              id="tratamentoText"
              rows="10"
              className="w-full h-full rounded-lg rounded-t-none resize-none bg-[#E7E5E5] outline-none p-4"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            >
            </textarea>
            <button className="py-2 px-4 w-fit bg-evolutiLightGreen rounded-lg font-bold text-white self-center cursor-pointer transition-all ease-in-out hover:bg-evolutiGreen">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
