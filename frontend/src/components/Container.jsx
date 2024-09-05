import { React, useEffect, useState } from "react";
import categorias from "../INFOGENERAL/categorias.js";
import { useNavigate } from "react-router-dom";
export function Container() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Efecto para verificar la autenticación al montar el componente
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
      throw new Error('No hay token en el localStorage');
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/users/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
    
        if (!response.ok) {
          throw new Error('Error al verificar el token');
        }
    
        const data = await response.json();
        if (data.loggedIn) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          }
      } catch (error) {
        console.error('Error en la verificación del token:', error);
      }
    };
    checkToken();
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
