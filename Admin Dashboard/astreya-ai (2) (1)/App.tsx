import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import IncidentsView from './components/IncidentsView';
import DepartmentsView from './components/DepartmentsView';
import AnalyticsView from './components/AnalyticsView';

export type View = 'dashboard' | 'incidents' | 'departments' | 'analytics' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'incidents':
        return <IncidentsView />;
      case 'departments':
        return <DepartmentsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'dashboard':
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentView={currentView} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;