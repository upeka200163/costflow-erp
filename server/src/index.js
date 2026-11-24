require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { connectDB } = require('./config/db');
const seedDatabase = require('./scripts/seed');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Static assets (product images, icons)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Routes
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/materials', require('./routes/materialRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/production', require('./routes/productionRoutes'));
app.use('/api/calculation', require('./routes/calculationRoutes'));

// Database Overview & Inspector endpoint
app.get('/api/database', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const RawMaterial = require('./models/RawMaterial');
    const Supplier = require('./models/Supplier');
    const ProductionOrder = require('./models/ProductionOrder');
    const Activity = require('./models/Activity');
    const Alert = require('./models/Alert');
    const { getStatus } = require('./config/dbAdapter');

    const [products, materials, suppliers, orders, activities, alerts] = await Promise.all([
      Product.find({}),
      RawMaterial.find({}),
      Supplier.find({}),
      ProductionOrder.find({}),
      Activity.find({}),
      Alert.find({}),
    ]);

    res.json({
      database: 'costflow',
      connectedToMongo: getStatus(),
      connectionType: getStatus()
        ? 'MongoDB (Atlas / Local MongoDB)'
        : 'Universal In-Memory Document Store (Demo Mode)',
      collections: {
        products: {
          count: products.length,
          data: products,
        },
        rawmaterials: {
          count: materials.length,
          data: materials,
        },
        suppliers: {
          count: suppliers.length,
          data: suppliers,
        },
        productionorders: {
          count: orders.length,
          data: orders,
        },
        activities: {
          count: activities.length,
          data: activities,
        },
        alerts: {
          count: alerts.length,
          data: alerts,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint for Render / monitoring
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'CostFlow ERP API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

const fs = require('fs');

// Serve frontend build if dist exists or in production
const clientBuildPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientBuildPath) || process.env.NODE_ENV === 'production' || process.env.SERVE_CLIENT === 'true') {
  app.use(express.static(clientBuildPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js') || filePath.endsWith('.mjs') || filePath.endsWith('.jsx')) {
        res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css; charset=UTF-8');
      }
    }
  }));

  // Handle SPA routing - only serve index.html for navigation routes (not static file requests)
  app.get('*', (req, res) => {
    if (path.extname(req.path)) {
      return res.status(404).send('Asset not found');
    }
    const indexPath = path.join(clientBuildPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('CostFlow frontend build not found. Please run npm run build.');
    }
  });
}

// Initialize server
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`=================================================`);
      console.log(`🚀 CostFlow ERP Server running on port ${PORT}`);
      console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
      console.log(`🌐 Mode: ${process.env.NODE_ENV || 'development'}`);
      console.log(`=================================================`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
