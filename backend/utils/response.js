const sendSuccess = (res, data = {}, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (
  res,
  error = null,
  message = "Something went wrong",
  statusCode = 500,
) => {
  console.log(error);

  if (error?.code) {
    switch (error.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          message: "Duplicate value already exists",
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Record not found",
        });

      case "P2003":
        return res.status(400).json({
          success: false,
          message: "Foreign key constraint failed",
        });

      default:
        return res.status(500).json({
          success: false,
          message: error.message || message,
        });
    }
  }

  return res.status(statusCode).json({
    success: false,
    message: error?.message || message,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
