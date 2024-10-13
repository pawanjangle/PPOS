const express = require("express");
const router = express.Router();
const {createproduct, getproducts, updateProduct, deleteProduct} = require("../Controllers/product");
const { createOrder } = require("../Controllers/order");
router.post("/create-product", createproduct);
router.get("/get-products", getproducts);
router.post("/update-product", updateProduct);
router.delete("/delete-product/:id", deleteProduct);
router.post("/create-order", createOrder);

module.exports = router;
