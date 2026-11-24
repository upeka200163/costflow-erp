const mongoose = require('mongoose');
const { createModelWrapper } = require('../config/dbAdapter');

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['danger', 'warning', 'info'],
      default: 'warning',
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: '',
    },
    timeAgo: {
      type: String,
      default: 'Just now',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const MongooseAlert = mongoose.model('Alert', alertSchema);
module.exports = createModelWrapper('Alert', MongooseAlert, 'alerts');
