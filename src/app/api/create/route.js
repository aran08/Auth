// src/app/api/create/route.js
import connectDB from "@/lib/Db";
import Coordinate from '@/model/cordinates'; // Adjust the path as necessary
import QRCode from 'qrcode';

export async function POST(request) {
  try {
    const { coordinates } = await request.json();

    // Validate the input
    if (!coordinates || !coordinates.north || !coordinates.east || !coordinates.south || !coordinates.west) {
      return new Response(JSON.stringify({ message: 'All coordinates (north, east, south, west) are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Connect to the database
    await connectDB();

    // Create a URL with the coordinates as query parameters
    const url = `http://localhost:8000/googlemap?north=${coordinates.north}&east=${coordinates.east}&south=${coordinates.south}&west=${coordinates.west}`;

    // Generate QR code for the URL
    const qrCodeImage = await QRCode.toDataURL(url);

    // Create a new coordinate document with QR code
    const newCoordinate = new Coordinate({
      coordinates: {
        north: coordinates.north,
        east: coordinates.east,
        south: coordinates.south,
        west: coordinates.west,
      },
      qrCodeImage, // Store the QR code image in the database
    });

    // Save the document to the database
    const savedCoordinate = await newCoordinate.save();

    // Respond with the saved document
    return new Response(JSON.stringify(savedCoordinate), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating coordinate:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}