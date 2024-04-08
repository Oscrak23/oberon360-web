
import { create } from "zustand";
import { UbicacionesClientes, getAsistencia } from "../api/conexiones.api";

interface ConexionesState {
    ubicaciones: any[];
    asistencia: any[];
    getUbicaciones: () => void;
    fAsistencia: () => void;
}

export const useConexionesStore = create<ConexionesState>((set) => ({
    ubicaciones: [],
    asistencia: [],
    getUbicaciones: async () => {
        const response = await UbicacionesClientes();
        set({ ubicaciones: response.data });
    },
    fAsistencia: async () => {
        const response = await getAsistencia();
        set({ asistencia: response.data });
    },
}));
