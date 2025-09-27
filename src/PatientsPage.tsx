import React from 'react';
import PageLayout from './PageLayout';

interface PatientsPageProps {
  onBackToMenu: () => void;
}

const PatientsPage: React.FC<PatientsPageProps> = ({ onBackToMenu }) => {
  return (
    <PageLayout title="Gestión de Pacientes" onBackToMenu={onBackToMenu}>
      <div className="content-card">
        <h2>👥 Administración de Pacientes</h2>
        <p>
          Desde aquí puedes gestionar toda la información relacionada con los pacientes del laboratorio.
          Registra nuevos pacientes, actualiza información existente y consulta historiales médicos.
        </p>
        
        <div className="action-buttons">
          <button className="action-button">
            ➕ Registrar Nuevo Paciente
          </button>
          <button className="action-button">
            🔍 Buscar Paciente
          </button>
          <button className="action-button secondary">
            📋 Lista de Pacientes
          </button>
        </div>
      </div>

      <div className="content-card">
        <h2>📊 Estadísticas Rápidas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#667eea' }}>0</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Pacientes Registrados</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#28a745' }}>0</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Análisis Pendientes</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#ffc107' }}>0</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Resultados Listos</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PatientsPage;