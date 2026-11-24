const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const RawMaterial = require('../models/RawMaterial');
const ProductionOrder = require('../models/ProductionOrder');
const Activity = require('../models/Activity');
const Alert = require('../models/Alert');
const { productionOverviewData } = require('../data/seedData');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ status: 'Active' });
    const materials = await RawMaterial.find();
    const activeOrder = await ProductionOrder.findOne({ orderNumber: '#PO-1025' }) || 
      await ProductionOrder.findOne().sort({ createdAt: -1 });

    const activities = await Activity.find().sort({ timestamp: -1 }).limit(5);
    const alerts = await Alert.find({ resolved: false }).sort({ timestamp: -1 }).limit(5);

    // Compute or provide baseline KPIs matching the exact UI in Image 1
    const totalStockVal = materials.reduce((acc, m) => acc + (m.currentStock * m.purchasePrice), 0);

    const kpis = {
      totalProduction: {
        value: '125,000',
        change: '+8%',
        changeType: 'increase',
        comparison: 'vs last week',
      },
      manufacturingCost: {
        value: '178,750 EGP',
        change: '+5%',
        changeType: 'increase',
        comparison: 'Total this period',
      },
      costPerUnit: {
        value: '1.43 EGP',
        change: '-2%',
        changeType: 'decrease',
        comparison: 'Avg. cost',
      },
      expectedProfit: {
        value: '68,750 EGP',
        change: '+12%',
        changeType: 'increase',
        comparison: 'This period',
      },
      inventoryValue: {
        value: '420,000 EGP',
        change: '+6%',
        changeType: 'increase',
        comparison: 'Total stock',
      },
    };

    const costBreakdown = {
      costPerUnit: '1.43 EGP',
      categories: [
        { name: 'Raw Materials', percentage: 48, color: '#2563eb' },
        { name: 'Labor', percentage: 22, color: '#10b981' },
        { name: 'Machines', percentage: 15, color: '#38bdf8' },
        { name: 'Overheads', percentage: 15, color: '#f59e0b' },
      ],
    };

    const topProducts = [
      {
        id: '1',
        name: 'Water Bottle',
        size: '1.5 L',
        cost: '1.85 EGP',
        share: '32%',
        image: '/images/products/bottle-1500.png',
      },
      {
        id: '2',
        name: 'Water Bottle',
        size: '600 ml',
        cost: '1.45 EGP',
        share: '28%',
        image: '/images/products/bottle-600.png',
      },
      {
        id: '3',
        name: 'Water Bottle',
        size: '330 ml',
        cost: '1.10 EGP',
        share: '25%',
        image: '/images/products/bottle-330.png',
      },
    ];

    const productionStatus = activeOrder
      ? {
          orderNumber: activeOrder.orderNumber,
          productName: activeOrder.productName,
          produced: activeOrder.produced,
          planned: activeOrder.planned,
          remaining: activeOrder.remaining,
          progress: activeOrder.progressPercent,
          status: activeOrder.status,
          image: '/images/bottling-line.png',
        }
      : {
          orderNumber: 'Order #PO-1025',
          productName: 'Water Bottle - 600 ml',
          produced: 7850,
          planned: 10000,
          remaining: 2150,
          progress: 78,
          status: 'In Progress',
          image: '/images/bottling-line.png',
        };

    res.json({
      success: true,
      data: {
        kpis,
        productionOverview: productionOverviewData,
        costBreakdown,
        topProducts,
        recentActivities: activities,
        alerts,
        productionStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
