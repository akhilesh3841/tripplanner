import { v2 as cloudinary } from "cloudinary";
import {Trip}from "../models/tripSchema.js"; // adjust path
import { User } from "../models/userSchema.js";

export const addTrip = async (req, res) => {
  try {
    const {
      title,
      destination,
      price,
      startDate,
      endDate,
      seats,
      category,
    } = req.body;

    if (!title || !destination || !price || !startDate || !endDate) {
      return res.status(400).json({ msg: "Required fields missing" });
    }

    // Upload images to Cloudinary
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "trip_images" },
            (error, uploadResult) => {
              if (error) {
                reject(error);
              } else {
                resolve(uploadResult);
              }
            }
          );
          stream.end(file.buffer); // ✅ send buffer to cloudinary
        });

        imageUrls.push(result.secure_url);
      }
    }

    // Trip create
    const newTrip = new Trip({
      title,
      destination,
      price,
      startDate,
      endDate,
      seats,
      category,
      images: imageUrls,
    });

    const savedTrip = await newTrip.save();
    res.json({ msg: "Trip added successfully!", data: savedTrip });
  } catch (error) {
    console.error("Add Trip Error:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};


export const updatetrips=async(req,res)=>{
    try {
        const tripid=req.params.id;
        const trip=await Trip.findById(tripid);

        if(!trip){
            return res.status(404).json({ msg: "Trip not found" });
        }

    Object.keys(req.body).forEach((key) => {
      trip[key] = req.body[key];
    });

    const updatedtrip=await trip.save();
        res.status(200).json({ msg: "Trip updated successfully!", data: updatedtrip });

    } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error: error.message });
    }
}


export const deletetrips=async(req,res)=>{
    try {
        const tripid=req.params.id;
        const trip=Trip.findById(tripid);

        if(!trip){
                 return res.status(404).json({ msg: "Trip not found" }); 
        }

        await Trip.findByIdAndDelete(tripid);
        res.status(200).json({ msg: "Trip deleted successfully!" });

    } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error", error: error.message });
   
    }
}

export const viewalltrips=async(req,res)=>{
    try {
const trips = (await Trip.find()).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    if (!trips.length) {
      return res.status(404).json({ msg: "No trips found" });
    }
    res.status(200).json({ msg: "All trips fetched successfully!", data: trips });

    } catch (error) {
        console.log(error);
       res.status(500).json({ msg: "Server error", error: error.message });
    }   
}



export const allusers = async (req, res) => {
  try {


    const users = await User.find({role:"user"}); // sabhi users nikal liye

    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      data:users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};