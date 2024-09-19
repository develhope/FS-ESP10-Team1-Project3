import "./sidebar-items-css/sidebar.css";
import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Sidebar() {
  const { isAuthenticated } = useAuth0();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1];
  const lastSegmentNum = parseInt(lastSegment);
  const [selected, setSelected] = useState(lastSegmentNum || 0);
  const navigate = useNavigate();

  const items = [
    "Información personal",
    "Portfolio y habilidades",
    "Proyectos en curso",
    "Proyectos finalizados",
    "Informacion bancaria",
    "Solicitar servicios",
    "Buscar proyectos"
  ];
  
  const seleccionar = useCallback((index) => {
    setSelected(index);
  }, []);
 
  if (!isAuthenticated) {
    navigate('/login');
    return null; // Evita que el componente Sidebar se renderice si no está autenticado
  }

  console.log(userInfo);

  return (
    <div className="sidebar">
      <ul className="listaSidebar">
        {items.map((item, index) => (
          <li
            key={index}
            className={`${selected === index ? "selected" : "unselected"} ${index >= 5 ? "special-item" : ""}`}
            onClick={() => {
              seleccionar(index);
              navigate(`/sidebar/${index}`);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
