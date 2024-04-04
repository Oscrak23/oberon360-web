import { useState } from "react";
import LogoUsuarioIndefinido from "../../assets/Recursos/BARRA-BOTON.png";
import BotonFiltro from "../../assets/Recursos/CUADRO-USUARIO.png";
import Ondas from "@assets/Recursos/ONDA-BARRA-LATERAL.svg"
import "./LateralFiltroMapa.css";
import oberon360 from "@assets/img/login/LOGO-OBERON-360-FIN.png"
export default function LateralFiltroMapa({
  mostrarVehiculos,
  setMostrarVehiculos,
}: any) {
  const [filtroVisible, setFiltroVisible] = useState(false);

  const filtro = () => {
    setMostrarVehiculos(!mostrarVehiculos);
  };

  // const filtro = () => {
  //     {filtroVisible ? setFiltroVisible(false):filtroVisible(true)}
  //     console.log(filtroVisible);
  //   };

  //   function filtro () {
  //     {filtroVisible ? setFiltroVisible(false):filtroVisible(true)}
  //     console.log(filtroVisible);
  //   };

  const toggleFiltro = () => {
    setFiltroVisible(!filtroVisible);
  };

  return (
    <div>
      <button
        type="button"
        className={`botonMostrarFiltros ${filtroVisible ? "oculto" : ""}`}
        onClick={toggleFiltro}
      >
        <img className="lineaFiltro" src={BotonFiltro} alt="Linea Boton" />
        Menú
      </button>
      <div className={`BarraLateral ${filtroVisible ? "visible" : ""}`}>
        <img src={Ondas} alt="ondas" className="ondas" />
        <img className="FotoUsuario" src={LogoUsuarioIndefinido} alt="User" />
        <img className="oberon360" src={oberon360} alt="oberon360" />
        <h2 className="textoUsuario">USUARIO</h2>
        <button
          type="button"
          className="botonCerrar" onClick={toggleFiltro}>
          X
        </button>
        <div className="textMenu">
          <button className="btn-menu">
            Clientes
          </button>
          <button className="btn-menu">
            Control de asistencia
          </button>
          <button className="btn-menu">
            Tecnología Inteligente
          </button>
          <button className="btn-menu">
            Riesgos
          </button>
          <button className="btn-menu">
            Operación
          </button>
          <button className="btn-menu">
            Tickets
          </button>
          <button className="btn-menu">
            Tableros de control
          </button>
        </div>
      </div>
    </div>
  );
}
