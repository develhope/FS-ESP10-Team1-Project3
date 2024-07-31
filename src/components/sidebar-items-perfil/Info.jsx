import { useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/info.css";
function Info() {
    const [nombreCompleto, setNombreCompleto] = useState("nombre completo");
    const [nombreUsuario, setNombreUsuario] = useState("nombre de usuario");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [correo, setCorreo] = useState("correo electrónico");
    const [contraseña, setContraseña] = useState("Contraseña");
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoNombreUsuario, setNuevoNombreUsuario] = useState("");
    const actualizarPerfil = (event) => {
        event.preventDefault();
        setNombreCompleto();
    }
    const actualizarNombreCompleto = (event) => {
        event.preventDefault();
        setNuevoNombre(event.value)
    }
    const actualizarNombreUsuario = (event) => {
        event.preventDefault();
        setNuevoNombreUsuario(event.value)
    }
    const actualizarCorreo = (event) => {
        event.preventDefault();
        setCorreo(event.value)
    }
    const actualizarContraseña = (event) => {
        event.preventDefault();
        setContraseña(event.value)
    }
  return (
    <div className="div-sidebar-element">
    <form onSubmit={actualizarPerfil }>
      <div className="imagenPerfil"></div>
      <button className="subirImagen">subir imagen</button>
      <div className="texto-input">
        <p className="texto-campos-perfil">Nombre y apellidos</p>
        <input
          type="text"
          className="inputs-perfil"
          placeholder={nombreCompleto}
          onChange={actualizarNombreCompleto}
        ></input>
      </div>
      <div className="texto-input">
        <p className="texto-campos-perfil">Nombre de usuario</p>
        <input
          type="text"
          className="inputs-perfil"
          placeholder={nombreUsuario}
          onChange={actualizarNombreUsuario}
        ></input>
      </div>
      <div className="texto-input dateInput">
        <p className="texto-campos-perfil">Fecha de nacimiento</p>
        <input
          type="date"
          className="inputs-perfil"
        ></input>
      </div>
      <div className="texto-input">
        <p className="texto-campos-perfil">correo electrónico</p>
        <input
          type="email"
          className="inputs-perfil"
          placeholder={correo}
          onChange={actualizarCorreo}
        ></input>
      </div>
      <div className="texto-input">
        <p className="texto-campos-perfil">Contraseña</p>
        <input
          type="password"
          className="inputs-perfil"
          placeholder={contraseña}
          onChange={actualizarContraseña}
        ></input>
      </div>
      <button className="actualizarDatosPerfil" type="submit">Actualizar datos de perfil</button>
      </form>
    </div>
  );
}
export default Info;
