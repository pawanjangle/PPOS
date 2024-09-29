const express = require("express");
const router = express.Router();
const {createProduct} = require("../Controllers/product");
router.post("/create-product", createProduct);
module.exports = router;
