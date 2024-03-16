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
  // Validation middleware for title and text
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("text", "Text must not be empty.").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    console.log(req.body);

    const errors = validationResult(req);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 Bad Request status
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create an object with escaped and trimmed data.
      const forumPost = new Message({
        index: 21,
        author: "test",
        title: req.body.title,
        text: req.body.text,
        posted: new Date(),
        upVotes: 0,
        downVotes: 0,
        comments: [{}],
      });

      // Save the forum post
      await forumPost.save();
      console.log("Post created successfully");
      // If the post is saved successfully, return a 201 Created status
      return res.sendStatus(201);
    } catch (err) {
      // If there's an error while saving the post, return a 500 Internal Server Error status
      console.error("Error saving post:", err.message);
      return res.sendStatus(500);
    }
  }),
];
