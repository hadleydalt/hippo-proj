import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

// Sample data - replace with your actual facility data
const facilities = [
    {
        id: 1,
        city: "Pescadero, CA",
        lat: 37.2552,
        lon: -122.3839,
        weather: null,
    },
    {
        id: 2,
        city: "Portland, ME",
        lat: 43.6591,
        lon: -70.2568,
        weather: null,
    },
    {
        id: 3,
        city: "Savannah, GA",
        lat: 32.0809,
        lon: -81.0912,
        weather: null,
    },
    {
        id: 4,
        city: "Santa Fe, NM",
        lat: 35.6870,
        lon: -105.9378,
        weather: null,
    },
    {
        id: 5,
        city: "Bozeman, MT",
        lat: 45.6770,
        lon: -111.0429,
        weather: null,
    },
    {
        id: 6,
        city: "Burlington, VT",
        lat: 44.4759,
        lon: -73.2121,
        weather: null,
    },
    {
        id: 7,
        city: "Sedona, AZ",
        lat: 34.8697,
        lon: -111.7610,
        weather: null,
    },
    {
        id: 8,
        city: "Charleston, SC",
        lat: 32.7765,
        lon: -79.9311,
        weather: null,
    },
    {
        id: 9,
        city: "Asheville, NC",
        lat: 35.5951,
        lon: -82.5515,
        weather: null,
    },
    {
        id: 10,
        city: "Moab, UT",
        lat: 38.5733,
        lon: -109.5498,
        weather: null,
    },
    {
        id: 11,
        city: "Key West, FL",
        lat: 24.5551,
        lon: -81.7800,
        weather: null,
    },
    {
        id: 12,
        city: "Juneau, AK",
        lat: 58.3019,
        lon: -134.4197,
        weather: null,
    },
    {
        id: 13,
        city: "Taos, NM",
        lat: 36.4072,
        lon: -105.5734,
        weather: null,
    },
    {
        id: 14,
        city: "Bar Harbor, ME",
        lat: 44.3876,
        lon: -68.2039,
        weather: null,
    },
    {
        id: 15,
        city: "Telluride, CO",
        lat: 37.9375,
        lon: -107.8123,
        weather: null,
    },
    {
        id: 16,
        city: "Carmel, CA",
        lat: 36.5552,
        lon: -121.9233,
        weather: null,
    },
    {
        id: 17,
        city: "Jackson, WY",
        lat: 43.4799,
        lon: -110.7624,
        weather: null,
    },
    {
        id: 18,
        city: "Kauai, HI",
        lat: 22.0964,
        lon: -159.5261,
        weather: null,
    },
    {
        id: 19,
        city: "Nantucket, MA",
        lat: 41.2835,
        lon: -70.0995,
        weather: null,
    },
    {
        id: 20,
        city: "Lake Tahoe, NV",
        lat: 39.0968,
        lon: -120.0324,
        weather: null,
    },
];

export default function Map() {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);
  const [visibleFacilities, setVisibleFacilities] = useState<typeof facilities>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<typeof facilities>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    async function loadMapComponents() {
      const leaflet = await import('leaflet');
      const reactLeaflet = await import('react-leaflet');
      await import('leaflet/dist/leaflet.css');

      const defaultIcon = new leaflet.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const selectedIcon = new leaflet.Icon({
        ...defaultIcon.options,
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        className: 'selected-marker'
      });

      setMapComponents({ ...reactLeaflet, defaultIcon, selectedIcon, L: leaflet });
      setIsClient(true);
    }

    loadMapComponents();
  }, []);

  const updateVisibleFacilities = useCallback(() => {
    if (!map) return;
    
    const bounds = map.getBounds();
    const visible = facilities.filter(facility => 
      bounds.contains([facility.lat, facility.lon])
    );
    setVisibleFacilities(visible);
  }, [map]);

  useEffect(() => {
    if (!map) return;
    
    map.on('moveend', updateVisibleFacilities);
    map.on('zoomend', updateVisibleFacilities);
    
    updateVisibleFacilities();
    
    return () => {
      map.off('moveend', updateVisibleFacilities);
      map.off('zoomend', updateVisibleFacilities);
    };
  }, [map, updateVisibleFacilities]);

  const handleSelectVisible = () => {
    navigate('/selected', { 
      state: { 
        facilities: visibleFacilities,
        type: 'visible'
      }
    });
  };

  const handleManageSelected = () => {
    navigate('/selected', { 
      state: { 
        facilities: selectedFacilities,
        type: 'selected'
      }
    });
  };

  const toggleFacilitySelection = (facility: typeof facilities[0]) => {
    if (!isSelectionMode) return;

    setSelectedFacilities(prev => {
      const isSelected = prev.some(f => f.id === facility.id);
      if (isSelected) {
        return prev.filter(f => f.id === facility.id);
      } else {
        return [...prev, facility];
      }
    });
  };

  if (!isClient || !MapComponents) return <div>Loading map...</div>;

  const { MapContainer, TileLayer, Marker, Popup, useMap } = MapComponents;

  function MapController() {
    const mapInstance = useMap();
    useEffect(() => {
      setMap(mapInstance);
    }, [mapInstance]);
    return null;
  }

  return (
    <div className="h-[calc(100vh-8rem)] w-full relative">
      <div className="absolute top-4 right-4 z-[1000] flex gap-2">
        <button
          onClick={() => {
            setIsSelectionMode(!isSelectionMode);
            if (isSelectionMode) {
              setSelectedFacilities([]); // Clear selections when canceling
            }
          }}
          className={`px-4 py-2 rounded-md shadow-md text-black transition-colors ${
            isSelectionMode 
              ? 'bg-blue-200 hover:bg-blue-300' 
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          {isSelectionMode ? 'Cancel Selection' : 'Select to Manage'}
        </button>
        {!isSelectionMode && (
          <button
            onClick={handleSelectVisible}
            className="bg-white px-4 py-2 rounded-md shadow-md hover:bg-gray-50 text-black"
          >
            Manage Visible Facilities ({visibleFacilities.length})
          </button>
        )}
        {selectedFacilities.length > 0 && (
          <button
            onClick={handleManageSelected}
            className="bg-blue-500 px-4 py-2 rounded-md shadow-md hover:bg-blue-600 text-white"
          >
            Manage Selected Facilities ({selectedFacilities.length})
          </button>
        )}
      </div>
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <MapController />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {facilities.map(facility => (
          <Marker
            key={facility.id}
            position={[facility.lat, facility.lon]}
            icon={selectedFacilities.some(f => f.id === facility.id) 
              ? MapComponents.selectedIcon 
              : MapComponents.defaultIcon}
            eventHandlers={{
              click: () => toggleFacilitySelection(facility)
            }}
          >
            <Popup>
              <div className="text-black">
                {facility.city}
                {isSelectionMode && (
                  <div className="mt-2 text-sm">
                    {selectedFacilities.some(f => f.id === facility.id)
                      ? 'Click to unselect'
                      : 'Click to select'}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}