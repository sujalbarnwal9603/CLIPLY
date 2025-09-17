// src/app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import urlRoutes from "./routes/url.routes.js";
import urlAnalyticsRoutes from "./routes/urlAnalytics.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// =============================
// Routes
// =============================

// For creating short URLs (API)
app.use('/api/url', urlRoutes);

// For analytics (API)
app.use("/api/analytics", urlAnalyticsRoutes);

// For redirecting short codes (bit.ly style)
// Example: https://cliply-backend.onrender.com/abc12345
app.use("/", urlRoutes);

export default app;
