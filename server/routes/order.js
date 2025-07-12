const express = require('express');
const router = express.Router();
const {createOrder, getOrders,
  getOrdersByStatus,
  markAsPaid,
  markAsShipped} = require("../controllers/orderController");

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/filter', getOrdersByStatus); // /api/orders/filter?status=pending
router.patch('/:id/mark-paid', markAsPaid);
router.patch('/:id/mark-shipped', markAsShipped);


module.exports = router;