
import React from 'react';

interface KpiCardProps {
  title: string;
  value: number | string;
  color?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, color = 'text-gray-800' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h4>
      <p className={`text-4xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
};

export default KpiCard;
