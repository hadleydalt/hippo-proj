import { useState } from "react";
import SettingsPanel from "./settingsPanel";

type FacilityProps = {
    cityName: string;
};

export default function Facility({ cityName }: FacilityProps) {
    const [settings, setSettings] = useState({
        temperature: { value: 77, enabled: true },
        setting1: { value: 42, enabled: false },
        setting2: { value: 85, enabled: false },
        setting3: { value: 63, enabled: false }
    });

    const hasEnabledSettings = Object.values(settings).some(setting => setting.enabled);

    const handleSet = () => {
        
    };

    
    
    return (

       <SettingsPanel 
            adjustTarget={cityName}
            settings={settings}
            onSettingsChange={setSettings}
            handleSet={handleSet}
            hasEnabledSettings={hasEnabledSettings}
            setSettings={setSettings}
        />
    );
} 