import React from 'react';
import './PageLayout.css';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  onBackToMenu: () => void;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, onBackToMenu }) => {
  return (
    <div className="page-layout">
      <div className="page-header">
        <button className="back-button" onClick={onBackToMenu}>
          ← Volver al Menú
        </button>
        <h1>{title}</h1>
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;