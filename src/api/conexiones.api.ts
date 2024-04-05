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


// /api/map /getClients?term=alpina&page=&take
export const getClients = async (page: number = 1, take: number = 20) => {
  try {
    const { token } = useLoginStore.getState()

    return await axios.get(`${VITE_API_URL}map/getClients?page=${page}&take=${take}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener clientes");
  }
}
// /attendance/findAttendance

export const getAsistencia = async (page: number = 1, take: number = 100) => {
  try {
    const { token } = useLoginStore.getState()
    return await axios.get(`${VITE_API_URL}attendance/findAttendance?page=${page}&take=${take}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    });
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener asistencia");
  }
}