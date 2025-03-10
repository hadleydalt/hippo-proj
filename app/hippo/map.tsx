import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { facilities } from '../data/facilities';

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