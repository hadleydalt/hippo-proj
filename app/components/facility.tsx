import { useState } from "react";
import SettingsPanel from "./settingsPanel";
import FacilityCard from "./FacilityCard";
import { facilities } from "~/data/facilities";

type FacilityProps = {
    cityName: string;
    id: number;
};

export default function Facility({ cityName, id }: FacilityProps) {
    const facility = facilities.find(f => f.id === id);

    const [settings, setSettings] = useState({
        temperature: { value: facility?.facilityTemperature || 90, enabled: true },
        setting1: { value: 42, enabled: false },
        setting2: { value: 85, enabled: false },
        setting3: { value: 63, enabled: false }
    });

    const [, setRefresh] = useState(0);

    const hasEnabledSettings = Object.values(settings).some(setting => setting.enabled);

    const handleSet = () => {
        if (facility) {
            facility.facilityTemperature = settings.temperature.value;
            setRefresh(prev => prev + 1);
        }
    };

    return (
        <>
            <SettingsPanel 
                adjustTarget={cityName}
                settings={settings}
                onSettingsChange={setSettings}
                handleSet={handleSet}
                hasEnabledSettings={hasEnabledSettings}
                setSettings={setSettings}
            />
            {facility && (
                <div className="mt-6 px-4">
                    <FacilityCard facility={facility} />
                </div>
            )}
        </>
    );
} 