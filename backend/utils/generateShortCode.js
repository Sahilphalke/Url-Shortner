const crypto = require("crypto");

const generateShortCode = () => {
  return crypto.randomBytes(4).toString("hex");
};

module.exports = generateShortCode;
