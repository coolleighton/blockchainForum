const express = require("express");
const router = express.Router();

const messages_controller = require("../controllers/messages_controller");

router.get("/", messages_controller.api);

module.exports = router;

/* router.get("/", async (req, res) => {
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
}); */
