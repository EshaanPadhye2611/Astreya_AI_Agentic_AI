import React from 'react';
import BellIcon from './icons/BellIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import { View } from '../App';

interface HeaderProps {
    currentView: View;
}

const Header: React.FC<HeaderProps> = ({ currentView }) => {
  const viewTitles: { [key in View]: string } = {
      dashboard: 'Admin Dashboard',
      incidents: 'Incident Management',
      departments: 'Department Directory',
      analytics: 'City Analytics',
      settings: 'Settings'
  };

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 capitalize">{viewTitles[currentView]}</h2>
      <div className="flex items-center space-x-6">
        <button className="relative text-gray-500 hover:text-gray-700">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-3">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://picsum.photos/100"
            alt="User avatar"
          />
          <div>
            <p className="font-semibold text-gray-800">Admin User</p>
            <p className="text-sm text-gray-500">Administrator</p>
          </div>
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;