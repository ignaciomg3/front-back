import React from 'react';
import PageLayout from './PageLayout';
import PorcentajeChart from './components/PorcentajeChart';
import ClienteBarChart from './components/ClienteBarChart';
import { usePorcentajeAnalisis } from './hooks/usePorcentajeAnalisis';
import { useClientePorcentaje } from './hooks/useClientePorcentaje';

interface ReportsPageProps {
  onBackToMenu: () => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onBackToMenu }) => {
  const { data, loading, error, refetch } = usePorcentajeAnalisis();
  const { 
    data: clienteData, 
    loading: clienteLoading, 
    error: clienteError, 
    refetch: clienteRefetch 
  } = useClientePorcentaje();

  return (
    <PageLayout title="Reportes y Resultados" onBackToMenu={onBackToMenu}>
      <div className="content-card">
        <h2>📊 Dashboard de Análisis</h2>
        <p>
          Visualiza estadísticas y reportes detallados sobre los análisis realizados.
          El gráfico muestra la distribución de análisis por solicitante con porcentajes actualizados.
        </p>
        
        <div className="action-buttons">
          <button className="action-button">
            📄 Generar Reporte PDF
          </button>
          <button className="action-button">
            📥 Exportar Datos
          </button>
          <button className="action-button secondary">
            � Ver Historial Completo
          </button>
        </div>
      </div>

      <div className="content-card">
        <ClienteBarChart 
          data={clienteData}
          loading={clienteLoading}
          error={clienteError}
          onRefresh={clienteRefetch}
        />
      </div>

      <div className="content-card">
        <PorcentajeChart 
          data={data}
          loading={loading}
          error={error}
          onRefresh={refetch}
        />
      </div>

      <div className="content-card">
        <h2>📈 Estadísticas Generales</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2', fontSize: '2rem' }}>
              {loading || clienteLoading ? '...' : Math.max(
                data.reduce((sum, item) => sum + item.total, 0),
                clienteData.reduce((sum, item) => sum + item.total, 0)
              )}
            </h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#1976d2' }}>Total de Análisis</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e8f5e8', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#388e3c', fontSize: '2rem' }}>
              {loading || clienteLoading ? '...' : Math.max(data.length, clienteData.length)}
            </h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#388e3c' }}>Clientes Activos</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#fff3e0', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#f57c00', fontSize: '2rem' }}>
              {loading || clienteLoading ? '...' : clienteData.length > 0 ? Math.round(clienteData.reduce((sum, item) => sum + item.total, 0) / clienteData.length) : 0}
            </h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#f57c00' }}>Promedio por Cliente</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f3e5f5', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#7b1fa2', fontSize: '2rem' }}>
              {loading || clienteLoading ? '...' : clienteData.length > 0 ? 
                clienteData[0]?.cliente?.substring(0, 10) + (clienteData[0]?.cliente?.length > 10 ? '...' : '') : 
                data.length > 0 ? data[0]?.solicitante?.substring(0, 10) + (data[0]?.solicitante?.length > 10 ? '...' : '') : 'N/A'}
            </h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#7b1fa2' }}>Principal Cliente</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ReportsPage;