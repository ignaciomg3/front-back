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
  total: number;
  page: number;
  totalPages: number;
  data: Muestra[];
}

export interface MuestrasFilters {
  muestra_nombre?: string;
  nro_informe?: number;
}

export interface MuestrasPaginationParams {
  page?: number;
  limit?: number;
}

export interface MuestrasPagination {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
}