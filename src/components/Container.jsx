import { React } from 'react';
import categorias from '../INFOGENERAL/categorias.js';
export function Container() {




  return (

    <div className='container'>
      <p className='container-text'>
        <span> Únete a una amplia red de <br /> contactos dentro de tu sector. </span><br />
        <br />
        <span>Tanto si eres solicitante o <br /> buscas proyectos, en </span><br /><strong>Freelance</strong><span className='highlight'><strong>Hub</strong> </span> es posible!</p>


      <div className='buscador'>
        <input type="text" placeholder="Escribe lo que buscas..." />
        <button>Buscar</button>
      </div>

      <div className='frase-categoria'>
        <span>O también puedes buscar por categoria.</span>
      </div>

      <div className='categorias'>

        {categorias.map(categoria => (
          <button key={categoria}>{categoria}</button>))}

      </div>
    </div>
  );
};

