import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LocateFixed } from 'lucide-react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import './LocationPicker.css';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationPickerProps {
  value: Coordinates | null;
  onChange: (coords: Coordinates) => void;
}

const DEFAULT_CENTER: Coordinates = { lat: 30.0444, lng: 31.2357 };

function ClickHandler({ onChange }: { onChange: (coords: Coordinates) => void }) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function LocationPicker({ value, onChange }: LocationPickerProps) {
  const center = value ?? DEFAULT_CENTER;
  const mapRef = useRef<L.Map | null>(null);

  function handleUseMyLocation() {
    if (!navigator.geolocation) {
      console.log('Geolocation not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        onChange(coords);
        mapRef.current?.flyTo(coords, 15);
      },
      (error) => {
        console.log('Could not get location:', error.message);
      },
    );
  }

  return (
    <div className="location-picker">
      <MapContainer ref={mapRef} center={center} zoom={13} className="location-picker__map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {value && <Marker position={value} />}
        <ClickHandler onChange={onChange} />
      </MapContainer>

      <button
        type="button"
        onClick={handleUseMyLocation}
        className="location-picker__locate-btn"
        aria-label="Use my current location"
      >
        <LocateFixed size={16} />
      </button>
    </div>
  );
}