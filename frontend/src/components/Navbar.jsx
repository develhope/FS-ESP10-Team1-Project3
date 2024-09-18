import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/Navbar.css";

export function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    logout({ returnTo: window.location.origin });
  };

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

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
            <>
              <div className="iniciar">
                <button
                  onClick={() => loginWithRedirect({ redirectUri: window.location.origin + "/sidebar" })}
                >
                  Iniciar Sesión
                </button>
              </div>
              <div className="registrarte">
                <button
                  onClick={() => loginWithRedirect({ redirectUri: window.location.origin + "/sidebar" })}
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
