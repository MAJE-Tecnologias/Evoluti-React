import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const id = sessionStorage.getItem("idUsuario");
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Usuario?id=${id}`);
        const respostas = response.data;
        if (respostas.length > 0) {
          const usuarioData = respostas[0];
          setUsuario({
            Nome: usuarioData.Nome,
            Email: usuarioData.Email,
            Profissao: usuarioData.Profissao,
          });
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUsuario(null);
      }
    };

    fetchUsuario();
  }, [id]);

  return (
    <UserContext.Provider value={usuario}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
