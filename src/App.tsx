import React, { useState } from 'react';
import MainMenu from './MainMenu';
import PatientsPage from './PatientsPage';
import AnalysesPage from './AnalysesPage';
import ReportsPage from './ReportsPage';
import DoctorsPage from './DoctorsPage';
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
      case 'patients':
        return <PatientsPage onBackToMenu={handleBackToMenu} />;
      case 'analyses':
        return <AnalysesPage onBackToMenu={handleBackToMenu} />;
      case 'reports':
        return <ReportsPage onBackToMenu={handleBackToMenu} />;
      case 'doctors':
        return <DoctorsPage onBackToMenu={handleBackToMenu} />;
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
