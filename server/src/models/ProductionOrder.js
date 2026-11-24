const mongoose = require('mongoose');
const { createModelWrapper } = require('../config/dbAdapter');

const productionOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => `#PO-${Math.floor(1000 + Math.random() * 9000)}`,
    },
    productName: {
      type: String,
      required: true,
      default: 'Water Bottle - 600 ml',
    },
    planned: {
      type: Number,
      required: true,
      default: 10000,
    },
    produced: {
      type: Number,
      default: 7850,
    },
    remaining: {
      type: Number,
      default: 2150,
    },
    progressPercent: {
      type: Number,
      default: 78,
    },
    wasteRate: {
      type: Number,
      default: 2.4,
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'Pending', 'Halted'],
      default: 'In Progress',
    },
    productionLine: {
      type: String,
      default: 'Line 1 (High Speed Automated)',
    },
    operator: {
      type: String,
      default: 'Ahmed Mohamed',
    },
    notes: {
      type: String,
      default: 'Standard packaging run for municipal distribution',
    },
  },
  { timestamps: true }
);

const MongooseProductionOrder = mongoose.model('ProductionOrder', productionOrderSchema);
module.exports = createModelWrapper('ProductionOrder', MongooseProductionOrder, 'orders');
