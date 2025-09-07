import UrlAnalytics from "../model/urlAnalytics.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// Daily clicks for a shortCode
const getDailyClicks = AsyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const stats = await UrlAnalytics.aggregate([
    { $match: { shortCode } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        clicks: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return res.json(new ApiResponse(200, "Daily clicks", stats));
});

// Top countries for a shortCode
const getTopCountries = AsyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const stats = await UrlAnalytics.aggregate([
    { $match: { shortCode } },
    {
      $group: {
        _id: "$location.country",
        clicks: { $sum: 1 }
      }
    },
    { $sort: { clicks: -1 } },
    { $limit: 5 }
  ]);

  return res.json(new ApiResponse(200, "Top countries", stats));
});

export { getDailyClicks, getTopCountries };
