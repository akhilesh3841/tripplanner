import express from "express";
import { connectionDb } from "./utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors
import userRoutes from "./routes/userRoutes.js"
import tripRoutes from "./routes/tripRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import { v2 as cloudinary } from "cloudinary";


import dotenv from "dotenv";
dotenv.config(); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

// app.use(cors({
//     origin: process.env.FRONTEND_URL, // Frontend ka URL
//     credentials: true,  // Allow cookies to be sent with requests
// }));
connectionDb();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // optional, form-data ke liye




app.get("/", (req, res) => {
  res.send("hello site");
});

app.use("/",userRoutes);
app.use("/",tripRoutes);
app.use("/",bookingRoutes)




app.listen(3000, () => {
  console.log("Server running on 3000");
});
