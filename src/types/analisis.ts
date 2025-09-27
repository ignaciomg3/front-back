// Tipos para la API de Análisis
export interface Analisis {
  _id: string;
  estado: string;
  solicitante: string;
  tipo_analisis: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  observaciones?: string;
  resultados?: string;
}

export interface AnalisisResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: Analisis[];
}

export interface AnalisisFilters {
  estado?: string;
  solicitante?: string;
  tipo_analisis?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}