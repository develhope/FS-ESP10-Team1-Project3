import { React, useState, useEffect } from "react";
import "./css/Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import anonimo from './sidebar-items-perfil/assets-sidebar/anonimo.jpg';
import { useAuth0 } from '@auth0/auth0-react';

export function anonimus() {
  return (
    <img src={anonimo} alt="Anónimo" />
  );
}

function Login() {
  const [loginCorreo, setLoginCorreo] = useState(false);
  const [emailLoginCorreo, setEmailLoginCorreo] = useState("");
  const [passwordLoginCorreo, setPasswordLoginCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const loginTitle = "Iniciar sesión con tu cuenta";
  const registerTitle = "Crear una nueva cuenta";
  const textoEnlace1 = "¿No tienes cuenta? ";
  const textoEnlace2 = "¿Ya tienes una cuenta? Haz click aquí para ";
  const enlaceContent1 = "Registrate!";
  const enlaceContent2 = "iniciar sesión";

  const initialMode = location.state?.mode || "login";
  const [h1Content, setH1Content] = useState(
    initialMode === "register" ? registerTitle : loginTitle
  );
  const [p1Content, setP1Content] = useState(
    initialMode === "register" ? textoEnlace2 : textoEnlace1
  );
  const [aContent, setAcontent] = useState(
    initialMode === "register" ? enlaceContent2 : enlaceContent1
  );

  // Auth0 Logic
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  const iniciarSesionConGoogle = async () => {
    try {
      await loginWithRedirect({
        redirectUri: window.location.origin + "/sidebar",
      });
    } catch (error) {
      console.error('Error al iniciar sesión con Google', error);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (aContent === "Registrate!") {
      try {
        const loginDataToBackend = {
          email: emailLoginCorreo,
          password_hash: passwordLoginCorreo
        };

        const response = await fetch('https://freelancehub-4tr0.onrender.com/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginDataToBackend)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error en el inicio de sesión');
        }
        const data = await response.json();

        localStorage.setItem("token", data.token);
        const userLoginInfo = JSON.stringify({
          email: emailLoginCorreo,
          password: passwordLoginCorreo,
          birthDate: new Date(data.date_of_birth).toISOString().split('T')[0],
          fullName: data.full_name || "Nombre completo",
          userImage: data.user_image || anonimo,
        });
        localStorage.setItem("userInfo", userLoginInfo);
        window.location.href = `/`;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const userDataTobackEnd = {
          email,
          password_hash: password,
          full_name: nombre,
          date_of_birth: birthDate
        };
    
        const response = await fetch('https://freelancehub-4tr0.onrender.com/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDataTobackEnd)
        });
    
        if (!response.ok) {
          throw new Error('Error en el registro');
        }
        const data = await response.json();
        localStorage.setItem("token", data.token);
        const userInfoToStringify = {
          email,
          password,
          birthDate,
          fullName: nombre,
          userImage: anonimo,
        };
        const userInfo = JSON.stringify(userInfoToStringify);
        localStorage.setItem("userInfo", userInfo);
        window.location.href = `/`;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const cambiarLoginORegister = () => {
    if (aContent === "Registrate!") {
      setH1Content(registerTitle);
      setP1Content(textoEnlace2);
      setAcontent(enlaceContent2);
    } else {
      setH1Content(loginTitle);
      setP1Content(textoEnlace1);
      setAcontent(enlaceContent1);
    }
  };

  useEffect(() => {
    if (location.state?.mode) {
      if (location.state.mode === "register") {
        setH1Content(registerTitle);
        setP1Content(textoEnlace2);
        setAcontent(enlaceContent2);
      } else {
        setH1Content(loginTitle);
        setP1Content(textoEnlace1);
        setAcontent(enlaceContent1);
      }
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      const userInfoToStringify = {
        email: user.email,
        fullName: user.name,
        userImage: user.picture || anonimo,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfoToStringify));
      navigate('/sidebar'); // Redirige a la página del sidebar después de iniciar sesión
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="divLoginGeneral">
      <div className="loginIzquierda">
        <div className="textoWrapper">
          <div className="textoArriba">
            <h1>¡Únete a FreelanceHub y encuentra centenares de ofertas!</h1>
          </div>
          <div className="textoIzquierda">
            <ul>
              <li>Amplia variedad de oportunidades en diferentes sectores</li>
              <li>Totalmente gratuito</li>
              <li>Perfiles verificados con gran experiencia</li>
              <div className="textoFinal"><strong>No lo pienses más!</strong></div>
            </ul>
          </div>
        </div>
      </div>
      <div className="loginDerecha">
        <h2>{h1Content}</h2>
        <p>
          {p1Content}
          <a href="#register" onClick={cambiarLoginORegister}>
            {aContent}
          </a>
        </p>
        <div>
          {aContent === "iniciar sesión" ? (
            <div>
              <form className="formularioLogin" onSubmit={handleFormSubmit}>
                <p>
                  Nombre completo:{" "}
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    required
                    value={nombre}
                    autoComplete="nombre"
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </p>
                <p>
                  Email:{" "}
                  <input
                    type="email"
                    placeholder="Ejemplo@gmail.com"
                    required
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </p>
                <p>
                  Contraseña:{" "}
                  <input
                    type="password"
                    placeholder="*********"
                    required
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </p>
                <p>
                  Fecha de nacimiento:{" "}
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </p>
                <button type="submit" disabled={loading}>
                  Enviar datos
                </button>
              </form>
            </div>
          ) : (
            <div>
            <form className="formularioLogin" onSubmit={handleFormSubmit}>
              <p>
                Email:{" "}
                <input
                  type="email"
                  placeholder="Ejemplo@gmail.com"
                  required
                  value={emailLoginCorreo}
                  autoComplete="email"
                  onChange={(e) => setEmailLoginCorreo(e.target.value)}
                />
              </p>
              <p>
                Contraseña:{" "}
                <input
                  type="password"
                  placeholder="*********"
                  required
                  value={passwordLoginCorreo}
                  autoComplete="current-password"
                  onChange={(e) => setPasswordLoginCorreo(e.target.value)}
                />
              </p>
              <button type="submit" disabled={loading}>
                Enviar datos
              </button>
            </form>
            <div className="otraOpcion">
                <p>O también puedes:</p>
                <button className="google-correo" onClick={iniciarSesionConGoogle}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 19"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 7.844v3.463h4.844a4.107 4.107 0 0 1-1.795 2.7v2.246h2.907c1.704-1.558 2.685-3.85 2.685-6.575 0-.633-.056-1.246-.162-1.83H9v-.004Z"
                      fill="#3E82F1"
                    ></path>
                    <path
                      d="M9 14.861c-2.346 0-4.328-1.573-5.036-3.69H.956v2.323A9.008 9.008 0 0 0 9 18.42c2.432 0 4.47-.8 5.956-2.167l-2.907-2.247c-.804.538-1.835.855-3.049.855Z"
                      fill="#32A753"
                    ></path>
                    <path
                      d="M3.963 8.464c-.091-.53-.139-1.079-.139-1.635 0-.561.05-1.109.139-1.643V3.86H1.43A8.945 8.945 0 0 0 0 8.63c0 1.343.268 2.645.74 3.794l2.597-2.358Z"
                      fill="#F4B400"
                    ></path>
                    <path
                      d="M9 3.86c-.569 0-1.121.062-1.664.178l-.186.027-.196.069-.162.091-.073.075a2.66 2.66 0 0 0-.38.46c-.098.15-.18.308-.235.477-.095.268-.133.552-.133.834 0 .21.02.418.057.62.05.247.121.488.212.721a2.916 2.916 0 0 0 .368.702c.211.338.44.661.716.957a3.011 3.011 0 0 0 1.088.7c.455.193.945.306 1.446.306 1.317 0 2.479-.825 2.897-1.983h-2.207v-.017c-.191.105-.405.162-.626.162-.674 0-1.286-.33-1.678-.834l-.089-.102-.065-.096-.051-.079a2.365 2.365 0 0 1-.263-.451 2.48 2.48 0 0 1-.12-.451c-.023-.16-.035-.317-.035-.476v-.038c0-.55.167-1.072.483-1.515.35-.432.844-.707 1.372-.707.682 0 1.273.29 1.672.734.063.072.118.151.161.239.048.087.076.182.092.277v.004h2.057a4.252 4.252 0 0 0-.554-2.118A4.355 4.355 0 0 0 9 3.86Z"
                      fill="#FF5F00"
                    ></path>
                  </svg>
                  &nbsp; Iniciar sesión con Google
                </button>
              </div>
            </div>
            )}
        </div>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="loginParaMovil">
      <div className="divMovil1">
        <h2>
          Unete a nosotros y encuentra trabajo cuanto antes!{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffff"
          >
            <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
          </svg>
        </h2>
        <ul>
          <li>Contacto con empresas de cualquier parte de España</li>
          <li>La inscripcion es totalmete gratuita, aprovecha ahora!</li>
          <li>
            Un monton de categorias entre las que puedes buscar u ofrecer
            trabajo
          </li>
        </ul>
      </div>
      <div className="divMovil2">
        <h2>{h1Content}</h2>
        <p>
          {p1Content}
          <a href="#register">{aContent}</a>
        </p>
        <div>
        </div>
        <div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Login;
