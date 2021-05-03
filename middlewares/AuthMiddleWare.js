const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_HIDDEN_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).redirect("/");
  }
};
