const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const FaceDataModel = require("../models/FaceDataModel");
const s3 = require("../middlewares/S3");

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
  res.redirect("/");
});
Router.get("/text", (req, res) => {
  res.render("Text.html");
});
Router.post("/text", async (req, res) => {
  console.log(req.body);
  params = { Bucket: "usent", Key: "heroku.txt", Body: req.body.text };
  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  });
});

Router.get("/analysis", (req, res) => {
  res.render("Analysis.html");
});

module.exports = Router;
