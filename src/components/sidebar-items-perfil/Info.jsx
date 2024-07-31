import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/info.css";
function Info() {
    const userDataObject = localStorage.getItem("userInfo");
    const userDataObjectJson = JSON.parse(userDataObject);
  const [nombreCompleto, setNombreCompleto] = useState("nombre completo");
  const [nombreUsuario, setNombreUsuario] = useState("nombre de usuario");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState("correo electrónico");
  const [contraseña, setContraseña] = useState("contraseña");
  
   const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoNombreUsuario, setNuevoNombreUsuario] = useState("");

  useEffect(() => {
    const fechaNacimientoUser = localStorage.getItem("userDate");
    const password = localStorage.getItem("userPassword");
    const email = localStorage.getItem("userEmail");
    setCorreo(email);
    setContraseña(password);
    setFechaNacimiento(fechaNacimientoUser);

  }, []);

  const actualizarPerfil = (event) => {
    event.preventDefault();
    setNombreCompleto(nuevoNombre);
    setNombreUsuario(nuevoNombreUsuario);
    const userData = {
        userNombreCompleto: nuevoNombre,
        userApodo: nuevoNombreUsuario,
        userBirthDate: fechaNacimiento,
        userCorreo: correo,
        userPassword: contraseña
    }
    const userDataStrings = JSON.stringify(userData)
    localStorage.setItem("userInfo", userDataStrings);
  };
  const actualizarNombreCompleto = (event) => {
    event.preventDefault();
    setNuevoNombre(event.target.value);
  };
  const actualizarNombreUsuario = (event) => {
    event.preventDefault();
    setNuevoNombreUsuario(event.target.value);
  };
  const subirNuevaImagen = (event) => {
    event.preventDefault()
  }
  return (
    <div className="div-sidebar-element">
      <form onSubmit={actualizarPerfil}>
        <div className="imagenPerfil"></div>
        <button onClick={subirNuevaImagen} className="subirImagen">subir imagen</button>
        <div className="texto-input">
          <p className="texto-campos-perfil">Nombre y apellidos</p>
          <input
            type="text"
            className="inputs-perfil"
            placeholder={userDataObjectJson?userDataObjectJson.userNombreCompleto:"Nombre completo"}
            onChange={actualizarNombreCompleto}
          ></input>
        </div>
        <div className="texto-input">
          <p className="texto-campos-perfil">Nombre de usuario</p>
          <input
            type="text"
            className="inputs-perfil"
            placeholder={userDataObjectJson?userDataObjectJson.userApodo:"Nombre de usuario"}
            onChange={actualizarNombreUsuario}
          ></input>
        </div>
        <div className="texto-input dateInput">
          <p className="texto-campos-perfil">Fecha de nacimiento</p>
          <input type="date" className="inputs-perfil" value={fechaNacimiento} readOnly></input>
        </div>
        <div className="texto-input">
          <p className="texto-campos-perfil">correo electrónico</p>
          <input
            type="email"
            className="inputs-perfil"
            value={correo}
            readOnly
          ></input>
        </div>
        <div className="texto-input">
          <p className="texto-campos-perfil">Contraseña</p>
          <input
            type="password"
            className="inputs-perfil"
            value={contraseña}
            readOnly
          ></input>
        </div>
        <button className="actualizarDatosPerfil" type="submit">
          Actualizar datos de perfil
        </button>
      </form>
    </div>
  );
}
export default Info;
