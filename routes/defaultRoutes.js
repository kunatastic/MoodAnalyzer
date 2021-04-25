const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.render("index.html");
});
Router.get("/face", (req, res) => {
  res.render("Face.html");
});
Router.get("/text", (req, res) => {
  res.render("Text.html");
});

module.exports = Router;
