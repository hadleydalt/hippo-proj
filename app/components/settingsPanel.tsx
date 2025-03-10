import { useState } from "react";
import { SettingsControls } from "~/components/settingsItems";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";

type SettingsPanelProps = {
    adjustTarget: string;
    settings: {
        temperature: { value: number; enabled: boolean };
        setting1: { value: number; enabled: boolean };
        setting2: { value: number; enabled: boolean };
        setting3: { value: number; enabled: boolean };
    };
    onSettingsChange: (newSettings: any) => void;
    handleSet: () => void;
    hasEnabledSettings: boolean;
    setSettings: (newSettings: any) => void;
};


export default function SettingsPanel({ adjustTarget, settings, onSettingsChange, handleSet, hasEnabledSettings, setSettings }: SettingsPanelProps) {
    const navigate = useNavigate();

    
    
    return (

        <div className="p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors mb-6"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back
            </button>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-black">
                    Adjust Settings for {adjustTarget}
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
            <SettingsControls 
                settings={settings} 
                onSettingsChange={setSettings}
            />
        </div>
    );
} 