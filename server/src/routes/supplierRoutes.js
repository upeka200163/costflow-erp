const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// GET all suppliers with filtering & search
router.get('/', async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let query = {};

    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { subtitle: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { suppliedMaterials: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (category && category !== 'All Categories') {
      query.category = category;
    }

    if (status && status !== 'All Status') {
      query.status = status;
    }

    const suppliers = await Supplier.find(query).sort({ createdAt: 1 });
    const allSuppliers = await Supplier.find();

    const totalSuppliers = allSuppliers.length;
    const totalPurchases = allSuppliers.reduce((sum, s) => sum + (s.totalPurchases || 0), 0);
    const avgOrder = totalSuppliers > 0 ? Math.round(totalPurchases / totalSuppliers) : 156250;
    const outstandingBalance = allSuppliers.reduce((sum, s) => sum + (s.balance || 0), 0);

    const stats = {
      totalSuppliers: {
        value: totalSuppliers || 8,
        change: '+1 this month',
      },
      totalPurchases: {
        value: `${(totalPurchases > 0 ? totalPurchases : 1250000).toLocaleString()} EGP`,
        change: '+12%',
      },
      averageOrderValue: {
        value: `${(avgOrder > 0 ? avgOrder : 156250).toLocaleString()} EGP`,
        change: '+8%',
      },
      outstandingBalance: {
        value: `${(outstandingBalance > 0 ? outstandingBalance : 120500).toLocaleString()} EGP`,
        change: '-5%',
      },
    };

    res.json({
      success: true,
      data: suppliers,
      stats,
      total: suppliers.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single supplier
router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });
    res.json({ success: true, data: supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE supplier
router.post('/', async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    const saved = await newSupplier.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE supplier
router.put('/:id', async (req, res) => {
  try {
    const updated = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Supplier not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// RECORD A PURCHASE for supplier
router.post('/:id/purchase', async (req, res) => {
  try {
    const { amount, items, date, invoiceNo } = req.body;
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });

    const purchaseAmount = Number(amount) || 0;
    supplier.totalPurchases += purchaseAmount;
    supplier.balance += purchaseAmount; // adds to outstanding balance
    supplier.lastPurchaseDate = new Date();
    supplier.recentPurchases.unshift({
      date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      amount: purchaseAmount,
      invoiceNo: invoiceNo || `INV-${Date.now().toString().slice(-6)}`,
      items: items || 'Materials Delivery',
    });

    await supplier.save();
    res.json({ success: true, data: supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE supplier
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Supplier.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Supplier not found' });
    res.json({ success: true, message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
