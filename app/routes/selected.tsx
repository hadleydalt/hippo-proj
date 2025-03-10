import { useLocation, useNavigate } from 'react-router';
import { 
    SunIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowsUpDownIcon,
    CloudIcon,
    EyeIcon,
    ArrowPathIcon,
    ChevronDoubleRightIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import type { Place } from '../types/places';
import { fetchAllWeather } from '../utils/weather';
import  { SettingsControls } from '../components/settingsItems';
import SettingsPanel from '~/components/settingsPanel';

export default function Selected() {
    const location = useLocation();
    const navigate = useNavigate();
    const { facilities, type } = location.state || { facilities: [], type: 'none' };
    const [facilitiesWithWeather, setFacilitiesWithWeather] = useState<Place[]>([]);
    const [settings, setSettings] = useState({
        temperature: { value: 77, enabled: true },
        setting1: { value: 42, enabled: false },
        setting2: { value: 85, enabled: false },
        setting3: { value: 63, enabled: false }
    });

    useEffect(() => {
        const loadWeatherData = async () => {
            try {
                const updatedFacilities = await fetchAllWeather(facilities);
                setFacilitiesWithWeather(updatedFacilities);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        loadWeatherData();
    }, [facilities]);

    const hasEnabledSettings = Object.values(settings).some(setting => setting.enabled);

    const handleSet = () => {
        if (settings.temperature.enabled) {
            const newTemperature = settings.temperature.value;
            facilitiesWithWeather.forEach(facility => {
                facility.facilityTemperature = newTemperature;
            });
            // Force a re-render by setting the same array
            setFacilitiesWithWeather([...facilitiesWithWeather]);
        }
    };

    return (
        <div className="p-6">
            <SettingsPanel 
            adjustTarget={"All"}
            settings={settings}
            onSettingsChange={setSettings}
            handleSet={handleSet}
            hasEnabledSettings={hasEnabledSettings}
            setSettings={setSettings}
        />
            <div className="space-y-4">
                {facilitiesWithWeather.length === 0 ? (
                    <p className="text-black">Loading facilities...</p>
                ) : (
                    facilitiesWithWeather.map((facility) => {
                        // Convert city name to URL-friendly format
                        const cityUrl = facility.city.split(',')[0].toLowerCase().replace(/ /g, '-');
                        
                        return (
                            <div 
                                key={facility.id} 
                                className="bg-gray-50 shadow-md rounded-lg p-4 pb-8 text-black cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => navigate(`/${cityUrl}`)}
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">
                                        {facility.city}
                                    </h2>
                                    <div className="bg-black rounded-lg p-2 flex items-center justify-center">
                                        <ChevronDoubleRightIcon className="w-5 h-5 text-white" />
                                    </div>
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
                    })
                )}
            </div>
        </div>
    );
}