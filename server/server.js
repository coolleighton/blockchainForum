require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

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

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // requests per minute
  validate: { xForwardedForHeader: false },
});

app.use(limiter); // Apply rate limiter to all requests
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// routes
app.use("/messages", apiRoute);
app.use("/sign-up", signupRoute);

// authentification
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

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

// save the user for easy access
app.use((req, res, next) => {
  userProfileDetails = req.user;
  next();
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/checkAuth", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(userProfileDetails);
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(userProfileDetails);
  } else {
    res.sendStatus(401);
  }
});

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
});

module.exports = app;
