require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./auth/routes/auth.route");
const urlRoutes = require("./url/routes/url.route");
const userRoutes = require("./user/routes/user.route");

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const API_VERSION = process.env.API_VERSION || "/api/v1";

// Middlewares
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "URL Shortener API Running Successfully",
  });
});

// Routes
app.use(`${API_VERSION}/auth`, authRoutes);
app.use(`${API_VERSION}/url`, urlRoutes);

// 404 Handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
