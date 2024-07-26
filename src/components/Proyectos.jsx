import React from 'react'
import '../components/css/Proyectos.css'
import { UseLogin } from './UseLogin'

export function Proyectos() {

  const {goToLogin} = UseLogin();

  return (

    <div className="container-general">

      <div className="bloque-verde">

        <h1>

          Encuentra el Proyecto <br /> Perfecto para Ti.

        </h1>

        <h2>

          Descubre oportunidades <br /> y trabaja en lo que te <br /> apasiona.

        </h2>

      </div>

      <div className="bloque-negro">

        <div className="parte-izquierda">
          <strong>Oportunidades Diversas:</strong> Proyectos en <br /> una amplia variedad de sectores. <br /> <br />

          <strong>Pagos Seguros:</strong> Sistema de pago seguro <br /> y garantizado. <br /> <br />

          <strong>Crecimiento Profesional:</strong> Construye tu <br /> portafolio y recibe valoraciones positivas. <br /> <br />

          <strong>Soporte Permanente:</strong> Asistencia y <br /> recursos para ayudarte en cada paso. <br /> <br />
        </div>

        <div className="parte-derecha">
        Empieza a trabajar en <br /> lo que amas. Inicia <br /> sesión ahora y <br /> encuentra proyectos <br /> que se adapten a tus <br /> habilidades.
          <button onClick={goToLogin} className="boton-iniciar-sesion">Iniciar Sesión</button>
        </div>

      </div>

    </div>

  )
}
