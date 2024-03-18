// Importando os componentes necessários da aplicação
import Home from './Components/HeroPage/Home'
import Login from './Components/Acesso/Login'
import Cadastro from './Components/Acesso/Cadastro'
import NotFound from './Components/NotFound'
import CadastroAdmKey from './Components/Acesso/CadastroAdmKey'
import AdminHome from './Components/Admin/AdminHome'
import AdminCadastro from './Components/Admin/AdminCadastro'

// Importando componentes e métodos necessários do React Router
import { Route, Routes } from 'react-router-dom';

// Definindo a função App, componente principal da aplicação
function App() {
  return (
    <>
      {/* Definindo as rotas da aplicação usando o componente Routes */}
      <Routes>
        {/* Rota para a página inicial */}
        <Route path='/' element={<Home></Home>}></Route>
        {/* Rota para a página de login */}
        <Route path='/Login' element={<Login></Login>}></Route>
        {/* Rota para a página de cadastro */}
        <Route path='/Cadastro' element={<Cadastro></Cadastro>}></Route>
        {/* Rota para a página de cadastro com chave de administrador */}
        <Route path='/CadastroAdmKey' element={<CadastroAdmKey></CadastroAdmKey>}></Route>
        {/* Rota para a página principal do administrador */}
        <Route path='/AdminHome' element={<AdminHome></AdminHome>}></Route>
        {/* Rota para a página de cadastro de administrador */}
        <Route path='/AdminCadastro' element={<AdminCadastro></AdminCadastro>}></Route>
        {/* Rota para página de erro (404 Not Found) */}
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  )
}

// Exportando o componente App para ser utilizado em outros lugares
export default App
