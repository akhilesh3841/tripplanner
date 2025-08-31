import express from "express"
import {isAdmin,userauth} from "../middlewares/auth.js"
import {addTrip,updatetrips,deletetrips,viewalltrips,allusers} from "../controllers/trip.js"
import upload from "../middlewares/multer.js";

const router=express.Router();

router.post("/addtrip",userauth,isAdmin,upload.array("images", 5),addTrip)
router.patch("/updatetrip/:id",userauth,isAdmin,updatetrips)
router.delete("/delete/:id",userauth,isAdmin,deletetrips);
router.get("/alltrips",viewalltrips)


router.get("/getall",userauth,isAdmin,allusers)






export default router;