import React, { useState, useEffect } from 'react';
import KpiCard from './KpiCard';
import CityMap from './CityMap';
import AiAssistant from './AiAssistant';
import { getMockIncidents } from '../services/mockDataService';
import { Incident, Status, Severity, Department } from '../types';
import { DEPARTMENT_COLORS, SEVERITY_COLORS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LiveFeedItem: React.FC<{ incident: Incident }> = ({ incident }) => (
    <div className="flex items-center p-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
        <div className={`w-2 h-10 rounded-full ${SEVERITY_COLORS[incident.severity]}`}></div>
        <div className="ml-4 flex-grow">
            <p className="font-semibold text-gray-800 text-sm">{incident.type}</p>
            <p className="text-xs text-gray-500">{incident.location.address}</p>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${DEPARTMENT_COLORS[incident.department]}`}>
            {incident.department}
        </div>
    </div>
);


const DashboardView: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        setIncidents(getMockIncidents(150));
    }, []);

    const kpiData = {
        total: incidents.length,
        open: incidents.filter(i => i.status !== Status.Resolved && i.status !== Status.Closed).length,
        resolved: incidents.filter(i => i.status === Status.Resolved).length,
        highSeverity: incidents.filter(i => i.severity === Severity.High || i.severity === Severity.Critical).length,
    };
    
    const chartData = Object.values(Department).map(dep => ({
        name: dep,
        incidents: incidents.filter(i => i.department === dep).length
    }));

    return (
        <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Incidents" value={kpiData.total} />
                <KpiCard title="Open Cases" value={kpiData.open} color="text-yellow-500" />
                <KpiCard title="Resolved Cases" value={kpiData.resolved} color="text-green-500" />
                <KpiCard title="High Severity Alerts" value={kpiData.highSeverity} color="text-red-500" />
            </div>

            <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Astreya Ai Map</h3>
                    <CityMap incidents={incidents} />
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                     <h3 className="text-xl font-semibold text-gray-800 p-6 pb-2">Live Incident Feed</h3>
                     <div className="h-[28rem] overflow-y-auto">
                        {incidents.slice(0,15).map(incident => <LiveFeedItem key={incident.id} incident={incident} />)}
                     </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Incidents by Department</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 12}} />
                        <YAxis allowDecimals={false} />
                        <Tooltip wrapperClassName="!bg-white !border !border-gray-200 !rounded-md !shadow-lg" />
                        <Legend />
                        <Bar dataKey="incidents" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <AiAssistant incidents={incidents} />
        </div>
    );
};

export default DashboardView;