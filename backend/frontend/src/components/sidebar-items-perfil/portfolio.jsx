import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/portfolio.css";
function Portfolio() {
  const token = localStorage.getItem("token");
  const [portfolioData, setPortfolioData] = useState(() => {
    let portfolioExistente = localStorage.getItem("userHabilidades");
    
    if (!portfolioExistente) {
      const portfolioYhabilidades = {
        link: "",
        habilidades: []
      };
      portfolioExistente = JSON.stringify(portfolioYhabilidades);
      localStorage.setItem("userHabilidades", portfolioExistente);
    }
    
    return JSON.parse(portfolioExistente);
  });
  const [portfolio, setPortfolio] = useState("");
  const [habilidadesDisponibles, setHabilidadesDisponibles] = useState([
    "javascript", "react", "typescript", "node", "java", "python","C++", "HTML", "CSS",
  "SQL", "MongoDB", "Git", "Docker", "AWS", "Azure"
  ]);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [habilidades, setHabilidades] = useState([]);
  const [habilidadesEnDb, setHabilidadesEnDb] = useState([]);
  const actualizarLinkPortfolio = (event) => {
    event.preventDefault();
    setPortfolio(event.target.value);
  };
  const guardarPortf = async (event) => {
    event.preventDefault();
    const userDataPortf = {
      token: token,
    };
  
    // Iterar sobre las habilidades para hacer un fetch por cada una
    try {
      console.log(habilidades);
      
      for (const habilidad of habilidades) {
        if (!habilidadesEnDb.includes(habilidad)) {
          const data = {
            ...userDataPortf,
            name: habilidad,
          };
    
          const response = await fetch('https://freelancehub-4tr0.onrender.com/api/skills', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            console.log(`Habilidad ${habilidad} guardada exitosamente.`);
          } else {
            console.error(`Error al guardar la habilidad ${habilidad}:`, response.statusText);
          }
        } 
      }
      // Almacenar todas las habilidades en el localStorage si se guarda correctamente
      localStorage.setItem('userHabilidades', JSON.stringify(habilidades));
    } catch (error) {
      console.error("Error interno: ", error);
    }
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await fetch('https://freelancehub-4tr0.onrender.com/api/users/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInfo.email,
          link: portfolio
        })
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el enlace del portfolio');
      }
  
      const data = await response.json();
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };
  const manejarBusqueda = (event) => {
    const value = event.target.value;
    setBusqueda(value);
    setMostrarLista(value.length >0);
  }
  const habilidadesPosibles = habilidadesDisponibles.filter(habilidad =>
    habilidad.toLowerCase().includes(busqueda.toLowerCase()) &&
    !habilidades.includes(habilidad.toLowerCase())
  );
  const seleccionarHabilidad = (habilidad) => {
    if (!habilidades.includes(habilidad)) {
     
      setHabilidades([...habilidades, habilidad]);
    }
    setBusqueda('');
    setMostrarLista(false);
  };
  const eliminarHabilidad = async (habilidad) => {
    try {
      const response = await fetch('https://freelancehub-4tr0.onrender.com/api/skills', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token, name: habilidad }),
      });
  
      if (response.ok) {
        console.log(`Habilidad "${habilidad}" eliminada exitosamente.`);
        setHabilidades(habilidades.filter(hab => hab !== habilidad));
      } else {
        console.error(`Error al eliminar la habilidad "${habilidad}":`, response.statusText);
      }
    } catch (error) {
      console.error('Error interno:', error);
    }
  };
  useEffect(() => {
    const fetchDataHab = async () => {
      try {
        const token = localStorage.getItem("token");
    const response = await fetch('https://freelancehub-4tr0.onrender.com/api/skills/getAll', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token})
    });
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      
      const habilidadesNombres = data.map(habilidad => habilidad.name);
      console.log("entra", habilidadesNombres);
      
      setHabilidades(habilidadesNombres);
      localStorage.setItem("userHabilidades", JSON.stringify(data));
    }
  } catch (error) {
    console.error("error al cargar las cuentas bancarias", error);
  }
  }
  const fetchDataLink = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const response = await fetch('https://freelancehub-4tr0.onrender.com/api/users/portfolio', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: userInfo.email })
  });
  if (response.ok) {
    const data = await response.json();
    setPortfolio(data.linkportfolio);
    localStorage.setItem("userLinkPortfolio", JSON.stringify(data.linkportfolio));
  }
} catch (error) {
  console.error("error al cargar el link al portfolio", error);
}
}
  fetchDataHab();
  fetchDataLink();
  }, []);
    return (
        <div className="div-sidebar-element-portfolio">
        <div className="portfolio-habilidades">
        <form onSubmit={guardarPortf}>
        <div className="texto-input">
        <p className="texto-campos-perfil">Link al portfolio</p>
        <input
          type="text"
          className="inputs-perfil"
          placeholder="link a tu portfolio"
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
          <button type="button" className="botonBorrarHabilidad"onClick={() => eliminarHabilidad(habilidad)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
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