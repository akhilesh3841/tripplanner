import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  title: { type: String, required: true },           // Trip name
  destination: { type: String, required: true },     // Location
  price: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  seats: { type: Number, default: 20 },             // Default available seats
  category: { type: String, default: "Adventure" }, // Default category
  duration: { type: String, default: "3 Days / 2 Nights" },
  images: {
    type: [String],
    default: [
      "https://images.unsplash.com/photo-1609943244180-4dca0c2e1c2b",
      "https://images.unsplash.com/photo-1549887534-4b7b1c2e1a72"
    ]
  },
  itinerary: {
    type: [String],
    default: [
      "Day 1: Arrival and check-in",
      "Day 2: Adventure activities / sightseeing",
      "Day 3: Checkout and departure"
    ]
  },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  createdAt: { type: Date, default: Date.now }
});

export const Trip = mongoose.model("Trip", tripSchema);
