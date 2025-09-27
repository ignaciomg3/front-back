import React from 'react';
import PageLayout from './PageLayout';

interface DoctorsPageProps {
  onBackToMenu: () => void;
}

const DoctorsPage: React.FC<DoctorsPageProps> = ({ onBackToMenu }) => {
  return (
    <PageLayout title="Médicos y Especialistas" onBackToMenu={onBackToMenu}>
      <div className="content-card">
        <h2>👨‍⚕️ Gestión de Médicos</h2>
        <p>
          Administra la información de médicos y especialistas que solicitan análisis, 
          mantén actualizado el directorio médico y gestiona las autorizaciones.
        </p>
        
        <div className="action-buttons">
          <button className="action-button">
            ➕ Registrar Médico
          </button>
          <button className="action-button">
            🔍 Buscar Especialista
          </button>
          <button className="action-button secondary">
            📋 Directorio Médico
          </button>
        </div>
      </div>

      <div className="content-card">
        <h2>🏥 Especialidades Médicas</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { specialty: 'Cardiología', icon: '❤️', doctors: 0 },
            { specialty: 'Endocrinología', icon: '🦋', doctors: 0 },
            { specialty: 'Nefrología', icon: '🫘', doctors: 0 },
            { specialty: 'Hematología', icon: '🩸', doctors: 0 },
            { specialty: 'Medicina Interna', icon: '🏥', doctors: 0 },
            { specialty: 'Medicina General', icon: '👨‍⚕️', doctors: 0 }
          ].map((spec, index) => (
            <div key={index} style={{ 
              padding: '1.5rem', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              textAlign: 'center',
              border: '1px solid #e9ecef'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{spec.icon}</div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{spec.specialty}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                {spec.doctors} médicos registrados
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-card">
        <h2>📊 Estadísticas de Solicitudes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e1f5fe', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#0288d1', fontSize: '2rem' }}>0</h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#0288d1' }}>Médicos Activos</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#f3e5f5', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#7b1fa2', fontSize: '2rem' }}>0</h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#7b1fa2' }}>Solicitudes del Mes</p>
          </div>
          <div style={{ textAlign: 'center', padding: '1.5rem', background: '#e0f2f1', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#00695c', fontSize: '2rem' }}>0</h3>
            <p style={{ margin: 0, fontWeight: '600', color: '#00695c' }}>Especialidades</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorsPage;