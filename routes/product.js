const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// 🔹 ADD PRODUCT
router.post("/", async (req, res) => {
  try {
    const { name, price, quantity, farmerId } = req.body;

    const product = new Product({
      name,
      price,
      quantity,
      farmerId
    });

    await product.save();

    res.json({ message: "Product added successfully", product });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 GET ALL PRODUCTS  ← PASTE HERE
router.get("/", async (req, res) => {
  const products = await Product.find().populate("farmerId", "name");

  res.json(products);
});


// 🔹 UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});


// 🔹 DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Product deleted" });
});

module.exports = router;