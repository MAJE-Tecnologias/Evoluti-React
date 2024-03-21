import React from "react";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Logo from "/src/assets/Logo_Sem_fundo.png";

export default function MainNavbar() {
  return (
    <nav className="bg-white fixed w-full flex px-20 h-20 justify-between items-center border-b-2 
    border-gray-400 dark:bg-neutral-900 dark:border-gray-800 transition-all"></nav>
  );
}
