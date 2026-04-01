const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  image: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);