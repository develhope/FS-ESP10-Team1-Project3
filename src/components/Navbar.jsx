import {React} from "react";

export function Navbar({ leftChildren, rightChildren }) {
  return (
    <div className="navbar">
      <nav>
        <div className="navbar-logo">
          <a href="">FreelanceHub</a>
        </div>
        <ul className="navbar-links">
          <li>
          {leftChildren}
          </li>
          <li>
          {rightChildren}
          </li>
        </ul>
        <div className="navbar-button">
        <button>Iniciar sesión</button>
        </div>
      </nav>
    </div>
  );
}

