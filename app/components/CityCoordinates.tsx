import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { facilities } from '~/data/facilities';
import type { Place } from '~/types/places';

type GeocodingResult = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
};

export default function CityCoordinates() {
    const [city, setCity] = useState('');
    const [results, setResults] = useState<GeocodingResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getRegionFromCoordinates = (lat: number, lon: number): string => {
        if (lat >= 38 && lat <= 47 && lon >= -80 && lon <= -66) {
            return "Northeast";  
        }
        if (lat >= 36 && lat <= 49 && lon >= -104 && lon <= -80) {
            return "Midwest";  
        }
        if (lat >= 32 && lat <= 49 && lon >= -125 && lon <= -104) {
            return "West";  
        }
        if (lat >= 24 && lat <= 36 && lon >= -106 && lon <= -75) {
            return "South"; 
        }
        return "Unknown"; 
    };

    const handleAddFacility = (result: GeocodingResult) => {
        const newFacility: Place = {
            id: (Math.max(...facilities.map(f => f.id)) + 1),
            city: result.name,
            lat: result.lat,
            lon: result.lon,
            region: getRegionFromCoordinates(result.lat, result.lon),
            facilityTemperature: 77,
            weather: null
        };

        facilities.push(newFacility);
        // Show feedback to user
        alert(`Added ${result.name} to facilities!`);
    };

    const handleSearch = async () => {
        if (!city.trim()) return;
        
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${import.meta.env.VITE_REACT_APP_OPENWEATHERMAP_API_KEY}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch coordinates');
            }
            
            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError('Failed to get coordinates. Please try again.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-black">Add Proposed Facility</h1>
                <p className="text-gray-600">
                    Here you have the opportunity to add a Proposed Facility and observe how it interacts with weather conditions.
                </p>
            </div>
            
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Enter city name..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                    />
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <button 
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {error && (
                <div className="text-red-600 text-sm">
                    {error}
                </div>
            )}

            {results.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-medium text-black">Results:</h4>
                    <div className="space-y-2">
                        {results.map((result, index) => (
                            <div 
                                key={index}
                                className="p-4 border rounded-lg bg-white hover:border-black cursor-pointer transition-colors"
                                onClick={() => handleAddFacility(result)}
                            >
                                <div className="font-medium text-black">{result.name}</div>
                                <div className="text-sm text-gray-600">
                                    {result.state && `${result.state}, `}{result.country}
                                </div>
                                <div className="mt-2 text-sm text-black">
                                    <div>Latitude: {result.lat}</div>
                                    <div>Longitude: {result.lon}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 