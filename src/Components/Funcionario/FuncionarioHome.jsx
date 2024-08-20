import { useRef, useEffect, useState } from "react";
import backgroundImg from "../../assets/corpoHomem.png";
import axios from "axios";
import Modal from "../Funcionario/FuncionarioModal";
import "./ImageClickTracker.css"; // Assuming you have some CSS for styling

export default function MarcacaoPontosDor() {
  const [circulos, setCirculos] = useState([]);
  const [numCirculos, setNumCirculos] = useState(0); // Initialize with 0
  const [showModal, setShowModal] = useState(false);
  const [newCircle, setNewCircle] = useState(null);
  const [selectedColor, setSelectedColor] = useState('blue'); // Default color

  const mounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!mounted.current) {
          const pacienteResponse = await axios.get("http://localhost:3000/Paciente?id=19");
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
    if (circulos.length <= numCirculos) {
      const boundingRect = evento.target.getBoundingClientRect();
      const x = ((evento.clientX - boundingRect.left) / boundingRect.width) * 100;
      const y = ((evento.clientY - boundingRect.top) / boundingRect.height) * 100;

      setNewCircle({ x, y, cor: selectedColor });
      setShowModal(true);
    }
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
        const response = await axios.post("http://localhost:3000/PontosDor", {
          cord: { x: newCircle.x, y: newCircle.y },
          desc: data.description,
          titulo: data.titulo,
          cor: newCircle.cor
        });

        const newCircleWithId = { ...newCircle, id: response.data.id, desc: data.description, titulo: data.titulo };
        setCirculos([...circulos, newCircleWithId]);
      } catch (error) {
        console.error("Erro ao salvar dados na API:", error);
      }

      setNewCircle(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleColorChange = (color) => {
    console.log(selectedColor)
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
                key={indice}
                className="circle"
                style={{
                  backgroundColor: `${circulo.cor}`,
                  top: `${circulo.y}%`,
                  left: `${circulo.x}%`,
                }}
                onClick={() => lidarComCliqueCirculo(indice)}
              />
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

        <div className="w-full bg-white rounded-xl border-black">
          <h2>Posições dos Círculos na Imagem:</h2>
          <ul>
            {circulos.map((circulo, indice) => (
              <li key={indice}>
                Círculo {indice + 1}: X: {circulo.x}%, Y: {circulo.y}%
                <br />
                Título: {circulo.titulo}
                <br />
                Descrição do ponto de dor: {circulo.desc}
                <br />
                <button onClick={() => lidarComCliqueCirculo(indice)}>Remover</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
