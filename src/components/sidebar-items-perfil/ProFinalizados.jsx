import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/proEnCurso.css";
function ProFinalizados() {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [precio, setPrecio] = useState("");
  const [entregado, setEntregado] = useState("");
  const [fechaComienzo, setFechaComienzo] = useState("");
  const [proyectosAcabados, setProyectosAcabados] = useState([]);
  const [mostrarFechaInicio, setMostrarFechaInicio] = useState(() => {
    const width = window.innerWidth;
    return width <= 540 || width >= 630;
  });
  const actualizarNombreProyecto = (event) => {
    setNombreProyecto(event.target.value);
  };
  const actualizarPrecio = (event) => {
    setPrecio(event.target.value);
  };
  const actualizarEntregado = (event) => {
    setEntregado(event.target.value);
  };
  const actualizarFechaComienzo = (event) => {
    setFechaComienzo(event.target.value);
  };
  const subirProyecto = (event) => {
    event.preventDefault();
    const nuevoProyecto = {
      id: Date.now(),
      nombre: nombreProyecto,
      startDate: fechaComienzo,
      precio: precio,
      fechaLimite: entregado,
    };
    const nuevosProyectos = [...proyectosAcabados, nuevoProyecto];
    setProyectosAcabados(nuevosProyectos);
    localStorage.setItem("userProFinalizados", JSON.stringify(nuevosProyectos));
    setNombreProyecto("");
    setPrecio("");
    setEntregado("");
    setFechaComienzo("");
  };

  useEffect(() => {
    const storedProyects = localStorage.getItem("userProFinalizados");
    if (storedProyects) {
      const localproyectParsed = JSON.parse(storedProyects);
      setProyectosAcabados(localproyectParsed);
    }
    const handleResize = () => {
      const width = window.innerWidth;
      setMostrarFechaInicio(width <= 540 || width >= 630);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="div-sidebar-element-proEnCurso">
      {proyectosAcabados.length === 0 ? (
        <form onSubmit={subirProyecto}>
          <input
            type="date"
            value={fechaComienzo}
            onChange={actualizarFechaComienzo}
            placeholder="fecha comienzo"
          />
          <input
            type="text"
            value={nombreProyecto}
            onChange={actualizarNombreProyecto}
            maxlength="16"
            placeholder="Nombre del proyecto"
          />
          <input
            type="number"
            value={precio}
            onChange={actualizarPrecio}
            placeholder="Pago por hora"
          />
          <input
            type="date"
            value={entregado}
            onChange={actualizarEntregado}
            placeholder="fecha limite"
          />
          <button type="submit" className="nuevo-proyecto">
            Añadir
          </button>
        </form>
      ) : (
        <div className="proyectos">
          <ul>
            {proyectosAcabados.map((proyecto) => (
              <li key={proyecto.id}>
                <div className="texto-campos-perfil">
                  {mostrarFechaInicio ? (
                    <input
                      className="fechaInicio"
                      type="date"
                      readOnly
                      value={proyecto.startDate}
                    />
                  ) : (
                    console.log(proyecto.startDate)
                  )}
                  <input
                    className="nombreProyecto"
                    type="text"
                    value={proyecto.nombre}
                    readOnly
                  />
                  <input
                    className="inputPrecio"
                    type="text"
                    value={`${proyecto.precio} $/h`}
                    readOnly
                  />
                  <input
                    className="fechafin"
                    type="text"
                    value={"fin: " + proyecto.fechaLimite}
                    readOnly
                  />
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={subirProyecto}>
            <input
              type="date"
              value={fechaComienzo}
              onChange={actualizarFechaComienzo}
              placeholder="fecha comienzo"
            />
            <input
              type="text"
              value={nombreProyecto}
              maxlength="16"
              onChange={actualizarNombreProyecto}
              placeholder="Nombre del proyecto"
            />
            <input
              type="number"
              value={precio}
              onChange={actualizarPrecio}
              placeholder="Pago por hora"
            />
            <input
              type="date"
              value={entregado}
              onChange={actualizarEntregado}
              placeholder="fecha limite"
            />
            <button type="submit" className="nuevo-proyecto">
              Añadir
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default ProFinalizados;
