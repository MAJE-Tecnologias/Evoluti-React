import { useRef, useEffect, useState } from "react";
import Modal from "./Components/FuncionarioModal";
import "./ImageClickTracker.css";
import backgroundImg1 from "../../assets/MDP_MasculinoFrente.png";
import backgroundImg2 from "../../assets/MDP_MasculinoLadoD.png";
import backgroundImg3 from "../../assets/MDP_MasculinoCostas.png";
import backgroundImg4 from "../../assets/MDP_MasculinoLadoE.png";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  fetchPontosDor,
  fetchPacienteById,
  deletePontoDor,
  addPontoDor,
  updatePacientePontosDor,
} from "../../services/funcServices";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { usePontos } from "../../Contexts/PontosProvider";

export default function MarcacaoPontosDor() {
  const {circulos, setCirculos} = usePontos();
  const [numCirculos, setNumCirculos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [newCircle, setNewCircle] = useState(null);
  const [selectedColor, setSelectedColor] = useState("blue");
  const [detalhes, setDetalhes] = useState(false);
  const [pointerCirculo, setPointerCirculo] = useState(null);
  const [imagemAtual, setImagemAtual] = useState(0); // 0: frente, 1: lado, 2: costas

  if (!circulos || !setCirculos) {
    console.error("O contexto Pontos não foi carregado corretamente.");
    return null;
  }

  const imagens = [
    backgroundImg1,
    backgroundImg2,
    backgroundImg3,
    backgroundImg4,
  ];
  const mounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!mounted.current) {
          const pacienteId = sessionStorage.getItem("id");
          const pacienteData = await fetchPacienteById(pacienteId);
          const pontosDorData = await fetchPontosDor();

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
        console.error("Erro ao buscar dados:", error);
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
      await deletePontoDor(circuloToDelete.id);
    } catch (error) {
      console.error("Erro ao deletar ponto de dor:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    if (newCircle) {
      try {
        const novoPonto = {
          cord: { x: newCircle.x, y: newCircle.y },
          desc: data.description,
          titulo: data.titulo,
          cor: newCircle.cor,
        };

        const response = await addPontoDor(novoPonto);
        const newCircleWithId = {
          ...newCircle,
          id: response.id,
          desc: data.description,
          titulo: data.titulo,
        };

        setCirculos((prevCirculos) => {
          const updatedCirculos = [...prevCirculos, newCircleWithId];
          updatePacientePontosDor(
            sessionStorage.getItem("id"),
            updatedCirculos.map((c) => c.id)
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

        setNewCircle(null);
      } catch (error) {
        console.error("Erro ao salvar dados:", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showDetalhes = (index) => {
    setPointerCirculo(index);
    setDetalhes(true);
  };

  const hideDetalhes = () => {
    setDetalhes(false);
    setPointerCirculo(null);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const nextImage = () => {
    setImagemAtual((prev) => (prev + 1) % imagens.length);
  };

  const prevImage = () => {
    setImagemAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  return (
    <>
      <div className="h-full">
        <img
          src={imagens[imagemAtual]}
          alt="Imagem do corpo humano"
          className=""
          onClick={lidarComClique}
        />

        {circulos.map((circulo, indice) => (
          <div
            key={circulo.id}
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

        <Modal
          show={showModal}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
        />
      </div>

      <div className="absolute flex right-8 bottom-12 gap-x-2">
        <button
          onClick={prevImage}
          className="p-2 text-slate-600 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors"
        >
          <LuArrowLeft />
        </button>
        <button
          onClick={nextImage}
          className="p-2 text-slate-600 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors"
        >
          <LuArrowRight />
        </button>
      </div>
    </>
  );
}
