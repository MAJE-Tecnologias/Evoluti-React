// Importações de páginas de usuário comuns
import Home from "./Components/HeroPage/Home"; // Página inicial ou página principal
import Login from "./Components/Acesso/Login"; // Página de login
import Cadastro from "./Components/Acesso/Cadastro"; // Página de cadastro de usuário
import NotFound from "./Components/NotFound"; // Página de erro 404, para rotas não encontradas

// Importações de páginas e componentes relacionados à administração
import AdminHome from "./Components/Admin/AdminHome"; // Página inicial do administrador
import AdminAdd from "./Components/Admin/AdminAdd"; // Página de adição de recursos/administradores
import AdminUsuarios from "./Components/Admin/AdminUsuarios"; // Página de gerenciamento de usuários/administradores
import CadastroAdmKey from "./Components/Acesso/CadastroAdmKey"; // Página de cadastro de administrador com chave
import AdminAceitar from "./Components/Admin/AdminAceitar"; // Página de aceitação de administradores
import AdminPacientes from "./Components/Admin/AdminPacientes"; // Página de gerenciamento de pacientes

// Importações de páginas e componentes relacionados a funcionários
import CadastroFunc from "./Components/Acesso/CadastroFunc"; // Página de cadastro de funcionários
import FuncionarioHome from "./Components/Funcionario/FuncionarioHome"; // Página inicial do funcionário
import FuncAtend from "./Components/Funcionario/FuncionarioAtendimento"; // Página de atendimento do funcionário
import FuncPaciente from "./Components/Funcionario/FuncionarioPaciente"; // Página de gestão de pacientes do funcionário

// Importações de páginas e componentes relacionados a operadores
import OperadorHome from "./Components/Operador/OperadorHome"; // Página inicial do operador

// Importações de componentes e métodos necessários do React Router
import { Route, Routes } from "react-router-dom";
import CadastroCod from "./Components/Acesso/CadastroCod"; // Página de cadastro de código
import OperadorAdd from "./Components/Operador/OperadorAdd";
import FuncAtendForm from "./Components/Funcionario/FuncionarioAtendimentoForm";

// Definindo a função App, componente principal da aplicação
function App() {
  return (
    <>
      {/* Definindo as rotas da aplicação usando o componente Routes */}
      <Routes>
        {/* Rotas para páginas comuns */}
        <Route path="/" element={<Home />} /> {/* Página inicial */}
        <Route path="/Login" element={<Login />} /> {/* Página de login */}
        <Route path="/Cadastro" element={<Cadastro />} />{" "}
        {/* Página de cadastro */}
        <Route path="/CadastroAdmKey" element={<CadastroAdmKey />} />{" "}
        {/* Página de cadastro com chave de administrador */}
        {/* Rotas para páginas administrativas */}
        <Route path="/AdminHome" element={<AdminHome />} />{" "}
        {/* Página principal do administrador */}
        <Route path="/AdminAceitar" element={<AdminAceitar />} />{" "}
        {/* Página de aceitação de administradores */}
        <Route path="/AdminUsuarios" element={<AdminUsuarios />} />{" "}
        {/* Página de gerenciamento de usuários/administradores */}
        <Route path="/AdminPaciente" element={<AdminPacientes />} />{" "}
        {/* Página de gerenciamento de pacientes */}
        <Route path="/AdminAdd" element={<AdminAdd />} />{" "}
        {/* Página de adição de administradores */}
        <Route path="/CadastroCod" element={<CadastroCod />} />{" "}
        {/* Página de cadastro de código */}
        {/* Rotas para páginas de funcionários */}
        <Route path="/FuncHome" element={<FuncionarioHome />} />{" "}
        {/* Página inicial do funcionário */}
        <Route path="/FuncAtend" element={<FuncAtend />} />{" "}
        {/* Página de atendimento do funcionário */}
        <Route path="/Funcpaciente" element={<FuncPaciente />} />{" "}
        {/* Pagina de atendimento com formulario */}
        <Route path="/FuncAtendForm" element={<FuncAtendForm />} />
        {/* Página de gestão de pacientes do funcionário */}
        <Route path="/CadastroFunc" element={<CadastroFunc />} />{" "}
        {/* Página de cadastro de funcionários */}
        {/* Rotas para páginas de operadores */}
        <Route path="/OperadorHome" element={<OperadorHome />} />{" "}
        {/* Página inicial do operador */}
        <Route path="/OperadorAdd" element={<OperadorAdd />} />
        {/* Rota padrão para página de erro (404 Not Found) */}
        <Route path="*" element={<NotFound />} /> {/* Página de erro 404 */}
      </Routes>
    </>
  );
}

// Exportando o componente App para ser utilizado em outros lugares
export default App;
