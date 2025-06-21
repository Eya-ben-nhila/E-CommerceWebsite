const Cart = require('../models/cartModel');

exports.addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $push: { items: req.body } },
      { new: true, upsert: true }
    );
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};