import React from 'react';
import HomeIcon from './icons/HomeIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import CogIcon from './icons/CogIcon';
import UsersIcon from './icons/UsersIcon';
import { View } from '../App';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'incidents', label: 'Incidents', icon: ClipboardListIcon },
    { id: 'departments', label: 'Departments', icon: UsersIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon },
  ];

  const availableViews: View[] = ['dashboard', 'incidents', 'departments', 'analytics'];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-primary-700">Astreya Ai</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as View)}
            disabled={!availableViews.includes(item.id as View)}
            className={`w-full flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 ${
              currentView === item.id
                ? 'bg-primary-100 text-primary-700'
                : 'hover:bg-gray-100 hover:text-gray-900'
            } ${!availableViews.includes(item.id as View) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <item.icon className="w-6 h-6" />
            <span className="ml-4 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Astreya Ai
        </div>
      </div>
    </div>
  );
};

export default Sidebar;