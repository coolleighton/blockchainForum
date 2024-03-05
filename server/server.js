require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apiRoute = require("./routes/messages");

// connect to mongoDB
mongoose.set("strictQuery", false);

const mongoDB =
  "mongodb+srv://coolleighton:Mad10411!@cluster0.bhh2j7j.mongodb.net/blockchainForum?retryWrites=true&w=majority";

//process.env.MongoDbUrl; // hidden in .env file

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // requests per minute
  validate: { xForwardedForHeader: false },
});

app.use(limiter); // Apply rate limiter to all requests

app.use("/api/messages", apiRoute);

app.listen(5000, () => {
  console.log("server started on 5000");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
