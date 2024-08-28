import React from "react";
import "../components/css/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
import { faFacebook, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";


export function Footer() {
  return (
    <div>
      <footer class="bg-gray-100">
        <div class="container-footer">
          <div class="footer-links">
            <div>
              <p class="footer-title">Freelance<span className="highlight">Hub</span></p>
              <p className="footer-text">Es una plataforma dedicada a conectar freelancers con oportunidades de trabajo en todo el mundo. <br/>
              Nuestra misión es facilitar el acceso a proyectos para profesionales independientes y <br/> ayudar a las empresas a encontrar el talento que necesitan.</p>
              <ul>
                <li>
                <a href="#">Acerca de </a>
                </li>
                <li>
                  <a href="#">Carreras</a>
                </li>
                <li>
                  <a href="#">Historia</a>
                </li>
                <li>
                  <a href="#">Servicios</a>
                </li>
                <li>
                  <a href="#">Proyectos</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
              
            </div>
          </div>
          <div class="footer-bottom">
          
            <ul class="footer-social">
              <li>
              <FontAwesomeIcon icon={faTwitter} />
              </li>
              <li>
              <FontAwesomeIcon icon={faInstagram} />
              </li>
              <li>
              <FontAwesomeIcon icon={faFacebook} />
              </li>
              <li>
              <FontAwesomeIcon icon={faGithub} />
              </li>
            </ul>
          </div>
          <p class="footer-text">© 2024 FreelanceHub. Todos los derechos reservados.</p>
        </div>
        
      </footer>
    </div>
  );
}
