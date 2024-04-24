const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const upvotedPostSchema = new Schema({
  upvotedPostId: { type: String, required: true },
  userId: { type: String, required: true },
  upVote: { type: Number, required: true },
});

// Export model
module.exports = mongoose.model("upvotedPost", upvotedPostSchema);
