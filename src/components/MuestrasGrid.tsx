import React, { useState } from 'react';
import { Muestra, MuestrasPagination } from '../types/muestras';
import './MuestrasGrid.css';

interface MuestrasGridProps {
  muestras: Muestra[];
  loading: boolean;
  error: string | null;
  pagination: MuestrasPagination;
  onRefresh: () => void;
  onChangePage: (page: number) => void;
  onChangePageSize: (pageSize: number) => void;
}

const MuestrasGrid: React.FC<MuestrasGridProps> = ({ 
  muestras, 
  loading, 
  error, 
  pagination, 
  onRefresh,
  onChangePage,
  onChangePageSize 
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No especificada';
    try {
      return new Date(dateString).toLocaleDateString('es-ES');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando muestras...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>⚠️ Error al cargar datos</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={onRefresh}>
            🔄 Reintentar
          </button>
          <p className="demo-note">
            <em>Mostrando datos de ejemplo para desarrollo</em>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="muestras-grid">
      <div className="grid-header">
        <h2>🥽 Lista de Muestras</h2>
        <div className="grid-actions">
          <button className="refresh-button" onClick={onRefresh}>
            🔄 Actualizar
          </button>
          <span className="count-badge">
            Total: {muestras.length} muestras
          </span>
        </div>
      </div>

      {muestras.length === 0 ? (
        <div className="empty-state">
          <h3>🥽 No hay muestras disponibles</h3>
          <p>No se encontraron muestras en el sistema</p>
        </div>
      ) : (
        <div className="grid-container">
          {muestras.map((muestra) => {
            const isExpanded = expandedRows.has(muestra._id || muestra.nro_informe.toString());
            const parametrosCount = Object.keys(muestra.parametros || {}).length;
            
            return (
              <div key={muestra._id || muestra.nro_informe} className="muestra-card">
                <div className="muestra-header" onClick={() => toggleRow(muestra._id || muestra.nro_informe.toString())}>
                  <div className="muestra-basic-info">
                    <div className="muestra-title">
                      <h3>Informe #{muestra.nro_informe}</h3>
                      <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
                    </div>
                    <p className="muestra-name">{muestra.muestra_nombre}</p>
                    <div className="muestra-meta">
                      <span className="parametros-count">
                        📋 {parametrosCount} parámetros
                      </span>
                      <span className="fecha">
                        📅 {formatDate(muestra.fecha_creacion)}
                      </span>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="muestra-details">
                    <div className="parametros-section">
                      <h4>📊 Parámetros Analizados</h4>
                      {parametrosCount === 0 ? (
                        <p className="no-parametros">No hay parámetros registrados</p>
                      ) : (
                        <div className="parametros-grid">
                          {Object.entries(muestra.parametros || {}).map(([parametro, data]) => (
                            <div key={parametro} className="parametro-item">
                              <div className="parametro-name">{parametro.replace(/_/g, ' ')}</div>
                              <div className="parametro-value">
                                <span className="valor">{data.valor}</span>
                                <span className="unidad">{data.unidad}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="muestra-actions">
                      <button className="action-btn view-btn" title="Ver detalles completos">
                        👁️ Ver Detalles
                      </button>
                      <button className="action-btn edit-btn" title="Editar muestra">
                        ✏️ Editar
                      </button>
                      <button className="action-btn export-btn" title="Exportar datos">
                        📄 Exportar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Controles de paginación */}
      {!loading && !error && muestras.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} de{' '}
            {pagination.total} muestras
          </div>
          
          <div className="pagination-controls">
            <select 
              value={pagination.limit} 
              onChange={(e) => onChangePageSize(parseInt(e.target.value))}
              className="page-size-selector"
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={20}>20 por página</option>
              <option value={50}>50 por página</option>
            </select>

            <div className="page-navigation">
              <button 
                onClick={() => onChangePage(1)}
                disabled={pagination.page === 1}
                className="page-btn"
              >
                ⏮️ Primera
              </button>
              <button 
                onClick={() => onChangePage(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="page-btn"
              >
                ◀️ Anterior
              </button>
              
              <span className="page-info">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              
              <button 
                onClick={() => onChangePage(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="page-btn"
              >
                Siguiente ▶️
              </button>
              <button 
                onClick={() => onChangePage(pagination.totalPages)}
                disabled={pagination.page === pagination.totalPages}
                className="page-btn"
              >
                Última ⏭️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MuestrasGrid;