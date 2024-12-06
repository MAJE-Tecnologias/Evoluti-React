// src/contexts/PontosContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PontosContext = createContext();

export const PontosProvider = ({ children }) => {
  const [circulos, setCirculos] = useState([]);
  const [numCirculos, setNumCirculos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacienteId = sessionStorage.getItem("id");

        if (pacienteId) {
          const pacienteData = await fetchPacienteById(pacienteId);
          const pontosDorData = await fetchPontosDor();

          if (pacienteData.stats) {
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
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PontosContext.Provider value={{ circulos, numCirculos, setCirculos }}>
      {children}
    </PontosContext.Provider>
  );
};

export const usePontos = () => {
  return useContext(PontosContext);
};

// Função auxiliar de fetch para usuário
const fetchPacienteById = async (id) => {
  const response = await axios.get(`http://localhost:3000/Usuario?id=${id}`);
  return response.data;
};

// Função auxiliar de fetch para pontos de dor
const fetchPontosDor = async () => {
  const response = await axios.get(`http://localhost:3000/pontosdor`);
  return response.data;
};
