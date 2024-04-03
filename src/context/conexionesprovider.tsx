import { useContext, createContext, useState } from "react";
import {
  conections,
  UbicacionesClientes,
  getAsistencia,
} from "../api/conexiones.api";

// Creamos el contexto
export const ConexionesContext = createContext({});

export const useConections = () => {
  const context = useContext(ConexionesContext);
  if (!context) {
    throw new Error(
      "useConections must be used within a ConexionesContextProvider"
    );
  }
  return context;
};

export const ConexionesContextProvider = ({ children }: any) => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [asistencia, setasistencia] = useState([]);
  const getLogin = async (user: string, password: string) => {
    try {
      const bodyreq = {
        user: user,
        password: password,
      };
      const response = await conections(bodyreq);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  async function getUbicaciones() {
    const response = await UbicacionesClientes();
    setUbicaciones(response.data);
  }

  async function fAsistencia() {
    const response = await getAsistencia();
    console.log(response.data);
    setasistencia(response.data);
  }

  return (
    <ConexionesContext.Provider
      value={{
        ubicaciones,
        getLogin,
        getUbicaciones,
        asistencia,
        fAsistencia,
      }}
    >
      {children}
    </ConexionesContext.Provider>
  );
};
