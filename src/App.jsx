// Importações de páginas de usuário comuns
import Home from "./Pages/HeroPage/Home"; // Página inicial ou página principal
import Login from "./Pages/Acesso/Login"; // Página de login
import Cadastro from "./Pages/Acesso/Cadastro"; // Página de cadastro de usuário
import NotFound from "./Components/NotFound"; // Página de erro 404, para rotas não encontradas

// Importações de páginas e componentes relacionados à administração
import AdminHome from "./Pages/Admin/AdminHome"; // Página inicial do administrador
import AdminAdd from "./Pages/Admin/AdminAdd"; // Página de adição de recursos/administradores
import AdminUsuarios from "./Pages/Admin/AdminUsuarios"; // Página de gerenciamento de usuários/administradores
import CadastroAdmKey from "./Pages/Acesso/CadastroAdmKey"; // Página de cadastro de administrador com chave
import AdminAceitar from "./Pages/Admin/AdminAceitar"; // Página de aceitação de administradores
import AdminPacientes from "./Pages/Admin/AdminPacientes"; // Página de gerenciamento de pacientes

// Importações de páginas e componentes relacionados a funcionários
import CadastroFunc from "./Pages/Acesso/CadastroFunc"; // Página de cadastro de funcionários
import FuncionarioHome from "./Pages/Funcionario/FuncionarioHome";
import FuncAtend from "./Pages/Funcionario/FuncionarioAtendimento"; // Página de atendimento do funcionário
import FuncPaciente from "./Pages/Funcionario/FuncionarioPaciente"; // Página de gestão de pacientes do funcionário

// Importações de páginas e componentes relacionados a operadores
import OperadorHome from "./Pages/Operador/OperadorHome"; // Página inicial do operador
import OperadorStats from "./Pages/Operador/OperadorStats";

// Importações de componentes e métodos necessários do React Router
import { Route, Routes } from "react-router-dom";
import CadastroCod from "./Pages/Acesso/CadastroCod"; // Página de cadastro de código
import OperadorAdd from "./Pages/Operador/OperadorAdd";
import FuncAtendForm from "./Pages/Funcionario/FuncionarioAtendimentoForm";

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
        <Route path="/OperadorStats" element={<OperadorStats />} />
        {/* Rota padrão para página de erro (404 Not Found) */}
        <Route path="*" element={<NotFound />} /> {/* Página de erro 404 */}
      </Routes>
    </>
  );
}

// Exportando o componente App para ser utilizado em outros lugares
export default App;
