const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  Comment: { type: String, required: true },
  user: { type: String, required: true },
  posted: { type: String, required: true },
  upVotes: { type: Number, required: true },
});

// Export model
module.exports = mongoose.model("comment", commentSchema);
