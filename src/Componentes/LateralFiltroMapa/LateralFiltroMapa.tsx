import { useState } from "react";
import LogoUsuarioIndefinido from "../../assets/Recursos/BARRA-BOTON.png";
import BotonFiltro from "../../assets/Recursos/CUADRO-USUARIO.png";
import Ondas from "@assets/Recursos/ONDA-BARRA-LATERAL.svg"
import "./LateralFiltroMapa.css";
import oberon360 from "@assets/img/login/LOGO-OBERON-360-FIN.png"
export default function LateralFiltroMapa({
  clientes, setCliente
}: any) {
  const [filtroVisible, setFiltroVisible] = useState(false);
  const [mostrarClientes, setMostrarClientes] = useState(false);

  const mostrarClientesFiltro = () => {
    setMostrarClientes(!mostrarClientes);
  }

  const toggleFiltro = () => {
    setFiltroVisible(!filtroVisible);
  };

  const seleccionarCliente = (cliente: any) => {
    setCliente(cliente);
  }

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
          <div className="menu">
            <div className="btn-menu" onClick={() => mostrarClientesFiltro()} >
              Clientes
            </div>
            <div className={`sub-menu ${mostrarClientes ? "visible" : ""}`}>
              {clientes.map((item: any, index: number) => (
                <div onClick={() => seleccionarCliente(item)} key={index} className="sub-menu-item">
                  {item.CLIE_COMERCIAL}
                </div>
              ))
              }
            </div>
          </div>
          <div className="btn-menu">
            Control de asistencia
          </div>
          <div className="btn-menu">
            Tecnología Inteligente
          </div>
          <div className="btn-menu">
            Riesgos
          </div>
          <div className="btn-menu">
            Operación
          </div>
          <div className="btn-menu">
            Tickets
          </div>
          <div className="btn-menu">
            Tableros de control
          </div>
        </div>
      </div>
    </div>
  );
}
