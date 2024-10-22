const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    updatedAt: Date,
    createdAt: Date
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);