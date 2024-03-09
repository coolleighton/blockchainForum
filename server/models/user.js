const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Export model
module.exports = mongoose.model("user", messageSchema);
