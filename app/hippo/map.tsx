import { useEffect, useState } from 'react';

// Sample data - replace with your actual facility data
const facilities = [
  { id: 1, name: "Facility 1", lat: 37.7749, lng: -122.4194 }, // San Francisco
  { id: 2, name: "Facility 2", lat: 40.7128, lng: -74.0060 },  // New York
  { id: 3, name: "Facility 3", lat: 34.0522, lng: -118.2437 }, // Los Angeles
];

export default function Map() {
  const [isClient, setIsClient] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);

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

      setMapComponents({ ...reactLeaflet, defaultIcon });
      setIsClient(true);
    }

    loadMapComponents();
  }, []);

  if (!isClient || !MapComponents) return <div>Loading map...</div>;

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <div className="h-[calc(100vh-8rem)] w-full">
      <MapContainer
        center={[39.8283, -98.5795]} // Center of the US
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {facilities.map(facility => (
          <Marker
            key={facility.id}
            position={[facility.lat, facility.lng]}
            icon={MapComponents.defaultIcon}
          >
            <Popup>
              {facility.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}