import MapaGoogle from "./Componentes/Mapa/MapaGoogle";
import Login from "./Componentes/Login/Login";
import Asistencia from "./Componentes/asistencia/asistencia";
import { Route, Routes } from "react-router-dom";
// import MapaQgis from './Componentes/Mapa/MapaQgis';
import "react-toastify/dist/ReactToastify.css";
import { ConexionesContextProvider } from "./context/conexionesprovider";
import { LoginProvider } from "./context/LoginProvider";

function App() {
  return (
    <ConexionesContextProvider>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/asistencia" element={<Asistencia />} />
          <Route path="/mapa" element={<MapaGoogle />} />
        </Routes>
      </LoginProvider>
    </ConexionesContextProvider>
  );
}

export default App;
