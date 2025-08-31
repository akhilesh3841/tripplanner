import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // kisne booking ki hai
    required: true,
  },
  tripid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip", // kaunse trip ki booking hai
    required: true,
  },
  travelersCount: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  travelDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment", // payment schema se link
  },
});

export const Booking = mongoose.model("Booking", bookingSchema);
