import { 
    BuildingOfficeIcon,
    SunIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowsUpDownIcon,
    CloudIcon,
    EyeIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import type { Place } from "~/types/places";

type FacilityCardProps = {
    facility: Place;
};

export default function FacilityCard({ facility }: FacilityCardProps) {

    return (
        <div 
            key={facility.id} 
            className="bg-gray-50 shadow-md rounded-lg p-4 pb-8 text-black"
        >
            <div className="flex items-center">
                <h2 className="text-xl font-semibold">
                    {facility.city}
                </h2>
            </div>
            <div className="text-gray-600 mt-4">
                {facility.weather ? (
                    <div className="grid grid-cols-3 gap-x-12 gap-y-6">
                        {/* Temperature Column */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <BuildingOfficeIcon className="w-5 h-5 text-black" />
                                <p>Facility Temp: {facility.facilityTemperature}°F</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <SunIcon className="w-5 h-5 text-black" />
                                <p>Outside Temp: {((facility.weather.main.temp * 9/5) + 32).toFixed(1)}°F</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <ArrowDownIcon className="w-5 h-5 text-black" />
                                <p>Min: {((facility.weather.main.temp_min * 9/5) + 32).toFixed(1)}°F</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <ArrowUpIcon className="w-5 h-5 text-black" />
                                <p>Max: {((facility.weather.main.temp_max * 9/5) + 32).toFixed(1)}°F</p>
                            </div>
                        </div>

                        {/* Level Column */}
                        <div className="space-y-6">
                            {facility.weather.main.grnd_level && (
                                <div className="flex items-center gap-2">
                                    <ArrowsUpDownIcon className="w-5 h-5 text-black" />
                                    <p>Ground Level: {facility.weather.main.grnd_level} hPa</p>
                                </div>
                            )}
                            {facility.weather.main.sea_level && (
                                <div className="flex items-center gap-2">
                                    <ArrowsUpDownIcon className="w-5 h-5 text-black" />
                                    <p>Sea Level: {facility.weather.main.sea_level} hPa</p>
                                </div>
                            )}
                            {facility.weather.visibility && (
                                <div className="flex items-center gap-2">
                                    <EyeIcon className="w-5 h-5 text-black" />
                                    <p>Visibility: {(facility.weather.visibility / 1000).toFixed(1)} km</p>
                                </div>
                            )}
                        </div>

                        {/* Atmospheric Conditions Column */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <ArrowsUpDownIcon className="w-5 h-5 text-black" />
                                <p>Pressure: {facility.weather.main.pressure} hPa</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <CloudIcon className="w-5 h-5 text-black" />
                                <p>Humidity: {facility.weather.main.humidity}%</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <ArrowPathIcon className="w-5 h-5 text-black" />
                                <p>Wind: {(facility.weather.wind.speed * 2.237).toFixed(1)} mph</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Weather data unavailable</p>
                )}
            </div>
        </div>
    );
} 