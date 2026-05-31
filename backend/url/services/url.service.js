const urlModel = require("../models/url.model");
const generateShortCode = require("../../utils/generateShortCode.js");

const createShortUrl = async (data) => {
  let { originalUrl, userId, customAlias, expiresAt } = data;
  let shortCode;

  if (customAlias) {
    const existing = await urlModel.findByShortCode(customAlias);
    if (existing) {
      throw new Error("Custom alias already in use");
    }
    shortCode = customAlias;
  } else {
    let existingUrl;
    do {
      shortCode = generateShortCode();
      existingUrl = await urlModel.findByShortCode(shortCode);
    } while (existingUrl);
  }

  return await urlModel.createShortUrl({
    originalUrl,
    shortCode,
    userId,
    customAlias,
    expiresAt
  });
};

const getUserUrls = async (userId) => {
  return await urlModel.findUserUrls(userId);
};

const clearUserUrls = async (userId) => {
  return await urlModel.deleteUserUrls(userId);
};

const getUrlByCode = async (code) => {
  const url = await urlModel.findByShortCode(code);
  if (url) {
    await urlModel.incrementClickCount(url.id);
  }
  return url;
};

const getStats = async (userId) => {
  return await urlModel.getUserStats(userId);
};

module.exports = { 
  createShortUrl, 
  getUserUrls, 
  clearUserUrls, 
  getUrlByCode,
  getStats
};
