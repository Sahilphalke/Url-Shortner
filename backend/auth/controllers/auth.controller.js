const authService = require("../services/auth.service");
const { sendSuccess, sendError } = require("../../utils/response");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return sendError(res, {}, "Email and password are required", 400);
    }

    const user = await authService.register(name, email, password);

    return sendSuccess(res, { user }, "User registered successfully", 201);
  } catch (error) {
    return sendError(res, error.message, "Internal Server Error", 500);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, {}, "Email and password are required", 400);
    }

    const data = await authService.login(email, password);

    return sendSuccess(res, data, "Login successful", 200);
  } catch (error) {
    console.log("Login error:", error);
    return sendError(res, error.message, "Invalid credentials", 401);
  }
};

module.exports = {
  register,
  login,
};
