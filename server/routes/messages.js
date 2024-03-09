const express = require("express");
const router = express.Router();
const Message = require("../models/message");

router.get("/", async (req, res) => {
  try {
    const allMessages = await Message.find(
      {},
      "author text posted upVotes downVotes comments"
    )
      .sort({ author: 1 })
      .exec();
    res.json(allMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
