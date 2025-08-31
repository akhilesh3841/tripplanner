import { Trip } from "../models/tripSchema.js";

export const addtrip=async(req,res)=>{
    try {        
         const {
  title, destination, description, price, startDate, endDate
} = req.body;

if (!title || !destination || !price || !startDate || !endDate) {
  return res.status(400).json({ msg: "Required fields missing" });
}

const newtrip = new Trip({
  title,
  destination,
  description,
  price,
  startDate,
  endDate
});

const savedtrip = await newtrip.save();
res.json({ msg: "Trip added successfully!", data: savedtrip });

    } catch (error) {
            res.status(500).json({ msg: "Server error",error});
            console.log(error)
    }
}


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
