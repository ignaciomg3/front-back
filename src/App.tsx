import React, { useState } from 'react';
import MainMenu from './MainMenu';
import AnalysesPage from './AnalysesPage';
import MuestrasPage from './MuestrasPage';
import ReportsPage from './ReportsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('menu');

  const handleMenuSelect = (option: string) => {
    setCurrentPage(option);
  };

  const handleBackToMenu = () => {
    setCurrentPage('menu');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'analyses':
        return <AnalysesPage onBackToMenu={handleBackToMenu} />;
      case 'muestras':
        return <MuestrasPage onBackToMenu={handleBackToMenu} />;
      case 'reports':
        return <ReportsPage onBackToMenu={handleBackToMenu} />;
      default:
        return <MainMenu onMenuSelect={handleMenuSelect} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentPage()}
    </div>
  );
}

export default App;
