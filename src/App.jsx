import { useState } from 'react'
import Home from './Components/HeroPage/Home'
import Login from './Components/Acesso/Login'
import Cadastro from './Components/Acesso/Cadastro'
import NotFound from './Components/NotFound'
import CadastroAdmKey from './Components/Acesso/CadastroAdmKey'
import AdminHome from './Components/Admin/AdminHome'

import AdminCadastro from './Components/Admin/AdminCadastro'

import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/Cadastro' element={<Cadastro></Cadastro>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
        <Route path='/CadastroAdmKey' element={<CadastroAdmKey></CadastroAdmKey>}></Route>
        <Route path='/AdminHome' element={<AdminHome></AdminHome>}></Route>
        <Route path='/AdminCadastro' element={<AdminCadastro></AdminCadastro>}></Route>
      </Routes>
    </>
  )
}

export default App
