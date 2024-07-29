import {React} from 'react';
import categorias from '../INFOGENERAL/categorias.js';
export function Container () {
  



  return (

    <div className='container'>
        <p className='container-text'>
        <span> Únete a una amplia red de contactos dentro de tu sector </span><br />
        <span>Tanto si eres solicitante o buscas proyectos, en </span><br /> <span className='highlight'>FreelanceHub es posible!</span></p> 
     

      <div className='buscador'>
        <input type="text" placeholder="Escribe lo que buscas..." />
        <button>Buscar</button>
      </div>

      <div className='categorias'>

        {categorias.map(categoria => (
          <button key={categoria}>{categoria}</button>))}

      </div>
    </div>
  );
};

