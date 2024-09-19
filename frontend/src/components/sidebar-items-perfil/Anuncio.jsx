import React from "react";
import "./sidebar-items-css/anuncio.css";
import { useEffect, useState } from "react";

export function Anuncio() {
  const [vistaPrevia, setVistaPrevia] = useState("");
  const [imagen, setImagen] = useState("");
  const [titulo, setTitulo] = useState("Nuevo Titulo");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("otros");
  const [pago, setPago] = useState(0);
  const subirNuevaImagen = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Obtener la cadena completa del resultado
        const fullString = reader.result;
        
        // Guardar la cadena completa en el estado
        setImagen(fullString);
      };
      reader.readAsDataURL(file);
    }
  };
  const agregarTitulo = (event) => {
    setTitulo(event.target.value);
  };
  const agregarPago = (event) => {
    setPago(event.target.value);
  };
  const agregarDescripcion = (event) => {
    setDescripcion(event.target.value);
  };
  const seleccionarCategoria = (event) => {
    setCategoria(event.target.value);
  };
  const publicar = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descripcion", descripcion);
      formData.append("categoria", categoria);
      formData.append("pago", pago);
      formData.append("token", token);
      formData.append("imagen_path", imagen);
      const response = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al publicar oferta");
      }
      const data = await response.json();
      const offerInfo = {
        titulo,
        descripcion,
        categoria,
        pago,
        imagen_path: imagen,
      };
      localStorage.setItem("offerInfo", JSON.stringify(offerInfo));
      setVistaPrevia("");
      setImagen("");
      setTitulo("Nuevo Titulo");
      setDescripcion("");
      setCategoria("otros");
      setPago(0);
    } catch (err) {
      console.error("error al publicar oferta:" + err.message);
    }
  };
  return (
    <form className="cont-anuncio" onSubmit={publicar}>
      <div>
        <div className="box1">
          <div className="imagenItems">
            {imagen !== "" ? (
              <div>
                <img className="proyectSelectedImage" src={imagen}></img>{" "}
                <label htmlFor="inputFile" className="subirImagenDeProyecto">
                  Cambiar imagen
                </label>
              </div>
            ) : (
              <label htmlFor="inputFile" className="subirImagenDeProyecto">
                Añadir imagen
              </label>
            )}
            <input
              type="file"
              onChange={subirNuevaImagen}
              accept="image/*"
              id="inputFile"
            ></input>
          </div>
        </div>
        <div className="box2">
          <div className="texto-input">
            <p className="box2-text">Añade un título:</p>
            <input
              type="text"
              className="inputs-perfil"
              onChange={agregarTitulo}
              onFocus={() => {
                if (titulo == "Nuevo Titulo") {
                  setTitulo("");
                }
              }}
              value={titulo}
            ></input>
          </div>
          <div className="texto-input-pago">
            <p className="box2-text">Añade pago por hora:</p>
            <input
              type="number"
              className="inputPago"
              onChange={agregarPago}
              value={pago}
            ></input>
          </div>
        </div>
        <div className="box3">
          <div className="texto-input">
            <p className="box3-text">Añadir descripción:</p>
            <textarea
              placeholder="añade tu descripcion aqui"
              type="text"
              className="descripcionSolicitarServicios"
              onChange={agregarDescripcion}
              value={descripcion}
            ></textarea>
          </div>
          <div className="texto-input">
            <p>Añade una categoria aqui: </p>
            <select value={categoria} onChange={seleccionarCategoria}>
            <option value="Desarrollo web">Desarrollo web</option>
            <option value="Comunicacion">Comunicacion</option>
            <option value="Redes sociales">Redes sociales</option>
            <option value="Diseño grafico">Diseño grafico</option>
            <option value="Marketing">Marketing</option>
            <option value="Desarrollo audiovisual">Desarrollo audiovisual</option>
            <option value="Otros">Otros</option>
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
        </div>
        <button type="submit" className="nuevo-proyecto">
          Publicar anuncio
        </button>
      </div>
    </form>
  );
}
