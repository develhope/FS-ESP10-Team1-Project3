import { React } from 'react'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Proyectos } from './components/Proyectos'
import { Services } from './components/Services'

export function App() {

  return (
   
    <div>
    
    <Navbar>    
    
    </Navbar>
    <Routes>
    <Route path="services" element={<Services/>} />
    <Route path="busqueda" element={<Proyectos/>} />
    </Routes>
  
   
    <Container/>
  
    </div>
  );
}


