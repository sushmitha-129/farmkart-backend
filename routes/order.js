const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");


// 🟢 PLACE ORDER
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;

    // get cart items
    const cartItems = await Cart.find({ userId }).populate("productId");

    if (cartItems.length === 0) {
      return res.json({ message: "Cart is empty" });
    }

    // prepare order products
    const products = cartItems.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity
    }));

    // calculate total
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.productId.price * item.quantity;
    });

    // create order
    const order = new Order({
      userId,
      products,
      totalAmount
    });

    await order.save();

    // clear cart
    await Cart.deleteMany({ userId });

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 📦 GET USER ORDERS
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .populate("products.productId");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔄 UPDATE ORDER STATUS (Admin)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;