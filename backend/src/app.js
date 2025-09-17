import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import urlRoutes from "./routes/url.routes.js"
import urlAnalyticsRoutes from "./routes/urlAnalytics.routes.js";



const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit:'16kb'}));

app.use(express.urlencoded({extended:true, limit:'16kb'})); 

app.use(cookieParser());


app.use('/api/url',urlRoutes);


app.use("/api/analytics", urlAnalyticsRoutes);



export default app;