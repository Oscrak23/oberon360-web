import React from 'react';
import LogoCarga from '../../assets/img/login/CIRCULO-CARGAR.png';
import './IconoCargando.css'

export default function IconoCargando() {
  return (
    <div className='contenedorImagen'>
      <img
        className='logoCarga'
        src={LogoCarga}
        alt="Icono de Cargando"
      />
    </div>
  );
}
