const Order = require('../models/orderModel');
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,  // From JWT
      items: req.body.items,
      total: req.body.total
    });
    res.status(201).json({ status: 'success', data: { order } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};