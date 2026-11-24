const Product = require('../models/Product');
const RawMaterial = require('../models/RawMaterial');
const Supplier = require('../models/Supplier');
const ProductionOrder = require('../models/ProductionOrder');
const Activity = require('../models/Activity');
const Alert = require('../models/Alert');
const {
  initialProducts,
  initialMaterials,
  initialSuppliers,
  initialProductionOrders,
  initialActivities,
  initialAlerts,
} = require('../data/seedData');

const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('Seeding initial products...');
      await Product.insertMany(initialProducts);
    }

    const materialCount = await RawMaterial.countDocuments();
    if (materialCount === 0) {
      console.log('Seeding initial raw materials...');
      await RawMaterial.insertMany(initialMaterials);
    }

    const supplierCount = await Supplier.countDocuments();
    if (supplierCount === 0) {
      console.log('Seeding initial suppliers...');
      await Supplier.insertMany(initialSuppliers);
    }

    const orderCount = await ProductionOrder.countDocuments();
    if (orderCount === 0) {
      console.log('Seeding initial production orders...');
      await ProductionOrder.insertMany(initialProductionOrders);
    }

    const activityCount = await Activity.countDocuments();
    if (activityCount === 0) {
      console.log('Seeding initial activities...');
      await Activity.insertMany(initialActivities);
    }

    const alertCount = await Alert.countDocuments();
    if (alertCount === 0) {
      console.log('Seeding initial alerts...');
      await Alert.insertMany(initialAlerts);
    }

    console.log('✅ CostFlow Database successfully seeded with baseline data.');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

module.exports = seedDatabase;
