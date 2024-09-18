import React from "react";
import "./sidebar-items-css/buscarProyectos.css";
import { useEffect, useState } from "react";
import DescripcionOverlay from "./OverlayServices";

function BuscarProyectos() {
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
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
    {serviciosActivos.map((servicio, index) => (
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