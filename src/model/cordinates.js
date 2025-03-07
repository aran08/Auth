const mongoose = require("mongoose");

const coordinateSchema = new mongoose.Schema(
  {
    coordinates: {
      north: { type: Number, required: true },
      east: { type: Number, required: true },
      south: { type: Number, required: true },
      west: { type: Number, required: true },
    },
    qrCodeImage: { type: String }, // Store the QR code image as a Base64 string
  },
  {
    timestamps: true,
  }
);

const Coordinate =
  mongoose.models.Coordinate || mongoose.model("Coordinate", coordinateSchema);

module.exports = Coordinate;