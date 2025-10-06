import { useState, useEffect } from 'react';
import { Muestra, MuestrasResponse, MuestrasFilters, MuestrasPaginationParams } from '../types/muestras';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const useMuestras = () => {
  const [muestras, setMuestras] = useState<Muestra[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10
  });

  // Datos de ejemplo para desarrollo/fallback
  const generateMockData = (): Muestra[] => {
    return [
      {
        _id: '1',
        nro_informe: 6177,
        muestra_nombre: 'Agua Lago Interno de Recreación',
        parametros: {
          'DBO5': {
            valor: 7,
            unidad: 'mg/l'
          },
          'pH': {
            valor: 7.2,
            unidad: 'unidades'
          },
          'Turbidez': {
            valor: 15,
            unidad: 'NTU'
          }
        },
        fecha_creacion: '2025-10-06'
      },
      {
        _id: '2',
        nro_informe: 6178,
        muestra_nombre: 'Agua Potable Red Urbana',
        parametros: {
          'Cloro_Residual': {
            valor: 0.8,
            unidad: 'mg/l'
          },
          'pH': {
            valor: 7.5,
            unidad: 'unidades'
          },
          'Conductividad': {
            valor: 450,
            unidad: 'µS/cm'
          },
          'Dureza_Total': {
            valor: 120,
            unidad: 'mg/l CaCO3'
          }
        },
        fecha_creacion: '2025-10-05'
      },
      {
        _id: '3',
        nro_informe: 6179,
        muestra_nombre: 'Efluente Industrial Planta A',
        parametros: {
          'DQO': {
            valor: 250,
            unidad: 'mg/l'
          },
          'DBO5': {
            valor: 120,
            unidad: 'mg/l'
          },
          'Sólidos_Suspendidos': {
            valor: 85,
            unidad: 'mg/l'
          },
          'Aceites_Grasas': {
            valor: 12,
            unidad: 'mg/l'
          }
        },
        fecha_creacion: '2025-10-04'
      },
      {
        _id: '4',
        nro_informe: 6180,
        muestra_nombre: 'Agua Subterránea Pozo #3',
        parametros: {
          'Arsénico': {
            valor: 0.008,
            unidad: 'mg/l'
          },
          'Nitratos': {
            valor: 25,
            unidad: 'mg/l'
          },
          'Fluoruros': {
            valor: 0.9,
            unidad: 'mg/l'
          },
          'Coliformes_Totales': {
            valor: 0,
            unidad: 'UFC/100ml'
          }
        },
        fecha_creacion: '2025-10-03'
      },
      {
        _id: '5',
        nro_informe: 6181,
        muestra_nombre: 'Agua Piscina Municipal',
        parametros: {
          'Cloro_Libre': {
            valor: 1.2,
            unidad: 'mg/l'
          },
          'pH': {
            valor: 7.4,
            unidad: 'unidades'
          },
          'Alcalinidad': {
            valor: 80,
            unidad: 'mg/l CaCO3'
          }
        },
        fecha_creacion: '2025-10-02'
      }
    ];
  };

  const fetchMuestras = async (filters?: MuestrasFilters, paginationParams?: MuestrasPaginationParams) => {
    setLoading(true);
    setError(null);
    
    const page = paginationParams?.page || pagination.page;
    const limit = paginationParams?.limit || pagination.limit;
    
    try {
      // Usar la nueva API con endpoint /todas
      const url = new URL(`${API_BASE_URL}/api/muestras/todas`);
      
      // Agregar parámetros de paginación
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', limit.toString());
      
      // Agregar filtros si existen
      if (filters?.muestra_nombre) url.searchParams.append('muestra_nombre', filters.muestra_nombre);
      if (filters?.nro_informe) url.searchParams.append('nro_informe', filters.nro_informe.toString());

      console.log('Fetching muestras from:', url.toString());

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: MuestrasResponse = await response.json();
      console.log('Muestras response:', data);
      
      if (data.success && data.data) {
        setMuestras(data.data);
        setPagination({
          page: data.page,
          totalPages: data.totalPages,
          total: data.total,
          limit: limit
        });
      } else if (Array.isArray(data)) {
        // Si el endpoint devuelve directamente el array (fallback)
        const mockPagination = generateMockPagination(data.length, page, limit);
        setMuestras(data as unknown as Muestra[]);
        setPagination(mockPagination);
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error fetching muestras:', errorMessage);
      setError(errorMessage);
      // En caso de error, mostrar datos de ejemplo para desarrollo
      console.log('Using mock data for muestras');
      const mockData = generateMockData();
      const mockPag = generateMockPagination(mockData.length, page, limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      setMuestras(mockData.slice(startIndex, endIndex));
      setPagination(mockPag);
    } finally {
      setLoading(false);
    }
  };

  const generateMockPagination = (totalItems: number, currentPage: number, pageSize: number) => {
    return {
      page: currentPage,
      totalPages: Math.ceil(totalItems / pageSize),
      total: totalItems,
      limit: pageSize
    };
  };

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchMuestras(undefined, { page: newPage, limit: pagination.limit });
    }
  };

  const changePageSize = (newLimit: number) => {
    fetchMuestras(undefined, { page: 1, limit: newLimit });
  };

  useEffect(() => {
    fetchMuestras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    muestras,
    loading,
    error,
    pagination,
    fetchMuestras,
    changePage,
    changePageSize,
    refetch: fetchMuestras
  };
};