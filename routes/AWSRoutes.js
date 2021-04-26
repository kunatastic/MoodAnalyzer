const express = require("express");
const Router = express.Router();
const fetch = require("node-fetch");

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
