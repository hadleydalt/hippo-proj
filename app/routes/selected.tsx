import { useLocation, useNavigate } from 'react-router';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

type Facility = {
    id: number;
    city: string;
    lat: number;
    lon: number;
    weather: null;
};

export default function Selected() {
    const location = useLocation();
    const navigate = useNavigate();
    const { facilities, type } = location.state || { facilities: [], type: 'none' };

    return (
        <div className="p-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors mb-4"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to Map
            </button>
            <h1 className="text-4xl font-bold text-black mb-6">
                {type === 'visible' ? 'Visible' : 'Selected'} Facilities
            </h1>
            <div className="space-y-4">
                {facilities.length === 0 ? (
                    <p className="text-black">No facilities to display.</p>
                ) : (
                    facilities.map((facility: Facility) => (
                        <div 
                            key={facility.id} 
                            className="bg-white shadow-md rounded-lg p-4 text-black"
                        >
                            <h2 className="text-xl font-semibold">{facility.city}</h2>
                            <p className="text-gray-600 mt-2">
                                Location: {facility.lat.toFixed(4)}, {facility.lon.toFixed(4)}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}