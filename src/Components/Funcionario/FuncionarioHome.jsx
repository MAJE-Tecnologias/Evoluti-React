import { useRef, useEffect, useState } from "react";
import backgroundImg from "../../assets/corpoHomem.png";
import axios from "axios";
import Modal from "../Funcionario/FuncionarioModal";
import "./ImageClickTracker.css";
import { FaTrashAlt } from "react-icons/fa";

export default function MarcacaoPontosDor() {
  const [circulos, setCirculos] = useState([]);
  const [numCirculos, setNumCirculos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newCircle, setNewCircle] = useState(null);
  const [selectedColor, setSelectedColor] = useState('blue'); // Default color

  const mounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!mounted.current) {
          const pacienteResponse = await axios.get(`http://localhost:3000/Paciente?id=${sessionStorage.getItem("id")}`);
          const pacienteData = pacienteResponse.data[0];

          const pontosDorResponse = await axios.get("http://localhost:3000/PontosDor/");
          const pontosDorData = pontosDorResponse.data;

          const filteredData = pontosDorData.filter(item => pacienteData.pontosDor.includes(item.id));

          const circulosIniciais = filteredData.map(ponto => ({
            id: ponto.id,
            x: ponto.cord.x,
            y: ponto.cord.y,
            desc: ponto.desc,
            cor: ponto.cor,
            titulo: ponto.titulo
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
      await axios.delete(`http://localhost:3000/PontosDor/${circuloToDelete.id}`);
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
          cor: newCircle.cor
        });

        const newCircleWithId = {
          ...newCircle,
          id: response.data.id,
          desc: data.description,
          titulo: data.titulo
        };

        // Update the local state with the new circle
        setCirculos(prevCirculos => {
          const updatedCirculos = [...prevCirculos, newCircleWithId];
          // Send PATCH request to update the paciente data with the new circle's ID
          axios.patch(`http://localhost:3000/Paciente/${sessionStorage.getItem("id")}`, { pontosDor: updatedCirculos.map(c => c.id) })
            .then(response1 => {
              console.log("Dados da clínica atualizados com sucesso:", response1.data);
            })
            .catch(error => {
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
                <span>{indice+1}</span>
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
        >
          <h2>Informações Adicionais</h2>
          <p>Insira aqui o conteúdo do modal relacionado ao novo ponto adicionado.</p>
        </Modal>

      </div>
      <div className="relative w-full bg-white rounded-xl border-black">
        <div className="absolute overflow-y-scroll w-full p-4">
          <h2>Posições dos Círculos na Imagem:</h2>
          <ul className="flex flex-col gap-y-4">
            {circulos.map((circulo, indice) => (
              <div key={circulo.id} className="w-full p-2 border-2 border-black rounded-xl shadow-lg"> {/* Changed key to use unique id */}
                <li>
                  <span className="font-bold text-lg">Marcação #{indice + 1}</span>
                  <br />
                  <p className="font-bold font-poppins">Título: <span className="font-normal">{circulo.titulo}</span></p>
                  <br />
                  <p className="font-bold font-poppins">Descrição do ponto de dor: </p><span>{circulo.desc}</span>
                  <br />
                  <br />
                  <button className="flex justify-center items-center px-2 py-1 border-2 border-black rounded-xl bg-evolutiGreenDarker font-bold text-white gap-x-2" onClick={() => lidarComCliqueCirculo(indice)}>
                    <FaTrashAlt /> Remover
                  </button>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
