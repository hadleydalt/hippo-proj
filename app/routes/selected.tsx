import { useLocation, useNavigate } from 'react-router';
import { 
    ArrowLeftIcon, 
    ChevronUpIcon, 
    ChevronDownIcon,
    SunIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowsUpDownIcon,
    CloudIcon,
    EyeIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import type { Place } from '../types/places';
import { fetchAllWeather } from '../utils/weather';

type SettingControlProps = {
    label: string;
    initialValue: number;
    defaultEnabled?: boolean;
    onValueChange: (value: number, enabled: boolean) => void;
};

function SettingControl({ label, initialValue, defaultEnabled = false, onValueChange }: SettingControlProps) {
    const [value, setValue] = useState(initialValue);
    const [isEditing, setIsEditing] = useState(false);
    const [isEnabled, setIsEnabled] = useState(defaultEnabled);

    const handleValueChange = (newValue: number) => {
        const finalValue = Math.max(0, Math.min(120, newValue));
        setValue(finalValue);
        onValueChange(finalValue, isEnabled);
    };

    const handleEnableChange = () => {
        const newEnabled = !isEnabled;
        setIsEnabled(newEnabled);
        onValueChange(value, newEnabled);
    };

    return (
        <div className={`mb-8 w-48 relative ${!isEnabled ? 'opacity-50' : ''}`}>
            <button
                onClick={handleEnableChange}
                className={`absolute right-0 top-0 w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center ${
                    isEnabled ? 'bg-black border-black' : 'bg-white'
                }`}
            >
                {isEnabled && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                )}
            </button>
            <div className="text-sm text-gray-600 mb-2 text-center">{label}</div>
            <div className="flex justify-center items-center gap-4">
                {isEditing && isEnabled ? (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleValueChange(parseInt(e.target.value) || 0)}
                        onBlur={() => setIsEditing(false)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setIsEditing(false);
                            }
                        }}
                        className="text-6xl font-bold text-black w-32 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        autoFocus
                    />
                ) : (
                    <div
                        onClick={() => isEnabled && setIsEditing(true)}
                        className={`text-6xl font-bold text-black ${isEnabled ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                        {value}
                    </div>
                )}
                <div className="flex flex-col">
                    <button
                        onClick={() => isEnabled && handleValueChange(value + 1)}
                        className={`p-1 rounded ${isEnabled ? 'hover:bg-gray-100' : 'cursor-default'}`}
                        disabled={!isEnabled}
                    >
                        <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        onClick={() => isEnabled && handleValueChange(value - 1)}
                        className={`p-1 rounded ${isEnabled ? 'hover:bg-gray-100' : 'cursor-default'}`}
                        disabled={!isEnabled}
                    >
                        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}

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
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors mb-6"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Map
            </button>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-black">
                    Adjust Settings for All
                </h2>
                <button
                    onClick={handleSet}
                    disabled={!hasEnabledSettings}
                    className={`px-8 py-2 bg-black text-white rounded transition-colors ${
                        hasEnabledSettings ? 'hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'
                    }`}
                >
                    Set
                </button>
            </div>
            <div className="flex justify-between">
                <SettingControl 
                    label="Temperature (°F)" 
                    initialValue={77} 
                    defaultEnabled={true}
                    onValueChange={(value, enabled) => 
                        setSettings(prev => ({
                            ...prev,
                            temperature: { value, enabled }
                        }))
                    }
                />
                <SettingControl 
                    label="Other Setting" 
                    initialValue={42}
                    onValueChange={(value, enabled) => 
                        setSettings(prev => ({
                            ...prev,
                            setting1: { value, enabled }
                        }))
                    }
                />
                <SettingControl 
                    label="Other Setting" 
                    initialValue={85}
                    onValueChange={(value, enabled) => 
                        setSettings(prev => ({
                            ...prev,
                            setting2: { value, enabled }
                        }))
                    }
                />
                <SettingControl 
                    label="Other Setting" 
                    initialValue={63}
                    onValueChange={(value, enabled) => 
                        setSettings(prev => ({
                            ...prev,
                            setting3: { value, enabled }
                        }))
                    }
                />
            </div>
            <div className="space-y-4">
                {facilitiesWithWeather.length === 0 ? (
                    <p className="text-black">Loading facilities...</p>
                ) : (
                    facilitiesWithWeather.map((facility) => (
                        <div 
                            key={facility.id} 
                            className="bg-gray-50 shadow-md rounded-lg p-4 pb-8 text-black"
                        >
                            <h2 className="text-xl font-semibold">{facility.city}</h2>
                            <div className="text-gray-600 mt-4">
                                {facility.weather ? (
                                    <div className="grid grid-cols-3 gap-x-12 gap-y-6">
                                        {/* Temperature Column */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2">
                                                <SunIcon className="w-5 h-5 text-black" />
                                                <p>Facility Temperature: {facility.facilityTemperature}°F</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <SunIcon className="w-5 h-5 text-black" />
                                                <p>Current: {((facility.weather.main.temp * 9/5) + 32).toFixed(1)}°F</p>
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
                    ))
                )}
            </div>
        </div>
    );
}