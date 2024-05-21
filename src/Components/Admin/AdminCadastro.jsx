import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHomeSidebar, {
  ItemsSidebar,
} from "../Suplementares/AdminHomeSidebar";
import "../CSS/AnimacaoFlutuar.css";

import { FiPlusCircle } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { FaUserInjured, FaFileAlt, FaFileUpload } from "react-icons/fa";
import { VscGraph } from "react-icons/vsc";

export default function AdminCadastro() {
  return (
    <>
      <div>
        <AdminHomeSidebar />
        
      </div>
    </>
  );
}
