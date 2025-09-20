import express from "express";
import cors from "cors";
import urlRoutes from "./routes/url.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", urlRoutes);

export default app;
