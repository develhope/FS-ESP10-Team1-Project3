import { React } from "react";
import '../components/css/Services.css'
import { UseLogin } from "./UseLogin";



export function Services() {

  const {goToLogin} = UseLogin();

  return (



    <div className="container-general">

      <div className="bloque-verde">

        <h1>

          Encuentra al Freelancer <br /> Perfecto para tu <br /> Proyecto.

        </h1>

        <h2>

          Conéctate con expertos <br /> y lleva tu proyecto al <br /> siguiente nivel.

        </h2>

      </div>

      <div className="bloque-negro">

        <div className="parte-izquierda">
          <strong>Calidad Garantizada:</strong> Trabaja con <br /> profesionales verificados y con <br /> experiencia. <br /> <br />

          <strong> Variedad de Talentos:</strong> Desde <br /> diseñadores hasta desarrolladores, <br /> encuentra el talento que necesitas. <br /> <br />

          <strong>Presupuestos Flexibles:</strong> Ajusta tu <br /> proyecto a tu presupuesto con facilidad. <br /> <br />

          <strong>Gestión Sencilla:</strong> Herramientas <br /> integradas para comunicarte y gestionar <br /> tu proyecto en un solo lugar.
        </div>

        <div className="parte-derecha">
          Descubre la calidad <br /> de nuestros <br /> profesionales. Inicia <br /> sesión ahora y <br /> comienza tu proyecto <br /> con los mejores.
          <button onClick={goToLogin} className="boton-iniciar-sesion">Iniciar Sesión</button>
        </div>

      </div>

    </div>
  )
}