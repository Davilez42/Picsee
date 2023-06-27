const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = (data) => {
  return jwt.sign(data, process.env.KEY_SECRET, { expiresIn: "22h" });
};

module.exports = generateToken