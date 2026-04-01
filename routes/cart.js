const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");


// 🔹 ADD TO CART
router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartItem = new Cart({
      userId,
      productId,
      quantity
    });

    await cartItem.save();

    res.json({
      message: "Added to cart",
      cartItem
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 GET CART ITEMS (for specific user)
router.get("/:userId", async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.params.userId })
      .populate("productId");

    res.json(items);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 UPDATE CART ITEM (change quantity)
router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;

    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    res.json(updatedItem);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 DELETE CART ITEM
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({ message: "Item removed from cart" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;