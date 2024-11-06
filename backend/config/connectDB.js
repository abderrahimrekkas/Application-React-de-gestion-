import mongoose from "mongoose";

export const connectDB=async ()=> {
    try{
        const dbConnect=await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected:", dbConnect.connection.host);
    }catch(error){
        console.log("Error occured in connecting db:", error.message);
        process.exit(1);
    }
}