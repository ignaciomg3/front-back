import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
  loading = false
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return (
      <div className="pagination-container">
        <div className="pagination-info">
          <span>Mostrando {total} de {total} análisis</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <span>
          Mostrando {startItem}-{endItem} de {total} análisis
        </span>
        
        <div className="page-size-selector">
          <label htmlFor="pageSize">Mostrar:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            disabled={loading}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>por página</span>
        </div>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || loading}
          title="Primera página"
        >
          ⏮️
        </button>
        
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          title="Página anterior"
        >
          ◀️
        </button>

        <div className="pagination-pages">
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              className={`pagination-page ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
              onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
              disabled={page === '...' || loading}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          title="Página siguiente"
        >
          ▶️
        </button>
        
        <button
          className="pagination-button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || loading}
          title="Última página"
        >
          ⏭️
        </button>
      </div>
    </div>
  );
};

export default Pagination;