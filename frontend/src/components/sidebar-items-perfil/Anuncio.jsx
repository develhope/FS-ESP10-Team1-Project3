import React from "react";
import "./sidebar-items-css/anuncio.css";

export function Anuncio() {
  return (
    <div className="cont-anuncio">
      <div className="box1">
        <p>Añadir imagen</p>
      </div>
      <div className="box2">
        <p className="box2-text">Añade un título:</p>
        <p className="box2-text">Añade pago por hora y etiqueta</p>
      </div>
      <div className="box3">
        <p className="box3-text">Añadir descripción:</p>
      </div>
    </div>
  );
}
