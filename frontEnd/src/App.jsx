import { React, useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Proyectos } from "./components/Proyectos";
import { Services } from "./components/Services";
import Login from "./components/Login";
import { Footer } from "./components/Footer";
import SidebarApp from "./components/sidebar-items-perfil/SidebarApp";

export function App() {

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="services" element={<Services />} />
          <Route path="busqueda" element={<Proyectos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Container />} />
          <Route path="/sidebar/*" element={<SidebarApp />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
