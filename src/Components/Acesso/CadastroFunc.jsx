import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import FancyText from "@carefully-coded/react-text-gradient";

export default function CadastroFunc() {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  function verificaCodigo() {}

  return (
    <>
      <form onSubmit={verificaCodigo()}>
        <label>Insira codigo</label>
        <input type="text" onChange={(e) => setCodigo(e.target.value)} />
        <input type="submit" />
      </form>
    </>
  );
}
