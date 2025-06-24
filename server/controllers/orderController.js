/* === controllers/orderController.js === */
const Order = require('../models/Order');
const Product = require('../models/ShopItem')

 const createOrder = async (req, res) => {
  const { items, customerName, customerEmail, paymentMethod } = req.body;
  try {
    let total = 0;
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity)
        return res.status(400).json({ error: `Invalid or out-of-stock item` });

      total += product.price * item.quantity;
      product.stock -= item.quantity;
      product.orderCount += item.quantity;
      await product.save();
    }

    const order = new Order({ items, customerName, customerEmail, paymentMethod, totalAmount: total });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

module.exports = {createOrder, getOrders}