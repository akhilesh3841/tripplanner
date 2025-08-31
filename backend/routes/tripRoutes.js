import express from "express"
import {isAdmin,userauth} from "../middlewares/auth.js"
import {addtrip,updatetrips,deletetrips,viewalltrips} from "../controllers/trip.js"

const router=express.Router();

router.post("/addtrip",userauth,isAdmin,addtrip)
router.patch("/updatetrip/:id",userauth,isAdmin,updatetrips)
router.delete("/delete/:id",userauth,isAdmin,deletetrips);
router.get("/alltrips",viewalltrips)

export default router;