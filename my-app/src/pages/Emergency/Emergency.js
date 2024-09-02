import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Send } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Emergency.css';

// Custom marker icon
const customMarkerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const Emergency = () => {
  const [isLocationSent, setIsLocationSent] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleSendLocation = async () => {
    if (!phoneNumber || !latitude || !longitude) {
      alert('Please provide a valid phone number and location.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9099/api/location/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lat: latitude,
          lng: longitude,
          phoneNumbers: [phoneNumber]
        })
      });

      if (response.ok) {
        setIsLocationSent(true);
        setTimeout(() => setIsLocationSent(false), 3000);
      } else {
        console.error('Failed to send location:', response.statusText);
        alert('Failed to send location. Please try again.');
      }
    } catch (error) {
      console.error('Error sending location:', error.message);
      alert('An error occurred while sending location.');
    }
  };

  const handleGetLocation = useCallback(() => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log(`Latitude: ${lat}, Longitude: ${lng}`);
          setLatitude(lat);
          setLongitude(lng);
          await getUserAddress(lat, lng);
          setIsFetchingLocation(false);
        },
        (error) => {
          console.error('Error fetching location:', error.message);
          setIsFetchingLocation(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const getUserAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=1c6aec7feae546b6a405711e3726997c&q=${lat},${lng}&pretty=1&no_annotations=1`);
      if (!response.ok) {
        console.error('Failed to fetch address:', response.statusText);
        return;
      }
      const data = await response.json();
      const address = data.results[0]?.formatted || 'Address not found';
      setUserAddress(address);
    } catch (error) {
      console.error('Error fetching address:', error.message);
    }
  };

  return (
    <div className="emergency-page">
      <Header />
      <div className="emergency-container">
        <div className="emergency-content">
          <div className="emergency-info">
            <div className="icon-container">
              <MapPin size={48} color="#8b5cf6" />
            </div>
            <h3>Send Your Location</h3>
            <p>Share your current location for immediate assistance.</p>
            <div className="input-container">
              <input 
                type="text" 
                placeholder="Enter Mobile Number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button 
                className="get-location-btn"
                onClick={handleGetLocation}
                disabled={isFetchingLocation}
              >
                {isFetchingLocation ? 'Fetching Location...' : 'Get Current Location'}
              </button>
              {latitude && longitude && (
                <p className="user-address">Address: {userAddress}</p>
              )}
              <button 
                className="send-location-btn"
                onClick={handleSendLocation}
              >
                {isLocationSent ? 'Location Sent!' : 'SEND MY LIVE LOCATION'}
                <Send size={18} className="btn-icon" />
              </button>
            </div>
          </div>
          <div className="emergency-map">
            {latitude && longitude ? (
              <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
                  <Popup>{userAddress}</Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className="map-placeholder">
                <p>Interactive Map Coming Soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Emergency;
