const express = require("express");
const router = express.Router();
const {createproduct, getproducts, updateProduct} = require("../Controllers/product");
router.post("/create-product", createproduct);
router.get("/get-products", getproducts);
router.post("/update-product", updateProduct);
module.exports = router;
