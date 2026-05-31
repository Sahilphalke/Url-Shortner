const { sendSuccess, sendError } = require("../../utils/response");
const urlService = require("../services/url.service");

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const userId = req.user.id;

    if (!originalUrl) {
      return sendError(res, null, "Original URL is required", 400);
    }

    const shortUrl = await urlService.createShortUrl({
      originalUrl,
      userId,
      customAlias,
      expiresAt
    });

    return sendSuccess(
      res,
      shortUrl,
      "Short URL created successfully",
      201,
    );
  } catch (error) {
    return sendError(res, error.message, "Internal Server Error", 500);
  }
};

const getUserUrls = async (req, res) => {
  try {
    const userId = req.user.id;
    const urls = await urlService.getUserUrls(userId);
    return sendSuccess(res, urls, "User URLs retrieved successfully");
  } catch (error) {
    return sendError(res, error.message, "Internal Server Error", 500);
  }
};

const clearUserUrls = async (req, res) => {
  try {
    const userId = req.user.id;
    await urlService.clearUserUrls(userId);
    return sendSuccess(res, null, "All URLs cleared successfully");
  } catch (error) {
    return sendError(res, error.message, "Internal Server Error", 500);
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await urlService.getStats(userId);
    return sendSuccess(res, stats, "Stats retrieved successfully");
  } catch (error) {
    return sendError(res, error.message, "Internal Server Error", 500);
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const url = await urlService.getUrlByCode(code);

    if (!url) {
      return res.status(404).send("URL not found or expired");
    }

    // Check expiration
    if (url.expiresAt && new Date(url.expiresAt) < new Date()) {
        return res.status(410).send("URL has expired");
    }

    // Disable caching for the redirect to ensure every click hits the server
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    return res.redirect(url.originalUrl);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { 
    createShortUrl, 
    getUserUrls, 
    clearUserUrls, 
    getStats, 
    redirectUrl 
};
