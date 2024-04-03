import type { IUbicacion } from "@/models/ubicaciones.model";
import { create } from "zustand";

interface UbicacionesState {
    ubicaciones: IUbicacion[];
    setUbicaciones: (ubicaciones: IUbicacion[]) => void;
}

export const useUbicaciones = create<UbicacionesState>((set) => ({
    ubicaciones: [],
    setUbicaciones: (ubicaciones) => set({ ubicaciones }),
}));