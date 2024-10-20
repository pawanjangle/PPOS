const Order = require("../Models/order");
const { v4: uuidv4 } = require('uuid');

exports.createOrder = async (req, res) => {
    const { customerName, shopName, paymentStatus,
        cartProducts,
        total } = req.body;
        let date = new Date()
        let orderDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const newOrder = new Order({
        orderId: uuidv4(),
        customerName, shopName, paymentStatus,
        cartProducts,
        total,
        orderDate: orderDate
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
exports.getOrders = async (req, res)=>{
    try{
        const orders = await Order.find().sort({createdAt: -1});
        if(orders){
            return res.status(200).json({orders, total_Orders: orders.length})
        }
        else{
            return res.status(401).json({message: "something went wrong"})
        }
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message: "something went wrong"})
    }
}
exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    const isDeleted = await Order.deleteOne({ _id: id })
    try {
        if (isDeleted) {
            return res.status(200).json({ message: "Order deleted successfully" });
        }
        else {
            return res.json({ error: "Failed to delete order" })
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
};
