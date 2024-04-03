import React from 'react'
import AlpinaLogo from "../../Componentes/Mapa/Recursos/ALPINA-AZUL.png";
import './EtiquetaLateralLogoCli.css'

export default function EtiquetaLateralLogoCli() {
  return (
    <div className='contenedorLogo'>
      <img className='logo' src={AlpinaLogo} alt='Logo Usuario'></img>
    </div>
  )
}
