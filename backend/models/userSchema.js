import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true   
    },
    email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
  },
   password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 6,
    select: true, // default query me password return na ho
  },
   phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", // signup hamesha "user" hi hoga
  },
  resetPasswordToken: String, // forget password ke liye
  resetPasswordExpire: Date,
},{timestamps:true})


export const User = mongoose.model("User", userSchema);

