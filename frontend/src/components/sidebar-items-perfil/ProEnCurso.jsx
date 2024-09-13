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
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no disponible. Debes iniciar sesión.");
      }

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
           'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json"

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

    // Control para que el valor de precio sea numerico antes de ser enviado al backend.

    // Validaciones de los campos requeridos
    if (!nombreProyecto) {
      alert("Por favor, ingrese el nombre del proyecto.");
      return;
    }

    if (!precio) {
      alert("Por favor, ingrese el precio del proyecto.");
      return;
    }

    const parsedPrecio = parseFloat(precio);
    if (isNaN(parsedPrecio)) {
      alert("Por favor, ingresa un valor numérico para el precio.");
      return;
    }
    // Creación del objeto del proyecto para el backend

    const nuevoProyecto = {
      token:localStorage.getItem("token"),
      name: nombreProyecto, // Cambiado de 'nombre' a 'name'
      pago: parseFloat(precio), // Cambiado de 'precio' a 'pago' y convertido a número
      created_at: new Date().toISOString().split("T")[0], // Cambiado de 'startDate' a 'created_at'
      deadline: deadline //añadido deadline al proyecto nuevo
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
                      value={proyecto.created_at}
                    />
                  ) : (
                    console.log(proyecto.created_at)
                  )}
                  <input
                    className="nombreProyecto"
                    type="text"
                    value={proyecto.name}
                    readOnly
                  />
                  <input
                    className="inputPrecio"
                    type="text"
                    value={`${proyecto.pago} $/h`}
                    readOnly
                  />
                  <input
                    className="fechafin"
                    type="text"
                    value={"fin: " + proyecto.deadline}
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
