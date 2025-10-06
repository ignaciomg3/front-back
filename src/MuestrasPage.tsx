import React, { useState } from 'react';
import PageLayout from './PageLayout';
import MuestrasGrid from './components/MuestrasGrid';
import { useMuestras } from './hooks/useMuestras';
import { MuestrasFilters } from './types/muestras';

interface MuestrasPageProps {
  onBackToMenu: () => void;
}

const MuestrasPage: React.FC<MuestrasPageProps> = ({ onBackToMenu }) => {
  const { muestras, loading, error, pagination, fetchMuestras, changePage, changePageSize } = useMuestras();
  const [filters, setFilters] = useState<MuestrasFilters>({});

  const handleFilterChange = (newFilters: MuestrasFilters) => {
    setFilters(newFilters);
    fetchMuestras(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    fetchMuestras();
  };

  const totalParametros = muestras.reduce((total, muestra) => {
    return total + Object.keys(muestra.parametros || {}).length;
  }, 0);

  return (
    <PageLayout title="Muestras" onBackToMenu={onBackToMenu}>
      <div className="content-card">
        <h2>🥽 Gestión de Muestras</h2>
        <p>
          Consulta y administra todas las muestras analizadas en el laboratorio. 
          Cada muestra contiene múltiples parámetros con sus valores y unidades correspondientes.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Filtrar por nombre de muestra..."
            value={filters.muestra_nombre || ''}
            onChange={(e) => handleFilterChange({ ...filters, muestra_nombre: e.target.value || undefined })}
            style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd', minWidth: '250px' }}
          />
          
          <input
            type="number"
            placeholder="Filtrar por número de informe..."
            value={filters.nro_informe || ''}
            onChange={(e) => handleFilterChange({ ...filters, nro_informe: e.target.value ? parseInt(e.target.value) : undefined })}
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
            ➕ Nueva Muestra
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
        <h2>📊 Estadísticas de Muestras</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2', fontSize: '2rem' }}>
              {loading ? '...' : muestras.length}
            </h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#1976d2' }}>Total de Muestras</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e8f5e8', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#388e3c', fontSize: '2rem' }}>
              {loading ? '...' : totalParametros}
            </h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#388e3c' }}>Parámetros Totales</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#fff3e0', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#f57c00', fontSize: '2rem' }}>
              {loading ? '...' : muestras.length > 0 ? Math.round(totalParametros / muestras.length) : 0}
            </h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#f57c00' }}>Promedio por Muestra</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f3e5f5', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#7b1fa2', fontSize: '2rem' }}>
              {loading ? '...' : new Set(muestras.flatMap(m => Object.keys(m.parametros || {}))).size}
            </h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#7b1fa2' }}>Tipos de Parámetros</p>
          </div>
        </div>
      </div>

      <div className="content-card">
        <MuestrasGrid 
          muestras={muestras}
          loading={loading}
          error={error}
          pagination={pagination}
          onRefresh={() => fetchMuestras(filters)}
          onChangePage={changePage}
          onChangePageSize={changePageSize}
        />
      </div>
    </PageLayout>
  );
};

export default MuestrasPage;