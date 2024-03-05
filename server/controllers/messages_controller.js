const message = require("../models/message");
const asyncHandler = require("express-async-handler");

exports.api = asyncHandler(async (req, res, next) => {
  const allMessages = await message
    .find({}, "author text posted")
    .sort({ author: 1 })
    .populate("author text posted")
    .exec();

  res.json(allMessages);
});
