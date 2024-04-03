import axios from "axios";

export const conections = async (Login: any) =>
  await axios.post("http://localhost:9000/ApiCtop/Login/", Login);

export const UbicacionesClientes = async () =>
  await axios.get("http://localhost:9000/ApiCtop/Ubicaciones/");

export const getAsistencia = async () =>
  await axios.get("http://localhost:9000/ApiCtop/asistencia");
