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
import SettingsPanel from '~/components/settingsPanel';
import HalfFacilityCard from '~/components/HalfFacilityCard';

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
                            <HalfFacilityCard facility={facility} />
                        );
                    })
                )}
            </div>
        </div>
    );
}