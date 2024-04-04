import axios from "axios";
import { VITE_API_URL2, VITE_API_URL } from "@/config";
import { useLoginStore } from "@/states/Login.state"
export const login = async (Login: {
  user: string;
  password: string;
}) => {

  return await axios.post(`${VITE_API_URL}auth/Login`, Login);
}

export const UbicacionesClientes = async (idCliente?: string | number) => {
  try {
    const { token } = useLoginStore.getState()
    return await axios.post(`${VITE_API_URL}map/getUbications`, {
      CLIUBIC_ID_CLIENT: idCliente || null
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener ubicaciones");
  }
}

export const getAsistencia = async () => {
  try {
    return await axios.get(`${VITE_API_URL2}asistencia`);
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener asistencia");
  }
}


// /api/map / getClients ? term = alpina
export const getClients = async () => {
  try {
    return await axios.get(`${VITE_API_URL}map/getClients`);
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener clientes");
  }
}