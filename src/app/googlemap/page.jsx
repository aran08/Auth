"use client"; // Ensure this is a Client Component

import { GoogleMap, Rectangle, useLoadScript } from '@react-google-maps/api';
import { useSearchParams } from 'next/navigation';

const MapPage = () => {
  const searchParams = useSearchParams(); // Hook to access query parameters

  // Extract coordinates from the URL query parameters
  const north = parseFloat(searchParams.get('north'));
  const east = parseFloat(searchParams.get('east'));
  const south = parseFloat(searchParams.get('south'));
  const west = parseFloat(searchParams.get('west'));

  // Convert query parameters to numbers
  const coordinates = {
    north,
    east,
    south,
    west,
  };

  // Load the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your Google Maps API key
  });

  // Show a loading message while the script is being loaded
  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Map View</h1>
      {coordinates.north && coordinates.east && coordinates.south && coordinates.west ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '500px' }}
          zoom={15}
          center={{
            lat: (coordinates.north + coordinates.south) / 2,
            lng: (coordinates.east + coordinates.west) / 2,
          }}
        >
          <Rectangle
            bounds={{
              north: coordinates.north,
              east: coordinates.east,
              south: coordinates.south,
              west: coordinates.west,
            }}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.2,
              strokeColor: '#FF0000',
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      ) : (
        <p>No coordinates provided.</p>
      )}
    </div>
  );
};

export default MapPage;