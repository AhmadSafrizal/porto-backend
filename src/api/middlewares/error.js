const CustomAPIError = require("./custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        console.log("error: ", err);
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.log(err);
    return res.status(500).json("Internal Server Error");
};

const handleError = (res, error) => {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: `Error: ${error.message}`,
    });
};

module.exports = {errorHandlerMiddleware, handleError};