const Order = require("../Models/order");
const { v4: uuidv4 } = require('uuid');

exports.createOrder = async (req, res) => {
    const { customerName, shopName, paymentStatus,
        cartProducts,
        total } = req.body;
    const newOrder = new Order({
        orderId: uuidv4(),
        customerName, shopName, paymentStatus,
        cartProducts,
        total
    })
    try {
        const order = await newOrder.save();
        if (order) {
            return res.status(200).json({ message: "Order created successfully" })
        }
        else {
            return res.status(401).json({ message: "Failed to create order" })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Something went wrong" })
    }
}