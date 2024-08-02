import { useState } from "react";
import Sidebar from "./Sidebar";
import "./sidebar-items-css/portfolio.css";
function Portfolio() {
    const [portfolio, setPortfolio] = useState()
    return (
        <div className="div-sidebar-element">
        <div className="portfolio-habilidades">
        <form>
        <div className="texto-input">
        <p className="texto-campos-perfil">Link al portfolio</p>
        <input
          type="text"
          className="inputs-perfil"
          placeholder="link local storage"
          onChange={"aqui va la funcion que actualiza el link en localstorage"}
        ></input>
      </div>
        </form>
        </div>
        </div>
    )
}
export default Portfolio;