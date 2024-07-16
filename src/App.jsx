import { React } from 'react'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { Link, Route, Routes } from 'react-router-dom'
import { Proyectos } from './components/Proyectos'

export function App() {

  return (
   
    <div>
    
    <Navbar>    
     leftChildren ={<Link to="services">Solicitar Servicios</Link>} | rightChildren = {<Link to="busqueda">Buscar Proyectos</Link>} 
    </Navbar>
    <Routes>
    <Route path="/busqueda" element={<Proyectos/>} />
    </Routes>
  
   
    <Container/>
  
    </div>
  );
}


