const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  email: { type: String, required: true, minLength: 8, maxLength: 150 },
  username: { type: String, required: true, minLength: 4, maxLength: 150 },
  password: { type: String, required: true, minLength: 8, maxLength: 64 },
  engagement: { type: Array, required: true },
});

// Export model
module.exports = mongoose.model("user", messageSchema);
