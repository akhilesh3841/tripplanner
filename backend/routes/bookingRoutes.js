import express from "express";
import {createBooking,getuserbooking,cancelBooking} from "../controllers/booking.js";
import { userauth } from "../middlewares/auth.js";
const router = express.Router();

// POST /api/bookings/create
router.post("/book/:tripid", userauth,createBooking);
router.get("/mybookings",userauth,getuserbooking);

router.put("/cancel/:bookingId",userauth,cancelBooking);

export default router;
