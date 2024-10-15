import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useCustomAuth } from './UseCustomAuth';
import "./css/Navbar.css";

export function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [ tokenChecked, setTokenChecked] = useState(false);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch('http://localhost:5000/api/users/logout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token })
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
    logout({ returnTo: window.location.origin });
  };

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setTokenChecked(false);
        return;
      }

      try {
        const response = await fetch('https://freelancehub-4tr0.onrender.com/api/users/token', {
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
        setTokenChecked(data.loggedIn);
      } catch (error) {
        console.error('Error en la verificación del token:', error);
        setTokenChecked(false);
      }
    };

    checkToken();
  }, []);
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
        {!isAuthenticated && !tokenChecked && (
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
        {(isAuthenticated || tokenChecked) ? (
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
            <>
              <div className="iniciar">
                <button
                onClick={() => navigate("/login", { state: { mode: "login" } })}
                >
                
                  Iniciar Sesión
                </button>
              </div>
              <div className="registrarte">
                <button
                onClick={() => navigate("/login", { state: { mode: "register" } })}
                >
                  Registrarte
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
