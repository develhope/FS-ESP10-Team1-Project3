import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/info.css";
import anonimo from './assets-sidebar/anonimo.jpg';
function Info() {
  const userDataObject = localStorage.getItem("userInfo");
  const userDataObjectJson = JSON.parse(userDataObject);
  const [nombreCompleto, setNombreCompleto] = useState(userDataObjectJson?.fullName || "Nombre completo");
  const [nombreUsuario, setNombreUsuario] = useState(userDataObjectJson?.userName || "Nombre de usuario");
 
  
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState("correo electrónico");
  const [contraseña, setContraseña] = useState("contraseña");
  const [imagenPerfil, setImagenPerfil] = useState(anonimo);

  const actualizarPerfil = (event) => {
    event.preventDefault();
    const userData = {
      fullName: nombreCompleto,
      userName: nombreUsuario,
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
    setNombreCompleto(event.target.value);
  };
  const actualizarNombreUsuario = (event) => {
    event.preventDefault();
    setNombreUsuario(event.target.value);
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
  useEffect(() => {
  if (userDataObject) {
        setFechaNacimiento(userDataObjectJson.birthDate);
        setCorreo(userDataObjectJson.email);
        setContraseña(userDataObjectJson.password);
        setImagenPerfil(userDataObjectJson.userImage);
    }
  }, []);
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
            value={nombreCompleto}
            onFocus={(() => {setNombreCompleto("")})}
            onChange={actualizarNombreCompleto}
          ></input>
        </div>
        <div className="texto-input">
          <p className="texto-campos-perfil">Nombre de usuario</p>
          <input
            type="text"
            className="inputs-perfil"
            value={nombreUsuario}
            onFocus={(() => {setNombreUsuario("")})}
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