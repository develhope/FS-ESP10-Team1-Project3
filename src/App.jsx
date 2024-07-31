import { React } from 'react'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Proyectos } from './components/Proyectos'
import { Services } from './components/Services'
import Login from './components/Login'
import { Footer } from './components/Footer'
import Perfil from './components/Perfil'
import Info from './components/sidebar-items-perfil/Info'

export function App() {

  return (
   
    <div>
    
    <Navbar/>
    <Routes>
    <Route path="services" element={<Services/>} />
    <Route path="busqueda" element={<Proyectos/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/" element={<Container/>} />
    <Route path="/perfil" element={<Perfil/>} />
    <Route path="/perfil/0" element={<Info/>} />
    </Routes>

    <Footer/>
  
    </div>
  );
}


