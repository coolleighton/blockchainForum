const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  author: { type: String, required: true, maxLength: 50 },
  title: { type: String, required: true, maxLength: 500 },
  text: { type: String, required: true, maxLength: 500 },
  posted: { type: String, required: true },
  upVotes: { type: Number, required: true },
  comments: [
    {
      Comment: { type: String },
      user: { type: String },
      posted: { type: String },
      upVotes: { type: Number },
    },
  ],
});

// Export model
module.exports = mongoose.model("message", messageSchema);
