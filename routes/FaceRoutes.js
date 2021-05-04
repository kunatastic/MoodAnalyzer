const express = require("express");
const Router = express.Router();
const { Face, validateFace } = require("../models/FaceDataModel");
const { checkAuthenticated } = require("../middlewares/AuthMiddleWare");

Router.get("/", checkAuthenticated, (req, res) => {
  res.render("Face.ejs", { name: req.user.name });
});

Router.post("/", checkAuthenticated, async (req, res) => {
  var face = req.body;
  face.user_id = req.user._id;
  try {
    validateFace(req.face);
  } catch (err) {
    return res.status(400).send(error.details[0].message);
  }
  const instance = new Face(face);
  const newSentiments = await instance.save();
  if (newSentiments) {
    res.redirect("/");
  }
});

Router.get("/raw", checkAuthenticated, async (req, res) => {
  const allSentiments = await Face.find({ user_id: req.user._id });
  // console.log(allSentiments);
  res.json(allSentiments);
});

module.exports = Router;
