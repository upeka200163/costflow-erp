const mongoose = require('mongoose');
const { createModelWrapper } = require('../config/dbAdapter');

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['production', 'material', 'sales', 'maintenance', 'inventory'],
      default: 'production',
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
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
  },
  { timestamps: true }
);

const MongooseActivity = mongoose.model('Activity', activitySchema);
module.exports = createModelWrapper('Activity', MongooseActivity, 'activities');
