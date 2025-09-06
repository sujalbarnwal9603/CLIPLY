import { createShortUrl, redirectUrl } from "../controller/url.controller.js";
import express from "express";

const router=express.Router();

// API endpoint
router.post("/shorten",createShortUrl);

// Redirect endpoint
router.get("/:shortCode",redirectUrl);

export default router;