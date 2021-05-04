const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middlewares/AuthMiddleWare");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/UserModel");
const express = require("express");
const router = express.Router();
const passport = require("passport");

const initializePassport = require("../middlewares/passport-config");
initializePassport(passport);

router.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});
router.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});
router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);
router.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    validate(req.body);
  } catch (err) {
    return res.status(400).send(error.details[0].message);
  }
  console.log(req.body);
  //find an existing user
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.redirect("/auth/login");
  } catch {
    res.redirect("/auth/register");
  }
});

router.delete("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect("/auth/login");
});

module.exports = router;
