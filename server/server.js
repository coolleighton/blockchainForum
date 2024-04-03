require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const apiRoute = require("./routes/messages");
const signupRoute = require("./routes/users");

const User = require("./models/user");

// connect to mongoDB
mongoose.set("strictQuery", false);

const mongoDB =
  "mongodb+srv://coolleighton:Mad10411!@cluster0.bhh2j7j.mongodb.net/blockchainForum?retryWrites=true&w=majority";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// set CORS/Headers
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://blockchainforum.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // requests per minute
  validate: { xForwardedForHeader: false },
});

app.use(limiter); // Apply rate limiter to all requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/messages", apiRoute);
app.use("/auth", signupRoute);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Error handling middleware
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
});

// save the user for easy access
app.use((req, res, next) => {
  userProfileDetails = req.user;
  next();
});

app.listen(5000, () => {
  console.log("server started on 5000");
});

module.exports = app;
