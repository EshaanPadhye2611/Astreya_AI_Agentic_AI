

import React, { useState, useCallback } from 'react';
import { Incident, Department, Status, AiTriageResult } from '../types';
import { DEPARTMENTS, DEPARTMENT_COLORS, SEVERITY_COLORS, STATUS_COLORS } from '../constants';
import XIcon from './icons/XIcon';
import SparklesIcon from './icons/SparklesIcon';
import { getAITriage } from '../services/geminiService';

interface IncidentDetailModalProps {
  incident: Incident;
  onClose: () => void;
}

const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({ incident, onClose }) => {
    const [aiTriageResult, setAiTriageResult] = useState<AiTriageResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStatus, setCurrentStatus] = useState<Status>(incident.status);
    const [assignedDept, setAssignedDept] = useState<Department>(incident.department);

    const handleGenerateTriage = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getAITriage(incident.description);
            setAiTriageResult(result);
            setCurrentStatus(Status.Triaged);
        } catch (err) {
            setError('Failed to generate AI triage. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [incident.description]);

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">Incident Details: <span className="font-mono text-primary-700">{incident.id.slice(0, 8)}</span></h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <XIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Incident Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-gray-700">Report Information</h4>
                        <div className="space-y-3 text-sm">
                            <p><strong className="text-gray-600 w-24 inline-block">Type:</strong> {incident.type}</p>
                            <p><strong className="text-gray-600 w-24 inline-block">Address:</strong> {incident.location.address}</p>
                            <p><strong className="text-gray-600 w-24 inline-block">Reported:</strong> {incident.reportedAt.toLocaleString()}</p>
                             <div className="flex items-center"><strong className="text-gray-600 w-24 inline-block">Severity:</strong> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${SEVERITY_COLORS[incident.severity]}`}>{incident.severity}</span></div>
                            <div className="flex items-center"><strong className="text-gray-600 w-24 inline-block">Status:</strong> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[currentStatus]}`}>{currentStatus}</span></div>
                            <div className="flex items-center"><strong className="text-gray-600 w-24 inline-block">Department:</strong> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${DEPARTMENT_COLORS[assignedDept]}`}>{assignedDept}</span></div>
                            <p className="pt-2"><strong className="text-gray-600 block mb-1">Description:</strong> <span className="text-gray-800 leading-relaxed">{incident.description}</span></p>
                        </div>

                         {incident.media && (
                            <div className="mt-4">
                                <h5 className="font-semibold text-gray-600 mb-2">Attached Media</h5>
                                <img src={incident.media.url} alt="Incident media" className="rounded-lg max-w-sm w-full border border-gray-200"/>
                            </div>
                         )}
                    </div>

                    {/* Right Column: AI Triage & Actions */}
                    <div>
                        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                            <h4 className="font-semibold text-lg mb-4 text-gray-700">AI-Powered Triage</h4>
                            {!aiTriageResult && (
                                <button onClick={handleGenerateTriage} disabled={isLoading} className="w-full flex items-center justify-center bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-primary-300 transition-colors">
                                    <SparklesIcon className="w-5 h-5 mr-2"/>
                                    {isLoading ? 'Generating...' : 'Generate AI Triage'}
                                </button>
                            )}
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                            {aiTriageResult && (
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <h5 className="font-bold text-gray-800">Summary</h5>
                                        <p className="text-gray-700 mt-1">{aiTriageResult.summary}</p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800">Priority Assessment</h5>
                                        <p className="mt-1"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${SEVERITY_COLORS[aiTriageResult.priority]}`}>{aiTriageResult.priority}</span></p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800">Recommended Actions</h5>
                                        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                                            {aiTriageResult.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6">
                             <h4 className="font-semibold text-lg mb-4 text-gray-700">Case Management</h4>
                             <div className="space-y-4">
                                <div>
                                    <label htmlFor="dept-assign" className="block text-sm font-medium text-gray-700">Assign Department</label>
                                    <select id="dept-assign" value={assignedDept} onChange={e => setAssignedDept(e.target.value as Department)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                                        {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="status-update" className="block text-sm font-medium text-gray-700">Update Status</label>
                                    <select id="status-update" value={currentStatus} onChange={e => setCurrentStatus(e.target.value as Status)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                                        {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                 <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Close</button>
                 <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition">Save Changes</button>
            </div>
        </div>
    </div>
    );
};

export default IncidentDetailModal;