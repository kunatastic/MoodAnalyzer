const { checkNotAuthenticated } = require("../middlewares/AuthMiddleWare");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/UserModel");
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
  var newUserInfo = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  };
  try {
    validateUser(newUserInfo);
  } catch (err) {
    return res.status(400).send(error.details[0].message);
  }

  console.log(newUserInfo);
  //find an existing user
  try {
    let user = await User.findOne({ email: newUserInfo.email });
    if (user) return res.status(400).send("User already registered.");

    newUserInfo.password = await bcrypt.hash(newUserInfo.password, 10);
    const newUser = await new User(newUserInfo).save();
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/register");
    // res.send(error);
  }
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/auth/login");
});

module.exports = router;
