import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Info from "./Info";
import Portfolio from "./portfolio";
import ProEnCurso from "./ProEnCurso";
import ProFinalizados from "./ProFinalizados";
import InfoBancaria from "./InfoBancaria";
import { Anuncio } from "./Anuncio";

function SidebarApp() {
  return (
    <div className="elementsOnSidebar">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Info />} />
        <Route path="0" element={<Info />} />
        <Route path="1" element={<Portfolio />} />
        <Route path="2" element={<ProEnCurso />} />
        <Route path="3" element={<ProFinalizados />} />
        <Route path="4" element={<InfoBancaria />} />
        <Route path="5" element={<Anuncio/>} />
      </Routes>
    </div>
  );
}
export default SidebarApp;
