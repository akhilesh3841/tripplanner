import { Booking } from "../models/bookingSchema.js";
import { Trip } from "../models/tripSchema.js";
import  {Payment} from "../models/paymentSchema.js"
export const createBooking = async (req, res) => {
  try {
    const { travelersCount, travelDate, paymentId } = req.body;
    const { tripid } = req.params;
    const userid = req.user._id;

    // 1. Trip check karo
    const trip = await Trip.findById(tripid);
    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    // 2. Check available seats
    if (travelersCount > trip.seats) {
      return res.status(400).json({ msg: "Not enough seats available" });
    }

    // 3. Booking create karo
    const booking = new Booking({
      userid,
      tripid,
      travelersCount,
      travelDate,
      payment: paymentId || null,
      status: paymentId ? "Confirmed" : "Pending",
    });

    await booking.save();

    // 4. Reduce trip seats
    trip.seats -= travelersCount;
    await trip.save();

    res.status(201).json({
      success: true,
      msg: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};




export const getuserbooking =async(req,res)=>{
    try {
        const user=req.user._id

         const bookings = await Booking.find({ userid:user})
        .populate("tripid", "title destination price startDate endDate") // trip details populate
      .populate("payment", "amount status method"); // agar payment linked ho


         if (!bookings || bookings.length === 0) {
      return res.status(404).json({ msg: "No bookings found" });
    }


        res.status(200).json({
      success: true,
      count: bookings.length,
      data:bookings,
    });
    } catch (error) {
        console.error("Get Bookings Error:", error);
         res.status(500).json({ msg: "Server error", error: error.message });
    }
}


export const cancelBooking = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({ msg: "Booking ID missing in params" });
    }

    const booking = await Booking.findOne({ _id: bookingId, userid: userId });

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found for this user" });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({ msg: "Booking already cancelled" });
    }

    // ✅ Payment check optional
    if (booking.status === "Confirmed") {
      booking.status = "Cancelled";
      await booking.save();
    } else {
      booking.status = "Cancelled";
      await booking.save();
    }

    // Increase trip seats back
    const trip = await Trip.findById(booking.tripid);
    trip.seats += booking.travelersCount;
    await trip.save();

    res.status(200).json({ success: true, msg: "Booking cancelled", booking });
  } catch (error) {
    console.error("Cancel Booking Error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
