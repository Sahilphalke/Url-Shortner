const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const { 
    createShortUrl, 
    getUserUrls, 
    clearUserUrls, 
    getStats,
    redirectUrl
} = require("../controllers/url.controller");

// Public redirection route
router.get("/r/:code", redirectUrl);

// Protected routes
router.post("/create", authMiddleware, createShortUrl);
router.get("/list", authMiddleware, getUserUrls);
router.delete("/clear", authMiddleware, clearUserUrls);
router.get("/stats", authMiddleware, getStats);

module.exports = router;
