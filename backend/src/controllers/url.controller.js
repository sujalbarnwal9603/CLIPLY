import { nanoid } from "nanoid"; 
import Url from "../model/url.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// @desc    Create a short URL
export const shortenUrl = AsyncHandler(async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    throw new ApiError(400, "Original URL is required");
  }

  // ✅ Generate a short ID of 5 characters
  const shortId = nanoid(5);

  const newUrl = await Url.create({ shortId, originalUrl });

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Short URL created", {
        shortUrl: `${process.env.BASE_URL}/${shortId}`,
        originalUrl: newUrl.originalUrl,
      })
    );
});

// @desc    Redirect to original URL
export const redirectUrl = AsyncHandler(async (req, res) => {
  const { shortId } = req.params;

  const record = await Url.findOne({ shortId });
  if (!record) {
    throw new ApiError(404, "This short URL does not exist"); // ✅ Consistent error handling
  }

  return res.redirect(record.originalUrl);
});
