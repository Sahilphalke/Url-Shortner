const { Queue } = require("bullmq");
const { redisConnection } = require("../../config/redis");

const analyticsQueue = new Queue("analytics-queue", {
  connection: redisConnection,
});

const addAnalyticsJob = async (data) => {
  await analyticsQueue.add("process-click", data, {
    removeOnComplete: true,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });
};

module.exports = { analyticsQueue, addAnalyticsJob };
