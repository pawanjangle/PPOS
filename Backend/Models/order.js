const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      trim: true,
    },
    customerName: {
      type: String,
      trim: true,
    },
    shopName: {
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    cartProducts: {
      type: Array,
      required: true,
    },
    total: {
      type: String,
    },
    orderDate: {
      type: String,
    },
    updatedAt: Date,
    createdAt: Date
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);