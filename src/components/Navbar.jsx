import {React} from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar({ children }) {

  const navigate = useNavigate();

  function handleClickButton() {
    navigate('/login');
  }


  return (
    <div className="navbar">
      <nav>
        <div className="navbar-logo">
          <a href="">FreelanceHub</a>
        </div>
        <ul className="navbar-links">
          <li>
          <Link to="services">Solicitar Servicios</Link>
          </li>
          <li>
          <Link to="busqueda">Buscar Proyectos</Link>
          </li>
        </ul>
        <div className="navbar-button">
        <button onClick={handleClickButton}>Iniciar sesión</button>
        </div>
      </nav>
    </div>
  );
}

