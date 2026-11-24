const express = require('express');
const router = express.Router();
const ProductionOrder = require('../models/ProductionOrder');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await ProductionOrder.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE order
router.post('/', async (req, res) => {
  try {
    const newOrder = new ProductionOrder(req.body);
    const saved = await newOrder.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE order progress
router.patch('/:id/progress', async (req, res) => {
  try {
    const { addProduced } = req.body;
    const order = await ProductionOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.produced = Math.min(order.planned, order.produced + Number(addProduced));
    if (order.produced >= order.planned) {
      order.status = 'Completed';
    }
    await order.save();
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
