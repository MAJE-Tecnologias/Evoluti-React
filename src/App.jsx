// Importando os componentes necessários da aplicação
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

// Importações de páginas e componentes relacionados a funcionários
import CadastroFunc from "./Components/Acesso/CadastroFunc"; // Página de cadastro de funcionários
import FuncionarioHome from "./Components/Funcionario/FuncionarioHome"; // Página inicial do funcionário
import FuncAtend from "./Components/Funcionario/FuncionarioAtendimento"; // Página de atendimento do funcionário
import FuncPaciente from "./Components/Funcionario/FuncionarioPaciente"; // Página de gestão de pacientes do funcionário

// Importando componentes e métodos necessários do React Router
import { Route, Routes } from "react-router-dom";
import CadastroCod from "./Components/Acesso/CadastroCod";
import AdminAceitar from "./Components/Admin/AdminAceitar";

// Definindo a função App, componente principal da aplicação
function App() {
  return (
    <>
      {/* Definindo as rotas da aplicação usando o componente Routes */}
      <Routes>
        {/* Rotas para páginas comuns */}
        {/* Página inicial */}
        <Route path="/" element={<Home />} />
        {/* Página de login */}
        <Route path="/Login" element={<Login />} />
        {/* Página de cadastro */}
        <Route path="/Cadastro" element={<Cadastro />} />
        {/* Página de cadastro com chave de administrador */}
        <Route path="/CadastroAdmKey" element={<CadastroAdmKey />} />

        {/* Rotas para páginas administrativas */}
        {/* Página principal do administrador */}
        <Route path="/AdminHome" element={<AdminHome />} />
        {/* Página de aceitação de administradores */}
        <Route path="/AdminAceitar" element={<AdminAceitar />} />
        {/* Página de gerenciamento de usuários/administradores */}
        <Route path="/AdminUsuarios" element={<AdminUsuarios />} />
        {/* Página de cadastro de funcionários */}
        <Route path="/CadastroFunc" element={<CadastroFunc />} />
        {/* Página de cadastro de código (administrador?) */}
        <Route path="/CadastroCod" element={<CadastroCod />} />

        {/* Rota padrão para página de erro (404 Not Found) */}
        <Route path="*" element={<NotFound />} />

        {/* Rotas para páginas de funcionários */}
        {/* Página inicial do funcionário */}
        <Route path="/FuncHome" element={<FuncionarioHome />} />
        {/* Página de atendimento do funcionário */}
        <Route path="/FuncAtend" element={<FuncAtend />} />
        {/* Página de gestão de pacientes do funcionário */}
        <Route path="/Funcpaciente" element={<FuncPaciente />} />
        {/* Página de adição de administradores */}
        <Route path="/AdminAdd" element={<AdminAdd />} />
      </Routes>
    </>
  );
}

// Exportando o componente App para ser utilizado em outros lugares
export default App;
