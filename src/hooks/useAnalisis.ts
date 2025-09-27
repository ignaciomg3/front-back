import { useState, useEffect } from 'react';
import { Analisis, AnalisisResponse, AnalisisFilters, PaginationParams } from '../types/analisis';

// Simulamos la URL de la API - en producción vendría de variables de entorno
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const useAnalisis = () => {
  const [analisis, setAnalisis] = useState<Analisis[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10
  });

  // Datos de ejemplo para desarrollo/fallback
  const generateMockData = (page: number, limit: number): AnalisisResponse => {
    const mockAnalisis: Analisis[] = [
      {
        _id: '1',
        estado: 'Pendiente',
        solicitante: 'AGUAS CORDOBESAS S.A.',
        tipo_analisis: 'BACTERIOLOGICO COMPLETO',
        fecha_creacion: '2025-09-27',
        observaciones: 'Muestra tomada en planta de tratamiento'
      },
      {
        _id: '2',
        estado: 'Hecho',
        solicitante: 'HOSPITAL NACIONAL DE CLINICAS',
        tipo_analisis: 'FISICO QUIMICO BASICO',
        fecha_creacion: '2025-09-26',
        resultados: 'Parámetros dentro de los rangos normales'
      },
      {
        _id: '3',
        estado: 'En Proceso',
        solicitante: 'MUNICIPALIDAD DE CORDOBA',
        tipo_analisis: 'METALES PESADOS',
        fecha_creacion: '2025-09-25',
        observaciones: 'Requiere análisis especializado'
      },
      {
        _id: '4',
        estado: 'Hecho',
        solicitante: 'CLINICA PRIVADA DEL SUR',
        tipo_analisis: 'MICROBIOLOGICO',
        fecha_creacion: '2025-09-24',
        resultados: 'Sin presencia de patógenos'
      },
      {
        _id: '5',
        estado: 'Pendiente',
        solicitante: 'UNIVERSIDAD NACIONAL DE CORDOBA',
        tipo_analisis: 'ANALISIS COMPLETO DE AGUA',
        fecha_creacion: '2025-09-23',
        observaciones: 'Muestra de investigación'
      },
      {
        _id: '6',
        estado: 'En Proceso',
        solicitante: 'EMPRESA ALIMENTARIA XYZ',
        tipo_analisis: 'CONTROL DE CALIDAD',
        fecha_creacion: '2025-09-22',
        observaciones: 'Análisis de rutina mensual'
      },
      {
        _id: '7',
        estado: 'Hecho',
        solicitante: 'MINISTERIO DE SALUD',
        tipo_analisis: 'EPIDEMIOLOGICO',
        fecha_creacion: '2025-09-21',
        resultados: 'Cumple con normativas sanitarias'
      },
      {
        _id: '8',
        estado: 'Pendiente',
        solicitante: 'COOPERATIVA DE AGUA POTABLE',
        tipo_analisis: 'BACTERIOLOGICO SIMPLE',
        fecha_creacion: '2025-09-20',
        observaciones: 'Control de rutina semanal'
      },
      {
        _id: '9',
        estado: 'Hecho',
        solicitante: 'LABORATORIO CENTRAL',
        tipo_analisis: 'INTERCONSULTA',
        fecha_creacion: '2025-09-19',
        resultados: 'Derivado a laboratorio especializado'
      },
      {
        _id: '10',
        estado: 'En Proceso',
        solicitante: 'SANATORIO METROPOLITANO',
        tipo_analisis: 'URGENTE - TOXICOLOGICO',
        fecha_creacion: '2025-09-18',
        observaciones: 'Prioridad alta'
      },
      {
        _id: '11',
        estado: 'Pendiente',
        solicitante: 'AGUAS DEL INTERIOR',
        tipo_analisis: 'FISICO QUIMICO COMPLETO',
        fecha_creacion: '2025-09-17',
        observaciones: 'Análisis trimestral'
      },
      {
        _id: '12',
        estado: 'Hecho',
        solicitante: 'INSTITUTO DE INVESTIGACION',
        tipo_analisis: 'ESPECIAL - METALES',
        fecha_creacion: '2025-09-16',
        resultados: 'Dentro de parámetros esperados'
      }
    ];

    const total = mockAnalisis.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = mockAnalisis.slice(startIndex, endIndex);

    return {
      success: true,
      count: paginatedData.length,
      total: total,
      page: page,
      totalPages: totalPages,
      data: paginatedData
    };
  };

  const fetchAnalisis = async (filters?: AnalisisFilters, paginationParams?: PaginationParams) => {
    setLoading(true);
    setError(null);
    
    const page = paginationParams?.page || pagination.page;
    const limit = paginationParams?.limit || pagination.limit;

    try {
      // Construir URL con parámetros de filtro y paginación
      const url = new URL(`${API_BASE_URL}/api/analisis`);
      if (filters?.estado) url.searchParams.append('estado', filters.estado);
      if (filters?.solicitante) url.searchParams.append('solicitante', filters.solicitante);
      if (filters?.tipo_analisis) url.searchParams.append('tipo_analisis', filters.tipo_analisis);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', limit.toString());

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: AnalisisResponse = await response.json();
      
      if (data.success) {
        setAnalisis(data.data);
        setPagination({
          page: data.page,
          totalPages: data.totalPages,
          total: data.total,
          limit: limit
        });
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      // En caso de error, mostrar datos de ejemplo para desarrollo
      const mockData = generateMockData(page, limit);
      setAnalisis(mockData.data);
      setPagination({
        page: mockData.page,
        totalPages: mockData.totalPages,
        total: mockData.total,
        limit: limit
      });
    } finally {
      setLoading(false);
    }
  };

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchAnalisis(undefined, { page: newPage, limit: pagination.limit });
    }
  };

  const changePageSize = (newLimit: number) => {
    fetchAnalisis(undefined, { page: 1, limit: newLimit });
  };

  useEffect(() => {
    fetchAnalisis();
  }, []);

  return {
    analisis,
    loading,
    error,
    pagination,
    changePage,
    changePageSize,
    refetch: fetchAnalisis
  };
};