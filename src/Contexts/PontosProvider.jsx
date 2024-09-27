// src/contexts/PontosContext.js
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

const PontosContext = createContext();

export const PontosProvider = ({ children }) => {
  const [circulos, setCirculos] = useState([]);
  const [numCirculos, setNumCirculos] = useState(0);
  const mounted = useRef(false); // Adicionando uma referência para verificar se o componente está montado

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

  return (
    <PontosContext.Provider value={{ circulos, numCirculos, setCirculos }}>
      {children}
    </PontosContext.Provider>
  );
};

export const usePontos = () => {
  return useContext(PontosContext);
};
