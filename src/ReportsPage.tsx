import React from 'react';
import PageLayout from './PageLayout';

interface ReportsPageProps {
  onBackToMenu: () => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ onBackToMenu }) => {
  return (
    <PageLayout title="Reportes y Resultados" onBackToMenu={onBackToMenu}>
      <div className="content-card">
        <h2>📊 Generación de Reportes</h2>
        <p>
          Genera reportes detallados, consulta historiales de análisis y 
          descarga resultados en diferentes formatos para pacientes y médicos.
        </p>
        
        <div className="action-buttons">
          <button className="action-button">
            📄 Generar Reporte
          </button>
          <button className="action-button">
            📥 Descargar Resultados
          </button>
          <button className="action-button secondary">
            🔍 Consultar Historial
          </button>
        </div>
      </div>

      <div className="content-card">
        <h2>📈 Dashboard de Resultados</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e3f2fd', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1976d2', fontSize: '2rem' }}>0</h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#1976d2' }}>Reportes Generados</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e8f5e8', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#388e3c', fontSize: '2rem' }}>0</h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#388e3c' }}>Resultados Entregados</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#fff3e0', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#f57c00', fontSize: '2rem' }}>0</h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#f57c00' }}>Pendientes de Entrega</p>
          </div>
        </div>
      </div>

      <div className="content-card">
        <h2>📋 Tipos de Reportes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {[
            { 
              title: 'Reporte Individual', 
              description: 'Resultados específicos de un paciente',
              icon: '👤'
            },
            { 
              title: 'Reporte por Fecha', 
              description: 'Análisis realizados en un período específico',
              icon: '📅'
            },
            { 
              title: 'Reporte por Médico', 
              description: 'Estudios solicitados por médico especialista',
              icon: '👨‍⚕️'
            },
            { 
              title: 'Reporte Estadístico', 
              description: 'Análisis estadístico de resultados y tendencias',
              icon: '📈'
            }
          ].map((report, index) => (
            <div key={index} style={{ 
              padding: '1.5rem', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{report.icon}</div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{report.title}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                {report.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ReportsPage;