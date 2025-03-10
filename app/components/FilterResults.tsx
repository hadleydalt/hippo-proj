import { useState, useEffect } from "react";
import type { Place } from "~/types/places";
import { facilities } from "~/data/facilities";
import { useNavigate } from 'react-router';
import { fetchAllWeather } from "~/utils/weather";
import HalfFacilityCard from "./HalfFacilityCard";

type FilterResultsProps = {
    selectedRegions: string[];
    temperatureRange: {
        min: number;
        max: number;
    };
    humidityRange: {
        min: number;
        max: number;
    };
};

export default function SearchResults({ selectedRegions, temperatureRange, humidityRange }: FilterResultsProps) {
    const [facilitiesWithWeather, setFacilitiesWithWeather] = useState<Place[]>([]);

    const navigate = useNavigate();

    const handleSelectShown = () => {
        navigate('/selected', { 
          state: { 
            facilities: filteredFacilities,
            type: 'visible'
          }
        });
      };

    useEffect(() => {
        const fetchWeather = async () => {
            const weatherData = await fetchAllWeather(facilities);
            setFacilitiesWithWeather(weatherData);
        };
        fetchWeather();
    }, []);

    const filteredFacilities = facilitiesWithWeather.filter(facility => {
        // Check region match (empty selectedRegions means all regions)
        const regionMatch = selectedRegions.length === 0 || selectedRegions.includes(facility.region);

        // Check temperature match (convert Kelvin to Fahrenheit)
        const facilityTemp = facility.weather ? (facility.weather.main.temp * 9/5) + 32 : 0;
        const tempMatch = !facility.weather || (
            facilityTemp >= temperatureRange.min && 
            facilityTemp <= temperatureRange.max
        );

        // Check humidity match
        const humidityMatch = !facility.weather || (
            facility.weather.main.humidity >= humidityRange.min && 
            facility.weather.main.humidity <= humidityRange.max
        );

        // Return true only if ALL conditions match
        return regionMatch && tempMatch && humidityMatch;
    });

    return (
        <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                    Found {filteredFacilities.length} matching facilities
                </div>
                <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:border-black transition-colors"
                    onClick={handleSelectShown}
                >
                    Manage Shown Facilities
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
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