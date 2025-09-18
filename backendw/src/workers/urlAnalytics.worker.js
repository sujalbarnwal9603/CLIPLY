import { Worker } from "bullmq";
import connection from "../queues/connection.queues.js";
import mongoose from "mongoose";
import UrlAnalytics from "../model/urlAnalytics.model.js"; // <-- your analytics model

// Connect MongoDB (same as in your app entry point)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/CLIPLY";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected in worker"))
.catch((err) => console.error("❌ MongoDB connection error in worker:", err));

// Worker for analytics jobs
const worker = new Worker(
  "url-analytics",
  async (job) => {
    console.log("📊 Processing job:", job.id, job.data);

    // Save analytics data
    await UrlAnalytics.create({
      shortCode: job.data.shortId,
      ip: job.data.ip,
      userAgent: job.data.agent,
      location: job.data.location,
      timestamp: job.data.timestamp,
    });
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err);
});
