import mongoose from "mongoose";


export const connectionDb=async()=>{
    try {
        await mongoose.connect("mongodb+srv://sapaky3841_db_user:XlJF9kEcU8ZKBQdy@tripplaner.5ckhxbu.mongodb.net/",{
            dbName:"tripplaner"
        }).then(()=>{
            console.log("connected");
        })
        
    } catch (error) {
        console.log("db connection eror",error);
    }
}