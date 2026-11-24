const mongoose = require('mongoose');
const { createModelWrapper } = require('../config/dbAdapter');

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: 'Packaging Solutions',
    },
    category: {
      type: String,
      enum: ['Plastic', 'Packaging', 'Chemical', 'Machinery', 'General'],
      default: 'Plastic',
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      default: '10th Industrial Zone, Cairo',
    },
    suppliedMaterials: [
      {
        type: String,
        trim: true,
      },
    ],
    totalPurchases: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Pending', 'Inactive'],
      default: 'Active',
    },
    avatar: {
      type: String,
      default: 'globe',
    },
    lastPurchaseDate: {
      type: Date,
      default: Date.now,
    },
    recentPurchases: [
      {
        date: { type: String, default: '15 Nov 2026' },
        amount: { type: Number, default: 180000 },
        invoiceNo: { type: String, default: 'INV-2026-089' },
        items: { type: String, default: 'PET Preforms 100,000 pcs' },
      },
    ],
  },
  { timestamps: true }
);

const MongooseSupplier = mongoose.model('Supplier', supplierSchema);
module.exports = createModelWrapper('Supplier', MongooseSupplier, 'suppliers');
