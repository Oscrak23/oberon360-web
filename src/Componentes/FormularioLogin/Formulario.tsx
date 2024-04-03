import React, { useState, useContext } from "react";
import "../FormularioLogin/formularioStyle.css";
import usuLogo from "../../assets/img/login/ICONO-USUARIO-GRANDE.png";
import inputLogo from "../../assets/img/login/CUADRO-USUARIO.png";
import passwordLogo from "../../assets/img/login/CUADRO-CONTRASEÑA.png";
import { useNavigate } from "react-router-dom";
import { useConections } from "../../context/conexionesprovider";

export default function Formulario({ setCargando }: any) {
  const navigate = useNavigate();
  const { getLogin } = useConections() as any;
  // const { login } = useContext(LoginContext);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleUsuarioChange = (event: any) => {
    setUsuario(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async () => {
    setCargando(true);
    const respuesta = await getLogin(usuario, password);
    setCargando(false);
    if (respuesta.data.error === "0") {
      // login(usuario);
      // navigate('/asistencia');
      navigate("/mapa");
    } else {
      alert("Error de usuario");
    }
  };

  const MostrarPass = () => {
    setMostrarPassword(!mostrarPassword);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onClickLogin();
    }
  };

  return (
    <div className="contenedor_formulario">
      <img className="usuLogo" src={usuLogo} alt="Usuario Logo" />
      <form>
        <div className="ContainerUsuText">
          <img className="ImgUsuText" src={inputLogo} alt="Input Logo" />
          <input
            className="ImgUsuText InputText"
            onChange={handleUsuarioChange}
            type="text"
            onKeyUp={handleKeyPress}
          />
        </div>
        <div className="ContainerUsuText ConetenedorContrasena">
          <img className="ImgUsuText" src={passwordLogo} alt="Password Logo" />
          <input
            className="ImgUsuText InputText TextPass"
            onChange={handlePasswordChange}
            type={mostrarPassword ? "text" : "password"}
            onKeyUp={handleKeyPress}
          />
          <button
            className="MostrarContraseña"
            onClick={MostrarPass}
            type="button"
          >
            {mostrarPassword ? "O" : "M"}
          </button>
        </div>
        <div className="ContainerBtn">
          <button className="btnSubmit" onClick={onClickLogin} type="button">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
}
