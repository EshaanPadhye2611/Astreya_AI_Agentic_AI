
import React, { useState, useMemo, useEffect } from 'react';
import { getMockIncidents } from '../services/mockDataService';
import { Incident, Department, Severity, Status } from '../types';
import { DEPARTMENTS, DEPARTMENT_COLORS, SEVERITY_COLORS, STATUS_COLORS } from '../constants';
import IncidentDetailModal from './IncidentDetailModal';
import ChevronDownIcon from './icons/ChevronDownIcon';


const IncidentsView: React.FC = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
    const [filterDepartment, setFilterDepartment] = useState<string>('All');
    const [filterSeverity, setFilterSeverity] = useState<string>('All');
    const [sortKey, setSortKey] = useState<keyof Incident | 'reportedAt'>('reportedAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        setIncidents(getMockIncidents(50));
    }, []);

    const filteredAndSortedIncidents = useMemo(() => {
        return incidents
            .filter(i => filterDepartment === 'All' || i.department === filterDepartment)
            .filter(i => filterSeverity === 'All' || i.severity === filterSeverity)
            .sort((a, b) => {
                let valA, valB;
                if (sortKey === 'reportedAt') {
                    valA = new Date(a.reportedAt).getTime();
                    valB = new Date(b.reportedAt).getTime();
                } else {
                    valA = a[sortKey];
                    valB = b[sortKey];
                }
                
                if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
                if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
    }, [incidents, filterDepartment, filterSeverity, sortKey, sortOrder]);

    const handleSort = (key: keyof Incident | 'reportedAt') => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc');
        }
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Incident Management</h2>
            <div className=" p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex items-center space-x-4">
                <div className="flex-1">
                    <label htmlFor="dep-filter" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select id="dep-filter" value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                        <option>All</option>
                        {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label htmlFor="sev-filter" className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                     <select id="sev-filter" value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                        <option>All</option>
                        {Object.values(Severity).map(sev => <option key={sev} value={sev}>{sev}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['ID', 'Type', 'Severity', 'Status', 'Department'].map((header) => (
                                    <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                                <th scope="col" onClick={() => handleSort('reportedAt')} className="cursor-pointer px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Reported
                                        <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${sortKey === 'reportedAt' && sortOrder === 'asc' ? 'transform rotate-180' : ''}`} />
                                    </div>
                                </th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Details</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAndSortedIncidents.map(incident => (
                                <tr key={incident.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{incident.id.slice(0, 8)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{incident.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${SEVERITY_COLORS[incident.severity]}`}>{incident.severity}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_COLORS[incident.status]}`}>{incident.status}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${DEPARTMENT_COLORS[incident.department]}`}>{incident.department}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.reportedAt.toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => setSelectedIncident(incident)} className="text-primary-600 hover:text-primary-900">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedIncident && (
                <IncidentDetailModal incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
            )}
        </>
    );
};

export default IncidentsView;
