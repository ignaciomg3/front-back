import React, { useState } from 'react';
import PageLayout from './PageLayout';
import AnalisisGrid from './components/AnalisisGrid';
import { useAnalisis } from './hooks/useAnalisis';
import { AnalisisFilters } from './types/analisis';

interface AnalysesPageProps {
  onBackToMenu: () => void;
}

const AnalysesPage: React.FC<AnalysesPageProps> = ({ onBackToMenu }) => {
  const { analisis, loading, error, pagination, changePage, changePageSize, refetch } = useAnalisis();
  const [filters, setFilters] = useState<AnalisisFilters>({});

  const handleFilterChange = (newFilters: AnalisisFilters) => {
    setFilters(newFilters);
    refetch(newFilters, { page: 1, limit: pagination.limit }); // Reset to page 1 when filtering
  };

  const clearFilters = () => {
    setFilters({});
    refetch({}, { page: 1, limit: pagination.limit });
  };

  return (
    <PageLayout title="Análisis" onBackToMenu={onBackToMenu}>
      <div className="content-card">
        <h2>🧪 Gestión de Análisis</h2>
        <p>
          Consulta y administra todos los análisis del laboratorio. 
          Utiliza los filtros para encontrar análisis específicos por estado, solicitante o tipo.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <select 
            value={filters.estado || ''}
            onChange={(e) => handleFilterChange({ ...filters, estado: e.target.value || undefined })}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
          >
            <option value="">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Hecho">Hecho</option>
          </select>
          
          <input
            type="text"
            placeholder="Filtrar por solicitante..."
            value={filters.solicitante || ''}
            onChange={(e) => handleFilterChange({ ...filters, solicitante: e.target.value || undefined })}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd', minWidth: '200px' }}
          />
          
          <input
            type="text"
            placeholder="Filtrar por tipo de análisis..."
            value={filters.tipo_analisis || ''}
            onChange={(e) => handleFilterChange({ ...filters, tipo_analisis: e.target.value || undefined })}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd', minWidth: '200px' }}
          />
          
          <button 
            onClick={clearFilters}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '5px', 
              border: 'none', 
              background: '#6c757d', 
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Limpiar Filtros
          </button>
        </div>

        <div className="action-buttons">
          <button className="action-button">
            ➕ Nuevo Análisis
          </button>
          <button className="action-button">
            📤 Exportar Lista
          </button>
          <button className="action-button secondary">
            📊 Ver Estadísticas
          </button>
        </div>
      </div>

      <div className="content-card">
        <AnalisisGrid 
          analisis={analisis}
          loading={loading}
          error={error}
          pagination={pagination}
          onRefresh={() => refetch(filters)}
          onPageChange={changePage}
          onPageSizeChange={changePageSize}
        />
      </div>
    </PageLayout>
  );
};

export default AnalysesPage;