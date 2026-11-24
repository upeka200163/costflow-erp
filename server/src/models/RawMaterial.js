const mongoose = require('mongoose');
const { createModelWrapper } = require('../config/dbAdapter');

const rawMaterialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Plastic', 'Packaging', 'Chemical', 'Other'],
      default: 'Plastic',
    },
    supplier: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: '/images/materials/pet-preform.png',
    },
    currentStock: {
      type: Number,
      required: true,
      default: 0,
    },
    minStock: {
      type: Number,
      default: 10000,
    },
    unit: {
      type: String,
      required: true,
      enum: ['Pcs', 'Roll', 'Kg', 'Liters', 'Box'],
      default: 'Pcs',
    },
    purchasePrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
    monthlyConsumption: {
      type: Number,
      default: 50000,
    },
    reorderLeadDays: {
      type: Number,
      default: 3,
    },
  },
  { timestamps: true }
);

const MongooseRawMaterial = mongoose.model('RawMaterial', rawMaterialSchema);
module.exports = createModelWrapper('RawMaterial', MongooseRawMaterial, 'materials');
