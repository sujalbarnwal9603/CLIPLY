import express from "express";
import { getDailyClicks, getTopCountries } from "../controller/urlAnalytics.controller.js";

const router = express.Router();

router.get("/:shortCode/daily", getDailyClicks);
router.get("/:shortCode/countries", getTopCountries);

export default router;
