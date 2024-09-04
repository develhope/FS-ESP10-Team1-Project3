import { React, useEffect, useState } from "react";
import "./css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export function Navbar({ children }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Función para manejar la autenticación

  const handleLogout = async () => {
    // Obtén el token del localStorage
    const token = localStorage.getItem("token");
  
    try {
      // Realiza el fetch para cerrar sesión
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token: token }) // Si el servidor espera el token en el cuerpo
      });
  
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      window.location.href = `/`;
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  function toggleMobileMenu() {
    // funciona para mostrar u ocultar el menú en u dispositivo móvil.
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  console.log("Navbar isAuthenticated:", isAuthenticated);

  return (
    <div className="navbar">
      <nav>
        <div className="navbar-logo-y-navbar-menu">
          <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
            ☰
          </div>
          <div className="navbar-logo">
            <a href="/">
              Freelance<span className="highlight">Hub</span>
            </a>
          </div>
        </div>
        {!isAuthenticated && (
          <ul
            className={`navbar-links ${
              isMobileMenuOpen ? "navbar-links-mobile" : ""
            }`}
          >
            <li>
              <Link to="services">Solicitar Servicios</Link>
            </li>
            <li>
              <Link to="busqueda">Buscar Proyectos</Link>
            </li>
          </ul>
        )}
        <div className="navbar-button">
          {isAuthenticated ? (
            <div className="icon-navbar">
              <FontAwesomeIcon icon={faBell} className="icon" />
              <FontAwesomeIcon icon={faMessage} className="icon" />
              <FontAwesomeIcon
                icon={faUser}
                className="icon"
                onClick={() => navigate("/sidebar")}
              />
              <button className="button-logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => navigate("/login", { state: { mode: "login" } })}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() =>
                  navigate("/login", { state: { mode: "register" } })
                }
              >
                Registrarte
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
