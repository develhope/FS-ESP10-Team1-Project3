import "./sidebar-items-css/sidebar.css";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();

  const items = [
    "Información personal",
    "Portfolio y habilidades",
    "Proyectos en curso",
    "Proyectos finalizados",
    "Informacion bancaria",
  ];
  
  const seleccionar = useCallback((index) => {
    setSelected(index);
  }, []);
 
  return (
    <div className="sidebar">
      <ul className="listaSidebar">
        {items.map((item, index) => (
          <li
            key={index}
            className={selected === index ? "selected" : "unselected"}
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
