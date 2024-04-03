import axios from "axios";
import { VITE_API_URL2, VITE_API_URL } from "@/config";
export const login = async (Login: {
  user: string;
  password: string;
}) => {

  return await axios.post(`${VITE_API_URL}auth/Login`, Login);
}

export const UbicacionesClientes = async () => {
  try {
    return await axios.get(`${VITE_API_URL2}Ubicaciones`);
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
