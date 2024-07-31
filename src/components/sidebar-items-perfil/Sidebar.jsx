import "./sidebar-items-css/sidebar.css";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [selected, setSelected] = useState(0);
  const items = [
    "Información personal",
    "Portfolio y habilidades",
    "Proyectos en curso",
    "Proyectos finalizados",
    "Informacion bancaria",
    "Cerrar sesión",
  ];
  const seleccionar = useCallback((index) => {
    setSelected(index);
  }, []);
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul className="listaSidebar">
        {items.map((item, index) => (
          <li
            key={index}
            className={selected === index ? "selected" : "unselected"}
            onClick={() => {
              seleccionar(index);
              navigate(`/sidebar/${index}`)
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
