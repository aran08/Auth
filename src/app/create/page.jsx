"use client"; // Ensure this is a Client Component

import { sendCoordinates } from "@/mooks/Googlemap";
import React, { useState } from "react";

const Page = () => {
  const [qrCodeImage, setQrCodeImage] = useState("data:image/png;base64,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"); // State to store the QR code image

  const handleFunction = async () => {
    try {
      const response = await sendCoordinates(); // Call the API to create coordinates
      if (response) {
        setQrCodeImage(response.qrCodeImage); // Set the QR code image in state
      }
    } catch (error) {
      console.error("Error creating coordinates:", error);
    }
  };

  return (
    <div className="h-screen bg-green-400 w-full border-4 border-black flex flex-col justify-center items-center">
      <button
        onClick={handleFunction}
        className="px-4 bg-white rounded-md py-2 font-semibold mb-4"
      >
        Create QR Code
      </button>

      {/* Display the QR code if it exists */}
      {qrCodeImage && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Generated QR Code:</h2>
          <img
            src={qrCodeImage}
            alt="QR Code"
            className="w-48 h-48 border-2 border-black"
          />
        </div>
      )}
    </div>
  );
};

export default Page;