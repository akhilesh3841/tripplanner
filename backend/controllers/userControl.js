import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt";
dotenv.config();

export const register=async(req,res)=>{
    try {
        const {name,email,password,phone}=req.body;

         if (!name || !email || !password || !phone)
            return res.status(400).json({ msg: "All fields required" }
          );

          const hashedpassword=await bcrypt.hash(password,10);

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({  message: "Email already exists." });
    }


        const user=new User({
            name,
            email,
            password:hashedpassword,
            phone,
        })
        const saveduser=await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

     res.cookie("token", token, {
      httpOnly: true,
      secure: false, // local testing ke liye
      sameSite: "lax",
      expires: new Date(Date.now() + 8 * 3600000),
    });

         res.status(201).json({
            data:saveduser
        });

    } catch (error) {
          res.status(404).json({
            message:error.message,
        })
        console.log(error);   
    }
}


export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }


    const user = await User.findOne({email});
     if(!user) return res.status(404).json({msg:"User not found"});

    
    const matchedpass=await bcrypt.compare(password,user.password);

    if (!matchedpass) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // local testing ke liye
      sameSite: "lax",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      message: "Login successful.",
      data: user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};



export const logout=async(req,res)=>{
    try {
    res.cookie("token","", {
      expires:new Date(0), 
      httpOnly: true,
      secure: false, // local testing ke liye
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });

    } catch (error) {
          res.status(500).json({ message: error.message });  
    }
}

