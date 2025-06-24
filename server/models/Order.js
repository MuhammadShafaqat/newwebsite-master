
const mongoose = require('mongoose')
/* === models/Order.js === */
const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  customerName: String,
  customerEmail: String,
  paymentMethod: { type: String, enum: ['credit_card', 'paypal'], required: true },
  totalAmount: Number,
  status: { type: String, enum: ['pending', 'paid', 'shipped'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);