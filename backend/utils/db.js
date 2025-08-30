import mongoose from "mongoose";


export const connectionDb=async()=>{
    try {
        await mongoose.connect(process.env.db_name,{
            dbName:"tripplaner"
        }).then(()=>{
            console.log("connected");
        })
        
    } catch (error) {
        console.log("db connection eror",error);
    }
}