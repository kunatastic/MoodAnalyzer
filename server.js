// Configurations
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Dependenices
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Customs Dependencies
const defaultRoutes = require("./routes/defaultRoutes");
const AWSRoutes = require("./routes/AWSRoutes");

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var conn = mongoose.connection;
conn.on("connected", function () {
  console.log("DB connected!!");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});
conn.on("error", console.error.bind(console, "connection error:"));

// Middlewares
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use("/", defaultRoutes);
app.use("/aws", AWSRoutes);
app.engine("html", ejs.renderFile);
app.use(express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 5001;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at http://localhost:${PORT}`);
});
