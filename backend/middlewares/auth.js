import jwt from "jsonwebtoken"
import { User } from "../models/userSchema.js"


export const userauth=async(req,res,next)=>{
    try {
         const {token}=req.cookies;

         if(!token){
              return res.status(401).json({ message: "Please Login!" });
         }
        const decodedvalue = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decodedvalue;
        const user = await User.findById(id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
         req.user = user; 
        next(); 
    } catch (error) {
       res.status(401).json({ message: "Authentication failed: " + error.message }); 
    }
}


export const isAdmin=(req,res,next)=>{
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    if(req.user.role!=="admin"){
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
     next();

}
