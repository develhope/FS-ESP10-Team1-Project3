import { React, useEffect, useState } from "react";
import categorias from "../INFOGENERAL/categorias.js";
import { useNavigate } from "react-router-dom";
export function Container() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Efecto para verificar la autenticación al montar el componente
  useEffect(() => {
    const register = localStorage.getItem("userInfo");
    if (register) {
      setIsAuthenticated(true);
    }
  }, []);


  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    navigate("/"); // Redirige a la página principal después del logout
  };

  return (
    <div className="container">
      <p className="container-text">

      {isAuthenticated ? (
      <span className="animated-text">
       Busca por etiquetas o <br/> usa el buscador y accede a <br/> los ultimos empleos ofertados
      </span>
    ) : (
     <>
        <span className="animated-text">
          Únete a una amplia red de <br/> contactos dentro de tu sector.
        </span>
        <br/><br/>
        <span className="animated-text">
          Tanto si eres solicitante o <br /> buscas proyectos, en
        </span>
        <br />
        <span className="animated-text">
        <strong className="animated-text">Freelance</strong>
          <strong className="highlight animated-text">Hub</strong>
        <span className="animated-text">es posible!</span> </span>
        </>
        )}
      </p>

      <div className="buscador">
        <input type="text" placeholder="Escribe lo que buscas..." />
        <button>Buscar</button>
      </div>

      <div className="frase-categoria">
      {isAuthenticated ? (
        <span>Ver mas...</span>
      ) : (
        <span>O también puedes buscar por categoria.</span>
        )}
      </div>

      <div className="categorias">
        {categorias.map((categoria) => (
          <button key={categoria}>{categoria}</button>
        ))}
      </div>
    </div>
  );
}
