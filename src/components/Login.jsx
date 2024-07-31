import { React } from "react";
import { useState, useEffect } from "react";
import "./css/Login.css";
import { useLocation, useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const loginTitle = "iniciar sesión con tu cuenta";
  const registerTitle = "crear una nueva cuenta";
  const textoEnlace1 = "¿no tienes cuenta? pincha aqui para ";
  const textoEnlace2 = "ya tienes cuenta? pincha aqui para ";
  const enlaceContent1 = "registrarte";
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



  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);

      navigate(`/perfil`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
     
    }
  };


  const cambiarLoginORegister = () => {
    if (aContent === "registrarte") {
      setH1Content(registerTitle);
      setP1Content(textoEnlace2);
      setAcontent(enlaceContent2);
    } else {
      setH1Content(loginTitle);
      setP1Content(textoEnlace1);
      setAcontent(enlaceContent1);
    }
  };
  // const sendRegisterData = (event) => {
  //   event.preventDefault();
  // };
  return (
    <div className="divLoginGeneral">
      <div className="loginIzquierda">
        <h2>
          Unete a nosotros y encuentra trabajo cuanto antes!{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
          </svg>
        </h2>
        <ul>
          <li>Contacto con diversas empresas de toda españa</li>
          <li>Inscipcion gratis</li>
          <li>
            Un monton de categorias entre las que puedes buscar u ofrecer
            trabajo
          </li>
          <li id="liSinCursor">
            <strong>No lo pienses mas!</strong>
          </li>
        </ul>
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
                  Email:{" "}
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    value={email}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </p>
                <button type="submit" disabled={loading}>
                  Enviar datos
                </button>
              </form>


              <div className="otraOpcion">
                <p>o tambien puedes:</p>
                <button className="google-correo">
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
                      d="M3.964 5.456H.956a8.928 8.928 0 0 0 0 8.033l3.008-2.318a5.3 5.3 0 0 1-.283-1.699 5.3 5.3 0 0 1 .283-1.699V5.456Z"
                      fill="#F9BB00"
                    ></path>
                    <path
                      d="m.956 5.456 3.008 2.317c.708-2.116 2.69-3.69 5.036-3.69 1.32 0 2.508.453 3.438 1.338l2.584-2.569C13.465 1.41 11.427.525 9 .525A9.003 9.003 0 0 0 .956 5.456Z"
                      fill="#E74133"
                    ></path>
                  </svg>{" "}
                  Continuar con Google
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <button className="google-correo">
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
                      d="M3.964 5.456H.956a8.928 8.928 0 0 0 0 8.033l3.008-2.318a5.3 5.3 0 0 1-.283-1.699 5.3 5.3 0 0 1 .283-1.699V5.456Z"
                      fill="#F9BB00"
                    ></path>
                    <path
                      d="m.956 5.456 3.008 2.317c.708-2.116 2.69-3.69 5.036-3.69 1.32 0 2.508.453 3.438 1.338l2.584-2.569C13.465 1.41 11.427.525 9 .525A9.003 9.003 0 0 0 .956 5.456Z"
                      fill="#E74133"
                    ></path>
                  </svg>{" "}
                  Continuar con Google
                </button>
              </div>
              <div>
                <button className="google-correo">
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.5 0H1.5C0.671562 0 0 0.671562 0 1.5V10.5C0 11.3284 0.671562 12 1.5 12H14.5C15.3284 12 16 11.3284 16 10.5V1.5C16 0.671562 15.3284 0 14.5 0ZM14.5 1.5V2.77516C13.7993 3.34575 12.6823 4.233 10.2942 6.10297C9.76787 6.51694 8.72538 7.51147 8 7.49988C7.27475 7.51159 6.23191 6.51678 5.70584 6.10297C3.31813 4.23328 2.20078 3.34584 1.5 2.77516V1.5H14.5ZM1.5 10.5V4.69994C2.21606 5.27028 3.23153 6.07063 4.77931 7.28263C5.46234 7.82028 6.6585 9.00719 8 8.99997C9.33491 9.00719 10.5159 7.8375 11.2204 7.28288C12.7682 6.07091 13.7839 5.27034 14.5 4.69997V10.5H1.5Z"></path>
                  </svg>
                  Continuar con el correo electrónico
                </button>
              </div>
            </>
          )}
        </div>

        <p className="terminos">
          Al unirte, aceptas los <a>Términos de servicio</a> de esta web, así
          como recibir correos electrónicos ocasionales de nuestra parte. Lee
          nuestra <a>Política de privacidad</a> para saber cómo utilizamos tus
          datos personales.
        </p>
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
            <button className="google-correo">
              <svg
                width="18"
                height="18"
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
                  d="M3.964 5.456H.956a8.928 8.928 0 0 0 0 8.033l3.008-2.318a5.3 5.3 0 0 1-.283-1.699 5.3 5.3 0 0 1 .283-1.699V5.456Z"
                  fill="#F9BB00"
                ></path>
                <path
                  d="m.956 5.456 3.008 2.317c.708-2.116 2.69-3.69 5.036-3.69 1.32 0 2.508.453 3.438 1.338l2.584-2.569C13.465 1.41 11.427.525 9 .525A9.003 9.003 0 0 0 .956 5.456Z"
                  fill="#E74133"
                ></path>
              </svg>{" "}
              Continuar con Google
            </button>
          </div>
          <div>
            <button className="google-correo">
              <svg
                width="18"
                height="16"
                viewBox="0 0 16 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.5 0H1.5C0.671562 0 0 0.671562 0 1.5V10.5C0 11.3284 0.671562 12 1.5 12H14.5C15.3284 12 16 11.3284 16 10.5V1.5C16 0.671562 15.3284 0 14.5 0ZM14.5 1.5V2.77516C13.7993 3.34575 12.6823 4.233 10.2942 6.10297C9.76787 6.51694 8.72538 7.51147 8 7.49988C7.27475 7.51159 6.23191 6.51678 5.70584 6.10297C3.31813 4.23328 2.20078 3.34584 1.5 2.77516V1.5H14.5ZM1.5 10.5V4.69994C2.21606 5.27028 3.23153 6.07063 4.77931 7.28263C5.46234 7.82028 6.6585 9.00719 8 8.99997C9.33491 9.00719 10.5159 7.8375 11.2204 7.28288C12.7682 6.07091 13.7839 5.27034 14.5 4.69997V10.5H1.5Z"></path>
              </svg>
              Continuar con el correo electrónico
            </button>
          </div>
          <div className="terminos">
            <p>
              Al unirte, aceptas los <a>Términos de servicio</a> de esta web,
              así como recibir correos electrónicos ocasionales de nuestra
              parte. Lee nuestra <a>Política de privacidad</a> para saber cómo
              utilizamos tus datos personales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
