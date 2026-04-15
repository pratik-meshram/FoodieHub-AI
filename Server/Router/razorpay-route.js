const express = require("express");
const { createOrder , fetchOrder} = require("../Controllers/payment-Controller");
// const { UserDataCreate } = require("../Controllers/orderController");

const router = express.Router();

router.post("/create", createOrder);
router.get("/fetch", fetchOrder);

// router.post("/create", createOrder);


module.exports = router;
