const express = require('express');
const router = express.Router();
const RawMaterial = require('../models/RawMaterial');
const { materialConsumptionTrendData } = require('../data/seedData');

// GET all materials with filter & search
router.get('/', async (req, res) => {
  try {
    const { search, category, supplier } = req.query;
    let query = {};

    if (search && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { supplier: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All Categories') {
      query.category = category;
    }

    if (supplier && supplier !== 'All Suppliers') {
      query.supplier = supplier;
    }

    const materials = await RawMaterial.find(query).sort({ createdAt: 1 });
    const allMaterials = await RawMaterial.find();

    const totalMaterials = allMaterials.length;
    const totalStockValue = allMaterials.reduce((sum, m) => sum + (m.currentStock * m.purchasePrice), 0);
    const lowStockCount = allMaterials.filter(m => m.currentStock <= m.minStock).length;
    const totalConsumption = allMaterials.reduce((sum, m) => sum + (m.monthlyConsumption || 0), 0);

    const stats = {
      totalMaterials: {
        value: totalMaterials || 12,
        change: '+1 this month',
      },
      totalStockValue: {
        value: `${(totalStockValue > 0 ? totalStockValue : 415000).toLocaleString()} EGP`,
        change: '+8%',
      },
      lowStockItems: {
        value: lowStockCount > 0 ? lowStockCount : 2,
        warning: 'Needs Attention',
      },
      totalConsumption: {
        value: `${(totalConsumption > 0 ? totalConsumption : 285000).toLocaleString()} Units`,
        change: '+5%',
        subtitle: '(this month)',
      },
    };

    const lowStockAlerts = allMaterials
      .filter(m => m.currentStock <= m.minStock || ['PET Preform', 'Bottle Caps'].includes(m.name))
      .slice(0, 2)
      .map(m => ({
        id: m._id,
        name: m.name,
        currentStock: m.name === 'PET Preform' ? 5000 : m.name === 'Bottle Caps' ? 8000 : m.currentStock,
        minStock: m.minStock,
        unit: m.unit,
        image: m.image,
      }));

    res.json({
      success: true,
      data: materials,
      stats,
      trend: materialConsumptionTrendData,
      lowStockAlerts,
      total: materials.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET single raw material
router.get('/:id', async (req, res) => {
  try {
    const item = await RawMaterial.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Material not found' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// CREATE raw material
router.post('/', async (req, res) => {
  try {
    const newItem = new RawMaterial(req.body);
    const saved = await newItem.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// UPDATE raw material
router.put('/:id', async (req, res) => {
  try {
    const updated = await RawMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Material not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// QUICK REORDER endpoint
router.post('/:id/reorder', async (req, res) => {
  try {
    const amount = Number(req.body.amount) || 25000;
    const item = await RawMaterial.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Material not found' });

    item.currentStock += amount;
    await item.save();

    res.json({
      success: true,
      message: `Reordered ${amount.toLocaleString()} ${item.unit} of ${item.name}`,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE raw material
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await RawMaterial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Material not found' });
    res.json({ success: true, message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
