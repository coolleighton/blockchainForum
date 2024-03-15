const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.api = asyncHandler(async (req, res, next) => {
  try {
    const allMessages = await Message.find(
      {},
      "author title text posted upVotes downVotes comments"
    )
      .sort({ author: 1 })
      .exec();
    res.json(allMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

exports.question_post = [
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(req.body);
    // Create an object with escaped and trimmed data.
    const forumPost = new Message({
      index: 21,
      author: "test",
      title: req.body.title,
      text: req.body.text,
      posted: "test date",
      upVotes: 0,
      downVotes: 0,
      comments: [{}],
    });

    console.log(forumPost);
    await forumPost.save();
  }),
];
