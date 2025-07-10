import React from 'react';

interface AnalyticsCardProps {
  title: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center text-gray-700 mb-4">
        <Icon className="w-6 h-6 mr-3" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AnalyticsCard;