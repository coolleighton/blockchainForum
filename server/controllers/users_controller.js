const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

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
