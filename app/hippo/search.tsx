import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import FilterResults from '../components/FilterResults';
import SearchResults from '../components/SearchResults';
import CityCoordinates from '../components/CityCoordinates';

type Region = 'Northeast' | 'Midwest' | 'South' | 'West';

export default function Grid() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryLocked, setSearchQueryLocked] = useState('');
    const [selectedRegions, setSelectedRegions] = useState<Region[]>([]);
    const [temperatureRange, setTemperatureRange] = useState({ min: 30, max: 70 });
    const [humidityRange, setHumidityRange] = useState({ min: 25, max: 75 });
    const [showFilterResults, setShowFilterResults] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const [searchState, setSearchState] = useState({
        selectedRegions: [] as Region[],
        temperatureRange: { min: 30, max: 70 },
        humidityRange: { min: 25, max: 75 }
    });

    const regions: Region[] = ['Northeast', 'Midwest', 'South', 'West'];

    const handleRegionToggle = (region: Region) => {
        if (selectedRegions.includes(region)) {
            setSelectedRegions(selectedRegions.filter(r => r !== region));
        } else {
            setSelectedRegions([...selectedRegions, region]);
        }
    };

    const handleSearch = () => {
        setSearchQueryLocked(searchQuery);
        setShowSearchResults(true);
        setShowFilterResults(false);
    };

    const handleFilterSearch = () => {
        setShowFilterResults(true);
        setShowSearchResults(false);
        setSearchQuery('');
    };

    const handleClearAll = () => {
        setSelectedRegions([]);
        setTemperatureRange({ min: 30, max: 70 });
        setHumidityRange({ min: 25, max: 75 });
        setSearchQuery('');
        setShowFilterResults(false);
        setShowSearchResults(false);
    };

    return (
        <div className="text-black">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Filter and Search</h2>
                <button 
                    onClick={handleClearAll}
                    className="px-8 py-2 border border-gray-300 rounded-lg text-black hover:border-black transition-colors"
                >
                    Clear All
                </button>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search facilities by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <button 
                        onClick={handleSearch}
                        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Filters Container */}
            <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
                {/* Sliders Container */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Temperature Range Filter */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Local Temperature</h3>
                        <div className="space-y-2">
                            <div className="relative pt-1">
                                <div 
                                    className="absolute w-full h-2 rounded-lg"
                                    style={{
                                        background: `linear-gradient(to right, #E5E7EB 0%, #E5E7EB ${(temperatureRange.min/120)*100}%, black ${(temperatureRange.min/120)*100}%, black ${(temperatureRange.max/120)*100}%, #E5E7EB ${(temperatureRange.max/120)*100}%, #E5E7EB 100%)`
                                    }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="120"
                                    value={temperatureRange.min}
                                    onChange={(e) => setTemperatureRange(prev => ({
                                        ...prev,
                                        min: Math.min(parseInt(e.target.value), prev.max)
                                    }))}
                                    className="absolute w-full appearance-none h-2 rounded-lg bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:z-10"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="120"
                                    value={temperatureRange.max}
                                    onChange={(e) => setTemperatureRange(prev => ({
                                        ...prev,
                                        max: Math.max(parseInt(e.target.value), prev.min)
                                    }))}
                                    className="absolute w-full appearance-none h-2 rounded-lg bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:z-20"
                                />
                            </div>
                            {/* Temperature Range Display */}
                            <div className="flex justify-between text-sm text-gray-600 pt-4">
                                <span>0°F</span>
                                <span>Range: {temperatureRange.min}°F - {temperatureRange.max}°F</span>
                                <span>120°F</span>
                            </div>
                        </div>
                    </div>

                    {/* Humidity Range Filter */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Humidity</h3>
                        <div className="space-y-2">
                            <div className="relative pt-1">
                                <div 
                                    className="absolute w-full h-2 rounded-lg"
                                    style={{
                                        background: `linear-gradient(to right, #E5E7EB 0%, #E5E7EB ${humidityRange.min}%, black ${humidityRange.min}%, black ${humidityRange.max}%, #E5E7EB ${humidityRange.max}%, #E5E7EB 100%)`
                                    }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={humidityRange.min}
                                    onChange={(e) => setHumidityRange(prev => ({
                                        ...prev,
                                        min: Math.min(parseInt(e.target.value), prev.max)
                                    }))}
                                    className="absolute w-full appearance-none h-2 rounded-lg bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:z-10"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={humidityRange.max}
                                    onChange={(e) => setHumidityRange(prev => ({
                                        ...prev,
                                        max: Math.max(parseInt(e.target.value), prev.min)
                                    }))}
                                    className="absolute w-full appearance-none h-2 rounded-lg bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:z-20"
                                />
                            </div>
                            {/* Humidity Range Display */}
                            <div className="flex justify-between text-sm text-gray-600 pt-4">
                                <span>0%</span>
                                <span>Range: {humidityRange.min}% - {humidityRange.max}%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Region Filter and Buttons */}
                <div className="flex justify-between items-end">
                    <div className="flex-1">
                        <h3 className="text-lg font-medium mb-2">Region</h3>
                        <div className="flex flex-wrap gap-2">
                            {regions.map(region => (
                                <button
                                    key={region}
                                    onClick={() => handleRegionToggle(region)}
                                    className={`px-4 py-2 rounded-full border transition-colors ${
                                        selectedRegions.includes(region)
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-black border-gray-300 hover:border-black'
                                    }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                        <button 
                            onClick={handleFilterSearch}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {showSearchResults && (
                <SearchResults 
                    searchQuery={searchQueryLocked}
                />
            )}

            {showFilterResults && (
                <FilterResults 
                    selectedRegions={searchState.selectedRegions}
                    temperatureRange={searchState.temperatureRange}
                    humidityRange={searchState.humidityRange}
                />
            )}
        </div>
    );
}