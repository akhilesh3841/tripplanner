import express from "express";
import { connectionDb } from "./utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors
import userRoutes from "./routes/userRoutes.js"

import dotenv from "dotenv";
dotenv.config(); 



const app = express();

// app.use(cors({
//     origin: process.env.FRONTEND_URL, // Frontend ka URL
//     credentials: true,  // Allow cookies to be sent with requests
// }));
connectionDb();


app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("hello site");
});

app.use("/",userRoutes);




app.listen(3000, () => {
  console.log("Server running on 3000");
});
