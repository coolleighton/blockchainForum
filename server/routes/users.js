const express = require("express");
const router = express.Router();

const users_controller = require("../controllers/users_controller");

router.post("/", users_controller.users_post);

router.post("/login", users_controller.login_post);

router.post("/logout", users_controller.logout_post);

router.post("/checkAuth", users_controller.checkAuth_get);

router.post("/profile", users_controller.profile_get);

module.exports = router;
