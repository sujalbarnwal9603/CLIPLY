import {Redis} from "ioredis";

const connection = new Redis({
    host:"127.0.0.1", // Redis is running locally
    port:6379,
});

connection.on("connect",()=>{
    console.log("✅ Redis connected for BullMQ");
    
});
connection.on("error", (err)=>{
    console.error("❌ Redis connection error:", err);
})

export default connection;