import React from 'react';
import './MainMenu.css';

interface MainMenuProps {
  onMenuSelect: (option: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onMenuSelect }) => {
  const menuOptions = [
    {
      id: 'analyses',
      title: 'Análisis',
      description: 'Gestionar tipos de análisis y resultados de laboratorio',
      icon: '🧪'
    },
    {
      id: 'reports',
      title: 'Reportes y Resultados',
      description: 'Generar reportes y consultar historial de estudios',
      icon: '📊'
    }
  ];

  return (
    <div className="main-menu">
      <div className="menu-header">
        <h1>Laboratorio de Análisis Biológicos</h1>
        <p>Sistema de Gestión de Laboratorio</p>
      </div>
      
      <div className="menu-grid">
        {menuOptions.map((option) => (
          <div
            key={option.id}
            className="menu-card"
            onClick={() => onMenuSelect(option.id)}
          >
            <div className="menu-icon">{option.icon}</div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </div>
        ))}
      </div>
      
      <div className="menu-footer">
        <p>Selecciona una opción para comenzar</p>
      </div>
    </div>
  );
};

export default MainMenu;