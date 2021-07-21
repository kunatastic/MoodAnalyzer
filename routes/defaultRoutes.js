const express = require("express");
const Router = express.Router();
const { checkAuthenticated } = require("../middlewares/AuthMiddleWare");
const { Face } = require("../models/FaceDataModel");

Router.get("/", checkAuthenticated, (req, res) => {
  // console.log(req);
  res.render("welcome.ejs", { name: req.user.name });
});

Router.get("/analysis/raw", checkAuthenticated, async (req, res) => {
  const FaceSentiments = await Face.find({ user_id: req.user._id });
  res.json({ FaceSentiments });
});

module.exports = Router;
