// Dependenices
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

// Configurations
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  app.use(morgan("common"));
}

// Customs Dependencies
const defaultRoutes = require("./routes/defaultRoutes");
const TextRoutes = require("./routes/TextRoutes");
const FaceRoutes = require("./routes/FaceRoutes");
const UserRoutes = require("./routes/UserRoute");

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
var conn = mongoose.connection;
conn.on("connected", () => console.log("DB connected!!"));
conn.on("disconnected", () =>
  console.log("database is disconnected successfully")
);
conn.on("error", console.error.bind(console, "connection error:"));

// Middlewares
app.use(cors());
app.use(flash());
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("html", ejs.renderFile);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", defaultRoutes);
app.use("/text", TextRoutes);
app.use("/face", FaceRoutes);
app.use("/auth", UserRoutes);

// Listening port
const PORT = process.env.PORT || 5001;
app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Listening at http://localhost:${PORT}`);
});
