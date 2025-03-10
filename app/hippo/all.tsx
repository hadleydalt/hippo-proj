import { useState, useEffect } from "react";
import { facilities } from "~/data/facilities";
import HalfFacilityCard from "~/components/HalfFacilityCard";
import { fetchAllWeather } from "~/utils/weather";
import type { Place } from "~/types/places";

export default function All() {
    const [facilitiesWithWeather, setFacilitiesWithWeather] = useState<Place[]>([]);

    useEffect(() => {
        const fetchWeather = async () => {
            const weatherData = await fetchAllWeather(facilities);
            setFacilitiesWithWeather(weatherData);
        };
        fetchWeather();
    }, []);

    return (
        <div className="space-y-4">
            {facilitiesWithWeather.map(facility => (
                <HalfFacilityCard 
                    key={facility.id}
                    facility={facility}
                />
            ))}
        </div>
    );
}
