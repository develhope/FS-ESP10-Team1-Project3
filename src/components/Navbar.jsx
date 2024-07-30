import { React, useState } from "react";
import "./css/Navbar.css";
import { Link } from "react-router-dom";
import { UseLogin } from "./UseLogin";
import { useNavigate } from "react-router-dom";

export function Navbar({ children }) {
  const navigate = useNavigate();
  const { goToLogin } = UseLogin();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  function toggleMobileMenu() {  // funciona para mostrar u ocultar el menú en u dispositivo móvil.
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <div className="navbar">
      <nav>
        <div className="navbar-logo">
          <a href='/'>
            Freelance<span className="highlight">Hub</span>
          </a>
        </div>
        <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
            ☰  
        </div>
        <ul
          className={`navbar-links ${isMobileMenuOpen ? "navbar-links-mobile" : ""}`}> 
          <li>
            <Link to="services">Solicitar Servicios</Link>
          </li>
          <li>
            <Link to="busqueda">Buscar Proyectos</Link>
          </li>
        </ul>
        <div className="navbar-button">
        <button onClick={() => navigate('/login', { state: { mode: 'login' } })}>Iniciar Sesión</button>
        <button onClick={() => navigate('/login', { state: { mode: 'register' } })}>Registrarte</button>
        <button onClick={() => navigate('/perfil')}>boton perfil de prueba</button>
        </div>
      </nav>
    </div>
  );
}
