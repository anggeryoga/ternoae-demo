
import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { searchLocation, getRoute } from '../services/locationService';
import type { LocationSuggestion, RouteDetails } from '../types';
import MapDisplay from '../components/MapDisplay';
import { FARE_PER_KM, WHATSAPP_BASE_URL, TERNOAE_WHATSAPP_NUMBER, OPENROUTESERVICE_API_KEY } from '../constants';
import { MapPinIcon } from '../components/icons/AppIcons';
import LoadingSpinner from '../components/LoadingSpinner';

interface FareFormInputs {
  pickup: string;
  destination: string;
}

const CheckFarePage: React.FC = () => {
  const { control, handleSubmit, watch, setValue, formState: { errors: formErrors } } = useForm<FareFormInputs>({
    defaultValues: { pickup: '', destination: '' }
  });

  const [pickupQuery, destinationQuery] = watch(['pickup', 'destination']);

  const [pickupSuggestions, setPickupSuggestions] = useState<LocationSuggestion[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<LocationSuggestion[]>([]);
  
  const [selectedPickup, setSelectedPickup] = useState<LocationSuggestion | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<LocationSuggestion | null>(null);
  
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Cek Ongkir - TernoAE Jepara";
  }, []);

  const handleSearch = useCallback(async (query: string, type: 'pickup' | 'destination') => {
    if (query.length < 3) {
      type === 'pickup' ? setPickupSuggestions([]) : setDestinationSuggestions([]);
      return;
    }
    const results = await searchLocation(query);
    type === 'pickup' ? setPickupSuggestions(results) : setDestinationSuggestions(results);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (pickupQuery && (!selectedPickup || pickupQuery !== selectedPickup.display_name)) handleSearch(pickupQuery, 'pickup');
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [pickupQuery, selectedPickup, handleSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (destinationQuery && (!selectedDestination || destinationQuery !== selectedDestination.display_name)) handleSearch(destinationQuery, 'destination');
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [destinationQuery, selectedDestination, handleSearch]);

  const handleSelectSuggestion = (suggestion: LocationSuggestion, type: 'pickup' | 'destination') => {
    if (type === 'pickup') {
      setSelectedPickup(suggestion);
      setValue('pickup', suggestion.display_name, { shouldValidate: true });
      setPickupSuggestions([]);
    } else {
      setSelectedDestination(suggestion);
      setValue('destination', suggestion.display_name, { shouldValidate: true });
      setDestinationSuggestions([]);
    }
    setRouteDetails(null); // Reset route details when a new selection is made
  };

  const onSubmit = async () => {
    if (!selectedPickup || !selectedDestination) {
      setError("Harap pilih alamat jemput dan tujuan yang valid dari saran.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setRouteDetails(null);

    const pickupCoords = { lat: parseFloat(selectedPickup.lat), lon: parseFloat(selectedPickup.lon) };
    const destinationCoords = { lat: parseFloat(selectedDestination.lat), lon: parseFloat(selectedDestination.lon) };
    
    const routeData = await getRoute(pickupCoords, destinationCoords);
    setIsLoading(false);
    if (routeData) {
      setRouteDetails(routeData);
    } else {
      setError("Tidak dapat menghitung rute. Silakan coba lagi atau periksa API Key Anda.");
    }
  };
  
  const formatDistance = (meters: number): string => (meters / 1000).toFixed(2);
  const formatDuration = (seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 1) return "< 1 menit";
    return `${minutes} menit`;
  };
  const calculateFare = (distanceMeters: number): string => {
    const fare = (distanceMeters / 1000) * FARE_PER_KM;
    return `Rp ${Math.max(5000, Math.round(fare / 1000) * 1000).toLocaleString('id-ID')}`; // Minimum fare Rp 5.000, rounded to nearest 1000
  };

  const pickupMapCoords = selectedPickup ? [parseFloat(selectedPickup.lat), parseFloat(selectedPickup.lon)] as [number, number] : null;
  const destinationMapCoords = selectedDestination ? [parseFloat(selectedDestination.lat), parseFloat(selectedDestination.lon)] as [number, number] : null;

  const whatsappMessage = routeDetails 
    ? `Halo TernoAE, saya ingin memesan perjalanan dari ${selectedPickup?.display_name} ke ${selectedDestination?.display_name}. Estimasi ongkir ${calculateFare(routeDetails.distance)}.`
    : `Halo TernoAE, saya ingin cek ongkir.`;
  const whatsappLink = `${WHATSAPP_BASE_URL}${TERNOAE_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const inputClass = (hasError?: boolean) => 
    `w-full px-4 py-3 border-2 ${hasError ? 'border-red-500' : 'border-ternoae-green'} rounded-lg focus:ring-2 focus:ring-ternoae-yellow focus:border-ternoae-green transition-colors bg-white text-text-main placeholder-gray-400`;

  return (
    <div className="bg-soft-cream min-h-screen py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-ternoae-green mb-3">Cek Estimasi Ongkir</h1>
          <p className="text-lg text-gray-700">Masukkan alamat jemput dan tujuan untuk mengetahui perkiraan biaya perjalananmu.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-6 md:p-8 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 relative">
                <label htmlFor="pickup" className="block text-sm font-bold text-ternoae-green mb-1">Alamat Jemput</label>
                <Controller
                  name="pickup"
                  control={control}
                  rules={{ required: "Alamat jemput tidak boleh kosong" }}
                  render={({ field }) => (
                    <>
                      <input 
                        {...field} 
                        id="pickup"
                        type="text" 
                        placeholder="Ketik alamat atau nama tempat jemput"
                        className={inputClass(!!formErrors.pickup)}
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedPickup(null);
                          setRouteDetails(null);
                        }}
                        autoComplete="off"
                      />
                      {formErrors.pickup && <p className="text-red-600 text-xs mt-1">{formErrors.pickup.message}</p>}
                    </>
                  )}
                />
                {pickupSuggestions.length > 0 && (
                  <ul className="absolute z-20 w-full bg-white border-2 border-ternoae-green rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                    {pickupSuggestions.map(s => (
                      <li 
                        key={s.place_id} 
                        className="px-4 py-2 hover:bg-ternoae-yellow/50 cursor-pointer text-sm text-text-main"
                        onClick={() => handleSelectSuggestion(s, 'pickup')}
                      >
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mb-6 relative">
                <label htmlFor="destination" className="block text-sm font-bold text-ternoae-green mb-1">Alamat Tujuan</label>
                <Controller
                  name="destination"
                  control={control}
                  rules={{ required: "Alamat tujuan tidak boleh kosong" }}
                  render={({ field }) => (
                     <>
                      <input 
                        {...field} 
                        id="destination"
                        type="text" 
                        placeholder="Ketik alamat atau nama tempat tujuan"
                        className={inputClass(!!formErrors.destination)}
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedDestination(null);
                          setRouteDetails(null);
                        }}
                        autoComplete="off"
                      />
                      {formErrors.destination && <p className="text-red-600 text-xs mt-1">{formErrors.destination.message}</p>}
                    </>
                  )}
                />
                {destinationSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border-2 border-ternoae-green rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                    {destinationSuggestions.map(s => (
                      <li 
                        key={s.place_id} 
                        className="px-4 py-2 hover:bg-ternoae-yellow/50 cursor-pointer text-sm text-text-main"
                        onClick={() => handleSelectSuggestion(s, 'destination')}
                      >
                        {s.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {error && <p className="text-red-600 text-sm mb-4 bg-red-100 p-3 rounded-lg border border-red-500">{error}</p>}
              {OPENROUTESERVICE_API_KEY === "YOUR_OPENROUTESERVICE_API_KEY" &&
                <p className="text-xs text-orange-600 my-2 p-2 bg-orange-100 border border-orange-400 rounded-md">Mode API Key Demo: Estimasi rute mungkin tidak akurat. Harap konfigurasi API Key di `constants.tsx` untuk fungsionalitas penuh.</p>
              }
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-ternoae-yellow text-ternoae-green font-bold py-3 px-6 rounded-lg border-2 border-ternoae-green
                           shadow-[3px_3px_0px_#0C4A1F] hover:shadow-[4px_4px_0px_#0C4A1F] active:shadow-[1px_1px_0px_#0C4A1F]
                           hover:bg-yellow-400 active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150
                           flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? <LoadingSpinner size="sm" color="text-ternoae-green" /> : <MapPinIcon className="w-5 h-5 mr-2"/>}
                <span className={isLoading ? 'ml-2' : ''}>{isLoading ? 'Menghitung...' : 'Hitung Ongkir'}</span>
              </button>
            </form>

            {routeDetails && (
              <div className="mt-8 p-6 bg-green-50 border-2 border-ternoae-green rounded-xl shadow-[3px_3px_0px_#0C4A1F]">
                <h3 className="text-xl font-bold text-ternoae-green mb-3">Estimasi Perjalanan</h3>
                <p className="text-text-main mb-1"><span className="font-semibold">Jarak:</span> {formatDistance(routeDetails.distance)} km</p>
                <p className="text-text-main mb-1"><span className="font-semibold">Waktu Tempuh:</span> {formatDuration(routeDetails.duration)}</p>
                <p className="text-2xl font-bold text-ternoae-green mt-3"><span className="font-semibold">Ongkir:</span> {calculateFare(routeDetails.distance)}</p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-block w-full text-center bg-ternoae-green text-ternoae-yellow font-bold py-3 px-6 rounded-lg border-2 border-ternoae-green
                             shadow-[3px_3px_0px_#FFD700] hover:shadow-[4px_4px_0px_#FFD700] active:shadow-[1px_1px_0px_#FFD700]
                             hover:bg-ternoae-green-light active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150`}
                >
                  Pesan Sekarang via WhatsApp
                </a>
                <p className="text-xs text-gray-500 mt-3 text-center">Tarif adalah estimasi dan dapat berubah. Minimum ongkir Rp 5.000.</p>
              </div>
            )}
          </div>
          
          <div className="bg-white p-2 rounded-xl border-2 border-ternoae-green shadow-[4px_4px_0px_#0C4A1F]">
            <MapDisplay 
              pickupCoords={pickupMapCoords}
              destinationCoords={destinationMapCoords}
              route={routeDetails}
              className="h-[30rem] lg:h-full rounded-lg" // MapDisplay already adds rounded-xl
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckFarePage;