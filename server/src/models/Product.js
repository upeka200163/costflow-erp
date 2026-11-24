const mongoose = require('mongoose');
const { createModelWrapper } = require('../config/dbAdapter');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Bottled Water', 'Small Pack', 'Pack', 'Custom'],
      default: 'Bottled Water',
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: '/images/products/bottle-600.png',
    },
    productionCost: {
      type: Number,
      required: true,
      default: 0,
    },
    sellingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Archived'],
      default: 'Active',
    },
    sku: {
      type: String,
      trim: true,
    },
    costBreakdown: {
      rawMaterials: { type: Number, default: 0.69 },
      labor: { type: Number, default: 0.31 },
      machines: { type: Number, default: 0.22 },
      overheads: { type: Number, default: 0.21 },
    },
    currentInventory: {
      type: Number,
      default: 25000,
    },
    salesShare: {
      type: Number,
      default: 28,
    },
  },
  { timestamps: true }
);

const MongooseProduct = mongoose.model('Product', productSchema);
module.exports = createModelWrapper('Product', MongooseProduct, 'products');
