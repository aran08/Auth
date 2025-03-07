// Example function to send coordinates to the backend
export const sendCoordinates = async() => {
    const coordinates = {
      north: 37.7749,
      east: -122.4194,
      south: 37.7748,
      west: -122.4195,
    };
  
    try {
      const response = await fetch(`http://localhost:8000/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Coordinate created successfully:', data);
      } else {
        console.error('Failed to create coordinate:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending coordinates:', error);
    }
  }