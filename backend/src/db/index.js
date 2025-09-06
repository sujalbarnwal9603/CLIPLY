import mongoose from "mongoose";
import DB_NAME from "../constant.js"

const connectDB=async()=>{
    try{
        const instanceConnection=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Connected to MongoDB: ${instanceConnection.connection.host}`);
        
    } catch(error){
        console.log("Error while connecting to MongoDB",error);
        process.exit(1);
        
    }
}

export default connectDB;