import { useRef, useEffect, useState } from "react";
import backgroundImg from "../../assets/corpoHomem.png";
import axios from "axios";
import Modal from "../Funcionario/FuncionarioModal";
import "./ImageClickTracker.css";
import "../CSS/ScrollStyle.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { FuncionarioCardAtendimento } from "./FuncionarioCardAtendimento";

export default function MarcacaoPontosDor() {
  const [circulos, setCirculos] = useState([]);
  const [numCirculos, setNumCirculos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newCircle, setNewCircle] = useState(null);
  const [selectedColor, setSelectedColor] = useState("blue"); // Default color
  const [detalhes, setDetalhes] = useState(false);

  const mounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!mounted.current) {
          const pacienteResponse = await axios.get(
            `http://localhost:3000/Paciente?id=${sessionStorage.getItem("id")}`
          );
          const pacienteData = pacienteResponse.data[0];

          const pontosDorResponse = await axios.get(
            "http://localhost:3000/PontosDor/"
          );
          const pontosDorData = pontosDorResponse.data;

          const filteredData = pontosDorData.filter((item) =>
            pacienteData.pontosDor.includes(item.id)
          );

          const circulosIniciais = filteredData.map((ponto) => ({
            id: ponto.id,
            x: ponto.cord.x,
            y: ponto.cord.y,
            desc: ponto.desc,
            cor: ponto.cor,
            titulo: ponto.titulo,
          }));

          setNumCirculos(circulosIniciais.length);
          setCirculos(circulosIniciais);

          mounted.current = true;
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  const lidarComClique = (evento) => {
    const boundingRect = evento.target.getBoundingClientRect();
    const x = ((evento.clientX - boundingRect.left) / boundingRect.width) * 100;
    const y = ((evento.clientY - boundingRect.top) / boundingRect.height) * 100;

    setNewCircle({ x, y, cor: selectedColor });
    setShowModal(true);
  };

  const lidarComCliqueCirculo = async (indice) => {
    const circuloToDelete = circulos[indice];
    const circulosAtualizados = circulos.filter((_, i) => i !== indice);
    setCirculos(circulosAtualizados);

    try {
      await axios.delete(
        `http://localhost:3000/PontosDor/${circuloToDelete.id}`
      );
    } catch (error) {
      console.error("Erro ao deletar o ponto na API:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    if (newCircle) {
      try {
        // POST request to create a new circle
        const response = await axios.post("http://localhost:3000/PontosDor", {
          cord: { x: newCircle.x, y: newCircle.y },
          desc: data.description,
          titulo: data.titulo,
          cor: newCircle.cor,
        });

        const newCircleWithId = {
          ...newCircle,
          id: response.data.id,
          desc: data.description,
          titulo: data.titulo,
        };

        // Update the local state with the new circle
        setCirculos((prevCirculos) => {
          const updatedCirculos = [...prevCirculos, newCircleWithId];
          // Send PATCH request to update the paciente data with the new circle's ID
          axios
            .patch(
              `http://localhost:3000/Paciente/${sessionStorage.getItem("id")}`,
              { pontosDor: updatedCirculos.map((c) => c.id) }
            )
            .then((response1) => {
              console.log(
                "Dados da clínica atualizados com sucesso:",
                response1.data
              );
            })
            .catch((error) => {
              console.error("Erro ao atualizar dados na API:", error);
            });
          return updatedCirculos;
        });

        // Clear the newCircle state after updating
        setNewCircle(null);
      } catch (error) {
        console.error("Erro ao salvar dados na API:", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showDetalhes = () => {
    setDetalhes(true);
  };

  const hideDetalhes = () => {
    console.log("hideDetalhes called");
    setDetalhes(false);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <>
      <div className="w-full flex-col justify-center lg:flex lg:flex-row ">
        <div className="image-container">
          <div className="image-wrapper">
            <img
              src={backgroundImg}
              alt="Imagem"
              className="background-image"
              onClick={lidarComClique}
            />

            {circulos.map((circulo, indice) => (
              <div
                key={circulo.id} // Changed key to use unique id
                className="circle flex justify-center items-center text-white font-bold"
                style={{
                  backgroundColor: `${circulo.cor}`,
                  top: `${circulo.y}%`,
                  left: `${circulo.x}%`,
                }}
                onClick={() => lidarComCliqueCirculo(indice)}
              >
                <span>{indice + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <Modal
          show={showModal}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          selectedColor={selectedColor} // Pass selectedColor to Modal
          onColorChange={handleColorChange} // Pass handleColorChange to Modal
        ></Modal>

        <FuncionarioCardAtendimento
          isOpen={detalhes}
          hideDetalhes={hideDetalhes}
        >
          <h2 className="text-xl font-semibold mb-4">Conteúdo da Modal</h2>
          <p>
          </p>
        </FuncionarioCardAtendimento>
      </div>
      <div className="relative w-full bg-[#E7E5E5] rounded-xl border-black overflow-y-scroll scrollable-container">
        <div className="absolute w-full p-4">
          <h2 className="font-extrabold text-2xl text-center border-b-2 border-black mb-4">
            PONTOS DE DOR
          </h2>
          <ul className="flex flex-col gap-y-4">
            {circulos.map((circulo, indice) => (
              <div
                key={circulo.id}
                className="w-full bg-white p-2 rounded-xl shadow-lg"
              >
                <li>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">
                      Marcação #{indice + 1}
                    </span>
                    <div
                      className="border-2 border-black w-5 h-5 rounded-full"
                      style={{ backgroundColor: circulo.cor }}
                    ></div>
                  </div>
                  <br />
                  <p className="font-bold font-poppins">
                    Título:{" "}
                    <span className="font-normal">{circulo.titulo}</span>
                  </p>
                  <br />
                  <p className="font-bold font-poppins">
                    Descrição do ponto de dor:{" "}
                  </p>
                  <span>{circulo.desc}</span>
                  <br />
                  <br />
                  <div className="flex items-center gap-x-2">
                    <button
                      className="flex justify-center items-center px-2 py-1 border-2 border-black 
                    rounded-xl bg-evolutiGreenDarker font-bold text-white gap-x-2 hover:brightness-90"
                      onClick={() => lidarComCliqueCirculo(indice)}
                    >
                      <FaTrashAlt /> Remover
                    </button>
                    <button
                      className="flex justify-center items-center px-2 py-1 border-2 border-black 
                    rounded-xl bg-evolutiLightBlueText font-bold text-white gap-x-2 hover:brightness-90"
                      onClick={showDetalhes}
                    >
                      <FaEdit /> Editar
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
