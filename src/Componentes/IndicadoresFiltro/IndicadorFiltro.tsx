import React, { useState } from "react";
import "./IndicadorFiltro.css";
import BotonFiltro from "../../assets/Recursos/CUADRO-USUARIO.png";

export default function IndicadorFiltro() {
  const [filtroVisible, setFiltroVisible] = useState(false);
  const toggleFiltro = () => {
    setFiltroVisible(!filtroVisible);
  };
  return (
    <div>
      <button
        className={`botonMostrarTickets ${filtroVisible ? "oculto" : ""}`}
        onClick={toggleFiltro}
      >
        <img className="lineaFiltro" src={BotonFiltro} alt="Linea Boton" />
        Tickets
      </button>
      <div className={`contenedorTickets ${filtroVisible ? "visible" : ""}`}>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>CLASIFICACIÓN DE RIESGO</th>
              <th>ESTADO</th>
              <th>DATOS TICKETS</th>
            </tr>
          </thead>
        </table>
        <button className="botonCerrar" onClick={toggleFiltro}>
          X
        </button>
      </div>
      <div className="contenedor">
        <div
          className="indicadorColor"
          style={{ backgroundColor: "#00a148" }}
        ></div>
        <text>Sin novedad</text>
        <div
          className="indicadorColor"
          style={{ backgroundColor: "#aa0000" }}
        ></div>
        <text>Con novedad</text>
        <div
          className="indicadorColor"
          style={{ backgroundColor: "#00429f" }}
        ></div>
        <text>En curso</text>
        <div
          className="indicadorColor"
          style={{ backgroundColor: "#c7c100" }}
        ></div>
        <text>Resuelto</text>
      </div>
    </div>
  );
}
