import { useState, useEffect } from 'react';
import { SolicitantePorcentaje } from '../types/reportes';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const usePorcentajeAnalisis = () => {
  const [data, setData] = useState<SolicitantePorcentaje[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Datos de ejemplo para desarrollo/fallback
  const generateMockData = (): SolicitantePorcentaje[] => {
    return [
      {
        solicitante: 'AGUAS CORDOBESAS S.A.',
        total: 45,
        porcentaje: '35.16%'
      },
      {
        solicitante: 'HOSPITAL NACIONAL DE CLINICAS',
        total: 28,
        porcentaje: '21.88%'
      },
      {
        solicitante: 'MUNICIPALIDAD DE CORDOBA',
        total: 22,
        porcentaje: '17.19%'
      },
      {
        solicitante: 'CLINICA PRIVADA DEL SUR',
        total: 15,
        porcentaje: '11.72%'
      },
      {
        solicitante: 'UNIVERSIDAD NACIONAL DE CORDOBA',
        total: 12,
        porcentaje: '9.38%'
      },
      {
        solicitante: 'OTROS SOLICITANTES',
        total: 6,
        porcentaje: '4.69%'
      }
    ];
  };

  const fetchPorcentajes = async () => {
    setLoading(true);
    setError(null);
    
    // Lista de endpoints para probar
    const endpoints = [
      `${API_BASE_URL}/analisis/porcentaje`,
      `${API_BASE_URL}/analisis/porcentaje-simple`
    ];

    for (let i = 0; i < endpoints.length; i++) {
      try {
        const url = endpoints[i];
        console.log(`Attempting to fetch from: ${url}`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          if (i === endpoints.length - 1) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          continue; // Try next endpoint
        }

        const responseData = await response.json();
        console.log('Response data:', responseData);
        
        // El endpoint puede devolver directamente el array o un objeto con data
        let processedData: SolicitantePorcentaje[] = [];
        
        if (Array.isArray(responseData)) {
          processedData = responseData;
        } else if (responseData.success && responseData.data && Array.isArray(responseData.data)) {
          processedData = responseData.data;
        } else if (responseData.data && Array.isArray(responseData.data)) {
          processedData = responseData.data;
        } else {
          if (i === endpoints.length - 1) {
            throw new Error('Formato de respuesta inesperado');
          }
          continue; // Try next endpoint
        }

        // Validar que cada elemento tenga las propiedades requeridas
        const validatedData = processedData.filter(item => 
          item && 
          typeof item.solicitante === 'string' && 
          item.solicitante.trim() !== '' &&
          typeof item.total === 'number' && 
          item.total > 0 &&
          typeof item.porcentaje === 'string'
        );

        if (validatedData.length === 0 && processedData.length > 0) {
          if (i === endpoints.length - 1) {
            throw new Error('Los datos recibidos no tienen el formato correcto');
          }
          continue; // Try next endpoint
        }

        console.log('Successfully processed data:', validatedData);
        setData(validatedData);
        return; // Success, exit the function
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        console.error(`Error with endpoint ${endpoints[i]}:`, errorMessage);
        
        if (i === endpoints.length - 1) {
          // Last endpoint failed, use mock data
          setError(`Error al conectar con el backend: ${errorMessage}`);
          console.log('Using mock data due to all endpoints failing');
          setData(generateMockData());
        }
      }
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchPorcentajes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchPorcentajes
  };
};