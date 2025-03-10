import { useNavigate } from "react-router";
import { 
    ChevronDoubleRightIcon,
    BuildingOfficeIcon,
    SunIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    GlobeAmericasIcon,
} from '@heroicons/react/24/outline';
import type { Place } from "~/types/places";

type FacilityCardProps = {
    facility: Place;
};

export default function HalfFacilityCard({ facility }: FacilityCardProps) {
    const navigate = useNavigate();
    const cityUrl = facility.city.split(',')[0].toLowerCase().replace(/ /g, '-');

    return (
        <div 
            key={facility.id} 
            className="bg-gray-50 shadow-md rounded-lg p-4 pb-8 text-black cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => navigate(`/${cityUrl}`)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">
                        {facility.city}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <GlobeAmericasIcon className="w-4 h-4" />
                        <span>{facility.region}</span>
                    </div>
                </div>
                <div className="bg-black rounded-lg p-2 flex items-center justify-center">
                    <ChevronDoubleRightIcon className="w-5 h-5 text-white" />
                </div>
            </div>
            <div className="text-gray-600 mt-6">
                {facility.weather ? (
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <BuildingOfficeIcon className="w-5 h-5 text-black" />
                            <p>Facility: {facility.facilityTemperature}°F</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <SunIcon className="w-5 h-5 text-black" />
                            <p>Outside: {((facility.weather.main.temp * 9/5) + 32).toFixed(1)}°F</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <ArrowDownIcon className="w-5 h-5 text-black" />
                            <p>Low: {((facility.weather.main.temp_min * 9/5) + 32).toFixed(1)}°F</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <ArrowUpIcon className="w-5 h-5 text-black" />
                            <p>High: {((facility.weather.main.temp_max * 9/5) + 32).toFixed(1)}°F</p>
                        </div>
                    </div>
                ) : (
                    <p>Weather data unavailable</p>
                )}
            </div>
        </div>
    );
} 