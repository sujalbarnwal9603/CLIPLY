// src/routes/url.routes.js
import express from "express";
import { createShortUrl, redirectUrl } from "../controller/url.controller.js";
const router = express.Router();
console.log("✅ url.routes.js loaded");
router.get("/test", (req, res) => res.json({ ok: true }));




// =========================
// API to create short URL
// =========================
router.post("/shorten", createShortUrl);

// =========================
// Redirect + Analytics
// Example: http://localhost:8000/abc123
// =========================
router.get("/:shortCode", redirectUrl);

export default router;
