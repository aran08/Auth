"use client"; // Ensure this is a Client Component

import React, { useState } from 'react';
import { GoogleMap, DrawingManager, Rectangle, useLoadScript } from '@react-google-maps/api';

const MapPage = () => {
  const [rectangleCoords, setRectangleCoords] = useState(null); // State to store rectangle coordinates
  const [isDrawing, setIsDrawing] = useState(true); // State to control drawing mode

  // Load the Google Maps API script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Replace with your Google Maps API key
    libraries: ['drawing'], // Load the drawing library
  });

  // Handle rectangle completion
  const onRectangleComplete = (rectangle) => {
    const bounds = rectangle.getBounds();
    const north = bounds.getNorthEast().lat();
    const east = bounds.getNorthEast().lng();
    const south = bounds.getSouthWest().lat();
    const west = bounds.getSouthWest().lng();

    // Store the rectangle coordinates
    setRectangleCoords({ north, east, south, west });
    setIsDrawing(false); // Disable drawing mode after rectangle is drawn
  };

  // Handle "Select" button click
  const handleSelect = async () => {
    if (!rectangleCoords) {
      alert('Please draw a rectangle on the map first.');
      return;
    }

    try {
      // Call your API to store the coordinates
      const response = await fetch(`http://localhost:8000/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates: rectangleCoords }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Coordinates created successfully:', data);
        alert('Coordinates saved successfully!');
      } else {
        console.error('Failed to create coordinates:', response.statusText);
        alert('Failed to save coordinates.');
      }
    } catch (error) {
      console.error('Error sending coordinates:', error);
      alert('An error occurred while saving coordinates.');
    }
  };

  // Show a loading message while the script is being loaded
  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Draw a Rectangle on the Map</h1>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '500px' }}
        zoom={10}
        center={{ lat: 37.7749, lng: -122.4194 }} // Default center (San Francisco)
      >
        {/* Enable drawing mode */}
        {isDrawing && window.google && window.google.maps && window.google.maps.drawing && (
          <DrawingManager
            drawingMode={window.google.maps.drawing.OverlayType.RECTANGLE}
            onRectangleComplete={onRectangleComplete}
          />
        )}

        {/* Display the drawn rectangle */}
        {rectangleCoords && (
          <Rectangle
            bounds={{
              north: rectangleCoords.north,
              east: rectangleCoords.east,
              south: rectangleCoords.south,
              west: rectangleCoords.west,
            }}
            options={{
              fillColor: '#FF0000',
              fillOpacity: 0.2,
              strokeColor: '#FF0000',
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>

      {/* "Select" button to save coordinates */}
      <button
        onClick={handleSelect}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Select
      </button>
    </div>
  );
};

export default MapPage;