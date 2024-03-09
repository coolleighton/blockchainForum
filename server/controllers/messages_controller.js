const Message = require("../models/message");
const asyncHandler = require("express-async-handler");

exports.api = asyncHandler(async (req, res, next) => {
  try {
    const allMessages = await Message.find(
      {},
      "author text posted upVotes downVotes comments"
    )
      .sort({ author: 1 })
      .exec();
    res.json(allMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
