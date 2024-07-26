import { React } from 'react'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Proyectos } from './components/Proyectos'
import { Services } from './components/Services'
import Login from './components/Login'
import { Footer } from './components/Footer'

export function App() {

  return (
   
    <div>
    
    <Navbar/>
    <Routes>
    <Route path="services" element={<Services/>} />
    <Route path="busqueda" element={<Proyectos/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/" element={<Container/>} />
    </Routes>

    <Footer/>
  
    </div>
  );
}


