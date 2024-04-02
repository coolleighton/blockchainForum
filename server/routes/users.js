const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const users_controller = require("../controllers/users_controller");

router.post("/", users_controller.users_post);

router.post("/logout", users_controller.logout_post);

router.post("/profile", users_controller.profile_get);

router.post("/login", async (req, res, next) => {
  console.log("tried loggin in");
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
});

router.post("/checkAuth", verifyToken, (req, res) => {
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
});

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

module.exports = router;
