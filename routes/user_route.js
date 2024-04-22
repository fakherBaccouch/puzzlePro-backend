const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");
const check_auth = require('../middleware/check_auth')
const check_admin = require('../middleware/check_admin')

router.post("/login", user_controller.login);
router.post("/register", user_controller.register);
router.get("/getUserProfile",check_auth, user_controller.getUserProfile);
router.post("/updateUserProfile",check_auth, user_controller.updateUserProfile);


module.exports = router;