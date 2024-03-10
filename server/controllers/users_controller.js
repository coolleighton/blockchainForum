const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.users_post = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.redirect("/login");
  } catch (err) {
    return next(err);
  }
});
