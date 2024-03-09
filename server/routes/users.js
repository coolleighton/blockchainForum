const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/sign-up", async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
