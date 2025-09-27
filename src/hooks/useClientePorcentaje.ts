import { useState, useEffect } from 'react';
import { ClientePorcentaje } from '../types/reportes';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const useClientePorcentaje = () => {
  const [data, setData] = useState<ClientePorcentaje[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Datos de ejemplo para desarrollo/fallback
  const generateMockData = (): ClientePorcentaje[] => {
    return [
      {
        cliente: 'AGUAS CORDOBESAS S.A.',
        total: 45,
        porcentaje: 35.16
      },
      {
        cliente: 'HOSPITAL NACIONAL DE CLINICAS',
        total: 28,
        porcentaje: 21.88
      },
      {
        cliente: 'MUNICIPALIDAD DE CORDOBA',
        total: 22,
        porcentaje: 17.19
      },
      {
        cliente: 'CLINICA PRIVADA DEL SUR',
        total: 15,
        porcentaje: 11.72
      },
      {
        cliente: 'UNIVERSIDAD NACIONAL DE CORDOBA',
        total: 12,
        porcentaje: 9.38
      },
      {
        cliente: 'EMPRESA ALIMENTARIA XYZ',
        total: 8,
        porcentaje: 6.25
      },
      {
        cliente: 'COOPERATIVA DE AGUA POTABLE',
        total: 6,
        porcentaje: 4.69
      },
      {
        cliente: 'SANATORIO METROPOLITANO',
        total: 4,
        porcentaje: 3.13
      }
    ];
  };

  const fetchClientePorcentajes = async () => {
    setLoading(true);
    setError(null);
    
    // Lista de endpoints para probar
    const endpoints = [
      `${API_BASE_URL}/api/analisis/clientes/porcentaje`,
      `${API_BASE_URL}/clientes/porcentaje`,
      `${API_BASE_URL}/api/clientes/porcentaje`
    ];

    for (let i = 0; i < endpoints.length; i++) {
      try {
        const url = endpoints[i];
        console.log(`Attempting to fetch cliente data from: ${url}`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          if (i === endpoints.length - 1) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          continue; // Try next endpoint
        }

        const responseData = await response.json();
        console.log('Cliente response data:', responseData);
        
        // El endpoint puede devolver directamente el array o un objeto con data
        let processedData: ClientePorcentaje[] = [];
        
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
          typeof item.cliente === 'string' && 
          item.cliente.trim() !== '' &&
          typeof item.total === 'number' && 
          item.total > 0 &&
          typeof item.porcentaje === 'number'
        );

        if (validatedData.length === 0 && processedData.length > 0) {
          if (i === endpoints.length - 1) {
            throw new Error('Los datos recibidos no tienen el formato correcto');
          }
          continue; // Try next endpoint
        }

        console.log('Successfully processed cliente data:', validatedData);
        setData(validatedData);
        return; // Success, exit the function
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        console.error(`Error with cliente endpoint ${endpoints[i]}:`, errorMessage);
        
        if (i === endpoints.length - 1) {
          // Last endpoint failed, use mock data
          setError(`Error al conectar con el backend: ${errorMessage}`);
          console.log('Using mock cliente data due to all endpoints failing');
          setData(generateMockData());
        }
      }
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchClientePorcentajes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchClientePorcentajes
  };
};