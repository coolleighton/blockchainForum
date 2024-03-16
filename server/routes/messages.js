const express = require("express");
const router = express.Router();
const messages_controller = require("../controllers/messages_controller");

router.get("/", messages_controller.api);

router.post("/", messages_controller.question_post);

router.post("/comment", messages_controller.comment_post);

module.exports = router;
