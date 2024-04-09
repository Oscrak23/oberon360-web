import { useState } from 'react'
import FormularioLogin from '@components/LoginComponents/FormularioLogin/FormularioLogin';
import './loginStyle.css';
import IconoCargando from '@components/IconoCargando/IconoCargando';
import LoginLayout from '@/layouts/Login/loginLayout';
import FormularioReset from '@/Componentes/LoginComponents/FormularioReset/FormularioReset';

export default function Login() {

    const [cargando, setCargando] = useState(false);
    const [reset, setReset] = useState(false)
    return (
        <LoginLayout>
            <div className='formContainer'>
                {reset ? (
                    <FormularioReset setCargando={setCargando} />
                ) : (

                    <FormularioLogin setCargando={setCargando} setReset={setReset} />
                )}
            </div>
            {cargando && <IconoCargando />}

        </LoginLayout>
    )
}

