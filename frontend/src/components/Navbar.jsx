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
    const register = localStorage.getItem("userInfo");
    if (register) {
      setIsAuthenticated(true); // Si existe userInfo en localStorage, el usuario está autenticado
    }
  }, []);

  // Función para manejar la autenticación

  const handleLogout = () => {
    // Al cerrar sesión, eliminamos la información del usuario del localStorage
    // y actualizamos el estado de autenticación.
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    window.location.href = `/`;
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
              <button onClick={() => navigate("/sidebar")}>
                boton sidebar de prueba
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
