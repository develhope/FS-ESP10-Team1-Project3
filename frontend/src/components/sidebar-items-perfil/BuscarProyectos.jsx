import React from "react";
import "./sidebar-items-css/buscarProyectos.css";
import { useEffect, useState } from "react";
import DescripcionOverlay from "./OverlayServices";

function BuscarProyectos() {
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [serviciosActivos, setServiciosActivos] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  const mostrarDescripcion = (index) => {
      setServicioSeleccionado(index);
      setDescripcion(serviciosActivos[index].descripcion);
  }
  const ocultarDescripcion = () => {
    setServicioSeleccionado(null);
    setDescripcion("");
  }
  const seleccionarCategoria = (event) => {
    setCategoria(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
    const response = await fetch('http://localhost:5000/api/services/offers', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const data = await response.json();
      setServiciosActivos(data);
}
  } catch (error) {
    console.error("error al cargar las ofertas activas", error);
  }
  }
  fetchData();
  }, []);
  return (
    <div className="div-contenedor-de-todos-los-servicios">
    <div className="selectCategoriaBuscar">
    <h2>Selecciona aqui para buscar por categoria:</h2>
    <select value={categoria} onChange={seleccionarCategoria} className="select-Categoria-Buscar">
              <option value="Desarrollo web">Desarrollo web</option>
              <option value="Comunicacion">Comunicacion</option>
              <option value="Redes sociales">Redes sociales</option>
              <option value="Diseño grafico">Diseño grafico</option>
              <option value="Marketing">Marketing</option>
              <option value="Desarrollo audiovisual">Desarrollo audiovisual</option>
              <option value="Otros">Otros</option>
              <option value="Todos">Todos</option>
              <option value="Consultoría IT">Consultoría IT</option>
              <option value="Ciberseguridad">Ciberseguridad</option>
              <option value="SEO y SEM">SEO y SEM</option>
              <option value="Administración de Sistemas">Administración de Sistemas</option>
              <option value="Desarrollo de Aplicaciones Móviles">Desarrollo de Aplicaciones Móviles</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Data Science">Data Science</option>
              <option value="Inteligencia Artificial">Inteligencia Artificial</option>
              <option value="Gestión de Proyectos">Gestión de Proyectos</option>
              <option value="Producción de Video">Producción de Video</option>
              <option value="Copywriting">Copywriting</option>
              <option value="Fotografía">Fotografía</option>
              <option value="Relaciones Públicas">Relaciones Públicas</option>
              <option value="Branding">Branding</option>
              <option value="Traducción e Interpretación">Traducción e Interpretación</option>
            </select>
            </div>
            {serviciosActivos
              .filter(servicio => categoria === "Todos" || servicio.categoria === categoria)
              .map((servicio, index) => (
                <div key={index} className="buscarProyectosDivContainer">
        <div className="cont-anuncio">
          <div>
            <div className="box1">
              <div className="imagenItems">
                {servicio.imagen_path !== null ? (
                  <div>
                    <img className="proyectSelectedImage" src={servicio.imagen_path}></img>
                  </div>
                ) : (
                  <p className="subirImagenDeProyecto">
                    Este anuncio no tiene ninguna imagen
                  </p>
                )}
              </div>
            </div>
            <div className="box2">
              <div className="titulo-categoria-pago">
                <div className="texto-input">
                  <h2 className="box2-text">{servicio.titulo}</h2>
                </div>
                <div className="texto-input-pago">
                  <p className="box2-text">{servicio.pago}</p>
                  <div className="categoria-buscarProyectos">
                    <p>{servicio.categoria}</p>
                  </div>
                </div>
              </div>
              <div className="solicitar-verDescripcion">
              <button className="verDescripcion" onClick={() => mostrarDescripcion(index)}>
              Ver descripcion
              </button>
              <button type="button" className="nuevo-proyecto">
                Solicitar
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  ))}
  {servicioSeleccionado !== null && (
    <DescripcionOverlay 
      descripcion={descripcion}
      onClose={ocultarDescripcion}
    />
  )}
  </div>
  );
}

export default BuscarProyectos;