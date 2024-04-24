import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import FancyText from "@carefully-coded/react-text-gradient";

export default function CadastroCod() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  function verificaCodigo(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/Clinica?_sort=-id`, { method: "GET" })
      .then((response) => response.json())
      .then((respostas) => {
        if (respostas && respostas.length > 0) {
          for (let i = 0; i < respostas.length; i++) {
            console.log(respostas[i])
            if (codigo === respostas[i].id) {
              alert("Acessando clinica " + respostas[i].nome);
              localStorage.setItem("idClinica", respostas[i].id)
              navigate("/cadastrofunc"); 
              break;
            }
          }
        }
      })
      .catch((error) => console.error("Failed to fetch data:", error));
  }

  return (
    <>
      <form onSubmit={verificaCodigo}>
        <label>Insira codigo</label>
        <input type="text" onChange={(e) => setCodigo(e.target.value)} />
        <input type="submit" />
      </form>
    </>
  );
}
