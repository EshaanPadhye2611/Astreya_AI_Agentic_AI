import React, { useState, useEffect, useMemo } from 'react';
import { DEPARTMENT_DETAILS, DEPARTMENT_COLORS } from '../constants';
import { getMockIncidents } from '../services/mockDataService';
import { Incident, Department, Status } from '../types';

const DepartmentsView: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        setIncidents(getMockIncidents(150));
    }, []);

    const departmentStats = useMemo(() => {
        const stats: { [key in Department]: { open: number; total: number } } = {} as any;

        DEPARTMENT_DETAILS.forEach(d => {
            stats[d.name] = { open: 0, total: 0 };
        });

        incidents.forEach(incident => {
            if (stats[incident.department]) {
                stats[incident.department].total++;
                if (incident.status !== Status.Resolved && incident.status !== Status.Closed) {
                    stats[incident.department].open++;
                }
            }
        });
        return stats;
    }, [incidents]);
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Department Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEPARTMENT_DETAILS.map((dept) => (
                    <div key={dept.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{dept.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">Head: {dept.head}</p>
                            </div>
                            <span className={`p-2 rounded-full ${DEPARTMENT_COLORS[dept.name]}`}>
                                <dept.icon className="w-6 h-6" />
                            </span>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-gray-700">
                           <p><strong>Email:</strong> <a href={`mailto:${dept.email}`} className="text-primary-600 hover:underline">{dept.email}</a></p>
                           <p><strong>Phone:</strong> {dept.phone}</p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200 flex-grow flex items-end">
                            <div className="flex w-full justify-around text-center">
                                <div>
                                    <p className="text-2xl font-bold text-yellow-500">{departmentStats[dept.name]?.open ?? 0}</p>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Open Cases</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-700">{departmentStats[dept.name]?.total ?? 0}</p>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Total Cases</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentsView;