import React, { useEffect, useRef, useState } from 'react';
import { Incident } from '../types';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

declare global {
  interface Window {
    google: any;
  }
}

interface CityMapProps {
  incidents: Incident[];
}

const CityMap: React.FC<CityMapProps> = ({ incidents }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const heatmapRef = useRef<any | null>(null);
  const markerClustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<any[]>([]);

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 12.9716, lng: 77.5946 }, // Centered on Bengaluru
        zoom: 12,
        mapId: 'ASTREYA_AI_MAP',
        disableDefaultUI: true,
        zoomControl: true,
      });
      setMap(newMap);
    }
  }, [mapRef, map]);

  // Update map data (heatmap and markers)
  useEffect(() => {
    if (!map || !incidents.length) return;

    const locations = incidents.map(
      (incident) => new window.google.maps.LatLng(incident.location.lat, incident.location.lng)
    );
    
    // Create/update heatmap
    if (!heatmapRef.current) {
      heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
        data: locations,
        map: showHeatmap ? map : null,
      });
      heatmapRef.current.set('radius', 20);
    } else {
      heatmapRef.current.setData(locations);
      heatmapRef.current.setMap(showHeatmap ? map : null);
    }

    // Clear old markers
    if (markerClustererRef.current) {
        markerClustererRef.current.clearMarkers();
    }
    markersRef.current.forEach(marker => (marker.map = null));
    markersRef.current = [];

    // Create new markers
    markersRef.current = incidents.map(incident => {
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: { lat: incident.location.lat, lng: incident.location.lng },
            title: incident.type,
        });
        return marker;
    });

    // Create/update marker clusterer
    if (!markerClustererRef.current) {
        markerClustererRef.current = new MarkerClusterer({ map, markers: [] });
    }
    
    if(!showHeatmap) {
        markerClustererRef.current.addMarkers(markersRef.current);
    }

  }, [map, incidents, showHeatmap]);

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-2 left-2 bg-white p-1 rounded-md shadow-lg flex space-x-1">
        <button 
            onClick={() => setShowHeatmap(false)}
            className={`px-3 py-1 text-sm font-medium rounded ${!showHeatmap ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
            Clusters
        </button>
        <button 
            onClick={() => setShowHeatmap(true)}
            className={`px-3 py-1 text-sm font-medium rounded ${showHeatmap ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
        >
            Heatmap
        </button>
      </div>
    </div>
  );
};

export default CityMap;