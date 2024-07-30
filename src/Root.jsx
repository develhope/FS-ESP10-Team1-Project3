import React from "react";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import Perfil from "./components/Perfil";

export function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
