const message = require("../models/message");
const asyncHandler = require("express-async-handler");

/*exports.api = asyncHandler(async (req, res, next) => {
  const allMessages = await message
    .find({}, "author text posted upVotes downVotes comments")
    .sort({ author: 1 })
    .populate("author text posted upVotes downVotes comments")
    .exec();

  res.json(allMessages);
})*/
