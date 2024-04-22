const express = require("express");
const router = express.Router();
const order_controller = require("../controllers/order_controller");
const check_auth = require('../middleware/check_auth')
const check_admin = require('../middleware/check_admin')




router.post("/addOrder",check_auth,order_controller.addOrder);






module.exports = router;