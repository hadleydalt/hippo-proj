import { useState, useEffect } from "react";
import { facilities } from "~/data/facilities";
import HalfFacilityCard from "./HalfFacilityCard";
import { fetchAllWeather } from "~/utils/weather";
import type { Place } from "~/types/places";

export default function SearchResults({ searchQuery }: { searchQuery: string }) {
    const [facilitiesWithWeather, setFacilitiesWithWeather] = useState<Place[]>([]);

    useEffect(() => {
        const fetchWeather = async () => {
            const weatherData = await fetchAllWeather(facilities);
            setFacilitiesWithWeather(weatherData);
        };
        fetchWeather();
    }, []);

    const filteredFacilities = facilitiesWithWeather.filter(facility => 
        facility.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mt-4 space-y-4">
            <div className="text-sm text-gray-600">
                Found {filteredFacilities.length} matching facilities
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