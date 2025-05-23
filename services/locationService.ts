
import type { LocationSuggestion, RouteDetails } from '../types';
import { OPENROUTESERVICE_API_KEY } from '../constants';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search";
const OPENROUTESERVICE_BASE_URL = "https://api.openrouteservice.org/v2/directions/driving-car";

export const searchLocation = async (query: string): Promise<LocationSuggestion[]> => {
  if (!query.trim()) return [];
  try {
    const response = await fetch(`${NOMINATIM_BASE_URL}?format=json&q=${encodeURIComponent(query)}&countrycodes=ID&limit=5`);
    if (!response.ok) {
      console.error("Nominatim API error:", response.statusText);
      return [];
    }
    const data: LocationSuggestion[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    return [];
  }
};

export const getRoute = async (
  startCoords: { lat: number; lon: number },
  endCoords: { lat: number; lon: number }
): Promise<RouteDetails | null> => {
  if (OPENROUTESERVICE_API_KEY === "YOUR_OPENROUTESERVICE_API_KEY") {
    console.warn("OpenRouteService API Key not configured. Using mock data.");
    // Mock data if API key is not set
    const mockDistance = Math.sqrt(Math.pow(endCoords.lat - startCoords.lat, 2) + Math.pow(endCoords.lon - startCoords.lon, 2)) * 111000 * 1.3; // rough meters
    const mockDuration = mockDistance / (1000/3600 * 30); // Assuming 30 km/h average speed
     return {
        distance: mockDistance, // meters
        duration: mockDuration, // seconds
        polyline: [[startCoords.lat, startCoords.lon], [endCoords.lat, endCoords.lon]] // simple line
     };
  }

  const url = `${OPENROUTESERVICE_BASE_URL}?api_key=${OPENROUTESERVICE_API_KEY}&start=${startCoords.lon},${startCoords.lat}&end=${endCoords.lon},${endCoords.lat}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouteService API error:", response.statusText, errorData);
      throw new Error(`OpenRouteService API error: ${response.statusText} - ${errorData?.error?.message || ''}`);
    }
    const data = await response.json();
    
    if (data.features && data.features.length > 0) {
      const route = data.features[0];
      const summary = route.properties.summary;
      const geometry = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]); //ORS gives [lon,lat]
      
      return {
        distance: summary.distance, // in meters
        duration: summary.duration, // in seconds
        polyline: geometry,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
