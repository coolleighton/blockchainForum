const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  index: { type: Number, required: true },
  author: { type: String, required: true, maxLength: 50 },
  text: { type: String, required: true, maxLength: 500 },
  posted: { type: String, required: true },
});

// Export model
module.exports = mongoose.model("message", messageSchema);
