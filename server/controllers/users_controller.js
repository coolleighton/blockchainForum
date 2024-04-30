const express = require("express");
var jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const UpvotedPost = require("../models/upvotedPost");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

exports.signup_post = [
  async (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.log("unable to hash");
      }
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(404).json({
          error:
            "This email address is already associated with an account. Try a different email or try to login.",
          isUser: true,
        });
      }
      try {
        const user = new User({
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          engagement: [],
        });
        const result = await user.save();
        res.sendStatus(201);
      } catch (err) {
        res.sendStatus(500);
        return next(err);
      }
    });
  },
];

exports.login_post = [
  async (req, res, next) => {
    console.log("tried loggin in");
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          error:
            "This email address was not found. Try a different email or sign up.",
        });
      }

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(404).json({
          error:
            "This password was incorrect. Try a different password or try to login using your google account.",
        });
      }

      jwt.sign(
        { user: user },
        "secretkey",
        { expiresIn: "5m" },
        (err, token) => {
          res.json({
            token: token,
          });
        }
      );
    } catch (err) {
      return next(err);
    }
  },
];

exports.checkAuth_post = [
  verifyToken,
  (req, res) => {
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
  },
];

// get user data

exports.userData_get = asyncHandler(async (req, res, next) => {
  try {
    const userData = await User.find({}, "email username engagement")
      .sort({ email: 1 })
      .exec();
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// add upvote to user

exports.addUpvote_post = [
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Check if there are validation errors
      // If there are validation errors, return a 400 Bad Request status
      return res.status(400).json({ errors: errors.array() });
    }

    // find message to update
    const userById = await User.findById(req.body.userId);

    // check if there is already a log of the post

    function isIdMatch(array, targetId) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].upvotedPostId === targetId) {
          return true; // Return true if id matches
        }
      }
      return false; // Return false if no match found
    }

    //  if theres a match just update, if no match create new entry

    if (isIdMatch(userById.engagement, req.body.upvotedPostId) === true) {
      console.log("match");

      try {
        // find that logs index so that it can be deleted and add the new one in

        function getIndexById(array, targetId) {
          for (let i = 0; i < array.length; i++) {
            if (array[i].upvotedPostId === targetId) {
              return i; // Return the index if id matches
            }
          }
          return -1; // Return -1 if no match found
        }

        const engagementIndex = getIndexById(
          userById.engagement,
          req.body.upvotedPostId
        );

        userById.engagement.splice(engagementIndex, 1);

        const upvotedPost = new UpvotedPost({
          upvotedPostId: req.body.upvotedPostId,
          userId: req.body.userId,
          upVote: req.body.upVote,
        });

        userById.engagement.push(upvotedPost);

        const updatedUserWithUpvote = await User.findByIdAndUpdate(
          req.body.userId,
          userById,
          {}
        );

        // If the post is saved successfully, return a 201 Created status
        console.log("upvote updated successfully");
        return res.sendStatus(201);
      } catch (err) {
        // If there's an error while saving the post, return a 500 Internal Server Error status
        console.error("Error saving post:", err.message);
        return res.sendStatus(500);
      }
    } else {
      console.log("not a match");
      try {
        // Create a new note of upvoted data

        const upvotedPost = new UpvotedPost({
          upvotedPostId: req.body.upvotedPostId,
          userId: req.body.userId,
          upVote: req.body.upVote,
        });

        // add upvote to to user
        userById.engagement.push(upvotedPost);

        // update the post with comment
        const updatedUserWithUpvote = await User.findByIdAndUpdate(
          req.body.userId,
          userById,
          {}
        );

        // If the post is saved successfully, return a 201 Created status
        console.log("upvote created successfully");
        return res.sendStatus(201);
      } catch (err) {
        // If there's an error while saving the post, return a 500 Internal Server Error status
        console.error("Error saving post:", err.message);
        return res.sendStatus(500);
      }
    }
  }),
];

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
