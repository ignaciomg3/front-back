// Tipos para el endpoint de porcentajes
export interface SolicitantePorcentaje {
  solicitante: string;
  total: number;
  porcentaje: string;
}

export interface PorcentajeResponse {
  success?: boolean;
  data?: SolicitantePorcentaje[];
  message?: string;
}

// Tipos para el nuevo endpoint de clientes
export interface ClientePorcentaje {
  cliente: string;
  total: number;
  porcentaje: number; // Ahora es número, no string
}

export interface ClienteResponse {
  success?: boolean;
  data?: ClientePorcentaje[];
  message?: string;
}