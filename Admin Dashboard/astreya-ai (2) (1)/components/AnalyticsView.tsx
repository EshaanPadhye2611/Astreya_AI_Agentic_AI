import React, { useState, useEffect, useMemo } from 'react';
import { getMockIncidents } from '../services/mockDataService';
import { Incident, Severity, Status, Department } from '../types';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SEVERITY_CHART_COLORS, STATUS_CHART_COLORS } from '../constants';
import AnalyticsCard from './AnalyticsCard';
import ClockIcon from './icons/ClockIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';
import ChartBarIcon from './icons/ChartBarIcon';


const AnalyticsView: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        setIncidents(getMockIncidents(200));
    }, []);

    const incidentsOverTime = useMemo(() => {
        const data: { [key: string]: number } = {};
        incidents.forEach(i => {
            const date = new Date(i.reportedAt).toLocaleDateString('en-CA'); // Use YYYY-MM-DD for sorting
            data[date] = (data[date] || 0) + 1;
        });
        return Object.entries(data).map(([name, count]) => ({ name, incidents: count })).sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    }, [incidents]);

    const severityDistribution = useMemo(() => {
        const data: { [key in Severity]: number } = { [Severity.Low]: 0, [Severity.Medium]: 0, [Severity.High]: 0, [Severity.Critical]: 0 };
        incidents.forEach(i => data[i.severity]++);
        return Object.values(Severity).map(sev => ({ name: sev, value: data[sev] }));
    }, [incidents]);
    
    const statusDistribution = useMemo(() => {
        const data: { [key in Status]: number } = {} as any;
        Object.values(Status).forEach(s => data[s] = 0);
        incidents.forEach(i => data[i.status]++);
        return Object.values(Status).map(stat => ({ name: stat, value: data[stat] }));
    }, [incidents]);
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">City Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                 <AnalyticsCard title="Severity Distribution" icon={ChartBarIcon}>
                     <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={severityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {severityDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={SEVERITY_CHART_COLORS[entry.name as Severity]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </AnalyticsCard>
                <AnalyticsCard title="Status Distribution" icon={ChartBarIcon}>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={statusDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label>
                               {statusDistribution.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={STATUS_CHART_COLORS[entry.name as Status]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </AnalyticsCard>
                <AnalyticsCard title="Avg. Resolution Time (Hours)" icon={ClockIcon}>
                   <div className="h-[250px] flex items-center justify-center">
                        <p className="text-6xl font-bold text-primary-600">18.5</p>
                   </div>
                </AnalyticsCard>
            </div>
            <AnalyticsCard title="Incidents Over Time" icon={TrendingUpIcon}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={incidentsOverTime} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{fontSize: 12}} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="incidents" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }}/>
                    </LineChart>
                </ResponsiveContainer>
            </AnalyticsCard>
        </div>
    );
};

export default AnalyticsView;