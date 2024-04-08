import { Route, Routes } from 'react-router-dom';
import Asistencia from './pages/asistencia/asistencia';
import Login from './pages/Login/Login';
import MapaGoogle from './pages/Mapa/MapaGoogle';
export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/asistencia" element={<Asistencia />} />
            <Route path="/mapa" element={<MapaGoogle />} />
        </Routes>
    )
}