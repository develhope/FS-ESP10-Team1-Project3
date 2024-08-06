import {React} from 'react';
import categorias from '../INFOGENERAL/categorias.js';
export function Container () {
  



  return (

    <div className='container'>
        <p className='container-text'>
        <span> Únete a una amplia red de</span><br/> 
        <span>contactos dentro de tu sector. </span><br/>
        <br/>
        <span>Tanto si eres solicitante </span><br/>
        <span> o buscas proyectos, en </span><br/>
        <span className='bold'>Freelance </span><span className='highlight'>Hub</span> <span> es posible!</span> </p> 
     

      <div className='buscador'>
        <input type="text" placeholder="Escribe lo que buscas..." />
        <button>Buscar</button>
      </div>
      <p className='textcategorias'> O tambien puedes buscar por categoria.</p> 
      <div>
      </div>
      <div className='categorias'>

        {categorias.map(categoria => (
          <button key={categoria}>{categoria}</button>))}

      </div>
    </div>
  );
};

