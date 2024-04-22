const express = require("express");
const router = express.Router();
const cart_controller = require("../controllers/cart_controller");
const check_auth = require('../middleware/check_auth')
const check_admin = require('../middleware/check_admin')







router.post("/addItemToCart",check_auth,cart_controller.addItemToCart);
router.get("/getUserCart",check_auth,cart_controller.getUserCart);
router.post("/deleteCartItem",check_auth,cart_controller.deleteCartItem);
router.post("/updateItemQ",check_auth,cart_controller.updateItemQ);


module.exports = router;