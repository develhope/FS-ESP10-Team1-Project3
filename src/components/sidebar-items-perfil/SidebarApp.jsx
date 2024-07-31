import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Info from "./Info";
import Portfolio from "./portfolio";
import ProEnCurso from "./ProEnCurso";

function SidebarApp() {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/sidebar/0" element={<Info />} />
        <Route path="/sidebar/1" element={<Portfolio />} />
        <Route path="/sidebar/2" element={<ProEnCurso />} />
      </Routes>
    </div>
  );
}
export default SidebarApp;
