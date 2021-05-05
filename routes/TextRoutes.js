const express = require("express");
const Router = express.Router();
const fetch = require("node-fetch");
const s3 = require("../middlewares/S3");
const { checkAuthenticated } = require("../middlewares/AuthMiddleWare");

Router.get("/", checkAuthenticated, (req, res) => {
  res.render("text.ejs", { name: req.user.name });
});

Router.post("/", checkAuthenticated, async (req, res) => {
  const newData = {
    user_id: req.user._id,
    text: req.body.text,
  };
  params = {
    Bucket: "usent",
    Key: `senti-${Math.floor(Math.random() * 1000)}.txt`,
    Body: req.body.text,
  };
  console.log(params.Key);
  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(`File uploaded successfully. ${data.Location}`);
    }
  });
  res.redirect("/");
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
