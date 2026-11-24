# 💧 CostFlow - Manufacturing Cost Management ERP

> A clean, polished, and professional enterprise web application for water bottling factories and manufacturing plants, replicating the modern executive dashboard and inventory control interfaces.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Tailwind%20%7C%20Recharts%20%7C%20Node%20%7C%20Express%20%7C%20MongoDB-blue?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deploy-Render%20%2B%20MongoDB%20Atlas-purple?style=for-the-badge)

---

## 📸 Replicated Interfaces & Features

### 1. Executive Factory Dashboard
- **Welcome Hero Section**: Personalized greeting (*"Welcome back, Ahmed 👋"*) with ambient high-speed water bottling conveyor visuals.
- **5 High-Level KPI Summary Cards**:
  - **Total Production**: `125,000` (+8% vs last week)
  - **Manufacturing Cost**: `178,750 EGP` (+5% Total this period)
  - **Cost Per Unit**: `1.43 EGP` (-2% Avg. cost)
  - **Expected Profit**: `68,750 EGP` (+12% This period)
  - **Inventory Value**: `420,000 EGP` (+6% Total stock)
- **Analytics & Trends**:
  - **Production Overview**: Interactive Recharts spline line chart showing production output vs targets over 30 days.
  - **Cost Breakdown**: Recharts Donut chart displaying the exact 4-part breakdown centered on `1.43 EGP Per Unit` (Raw Materials 48%, Direct Labor 22%, Machines & Power 15%, Overheads 15%).
  - **Top Products**: Quick list of highest-volume formats (`1.5 L`, `600 ml`, `330 ml`) with unit costs and factory share badges.
- **Operations & Alerts**:
  - **Recent Activities Timeline**: Timestamped events for completed production runs, raw material receiving, and sales dispatches.
  - **Alerts & Notifications**: Real-time alerts for low PET preform stocks, waste rate variances, and machine maintenance.
  - **Active Production Status**: Live run card for **Order #PO-1025** (*Water Bottle - 600 ml*) showing 78% progress (7,850 produced / 10,000 planned / 2,150 remaining).

---

### 2. Products Management
- **Hero Banner**: Product statistics with water bottle graphic styling.
- **4 KPI Metric Cards**: Total Products (`5`), Avg. Production Cost (`1.48 EGP`), Avg. Selling Price (`2.20 EGP`), Total Production Value (`820,000 EGP`).
- **Toolbar & Filtering**:
  - `+ Add New Product` button opening modal with complete cost parameters.
  - Category dropdown filter (*All Categories*, *Bottled Water*, *Small Pack*, *Pack*).
  - Status dropdown filter (*All Status*, *Active*, *Inactive*).
  - Search input with real-time text matching.
  - View mode switch: Toggle between sleek Table List view and Grid Cards view.
- **Data Table**: Columns for `#`, `Product Name`, `Image Render`, `Category Badge`, `Size / Unit`, `Production Cost (EGP)`, `Selling Price (EGP)`, `Status`, and Actions (`View`, `Edit`, `Delete`).

---

### 3. Raw Materials & Stock Monitoring
- **Hero Banner**: Real-time stock control and threshold alerts with `+ Add New Material` quick action.
- **4 KPI Metric Cards**: Total Materials (`12`), Total Stock Value (`415,000 EGP`), Low Stock Items (`2 - Needs Attention`), Total Consumption (`285,000 Units`).
- **Material Consumption Trend**: Interactive Recharts smooth Area chart tracking 6-month historical raw material usage (May - Oct).
- **Interactive Low Stock Alerts**: Dedicated alert cards for *PET Preform* (5,000 pcs left / 10,000 min) and *Bottle Caps* (8,000 pcs left / 15,000 min) with quick 1-click **Reorder Soon** buttons.
- **Registry Table**: PET Preforms, Bottle Caps, BOPP Labels, PE Shrink Film, Water Treatment Media, and filter cartridges with supplier associations and purchase prices.

---

### 4. Suppliers & Procurement
- **Hero Banner**: Vendor relationship and purchasing management with `+ Add New Supplier`.
- **4 KPI Metric Cards**: Total Suppliers (`8`), Total Purchases (`1,250,000 EGP`), Average Order Value (`156,250 EGP`), Outstanding Balance (`120,500 EGP`).
- **Split Screen Master-Detail Layout**:
  - **Left Section (70% width)**: Comprehensive supplier registry with industrial zone addresses, phone & email contacts, supplied material tags, purchase totals, balances, and status badges.
  - **Right Section (30% width)**: Interactive Supplier Details card for the selected vendor (e.g. *Global Plastic Co. - Plastic Solutions*) displaying quick contacts, location, total spend, and a chronological **Recent Purchases** list with order amounts.
  - **Record Purchase Action**: Interactive modal to record new deliveries and update supplier balances in real time.

---

### 5. Additional Operational Modules
- **Finished Goods Inventory**: Warehouse zone allocation (*Zone A Cold Clean*, *Zone B Pallet Staging*), reserved order tracking, lot numbers, and stock audit tools.
- **Production Orders & Lines**: Monitoring high-speed automated bottling lines (`Line 1 - 12,000 BPH`), line waste tracking, operator assignment, and batch output simulation.
- **Cost Calculation Engine**: Interactive simulation tool where adjusting resin prices, preform weight, cap cost, power consumption, direct labor, and margin targets recalculates unit costs and recommended selling prices in real time.
- **Sales & Distribution**: Logistics dispatch, truck driver assignments, client delivery manifests.
- **Reports & Analytics**: One-click downloadable financial, scrap, and margin audit reports.
- **Global Search**: System-wide shortcut `Ctrl + K` to search across products, raw materials, suppliers, and production orders instantly.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Recharts, Lucide Icons |
| **Backend** | Node.js, Express REST API, Morgan logging, CORS |
| **Database** | MongoDB Atlas (Production) / Mongoose / Built-in In-Memory fallback |
| **Deployment** | Render (Free Web Service) + MongoDB Atlas (Free M0 Cluster) |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/aquaops-erp.git
cd aquaops-erp

# Install root, server, and client dependencies
npm run install:all
```

### 2. Configure Environment (Optional)
Create `server/.env` (optional, server defaults to port 5000 and internal in-memory database):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/costflow?retryWrites=true&w=majority
```

### 3. Run Development Servers
```bash
# Starts Express API (Port 5000) and Vite Dev Server (Port 3000) concurrently:
npm run dev
```

Open your browser at **`http://localhost:3000`**.

---

## ☁️ Deployment Guide (Render & MongoDB Atlas Free Live Demo)

The project includes a ready-to-use **`render.yaml`** configuration for 1-click deployment on Render's free tier.

### Step 1: Create Free MongoDB Atlas Cluster
1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create an **M0 Free** cluster in any region.
3. In **Database Access**, create a user with read/write permissions.
4. In **Network Access**, add `0.0.0.0/0` (Allow Access from Anywhere).
5. Copy your connection string (`mongodb+srv://<user>:<password>@.../costflow?retryWrites=true&w=majority`).

### Step 2: Deploy to Render
1. Push this repository to GitHub or GitLab.
2. In [Render Dashboard](https://dashboard.render.com/), click **New +** > **Blueprint**.
3. Select your repository. Render automatically reads `render.yaml`.
4. Enter your `MONGODB_URI` environment variable when prompted.
5. Click **Apply**. Render will run:
   ```bash
   npm run install:all && npm run build
   npm start
   ```
6. Your live web application will be accessible at `https://costflow-erp.onrender.com`.

> 💡 **Self-Contained Fallback**: If you deploy without providing `MONGODB_URI`, the server detects the missing cloud connection and runs in standalone demo mode using its built-in in-memory document store. The live demo will never fail to start or crash!

For detailed screenshots and manual configuration steps, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 📁 Project Structure

```
aquaops-erp/
├── client/                     # Frontend (React 18 + Vite + Tailwind CSS)
│   ├── public/                 # Favicon and static icons
│   ├── src/
│   │   ├── components/         # Reusable UI widgets, Sidebar, Header, Modals, Thumbnails
│   │   ├── context/            # App state (search, active tab, toasts)
│   │   ├── pages/              # Dashboard, Products, RawMaterials, Suppliers, Inventory, etc.
│   │   ├── services/           # REST API client with offline fallback
│   │   ├── App.jsx             # Main application layout
│   │   ├── index.css           # Tailwind directives & design tokens
│   │   └── main.jsx            # Entry point
│   ├── index.html              # HTML template
│   ├── tailwind.config.js      # Palette extension (brand, navy, slate)
│   └── vite.config.js          # Vite config & API proxy
├── server/                     # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/             # Database connection & universal in-memory fallback adapter
│   │   ├── data/               # Initial seed dataset matching the 4 images
│   │   ├── models/             # Product, RawMaterial, Supplier, ProductionOrder schemas
│   │   ├── routes/             # REST API route handlers
│   │   ├── scripts/            # Database auto-seeder
│   │   └── index.js            # Express app entry & static build serving
│   ├── package.json
│   └── .env.example
├── DEPLOYMENT.md               # Step-by-step guide for Render & Atlas
├── render.yaml                 # Render Blueprint configuration
├── package.json                # Root package scripts
└── README.md                   # Project documentation
```

---

## 📄 License
This project is licensed under the ISC License.
