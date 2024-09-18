import { React, useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Proyectos } from "./components/Proyectos";
import { Services } from "./components/Services";
import Login from "./components/Login";
import { Footer } from "./components/Footer";
import SidebarApp from "./components/sidebar-items-perfil/SidebarApp";
import UserList from "./components/UserList";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-3erzjdx3zx5m21bh.us.auth0.com";
const clientId = "KpqssnSz2CKBQtk7ZWESKzPdYr1j3hQS";
export function App() {

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/sidebar", 
        scope: "openid profile email"  // Añade los scopes necesarios aquí
      }}
    >
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="services" element={<Services />} />
          <Route path="busqueda" element={<Proyectos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Container />} />
          <Route path="/sidebar/*" element={<SidebarApp />} />
          <Route path="/UserList/" element={<UserList />} />
        </Routes>
      </div>
      <Footer />
    </div>
    </Auth0Provider>
  );
}
