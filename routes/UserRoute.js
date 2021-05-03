const auth = require("../middlewares/AuthMiddleWare");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/UserModel");
const express = require("express");
const router = express.Router();

router.get("/begin", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/register", async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
  });
});

router.post("/login", async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      const token = user.generateAuthToken();
      res.header("x-auth-token", token).send({
        _id: user._id,
        name: user.name,
      });
    }
  }

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhmYjg0NjEzN2MwMTFmY2MwYjU3YTkiLCJpYXQiOjE2MjAwMzE1NTh9.0UWaK5N1rSygKBf-1SdCNzfGOLcdgtdCK4pnmIyXRao
