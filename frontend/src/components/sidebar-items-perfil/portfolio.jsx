import { useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/portfolio.css";
function Portfolio() {
  const [portfolioData, setPortfolioData] = useState(() => {
    let portfolioExistente = localStorage.getItem("userPortfolio");
    
    if (!portfolioExistente) {
      const portfolioYhabilidades = {
        link: "link a tu portfolio",
        habilidades: []
      };
      portfolioExistente = JSON.stringify(portfolioYhabilidades);
      localStorage.setItem("userPortfolio", portfolioExistente);
    }
    
    return JSON.parse(portfolioExistente);
  });
  const [portfolio, setPortfolio] = useState(portfolioData.link);
  const [habilidadesDisponibles, setHabilidadesDisponibles] = useState([
    "javascript", "react", "typescript", "node", "java", "python","C++", "HTML", "CSS",
  "SQL", "MongoDB", "Git", "Docker", "AWS", "Azure"
  ]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [habilidades, setHabilidades] = useState(portfolioData.habilidades);
  const actualizarLinkPortfolio = (event) => {
    event.preventDefault();
    setPortfolio(event.target.value);
  };
    const guardarPortf = (event) => {
    event.preventDefault();
    const userDataPortf = {
     link: portfolio,
     habilidades: habilidades
    };
    const userDataPortStrings = JSON.stringify(userDataPortf);
    localStorage.setItem("userPortfolio", userDataPortStrings);
  };
  const manejarBusqueda = (event) => {
    const value = event.target.value;
    setBusqueda(value);
    setMostrarLista(value.length >0);
  }
  const habilidadesPosibles = habilidadesDisponibles.filter(habilidad =>
    habilidad.toLowerCase().includes(busqueda.toLowerCase()) &&
    !habilidades.includes(habilidad)
  );
  const seleccionarHabilidad = (habilidad) => {
    if (!habilidades.includes(habilidad)) {
      setHabilidades([...habilidades, habilidad]);
    }
    setBusqueda('');
    setMostrarLista(false);
  };
  const eliminarHabilidad = (habilidad) => {
    setHabilidades(habilidades.filter(hab => hab !== habilidad));
  };
    return (
        <div className="div-sidebar-element-portfolio">
        <div className="portfolio-habilidades">
        <form onSubmit={guardarPortf}>
        <div className="texto-input">
        <p className="texto-campos-perfil">Link al portfolio</p>
        <input
          type="text"
          className="inputs-perfil"
          value={portfolio}
          onChange={actualizarLinkPortfolio}
        ></input>
      </div>
      <div className="texto-input-habilidades">
        <p className="texto-campos-perfil">Habilidades</p>
      <input type="text" 
      className="buscador-habilidades"
      value={busqueda} 
      onChange={manejarBusqueda} 
      placeholder="Buscar habilidades" ></input></div>
      <div className="habilidades-estructura-listas">
      <div className="habilidadesSeleccionadas">
      {habilidades.map((habilidad, index) => (
        <div key={index} className="habilidad-tag">
          {habilidad}
          <button classname="botonBorrarHabilidad"onClick={() => eliminarHabilidad(habilidad)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
        </div>
      ))}
    </div>
      {mostrarLista && (
        <ul className="listaHabilidades">
          {habilidadesPosibles.map((habilidad, index) => (
            <li className="liHabilidades" key={index} onClick={() => seleccionarHabilidad(habilidad)}>
              {habilidad}
            </li>
          ))}
        </ul>
      )}
      
    </div>
    
      <button type="submit" className="actualizarDatosPerfil">Guardar cambios</button>
      
        </form>
        </div>
        </div>
        
    )
}
export default Portfolio;