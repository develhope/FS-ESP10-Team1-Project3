import './sidebar-items-css/sidebar.css'
import { useState } from 'react';

function Sidebar() {
  
    return (
        <div className='sidebar'>
        <ul className='listaSidebar'>
        <li>Información personal</li>
        <li>Portfolio y habilidades</li>
        <li>Proyectos en curso</li>
        <li>Proyectos finalizados</li>
        <li>Proyectos acabados</li>
        <li>Informacion bancaria</li>
        <li>Cerrar sesión</li>
        </ul>
        </div>
    )
}
export default Sidebar;