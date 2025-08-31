import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // kisne pay kiya
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking", // kis booking ka payment hai
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  transactionId: {
    type: String,
    required: true,
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);
