// Tipos para la API de Muestras
export interface ParametroMuestra {
  valor: number;
  unidad: string;
}

export interface Muestra {
  _id?: string;
  nro_informe: number;
  muestra_nombre: string;
  parametros: { [key: string]: ParametroMuestra };
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface MuestrasResponse {
  success: boolean;
  count: number;
  data: Muestra[];
}

export interface MuestrasFilters {
  muestra_nombre?: string;
  nro_informe?: number;
}