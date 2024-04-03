import { useState } from 'react'
import Formulario from '../../Componentes/FormularioLogin/Formulario';
import '../Login/loginStyle.css';
import IconoCargando from '../../Componentes/IconoCargando/IconoCargando';
import LoginLayout from '@/layouts/Login/loginLayout';

export default function Login() {

    const [cargando, setCargando] = useState(false);

    return (
        <LoginLayout>
            <div className='formContainer'>
                <Formulario setCargando={setCargando} />
            </div>
            {cargando && <IconoCargando />}

        </LoginLayout>
    )
}

