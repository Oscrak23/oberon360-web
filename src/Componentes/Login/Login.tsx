import React, { useState, useEffect } from 'react'
import BKGoberon from '../../assets/img/login/BACKGROUND-WEB.png';
import Pwdrms from '../../assets/img/login/POWERED-BY-RMS.png';
import logo360 from '../../assets/img/login/Oberon-360-LOGOV2.png';
import logo360Mov from '../../assets/img/login/gif/OBERON BLANCO 3D .gif';
import Formulario from '../FormularioLogin/Formulario';
import '../Login/loginStyle.css';
import IconoCargando from '../IconoCargando/IconoCargando';

export default function Login() {

    const [cargando, setCargando] = useState(false);

    
    return (
        <div>
            <div>
                <img className='prueb' src={BKGoberon} />
                <img className='logo360ima' src={logo360} />
                <img className='ImagenOberonGirando' src={logo360Mov} />
                <img className='LogoRms' src={Pwdrms} />

                <div className='formContainer'>
                    <Formulario setCargando={setCargando}></Formulario>
                </div>
                {cargando && <IconoCargando />}



            </div>
        </div>
    )
}

