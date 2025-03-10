import { useState } from "react";

import { 
    ChevronUpIcon, 
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

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

type SettingsControlsProps = {
    settings: {
        temperature: { value: number; enabled: boolean };
        setting1: { value: number; enabled: boolean };
        setting2: { value: number; enabled: boolean };
        setting3: { value: number; enabled: boolean };
    };
    onSettingsChange: (newSettings: any) => void;
};

export function SettingsControls({ settings, onSettingsChange }: SettingsControlsProps) {
    return (
        <div className="flex justify-between">
            <SettingControl 
                label="Facility Temp (°F)" 
                initialValue={77} 
                defaultEnabled={true}
                onValueChange={(value, enabled) => 
                    onSettingsChange({
                        ...settings,
                        temperature: { value, enabled }
                    })
                }
            />
            <SettingControl 
                label="Other Setting" 
                initialValue={42}
                onValueChange={(value, enabled) => 
                    onSettingsChange({
                        ...settings,
                        setting1: { value, enabled }
                    })
                }
            />
            <SettingControl 
                label="Other Setting" 
                initialValue={85}
                onValueChange={(value, enabled) => 
                    onSettingsChange({
                        ...settings,
                        setting2: { value, enabled }
                    })
                }
            />
            <SettingControl 
                label="Other Setting" 
                initialValue={63}
                onValueChange={(value, enabled) => 
                    onSettingsChange({
                        ...settings,
                        setting3: { value, enabled }
                    })
                }
            />
        </div>
    );
}