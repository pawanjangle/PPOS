const express = require("express");
const router = express.Router();
const {createproduct, getproducts} = require("../Controllers/product");
router.post("/create-product", createproduct);
router.get("/get-products", getproducts);
module.exports = router;
