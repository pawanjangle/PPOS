const Product = require("../Models/product");
const slugify = require('slugify');
exports.createproduct = async (req, res) => {
    const { productName, manufacturerName, price, unit, description, category } = req.body;
    const newProduct = new Product({
        productName, slug: slugify(productName),
        manufacturerName, price, unit, description, category
    })
    try {
        const product = await newProduct.save();
        if (product) {
            res.status(200).json({ message: "Product created successfully" });
        }
        else {
            res.status(400).json({ error: "Failed to create a product" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "Something went wrong" });
    }
}

exports.getproducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        if (products) {
            res.status(200).json({ products, totalCount: products.length })
        }
        else {
            res.status(401).json({ message: "failed to get product" })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ err })
    }
}
exports.updateProduct = async (req, res) => {
    const { _id, productName, manufacturerName, price, unit, description, category } = req.body;
    const newProduct = {
        productName, manufacturerName, price, unit, description, category
    };
    const product = await Product.findOneAndUpdate({ _id }, newProduct, { new: true });
    if (product) {
        return res.status(200).json({ message: "Product updated successfully", product });
    }
    else {
        return res.json({ error: "Failed to update product" })
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    const isDeleted = await Product.deleteOne({ _id: id })
    if (isDeleted) {
        return res.status(200).json({ message: "Product deleted successfully" });
    }
    else {
        return res.json({ error: "Failed to delete product" })
    }
};
