import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/info.css";
function Info() {
  const userDataObject = localStorage.getItem("userInfo");
  const userDataObjectJson = JSON.parse(userDataObject);
  const [nombreCompleto, setNombreCompleto] = useState(userDataObjectJson.fullName);
  const [nombreUsuario, setNombreUsuario] = useState(userDataObjectJson.userName);
  const [fechaNacimiento, setFechaNacimiento] = useState(userDataObjectJson.birthDate);
  const [correo, setCorreo] = useState(userDataObjectJson.email);
  const [contraseña, setContraseña] = useState(userDataObjectJson.password);
  const [imagenPerfil, setImagenPerfil] = useState(userDataObjectJson.userImage);

  const [nuevoNombre, setNuevoNombre] = useState(userDataObjectJson.fullName);
  const [nuevoNombreUsuario, setNuevoNombreUsuario] = useState(userDataObjectJson.userName);
  const actualizarPerfil = (event) => {
    event.preventDefault();
    setNombreCompleto(nuevoNombre);
    setNombreUsuario(nuevoNombreUsuario);
    const userData = {
      fullName: nuevoNombre,
      userName: nuevoNombreUsuario,
      birthDate: fechaNacimiento,
      email: correo,
      password: contraseña,
      userImage: imagenPerfil,
    };
    const userDataStrings = JSON.stringify(userData);
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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="div-sidebar-element">
      <form onSubmit={actualizarPerfil}>
        <div className="imagenItems">
          <div className="imagenPerfil">{imagenPerfil !== ""?<img className="userSelectedImage" src={imagenPerfil}></img>:<p className="parrafoImagen">No hay ninguna imagen</p>}</div>
          <input
            type="file"
            onChange={subirNuevaImagen}
            accept="image/*"
            id="inputFile"
          ></input>
          <label htmlFor="inputFile" className="subirImagen">
            Subir imagen
          </label>
        </div>
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
            value={fechaNacimiento}
            readOnly
          ></input>
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
