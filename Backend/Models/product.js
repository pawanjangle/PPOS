const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productNameInHindi: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturerName: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: false,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },

    // productPicture: { type: String, required: true },
    // reviews: [
    //   {
    //     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     review: String,
    //   },
    // ],
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedAt: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);