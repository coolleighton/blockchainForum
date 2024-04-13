const express = require("express");
var jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup_post = [
  async (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log("unable to hash");
      }
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(404).json({
          error:
            "This email address is already associated with an account. Try a different email or try to login.",
          isUser: true,
        });
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
  },
];

exports.login_post = [
  async (req, res, next) => {
    console.log("tried loggin in");
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          error:
            "This email address was not found. Try a different email or sign up.",
        });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(404).json({
          error:
            "This password was incorrect. Try a different password or try to login using your google account.",
        });
      }

      jwt.sign(
        { user: user },
        "secretkey",
        { expiresIn: "5m" },
        (err, token) => {
          res.json({
            token: token,
          });
        }
      );
    } catch (err) {
      return next(err);
    }
  },
];

exports.checkAuth_post = [
  verifyToken,
  (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: "logged in...",
          authData,
        });
      }
    });
  },
];

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
