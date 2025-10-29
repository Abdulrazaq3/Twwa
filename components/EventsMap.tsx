import React, { useState, useEffect, useRef, memo } from 'react';
import { Opportunity } from '../types';
import { MyLocationIcon } from './icons';

// TypeScript declarations for Google Maps and MarkerClusterer APIs
declare namespace google {
  namespace maps {
    interface LatLngLiteral { lat: number; lng: number; }
    class Map {
      constructor(mapDiv: HTMLElement | null, opts?: any);
      setCenter(latLng: LatLngLiteral): void;
      setZoom(zoom: number): void;
      panTo(latLng: LatLngLiteral): void;
      addListener(eventName: string, handler: () => void): MapsEventListener;
    }
    interface Icon {}
    interface Symbol {}
    class Marker {
        constructor(opts?: any);
        addListener(eventName: string, handler: (e: any) => void): MapsEventListener;
        map: Map | null;
        setIcon(icon: string | google.maps.Icon | google.maps.Symbol | null): void;
    }
    interface MapsEventListener { remove(): void; }
    namespace marker {
      class AdvancedMarkerElement {
        constructor(options?: any);
        map: Map | null;
        position: LatLngLiteral | null;
        content: HTMLElement;
        addListener(eventName: string, handler: (e: any) => void): MapsEventListener;
      }
    }
    interface MapTypeStyle {
      elementType?: string;
      featureType?: string;
      stylers: any[];
    }
  }
}
declare global {
  interface Window {
    markerClusterer: any;
    google?: typeof google;
  }
}


const customMapStyles: google.maps.MapTypeStyle[] = [
  { "elementType": "geometry", "stylers": [ { "color": "#f5f5f5" } ] },
  { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },
  { "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] },
  { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f5f5" } ] },
  { "featureType": "administrative.land_parcel", "stylers": [ { "visibility": "off" } ] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#eeeeee" } ] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#e0f2f1" } ] },
  { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#a7d8c3" } ] },
  { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#84b8a2" } ] },
  { "featureType": "transit", "stylers": [ { "visibility": "off" } ] },
  { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#b2dfdb" } ] },
];

interface EventsMapProps {
  opportunities: Opportunity[];
  selectedOpportunity: Opportunity | null;
  onMarkerClick: (opportunity: Opportunity) => void;
  onMapClick: () => void;
}

const EventsMap: React.FC<EventsMapProps> = ({ opportunities, selectedOpportunity, onMarkerClick, onMapClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerClustererRef = useRef<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const markersRef = useRef<Map<number, google.maps.marker.AdvancedMarkerElement | google.maps.Marker>>(new Map());
  
  const centerOnUserLocation = () => {
    if (navigator.geolocation && mapInstance.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapInstance.current?.setCenter(userLocation);
          mapInstance.current?.setZoom(12);
        },
        () => { /* User denied permission */ }
      );
    }
  };

  useEffect(() => {
    const SCRIPT_ID = 'google-maps-script';
    const CALLBACK_NAME = 'initTawwMap';
    
    const API_KEY = process.env.API_KEY;
    const MAP_ID = process.env.GOOGLE_MAP_ID || process.env.REACT_APP_GOOGLE_MAP_ID;

    if (!API_KEY) {
      setError('مفتاح API الخاص بخرائط جوجل مفقود أو غير صالح.');
      return;
    }

    (window as any)[CALLBACK_NAME] = () => {
      try {
        if (!mapRef.current) return;
        const defaultCenter = { lat: 24.7136, lng: 46.6753 };
        mapInstance.current = new google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: 6,
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            styles: customMapStyles,
            ...(MAP_ID ? { mapId: MAP_ID } : {}),
        });
        
        mapInstance.current.addListener('click', onMapClick);
        setIsMapReady(true);
        centerOnUserLocation();
      } catch (e) {
        console.error("Error initializing map:", e);
        setError("حدث خطأ أثناء تهيئة الخريطة.");
      }
    };

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker&callback=${CALLBACK_NAME}&language=ar&region=SA`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setError("فشل تحميل سكربت خرائط جوجل. يرجى التحقق من اتصال الإنترنت.");
        delete (window as any)[CALLBACK_NAME];
      };
      document.head.appendChild(script);
    } else if (window.google && window.google.maps) {
        (window as any)[CALLBACK_NAME]();
    }


    return () => {
      if ((window as any)[CALLBACK_NAME]) {
        delete (window as any)[CALLBACK_NAME];
      }
    };
  }, [onMapClick]);

  useEffect(() => {
    if (!isMapReady || !mapInstance.current) return;
    const MAP_ID = process.env.GOOGLE_MAP_ID || process.env.REACT_APP_GOOGLE_MAP_ID;

    const allMarkers = opportunities.map(opp => {
      if (markersRef.current.has(opp.id)) {
          return markersRef.current.get(opp.id)!;
      }
      
      let marker: google.maps.marker.AdvancedMarkerElement | google.maps.Marker;

      if (MAP_ID) {
        const pinElement = document.createElement('div');
        pinElement.className = 'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer';
        pinElement.style.transform = 'scale(1)';
        pinElement.innerHTML = `<svg viewBox="0 0 24 24" class="w-8 h-8 drop-shadow-lg"><path fill="#00a86b" fill-rule="evenodd" d="M12 2.25c-5.132 0-9.25 4.118-9.25 9.25 0 6.64 8.25 11.666 8.25 11.666a.75.75 0 001.5 0s8.25-5.026 8.25-11.666C21.25 6.368 17.132 2.25 12 2.25zM12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" /></svg>`;

        marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: opp.lat, lng: opp.lng },
          content: pinElement,
          title: opp.title,
        });
      } else {
        marker = new google.maps.Marker({
          position: { lat: opp.lat, lng: opp.lng },
          title: opp.title,
        });
      }
      
      marker.addListener('click', (e: any) => {
        if(e.domEvent) e.domEvent.stopPropagation();
        onMarkerClick(opp);
        mapInstance.current?.panTo({ lat: opp.lat, lng: opp.lng });
      });
      markersRef.current.set(opp.id, marker);
      return marker;
    });

    markersRef.current.forEach((marker, id) => {
        const isSelected = id === selectedOpportunity?.id;
        if (marker instanceof google.maps.marker.AdvancedMarkerElement) {
            const path = marker.content.querySelector('path');
            if (path) {
                path.setAttribute('fill', isSelected ? '#32c28d' : '#00a86b');
            }
            marker.content.style.transform = `scale(${isSelected ? 1.25 : 1})`;
            (marker.content as HTMLElement).style.zIndex = isSelected ? '10' : '1';
        }
    });

    const CLUSTERER_SCRIPT_ID = 'google-maps-clusterer-script';

    const setupClusterer = () => {
      if (!mapInstance.current || !window.markerClusterer) return;
      if (markerClustererRef.current) {
        markerClustererRef.current.clearMarkers();
      }
      markerClustererRef.current = new window.markerClusterer.MarkerClusterer({ map: mapInstance.current, markers: allMarkers });
    };

    if (window.markerClusterer) {
      setupClusterer();
    } else if (!document.getElementById(CLUSTERER_SCRIPT_ID)) {
      const clustererScript = document.createElement('script');
      clustererScript.id = CLUSTERER_SCRIPT_ID;
      clustererScript.src = 'https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js';
      clustererScript.async = true;
      clustererScript.onload = setupClusterer;
      clustererScript.onerror = () => setError("فشل تحميل مكتبة تجميع العلامات.");
      document.head.appendChild(clustererScript);
    }

  }, [opportunities, isMapReady, selectedOpportunity, onMarkerClick]);

  if (error) {
    return <div className="flex justify-center items-center h-full bg-gray-200 text-red-600 font-bold p-4 text-center">{error}</div>;
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
        <div ref={mapRef} className="w-full h-full" />
        <button 
            onClick={centerOnUserLocation}
            className="absolute bottom-6 right-6 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors btn-press"
            aria-label="تمركز على موقعي الحالي"
        >
            <MyLocationIcon className="w-6 h-6 text-gray-700" />
        </button>
    </div>
  );
};

export default memo(EventsMap);