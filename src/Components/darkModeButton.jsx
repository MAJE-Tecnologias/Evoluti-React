import { useEffect, useState } from "react";

const darkModeButton = () => {
  const [modoEscuro, setModoEscuro] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (modoEscuro) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [modoEscuro]);

  const toggleDarkMode = () => {
    setModoEscuro(!modoEscuro);
  };

  return [modoEscuro, toggleDarkMode];
};

export default darkModeButton;
