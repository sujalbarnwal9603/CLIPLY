import { nanoid } from "nanoid";
import QRCode from "qrcode";
import Url from "../model/url.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcryptjs";

// 🔹 Use your queue
import { urlAnalyticssQueue } from "../queues/urlAnalytics.queue.js";
import useragent from "useragent";
import geoip from "geoip-lite";

// =============================
// Create Short URL
// =============================
const createShortUrl = AsyncHandler(async (req, res) => {
  const { longUrl, expiry, password } = req.body;
  console.log(req.params);
  console.log(req.body);

  if (!longUrl) {
    throw new ApiError(400, "Long URL is required");
  }

  const shortCode = nanoid(8);

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  await Url.create({
    shortCode,
    longUrl,
    expiry,
    password: hashedPassword,
  });

  const qrcode = await QRCode.toDataURL(
    `${process.env.BASE_URL}/${shortCode}`
  );

  return res.status(201).json(
    new ApiResponse(201, "Short URL created successfully", {
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      qrcode,
    })
  );
});

// =============================
// Redirect + Track Analytics
// =============================
const redirectUrl = AsyncHandler(async (req, res) => {
  const { shortCode } = req.params;
  console.log(req.params);
  console.log(req.body);

  const url = await Url.findOne({ shortCode });
  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  // Expiry check
  if (url.expiry && url.expiry < new Date()) {
    throw new ApiError(410, "URL has expired");
  }

  url.clicks += 1;
  await url.save();

  // 🔹 Collect analytics
  const ip = req.ip;
  const agent = useragent.parse(req.headers["user-agent"]);
  const location = geoip.lookup(ip);

  // 🔹 Push analytics to queue
  await urlAnalyticssQueue.add("track-click", {
    shortCode,
    ip,
    agent: agent.toString(),
    location,
    timestamp: new Date(),
  });

  return res.redirect(url.longUrl);
});

export { createShortUrl, redirectUrl };
