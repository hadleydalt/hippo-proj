import { useState, useEffect } from "react";
import { facilities } from "~/data/facilities";
import HalfFacilityCard from "./HalfFacilityCard";
import { fetchAllWeather } from "~/utils/weather";
import type { Place } from "~/types/places";
import { useNavigate } from 'react-router';

export default function SearchResults({ searchQuery }: { searchQuery: string }) {
    const [facilitiesWithWeather, setFacilitiesWithWeather] = useState<Place[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWeather = async () => {
            const weatherData = await fetchAllWeather(facilities);
            setFacilitiesWithWeather(weatherData);
        };
        fetchWeather();
    }, []);

    const handleSelectShown = () => {
        navigate('/selected', { 
          state: { 
            facilities: filteredFacilities,
            type: 'visible'
          }
        });
    };
    const filteredFacilities = facilitiesWithWeather.filter(facility => 
        facility.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Found {filteredFacilities.length} matching facilities
                </div>
                {filteredFacilities.length > 0 &&
                <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:border-black transition-colors"
                    onClick={handleSelectShown}
                >
                    Manage Shown Facilities
                </button>
}
            </div>
            <div className="space-y-4">
                {filteredFacilities.map(facility => (
                    <HalfFacilityCard 
                        key={facility.id}
                        facility={facility}
                    />
                ))}
            </div>
        </div>
    );
}