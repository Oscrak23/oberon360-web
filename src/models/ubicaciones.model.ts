export interface IUbicacion {
    ID: string;
    TipoIcono: ETipoIcono;
    Longitud: number;
    Latitud: number;
    Detalle: string;
    TiempoInicio: string;
    TiempoFinal: string;
    hora_actual: string;
}

export enum ETipoIcono {
    Primaria = 1,
    Secundaria = 2,
    Mobile = 3,
    Finca = 4,
    FincaVIP = 5,
}