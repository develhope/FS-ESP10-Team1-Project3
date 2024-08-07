import "./sidebar-items-css/sidebar.css";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const [selected, setSelected] = useState(0);
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
 
  return (
    <div className="sidebar">
      <ul className="listaSidebar">
        {items.map((item, index) => (
          <li
            key={index}
            className={`${selected === index ? "selected" : "unselected"} ${index >= 5 ? "special-item" : ""}`} //Añadido código para poder modificar el color de solamente las dos ultimas categorias del sidebar.
            
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
