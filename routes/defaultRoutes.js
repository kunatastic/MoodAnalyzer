const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const FaceDataModel = require("../models/FaceDataModel");

Router.get("/", (req, res) => {
  res.render("index.html");
});
Router.get("/face", (req, res) => {
  res.render("Face.html");
});
Router.post("/face", async (req, res) => {
  console.log(req.body);
  const instance = await FaceDataModel(req.body);
  const newSentiments = await instance.save();
  console.log(newSentiments);
});
Router.get("/text", (req, res) => {
  res.render("Text.html");
});
Router.get("/analysis", (req, res) => {
  res.render("Analysis.html");
});

module.exports = Router;
