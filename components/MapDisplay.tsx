
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { RouteDetails } from '../types';
import { JEPARA_COORDINATES, DEFAULT_MAP_ZOOM } from '../constants';

// Fix for default marker icon issue with Webpack/React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapDisplayProps {
  pickupCoords?: [number, number] | null;
  destinationCoords?: [number, number] | null;
  route?: RouteDetails | null;
  className?: string;
}

const MapUpdater: React.FC<{ pickupCoords?: [number, number] | null; destinationCoords?: [number, number] | null; route?: RouteDetails | null }> = ({ pickupCoords, destinationCoords, route }) => {
  const map = useMap();

  useEffect(() => {
    if (route && route.polyline.length > 0) {
      const bounds = L.latLngBounds(route.polyline);
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else if (destinationCoords) {
      map.setView(destinationCoords, DEFAULT_MAP_ZOOM + 2);
    } else if (pickupCoords) {
      map.setView(pickupCoords, DEFAULT_MAP_ZOOM + 2);
    } else {
      map.setView(JEPARA_COORDINATES, DEFAULT_MAP_ZOOM);
    }
  }, [pickupCoords, destinationCoords, route, map]);

  return null;
};

const MapDisplay: React.FC<MapDisplayProps> = ({ pickupCoords, destinationCoords, route, className = "h-96" }) => {
  return (
    <div className={`rounded-xl overflow-hidden border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F] ${className}`}>
      <MapContainer center={JEPARA_COORDINATES} zoom={DEFAULT_MAP_ZOOM} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pickupCoords && <Marker position={pickupCoords} />}
        {destinationCoords && <Marker position={destinationCoords} />}
        {route && route.polyline && route.polyline.length > 0 && (
          <Polyline positions={route.polyline} color="#FFD700" weight={6} opacity={0.9} dashArray="10, 5" />
        )}
        <MapUpdater pickupCoords={pickupCoords} destinationCoords={destinationCoords} route={route} />
      </MapContainer>
    </div>
  );
};

export default MapDisplay;