const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const passport = require("passport");

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

exports.users_post = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log("unable to hash");
    }
    try {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await user.save();
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
      return next(err);
    }
  });
});

exports.login_post = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(404).json({ error: "Incorrect password" });
    }

    jwt.sign({ user: user }, "secretkey", (err, token) => {
      res.json({
        token: token,
      });
    });
  } catch (err) {
    return next(err);
  }
};

exports.checkAuth_get = () => {
  verifyToken,
    (req, res) => {
      jwt.verify(req.token, "secretkey", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          res.json({
            message: "Post created...",
            authData,
          });
        }
      });
    };
};

// need to send token from local storage

exports.logout_post = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

exports.profile_get = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json(userProfileDetails);
  } else {
    res.sendStatus(401);
  }
});
