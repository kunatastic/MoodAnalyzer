const express = require("express");
const Router = express.Router();
const { checkAuthenticated } = require("../middlewares/AuthMiddleWare");
const { Face } = require("../models/FaceDataModel");

Router.get("/", checkAuthenticated, (req, res) => {
  // console.log(req);
  res.render("welcome.ejs", { name: req.user.name });
});

Router.get("/analysis", checkAuthenticated, async (req, res) => {
  const allSentiments = await Face.find({ user_id: req.user._id });
  res.render("analysis.ejs", { sentiments: allSentiments });
});

module.exports = Router;
