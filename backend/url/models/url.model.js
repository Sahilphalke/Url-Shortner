const prisma = require("../../config/prisma.js");

const createShortUrl = async (data) => {
  const { originalUrl, shortCode, userId, customAlias, expiresAt } = data;
  return await prisma.url.create({
    data: {
      originalUrl,
      shortCode,
      userId,
      customAlias,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  });
};

const findByShortCode = async (shortCode) => {
  return await prisma.url.findFirst({
    where: {
      OR: [
        { shortCode: shortCode },
        { customAlias: shortCode }
      ],
      isActive: true,
    },
  });
};

const findUserUrls = async (userId) => {
  return await prisma.url.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const deleteUserUrls = async (userId) => {
  return await prisma.url.deleteMany({
    where: { userId },
  });
};

const incrementClickCount = async (urlId) => {
  return await prisma.url.update({
    where: { id: urlId },
    data: { clickCount: { increment: 1 } },
  });
};

const getUserStats = async (userId) => {
  const urls = await prisma.url.findMany({
    where: { userId },
    select: { clickCount: true },
  });

  const totalLinks = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + url.clickCount, 0);
  
  // Basic mock for "Active today" - in a real app, you'd check click_events for today
  const activeToday = urls.filter(u => u.clickCount > 0).length; 

  return { totalLinks, totalClicks, activeToday };
};

module.exports = { 
  createShortUrl, 
  findByShortCode, 
  findUserUrls, 
  deleteUserUrls, 
  incrementClickCount,
  getUserStats
};
