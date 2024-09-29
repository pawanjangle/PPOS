const { waitForDebugger } = require("node:inspector/promises");
const Product = require("../Models/product");
exports.createProduct =  (req, res) =>{
    const { name, slug, manufacturer, price, Unit, description, quantity, category } = req.body;
    console.log(res)
}
