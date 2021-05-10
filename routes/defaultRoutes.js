const express = require("express");
const { main } = require("../Algo");
const Router = express.Router();
const { checkAuthenticated } = require("../middlewares/AuthMiddleWare");
const { Face } = require("../models/FaceDataModel");
const { Text } = require("../models/TextDataModel");

Router.get("/", checkAuthenticated, (req, res) => {
  // console.log(req);
  res.render("welcome.ejs", { name: req.user.name });
});

Router.get("/analysis", checkAuthenticated, async (req, res) => {
  res.render("analysis.ejs");
});
Router.get("/analysis/raw", checkAuthenticated, async (req, res) => {
  const FaceSentiments = await Face.find({ user_id: req.user._id });
  const TextSentiments = await Text.find({ user_id: req.user._id });
  const data = main(FaceSentiments, TextSentiments);
  // const allSentiments = { FaceSentiments, TextSentiments };
  console.log(data);
  // res.json(allSentiments);
});

module.exports = Router;
