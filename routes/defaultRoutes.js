const express = require("express");
const Router = express.Router();
const { checkAuthenticated } = require("../middlewares/AuthMiddleWare");

Router.get("/", checkAuthenticated, (req, res) => {
  res.render("welcome.ejs", { name: req.user.name });
});

Router.get("/analysis", checkAuthenticated, (req, res) => {
  res.render("index.html");
});

module.exports = Router;
