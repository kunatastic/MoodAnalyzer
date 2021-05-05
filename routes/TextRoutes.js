const express = require("express");
const Router = express.Router();
const fetch = require("node-fetch");
const s3 = require("../middlewares/S3");
const { checkAuthenticated } = require("../middlewares/AuthMiddleWare");

Router.get("/", checkAuthenticated, (req, res) => {
  res.render("text.html");
});

Router.post("/", async (req, res) => {
  console.log(req.body);
  params = { Bucket: "usent", Key: "heroku.txt", Body: req.body.text };
  // s3.putObject(params, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(`File uploaded successfully. ${data.Location}`);
  //   }
  // });
});

Router.get("/raw", async (req, res) => {
  try {
    const data = await fetch(process.env.AMAZON_URI);
    const values = await data.json();
    res.json(values);
  } catch (e) {
    console.log(e);
  }
});

module.exports = Router;
