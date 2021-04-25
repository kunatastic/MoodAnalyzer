const express = require("express");
const Router = express.Router();
const fetch = require("node-fetch");

Router.get("/raw", async (req, res) => {
  try {
    const data = await fetch(
      "https://o0uz9k85x4.execute-api.us-east-1.amazonaws.com/sentiment-final/"
    );
    const values = await data.json();
    res.json(values);
  } catch (e) {
    console.log(e);
  }
});

module.exports = Router;
