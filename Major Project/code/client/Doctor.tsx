import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { Menu } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { fetchAllDoctorsLocations } from '../api/location';
import 'leaflet/dist/leaflet.css';

interface LayoutContext {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

// Create a custom divIcon for the user's location (blue dot with outer ring)
const userLocationIcon = L.divIcon({
  html: `
    <div style="position: relative; width: 30px; height: 30px;">
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        border: 2px solid rgba(66, 133, 244, 0.5);
        border-radius: 50%;
      "></div>
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        width: 14px;
        height: 14px;
        background-color: #4285F4;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>
  `,
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Create a custom divIcon for the doctor's location (Stethoscope icon)
const doctorLocationIcon = L.divIcon({
  html: `
    <div style="display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; background-color: #6B46C1; border-radius: 50%;">
     <svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-6.33 -6.33 75.95 75.95" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#ffffff;" d="M60.993,20.124c0-4.404-3.583-7.987-7.987-7.987s-7.987,3.583-7.987,7.987 c0,4.065,3.054,7.423,6.987,7.918v20.74c0,6.896-5.61,12.505-12.506,12.505h-8.43c-6.896,0-12.506-5.61-12.506-12.505V36.945h3.572 c4.458,0,7.064-4.508,7.739-7.587c0.104-0.625,2.575-15.366,2.941-20.494c0.139-1.929-0.544-3.806-1.92-5.284 c-1.503-1.614-3.628-2.54-5.83-2.54h-1.422C23.599,0.463,23.126,0,22.537,0H20.52c-0.619,0-1.125,0.506-1.125,1.125v1.829 c0,0.619,0.506,1.125,1.125,1.125h2.016c0.589,0,1.062-0.462,1.108-1.04h1.422c1.648,0,3.24,0.694,4.366,1.903 c0.994,1.067,1.487,2.409,1.39,3.778c-0.36,5.033-2.895,20.153-2.91,20.256c-0.507,2.307-2.522,5.967-5.776,5.967h-9.145 c-3.254,0-5.27-3.66-5.767-5.918C7.2,28.874,4.666,13.755,4.305,8.721c-0.098-1.369,0.396-2.71,1.39-3.778 C6.821,3.734,8.413,3.04,10.061,3.04h1.402c0.046,0.577,0.519,1.04,1.108,1.04h2.016c0.619,0,1.125-0.506,1.125-1.125V1.125 C15.714,0.506,15.207,0,14.588,0h-2.016c-0.589,0-1.062,0.463-1.108,1.04h-1.402c-2.202,0-4.326,0.926-5.83,2.541 c-1.376,1.478-2.058,3.354-1.92,5.283c0.366,5.127,2.837,19.869,2.951,20.542c0.665,3.03,3.271,7.539,7.729,7.539h3.572v11.836 c0,7.999,6.507,14.505,14.506,14.505h8.43c7.999,0,14.506-6.507,14.506-14.505v-20.74C57.939,27.547,60.993,24.189,60.993,20.124z M53.006,26.111c-3.302,0-5.987-2.686-5.987-5.987s2.686-5.987,5.987-5.987s5.987,2.686,5.987,5.987S56.307,26.111,53.006,26.111z M53.006,16.732c-1.87,0-3.392,1.521-3.392,3.392s1.521,3.392,3.392,3.392s3.392-1.521,3.392-3.392S54.876,16.732,53.006,16.732z M53.006,21.515c-0.768,0-1.392-0.625-1.392-1.392s0.624-1.392,1.392-1.392s1.392,0.625,1.392,1.392S53.773,21.515,53.006,21.515z"></path> </g></svg>
    </div>
  `,
  className: '',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const Doctor = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useOutletContext<LayoutContext>();
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const [doctorLocations, setDoctorLocations] = useState<
    { name: string; location: { latitude: number; longitude: number } }[]
  >([]);
  const defaultPosition: LatLngExpression = [19.0760, 72.8777]; // Default map center

  useEffect(() => {
    // Fetch all doctor locations from the backend
    const loadDoctorLocations = async () => {
      const locations = await fetchAllDoctorsLocations();
      if (locations) {
        setDoctorLocations(locations);
      }
    };

    loadDoctorLocations();

    // Get user's current location
    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
    };

    const error = (err: GeolocationPositionError) => {
      console.error(err);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header with Sidebar Toggle */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="ml-4 text-lg font-semibold text-gray-900">Doctor</h1>
      </div>

      {/* Map Container */}
      {isSidebarOpen || (
        <MapContainer
          center={defaultPosition}
          zoom={13}
          scrollWheelZoom={false}
          style={{ flex: 1, position: 'relative', zIndex: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render markers for all doctors */}
          {doctorLocations.map((doctor, index) => (
            <Marker
              key={index}
              position={[doctor.location.latitude, doctor.location.longitude] as LatLngExpression}
              icon={doctorLocationIcon}
            >
              <Popup>
                <strong>{doctor.name}</strong>
                <br />
                {/* Button to call the doctor */}
                <button
                  className="bg-purple-600 text-white px-3 py-1 rounded mt-2 hover:bg-purple-700"
                  onClick={() => {
                    if (location) {
                      const userLat = (location as { lat: number; lng: number }).lat;
                      const userLng = (location as { lat: number; lng: number }).lng;
                      const doctorLat = doctor.location.latitude;
                      const doctorLng = doctor.location.longitude;
                      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${doctorLat},${doctorLng}&travelmode=driving`;
                      window.open(googleMapsUrl, '_blank');
                    } else {
                      alert('User location not available');
                    }
                  }}
                >
                  Get Directions
                </button>
              </Popup>
            </Marker>
          ))}

          {/* Render marker for user's current location */}
          {location && (
            <Marker position={location} icon={userLocationIcon}>
              <Popup>Your current location</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default Doctor;
