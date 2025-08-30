import express from "express"
import { userauth } from "../middlewares/auth.js";
import {register,login,logout} from "../controllers/userControl.js"
const router=express.Router();

router.post("/signup",register);
router.post("/login",login);
router.post("/logout",logout);




export default router;