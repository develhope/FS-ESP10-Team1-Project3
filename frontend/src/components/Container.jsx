import { React, useEffect, useState } from "react";
import { categorias, otrasSugerencias } from "../INFOGENERAL/categorias.js";
import { useNavigate } from "react-router-dom";
import { UseLogin } from './UseLogin'


export function Container() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Almacenar lo que el usuario escribe
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Almacenar las sugerencias filtradas
  const navigate = useNavigate();
  const {goToLogin} = UseLogin();

  // Efecto para verificar la autenticación al montar el componente
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
      throw new Error('No hay token en el localStorage');
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/users/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
    
        if (!response.ok) {
          throw new Error('Error al verificar el token');
        }
    
        const data = await response.json();
        if (data.loggedIn) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          }
      } catch (error) {
        console.error('Error en la verificación del token:', error);
      }
    };
    checkToken();
  }, []);
// completar la busqueda
  const completarBusqueda = (sugerencia) => {
    setSearchTerm(sugerencia);
    setFilteredSuggestions([]); // Limpia las sugerencias después de seleccionar una
  };
  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    navigate("/"); // Redirige a la página principal después del logout
  };

  // Filtrar las sugerencias en base a lo que escribe el usuario
  useEffect(() => {
    if (searchTerm) {
      const filteredCategorias = categorias.filter((categoria) =>
        categoria.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filteredOtrasSugerencias = otrasSugerencias.filter((sugerencia) =>
        sugerencia.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Combinar ambas listas de sugerencias
      setFilteredSuggestions([...filteredCategorias, ...filteredOtrasSugerencias]);
    } else {
      setFilteredSuggestions([]); // Vacía las sugerencias si no hay búsqueda
    }
  }, [searchTerm]);

  return (
    <div className="container">
      <p className="container-text">

      {isAuthenticated ? (
      <span className="animated-text">
       Busca por etiquetas o <br/> usa el buscador y accede a <br/> los ultimos empleos ofertados
      </span>
    ) : (
     <>
        <span className="animated-text">
          Únete a una amplia red de <br/> contactos dentro de tu sector.
        </span>
        <br/><br/>
        <span className="animated-text">
          Tanto si eres solicitante o <br /> buscas proyectos, en
        </span>
        <br />
        <span className="animated-text">
        <strong className="animated-text">Freelance</strong>
          <strong className="highlight animated-text">Hub</strong>
        <span className="animated-text">es posible!</span> </span>
        </>
        )}
      </p>

      <div className="buscador">
      <input type="text" placeholder="Escribe lo que buscas..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)} />
      
             <button onClick={() => navigate("/sidebar/6", { state: { selectedCategory: searchTerm } })}>Buscar</button>
        {/* Mostrar las sugerencias solo si hay coincidencias */}
        {filteredSuggestions.length > 0 && (
          <ul className="sugerencias">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index}
              onClick={() => completarBusqueda(suggestion)}
                style={{ cursor: 'pointer' }}
              >{suggestion}</li>
            ))}
          </ul>
        )}
    </div>
      
      <div className="frase-categoria">
      {isAuthenticated ? (
        <span>Ver mas...</span>
      ) : (
        <span>O también puedes buscar por categoria.</span>
        )}
      </div>

      <div className="categorias">
      {categorias.map((categoria) => (
        <button
        onClick={() => {
          if (isAuthenticated) {
            navigate("/sidebar/6", { state: { selectedCategory: categoria } });
          } else {
            goToLogin();
          }
        }}
        key={categoria}
      >
        {categoria}
      </button>
        ))}

      </div>
    </div>
  );
}
