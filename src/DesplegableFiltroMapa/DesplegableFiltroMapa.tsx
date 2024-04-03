import React from 'react'
import BotonFiltroMapa from '../Componentes/BotonFiltroMapa/BotonFiltroMapa';

export default function DesplegableFiltroMapa() {

    const botones = [
        { nombre: "rojos" },
        { nombre: "discord" },
    ];

    return (
        <div style={{
            width: '20%',
            padding: '20px',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 1,
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0))',
            display: 'flex',
            flexDirection: 'column',


        }}>
            {/* Aquí puedes colocar tu contenido de menú */}
            <h2>Oberon-360</h2>
            {(botones.map((nombreBoton) => (
                <ul>
                    <BotonFiltroMapa>{nombreBoton.nombre}</BotonFiltroMapa>
                </ul>)))}

        </div>
    )
}
