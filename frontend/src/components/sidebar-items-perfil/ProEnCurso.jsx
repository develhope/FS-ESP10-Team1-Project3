import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/proEnCurso.css";
function ProEnCurso() {
  const [localProyects, setLocalProyects] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [precio, setPrecio] = useState("");
  const [deadline, setDeadline] = useState("");
  const [proyectosEnCurso, setProyectosEnCurso] = useState([]);
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
  const actualizarDeadline = (event) => {
    setDeadline(event.target.value);
  };


 // -------> Añadimos una función asíncrona que se encargara de enviar los datos del proyecto al backend-------->

  const addProjects = async (proyecto) => {
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
      });

      if (!response.ok) {
        throw new Error("Error al enviar proyecto al backend");
      }

      // Si la solicitud es exitosa, puedes procesar la respuesta aquí si es necesario
      const data = await response.json();
      console.log("Proyecto enviado:", data);

    } catch (error) {
      console.error("Error al enviar el proyecto:", error.message);
    }
  };

  const subirProyecto = async (event) => {
    event.preventDefault();
    const nuevoProyecto = {
      id: Date.now(),
      nombre: nombreProyecto,
      startDate: new Date().toISOString().split("T")[0],
      precio: precio,
      fechaLimite: deadline,
    };

   // Llama a la función que envía el proyecto al backend
     await addProjects(nuevoProyecto);

    const nuevosProyectos = [...localProyects, nuevoProyecto];
    setLocalProyects(nuevosProyectos);
    setProyectosEnCurso(nuevosProyectos);
    localStorage.setItem("userProEnCurso", JSON.stringify(nuevosProyectos));
    setNombreProyecto("");
    setPrecio("");
    setDeadline("");

  };

  useEffect(() => {
    const storedProyects = localStorage.getItem("userProEnCurso");
    if (storedProyects) {
      const localproyectParsed = JSON.parse(storedProyects);
      setLocalProyects(localproyectParsed);
      setProyectosEnCurso(localproyectParsed);
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
      {localProyects.length === 0 ? (
        <form onSubmit={subirProyecto}>
          <input
            type="text"
            value={nombreProyecto}
            onChange={actualizarNombreProyecto}
            maxLength="16"
            placeholder="Nombre del proyecto"
          />
          <input
            type="text"
            value={precio}
            onChange={actualizarPrecio}
            placeholder="Pago por hora"
          />
          <input
            type="date"
            value={deadline}
            onChange={actualizarDeadline}
            placeholder="fecha limite"
          />
          <button type="submit" className="nuevo-proyecto">
            Añadir proyecto
          </button>
        </form>
      ) : (
        <div className="proyectos">
          <ul>
            {proyectosEnCurso.map((proyecto) => (
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
              type="text"
              value={nombreProyecto}
              maxLength="16"
              onChange={actualizarNombreProyecto}
              placeholder="Nombre del proyecto"
            />
            <input
              type="text"
              value={precio}
              onChange={actualizarPrecio}
              placeholder="Pago por hora"
            />
            <input
              type="date"
              value={deadline}
              onChange={actualizarDeadline}
              placeholder="fecha limite"
            />
            <button type="submit" className="nuevo-proyecto">
              Añadir proyecto
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default ProEnCurso;
