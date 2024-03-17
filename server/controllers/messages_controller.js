const Message = require("../models/message");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.api = asyncHandler(async (req, res, next) => {
  try {
    const allMessages = await Message.find(
      {},
      "author title text posted upVotes comments"
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
        author: "test",
        title: req.body.title,
        text: req.body.text,
        posted: new Date(),
        upVotes: 0,
        comments: [],
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

exports.comment_post = [
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // find message to update
    const messageById = await Message.findById(req.body.id);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 Bad Request status
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Create a new comment with escaped and trimmed data.

      const comment = new Comment({
        Comment: req.body.comment,
        user: "test",
        posted: new Date(),
        upVotes: 0,
      });

      //add comment to to message
      messageById.comments.push(comment);

      // update the post with comment
      const updatedPostWithComment = await Message.findByIdAndUpdate(
        req.body.id,
        messageById,
        {}
      );

      // If the post is saved successfully, return a 201 Created status
      console.log("comment created successfully", updatedPostWithComment);
      return res.sendStatus(201);
    } catch (err) {
      // If there's an error while saving the post, return a 500 Internal Server Error status
      console.error("Error saving post:", err.message);
      return res.sendStatus(500);
    }
  }),
];

exports.upVote_post = [
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    console.log(req.body);

    // find message to update
    const messageById = await Message.findById(req.body.id);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 Bad Request status
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // add increase upvotes
      messageById.upVotes = req.body.amount + 1;

      console.log(messageById);

      // update the post with comment
      const updatedPostWithComment = await Message.findByIdAndUpdate(
        req.body.id,
        messageById,
        {}
      );

      // If the post is saved successfully, return a 201 Created status
      console.log("up vote added successfully", updatedPostWithComment);
      return res.sendStatus(201);
    } catch (err) {
      // If there's an error while saving the post, return a 500 Internal Server Error status
      console.error("Error updating upvotes:", err.message);
      return res.sendStatus(500);
    }
  }),
];

exports.commentUpVote_post = [
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // find message to update
    const messageById = await Message.findById(req.body.postId);

    // find comment within message to update
    const commentById = messageById.comments.find(
      (obj) => obj.id === req.body.commentId
    );

    // find the index of that object
    const commentIndexById = messageById.comments.findIndex(
      (obj) => obj.id === req.body.commentId
    );

    // console.log(commentById);
    // console.group(commentIndexById);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 Bad Request status
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // add increase upvotes

      commentById.upVotes = req.body.amount + 1;

      console.log(messageById.comments[commentIndexById]);

      console.log(messageById);

      // update the post with the updated comment
      const updatedPostWithComment = await Message.findByIdAndUpdate(
        req.body.postId,
        messageById,
        {}
      );

      console.log(updatedPostWithComment);

      // If the post is saved successfully, return a 201 Created status
      console.log("up vote added successfully", updatedPostWithComment);
      return res.sendStatus(201);
    } catch (err) {
      // If there's an error while saving the post, return a 500 Internal Server Error status
      console.error("Error updating upvotes:", err.message);
      return res.sendStatus(500);
    }
  }),
];
