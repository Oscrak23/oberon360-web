import AsistenciaImg from "@assets/img/img-asistencia/backgroundAsis.png";
import Logoimg from "../../assets/img/img-asistencia/TSI.png";

export default function asistenciaLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <img className="prueb" src={AsistenciaImg} alt="bg" />
            <div>
                <div className="contenedorTitulo">
                    <text className="titulo"> CONTROL DE ASISTENCIA</text>
                    <div style={{ position: "relative" }}>
                        <div className="LineaCss" />
                        <div className="PuntosLinea" />
                        <div className="PuntosLinea PuntosFInLinea" />
                    </div>
                </div>
                <div className="logoimg">
                    <img className="logoTsi" src={Logoimg} alt="logo" />
                </div>
            </div>
            {children}
        </main>
    )
}
