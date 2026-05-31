const { Worker } = require("bullmq");
const { redisConnection } = require("../../config/redis");
const prisma = require("../../config/prisma");

const analyticsWorker = new Worker(
  "analytics-queue",
  async (job) => {
    const { urlId, ipAddress, userAgent, referrer } = job.data;

    try {
      // Use a transaction to ensure both operations succeed
      await prisma.$transaction([
        // 1. Increment click count
        prisma.url.update({
          where: { id: urlId },
          data: { clickCount: { increment: 1 } },
        }),
        // 2. Create click event record
        prisma.clickEvent.create({
          data: {
            urlId,
            ipAddress,
            userAgent,
            referrer,
          },
        }),
      ]);
      console.log(`[Worker] Processed analytics for URL ID: ${urlId}`);
    } catch (error) {
      console.error(`[Worker] Failed to process analytics for URL ID: ${urlId}`, error);
      throw error; // Let BullMQ handle the retry
    }
  },
  { connection: redisConnection }
);

analyticsWorker.on("completed", (job) => {
  console.log(`[Worker] Job ${job.id} completed`);
});

analyticsWorker.on("failed", (job, err) => {
  console.log(`[Worker] Job ${job.id} failed: ${err.message}`);
});

module.exports = analyticsWorker;
