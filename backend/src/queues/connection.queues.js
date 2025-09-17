import { Redis } from "ioredis";

const connection = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379", {
  maxRetriesPerRequest: null,   // ✅ required for BullMQ
  enableReadyCheck: false,      // ✅ avoid ready check issue
  tls: process.env.REDIS_URL?.startsWith("rediss://") ? {} : undefined, // ✅ Enable TLS only for Upstash
});

connection.on("connect", () => {
  console.log("✅ Redis connected for BullMQ");
});

connection.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

export default connection;
