import { useState } from 'react'
import Hero from './Components/HeroPage/Hero'
import Login from './Components/Login/Login'
import Cadastro from './Components/Login/Cadastro'
import NotFound from './Components/NotFound'
import { Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Hero></Hero>}></Route>
        <Route path='/Login' element={<Login></Login>}></Route>
        <Route path='/Cadastro' element={<Cadastro></Cadastro>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </>
  )
}

export default App
