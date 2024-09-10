import React from "react";
import "./sidebar-items-css/anuncio.css";
import { useEffect, useState } from "react";

export function Anuncio() {
  const [imagenPerfil, setImagenPerfil] = useState("");
  const [titulo, setTitulo] = useState("Nuevo Titulo");
  const [descripcion, setDescripcion] = useState("");
  const [pago, setPago] = useState(0);
  const subirNuevaImagen = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const agregarTitulo = (event) => {
    setTitulo(event.target.value);
  }
  const agregarPago = (event) => {
    setPago(event.target.value);
  }
  const agregarDescripcion = (event) => {
    setDescripcion(event.target.value);
  }
  return (
    <form className="cont-anuncio">
    <div>
      <div className="box1">
      <div className="imagenItems">{imagenPerfil !== ""?<div><img className="proyectSelectedImage" src={imagenPerfil}></img> <label htmlFor="inputFile" className="subirImagenDeProyecto">
      Cambiar imagen
      </label></div>: <label htmlFor="inputFile" className="subirImagenDeProyecto">
      Añadir imagen
      </label>}
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
            onFocus={(() => { if (titulo == "Nuevo Titulo") {
              setTitulo("");
            }})}
            value={titulo}
          ></input>
        </div>
        <div className="texto-input-pago">
        <p className="box2-text">Añade pago por hora y etiqueta:</p>
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
            type="text"
            className="descripcionSolicitarServicios"
            onChange={agregarDescripcion}
            value={descripcion}
          ></textarea>
          </div>
      </div>
    </div>
    </form>
  );
}
