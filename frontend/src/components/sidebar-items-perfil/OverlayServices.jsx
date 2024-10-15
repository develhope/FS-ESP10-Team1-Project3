import React from 'react';
import './sidebar-items-css/descripcionOverlay.css'; 

function DescripcionOverlay({ descripcion, onClose }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <textarea
          className="descripcion-textarea"
          value={descripcion}
          readOnly
        />
        <button className="cerrar-descripcion" onClick={onClose} aria-label="Cerrar descripción">
          X
        </button>
      </div>
    </div>
  );
}

export default DescripcionOverlay;