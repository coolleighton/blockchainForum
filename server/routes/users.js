const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/users_controller");

router.post("/signup", users_controller.signup_post);

router.post("/login", users_controller.login_post);

router.post("/addUpvote", users_controller.addUpvote_post);

router.post("/checkAuth", users_controller.checkAuth_post);

module.exports = router;
