const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models/UserModel");

const initialize = async (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email: email });

    // console.log("HEREREL ", user, email, password);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        // console.log(user);
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    // console.log(user);
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById({ _id: id });
    // console.log(user);
    return done(null, user);
  });
};

module.exports = initialize;
