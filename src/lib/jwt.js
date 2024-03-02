const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET_KEY;
const generateToken = (users) => {
  return jwt.sign(
    {
      id: users.id,
      username: users.username,
    },
    secret,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, verifyToken };
