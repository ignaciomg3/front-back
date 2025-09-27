import React from 'react';
import { Analisis } from '../types/analisis';
import Pagination from './Pagination';
import './AnalisisGrid.css';

interface AnalisisGridProps {
  analisis: Analisis[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
  onRefresh: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const AnalisisGrid: React.FC<AnalisisGridProps> = ({ 
  analisis, 
  loading, 
  error, 
  pagination,
  onRefresh, 
  onPageChange,
  onPageSizeChange 
}) => {
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'hecho':
        return '#28a745';
      case 'pendiente':
        return '#ffc107';
      case 'en proceso':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
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
        <p>Cargando análisis...</p>
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
    <div className="analisis-grid">
      <div className="grid-header">
        <h2>📋 Lista de Análisis</h2>
        <div className="grid-actions">
          <button className="refresh-button" onClick={onRefresh}>
            🔄 Actualizar
          </button>
          <span className="count-badge">
            Página {pagination.page} de {pagination.totalPages} | Total: {pagination.total} análisis
          </span>
        </div>
      </div>

      {analisis.length === 0 ? (
        <div className="empty-state">
          <h3>📝 No hay análisis disponibles</h3>
          <p>No se encontraron análisis en el sistema</p>
        </div>
      ) : (
        <div className="grid-container">
          <div className="grid-table">
            <div className="grid-row header-row">
              <div className="grid-cell">Estado</div>
              <div className="grid-cell">Solicitante</div>
              <div className="grid-cell">Tipo de Análisis</div>
              <div className="grid-cell">Fecha</div>
              <div className="grid-cell">Acciones</div>
            </div>
            
            {analisis.map((item) => (
              <div key={item._id} className="grid-row data-row">
                <div className="grid-cell">
                  <span 
                    className="estado-badge"
                    style={{ backgroundColor: getEstadoColor(item.estado) }}
                  >
                    {item.estado}
                  </span>
                </div>
                <div className="grid-cell solicitante">
                  {item.solicitante}
                </div>
                <div className="grid-cell tipo-analisis">
                  {item.tipo_analisis}
                </div>
                <div className="grid-cell fecha">
                  {formatDate(item.fecha_creacion)}
                </div>
                <div className="grid-cell actions">
                  <button className="action-btn view-btn" title="Ver detalles">
                    👁️
                  </button>
                  <button className="action-btn edit-btn" title="Editar">
                    ✏️
                  </button>
                  <button className="action-btn delete-btn" title="Eliminar">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            pageSize={pagination.limit}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default AnalisisGrid;