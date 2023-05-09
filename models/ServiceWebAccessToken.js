const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.KEY_SECRET, { expiresIn: "1h" });
};

const validateToken = (req, res, next) => {
  const token = req.query.t_ken || req.headers["auth"];
  console.log("TOKEN EN SERVIDOR",token)
  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, process.env.KEY_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(400);
    } else {
      next();
    }
  });
};

module.exports = {
  generateAccessToken,
  validateToken,
};
