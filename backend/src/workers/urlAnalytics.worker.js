import { Worker } from "bullmq";
import connection from "../queues/connection.queues.js";

// This worker processes jobs from the "url-analytics" queue
const worker=new Worker(
    "url-analytics",
    async(job)=>{
        console.log("📊 Processing job:", job.id, job.data);

    // Example: save analytics data to DB later
    // e.g., { ip, userAgent, location }
    },
    { connection }
)

worker.on("completed",(job)=>{
    console.log(`✅ Job ${job.id} completed`);
})

worker.on("failed",(job,err)=>{
    console.error(`❌ Job ${job.id} failed:`, err);
})