const express = require("express");
const router = express.Router();
const { createOrder, getOrders, deleteOrder } = require("../Controllers/order");

router.post("/create-order", createOrder);
router.get("/get-orders", getOrders);
router.delete("/delete-order/:id", deleteOrder);

module.exports = router;
