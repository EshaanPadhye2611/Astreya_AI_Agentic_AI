import React, { useState, useCallback } from 'react';
import SparklesIcon from './icons/SparklesIcon';
import XIcon from './icons/XIcon';
import { Incident, AiCitySummary } from '../types';
import { getAiCitySummary } from '../services/geminiService';

interface AiAssistantProps {
    incidents: Incident[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ incidents }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState<AiCitySummary | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateSummary = useCallback(async () => {
        setIsOpen(true);
        if (summary) return; // Don't re-fetch if already have summary

        setIsLoading(true);
        setError(null);
        try {
            const result = await getAiCitySummary(incidents);
            setSummary(result);
        } catch (err) {
            setError('Failed to generate AI summary. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [incidents, summary]);

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <>
            <button
                onClick={handleGenerateSummary}
                className="fixed bottom-8 right-8 bg-primary-600 text-white rounded-full p-4 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-transform hover:scale-110"
                aria-label="Open AI Assistant"
            >
                <SparklesIcon className="w-8 h-8" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 transition-opacity" onClick={closeModal}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                             <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                <SparklesIcon className="w-6 h-6 mr-3 text-primary-600"/>
                                Astreya Ai Summary
                             </h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {isLoading && (
                                <div className="flex justify-center items-center h-48">
                                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
                                </div>
                            )}
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {summary && (
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-700">Current Situation</h4>
                                        <p className="mt-2 text-gray-600 leading-relaxed">{summary.situation}</p>
                                    </div>
                                     <div>
                                        <h4 className="text-lg font-semibold text-gray-700">Strategic Recommendations</h4>
                                        <ul className="mt-2 list-disc list-inside space-y-2 text-gray-600">
                                            {summary.recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                         <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                            <button onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AiAssistant;