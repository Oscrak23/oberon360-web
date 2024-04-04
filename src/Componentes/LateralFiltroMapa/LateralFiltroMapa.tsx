import { useState } from "react";
import Barra_Lateral from "../../assets/Recursos/BARRA-LATERAL-V2.png";
import LogoUsuarioIndefinido from "../../assets/Recursos/BARRA-BOTON.png";
import BotonFiltro from "../../assets/Recursos/CUADRO-USUARIO.png";

import "./LateralFiltroMapa.css";

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
        <img className="FondoMenu" src={Barra_Lateral} alt="Logo Usuario" />
        <img className="FotoUsuario" src={LogoUsuarioIndefinido} alt="User" />
        <text className="textoUsuario">USUARIO</text>
        <button
          type="button"
          className="botonCerrar" onClick={toggleFiltro}>
          X
        </button>
        {/* <div style={{zIndex:50, color:'red'}}> */}
        <div className="textMenu">
          {/*<BotonMenu onClick1={filtro}>contenido</BotonMenu>
                <BotonMenu>contenido</BotonMenu>
                <BotonMenu>contenido</BotonMenu>*/}
        </div>
        {/* Aquí puedes agregar el contenido adicional del filtro */}
      </div>
    </div>
  );
}
