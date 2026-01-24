const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/products", async (req, res) => {
  try {
    const data = await mongoose.connection
      .db
      .collection("products")
      .find({})
      .toArray();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Data fetch failed" });
  }
});

module.exports = router;
