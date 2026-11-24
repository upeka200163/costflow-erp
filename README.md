# 💧 CostFlow - Manufacturing Cost Management ERP

[![Production Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge&logo=checkmarx)](https://github.com)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Tailwind%20%7C%20Vite%20%7C%20Node%20%7C%20Express%20%7C%20MongoDB-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![Cloud Deployment](https://img.shields.io/badge/Deploy-Render%20%2B%20MongoDB%20Atlas-4353ff?style=for-the-badge&logo=render)](https://render.com)
[![Compliance](https://img.shields.io/badge/Quality-ISO%2022000%20%2F%20Codex%20Stan%20227-emerald?style=for-the-badge)](https://www.iso.org)

**CostFlow** is a modern, high-performance web application and Manufacturing Execution System (MES) designed specifically for commercial bottled water production, beverage plants, and packaging facilities. Replicated to pixel perfection from modern enterprise ERP dashboards, it unifies direct material costing, real-time BOM roll-ups, high-speed bottling line monitoring, vendor purchasing, and laboratory quality compliance.

---

## 🌟 Key Modules & Features

### 1. Executive Factory Dashboard (Image 1)
* **Personalized Greeting**: Dynamic welcome greeting (*"Welcome back, Ahmed 👋"*) with live first-name synchronization and ambient high-speed conveyor visuals.
* **5 Executive KPI Cards**:
  * **Total Production**: `125,000` (+8% vs last week)
  * **Manufacturing Cost**: `178,750 EGP` (+5% Total this period)
  * **Cost Per Unit**: `1.43 EGP` (-2% Avg. cost)
  * **Expected Profit**: `68,750 EGP` (+12% This period)
  * **Inventory Value**: `420,000 EGP` (+6% Total stock)
* **Production Overview Chart**: Interactive Recharts spline chart comparing actual 30-day throughput against production targets.
* **Cost Breakdown Donut**: Recharts visualization dissecting the exact per-unit cost structure:
  * Raw Materials: `48%` (0.69 EGP)
  * Direct Labor: `22%` (0.31 EGP)
  * Machines & Electricity: `15%` (0.22 EGP)
  * Overheads: `15%` (0.21 EGP)
* **Top Products Matrix**: Performance table tracking unit costs and plant sales share for `1.5 L` (32%), `600 ml` (28%), and `330 ml` (25%) formats.
* **Operations Feed & Active Order Card**: Timestamped activity logs, critical material notifications, and real-time progress for **Order #PO-1025** (*Water Bottle 600 ml* at 78% completion).

---

### 2. Products Management (Image 2)
* **Executive Metrics**: Total Products (`5`), Average Production Cost (`1.48 EGP`), Average Selling Price (`2.20 EGP`), Total Production Value (`820,000 EGP`).
* **Multi-View Modes**: Instant toggle between an **Informative Data Table** and responsive **Card Grid View**.
* **Real-time Filtering & Search**: Instant filtering by category (*Bottled Water*, *Small Pack*, *Pack*) and status (*Active*, *Inactive*).
* **Modal Operations**: Comprehensive dialog to add or edit SKUs, size specifications, direct labor allotments, and target profit margins.

---

### 3. Raw Materials & Stock Monitoring (Image 3)
* **KPI Trackers**: Total Materials (`12`), Total Stock Value (`415,000 EGP`), Low Stock Items (`2 - Needs Attention`), Monthly Consumption (`285,000 Units`).
* **Material Consumption Trend**: 6-month historical consumption Area chart (May – Oct) powered by Recharts.
* **One-Click Low Stock Alerts**: Dedicated alert cards for *PET Preform* (5,000 pcs left / 10,000 min) and *Bottle Caps* (8,000 pcs left / 15,000 min) with instant **Reorder Soon** procurement dispatching.
* **Procurement Table**: Real-time tracking of preforms, caps, printed labels, shrink film, and water purification chemicals.

---

### 4. Suppliers & Procurement (Image 4)
* **Procurement KPIs**: Total Suppliers (`8`), Total Purchases (`1,250,000 EGP`), Average Order Value (`156,250 EGP`), Outstanding Balance (`120,500 EGP`).
* **Master-Detail Split View**:
  * **Left (70%)**: Full vendor directory with contact info, supplied materials, purchase volumes, and AP balances.
  * **Right (30%)**: Dedicated **Supplier Details** inspector for the selected vendor (e.g. *Global Plastic Co.*) with historical purchase orders.
* **Purchase Recording Modal**: Dialog to log incoming invoices, update ledger balances, and record invoice numbers.

---

### 5. Advanced Manufacturing Extensions
* **Interactive BOM Studio**: Bill of Materials tree decomposing each bottle into PET grammage, HDPE closures, BOPP labels, wrap film, and water treatment reagents.
* **Quality Control Laboratory**: In-line water testing parameters adhering to **Egyptian Standard ES 1588** and **Codex Stan 227-2001** (TDS, pH, Ozone residual, Turbidity, Microbiological assay).
* **Production Kanban & Lines**: Real-time visual tracking of bottling lines (*Line 1 High-Speed Automated 12,000 BPH*) across 5 stages from Planned Queue to Palletized.
* **Cost Simulation & Resin Sensitivity**: Break-even calculator and sensitivity model that computes the impact of virgin PET resin price swings on net unit margins.
* **Printable Cost Audit Sheet**: Clean, formal print-ready document with official verification stamps, cost rolls, and signatures.
* **Interactive Database Inspector**: Located under **Settings**, allowing live inspection of all MongoDB collections, document counts, and raw JSON.
* **User Account & Identity Hub**:
  * Top navigation profile trigger with real-time name synchronization.
  * Custom photo upload from disk and curated executive avatar presets.
  * Security modal with 2FA toggles, session PIN lock, and role switcher (*Factory Manager*, *Operations Director*, *QC Auditor*).

---

## 📸 Original Photographic & Brand Assets

All generic SVG vector placeholders have been replaced with the original high-resolution photographic imagery extracted directly from the interface designs:

```
client/public/images/original/
├── avatar-ahmed.png              # Factory Manager profile photo (from Image 1 header)
├── dashboard-conveyor.png         # Bottling line conveyor hero banner (from Image 1)
├── order-po1025.png               # High-speed bottling line thumbnail (from Image 1)
├── products-banner.png            # Water splash and 4-bottle hero lineup (from Image 2)
├── prod-wb600.png                 # Water Bottle (600 ml) photographic thumbnail
├── prod-wb330.png                 # Water Bottle (330 ml) photographic thumbnail
├── prod-wb1500.png                # Water Bottle (1.50 L) photographic thumbnail
├── prod-cup200.png                # Water Cup (200 ml) photographic thumbnail
├── prod-pack6.png                 # Water Pack (6 pcs) photographic thumbnail
├── mat-preform.png                # PET Preform test-tube preform thumbnail
├── mat-preform-alert.png          # High-res PET Preform alert thumbnail
├── mat-caps.png                   # Blue bottle caps thumbnail
├── mat-caps-alert.png             # High-res bottle caps alert thumbnail
├── mat-labels.png                 # Printed label roll thumbnail
├── mat-film.png                   # Clear polyethylene shrink film roll thumbnail
├── mat-chemical.png               # Water treatment chemical containers thumbnail
├── supp-globalplastic.png         # Global Plastic Co. brand logo
├── supp-globalplastic-large.png   # Global Plastic Co. circular details logo
├── supp-packtech.png              # PackTech green leaf technology logo
├── supp-purewater.png             # Pure Water Co. water droplet logo
├── supp-industrial.png            # Industrial Supplies gear logo
└── supp-smartpack.png             # Smart Packaging carton logo
```

---

## 🛠 Tech Stack & Architecture

```
                      ┌────────────────────────────────────────┐
                      │          React 18 + Vite (SPA)         │
                      │  Tailwind CSS • Recharts • Lucide      │
                      └───────────────────┬────────────────────┘
                                          │ HTTP / REST APIs
                                          ▼
                      ┌────────────────────────────────────────┐
                      │          Node.js + Express API         │
                      │    Port 5000 (Local) / PORT (Render)   │
                      └───────────────────┬────────────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌────────────────────────┐                     ┌───────────────────────────┐
     │ MongoDB Atlas (Remote) │                     │ In-Memory Document Store  │
     │   when MONGODB_URI set │                     │  Universal Fallback Mode  │
     └────────────────────────┘                     └───────────────────────────┘
```

* **Frontend**: React 18, Vite 6, Tailwind CSS 3, Recharts 2, Lucide React icons.
* **Backend**: Node.js, Express 4, Mongoose 8, Morgan, CORS.
* **Database**: MongoDB Atlas / Local MongoDB with universal fallback in-memory document adapter (`dbAdapter.js`).
* **Deployment**: Render Blueprint (`render.yaml`) + MongoDB Atlas Free Tier (`M0`).

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/dashboard` | Aggregated factory KPIs, production chart data, cost donut, and recent activity |
| `GET` | `/api/products` | Retrieve product catalog with optional `search`, `category`, and `status` filters |
| `POST` | `/api/products` | Create a new finished product SKU |
| `PUT` | `/api/products/:id` | Update product costs, pricing, or status |
| `DELETE` | `/api/products/:id` | Remove a product from the registry |
| `GET` | `/api/materials` | Retrieve raw materials, stock quantities, and 6-month consumption trend |
| `POST` | `/api/materials/:id/reorder` | Quick dispatch reorder for low stock items |
| `GET` | `/api/suppliers` | Retrieve suppliers directory with balances and recent purchase history |
| `POST` | `/api/suppliers/:id/purchases` | Record an incoming purchase delivery and invoice |
| `GET` | `/api/production` | Active production orders, bottling line speeds, and Kanban statuses |
| `POST` | `/api/calculation/simulate` | Dynamic unit cost recalculation based on custom resin/power/labor parameters |
| `GET` | `/api/database` | Complete database overview dumping all collections, document counts, and records |
| `GET` | `/api/health` | Service uptime and deployment diagnostics |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/aquaops-erp.git
cd aquaops-erp

# Install all dependencies across root, server, and client
npm run install:all
```

### 2. Configure Environment (Optional)
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
NODE_ENV=development

# Optional: MongoDB Atlas connection string
# If omitted, the server runs seamlessly using its built-in in-memory document store
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/costflow?retryWrites=true&w=majority
```

### 3. Start Development Servers
```bash
# Starts both Express backend (Port 5000) and Vite frontend (Port 3000) concurrently:
npm run dev
```

Open your browser at **`http://localhost:3000`**.

---

## ☁️ Free Live Demo Deployment (Render + MongoDB Atlas)

CostFlow is pre-configured for **1-click free deployment** using Render and MongoDB Atlas:

### Step 1: Set up MongoDB Atlas (Free M0 Cluster)
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create an **M0 Free** cluster named `Cluster0`.
3. In **Network Access**, add `0.0.0.0/0` (Allow Access from Anywhere).
4. In **Database Access**, create a user with read/write privileges.
5. Click **Connect** > **Drivers** > Copy your connection string (`mongodb+srv://...`).

### Step 2: Deploy on Render
1. Push your repository to GitHub or GitLab.
2. In the [Render Dashboard](https://dashboard.render.com/), click **New +** > **Blueprint**.
3. Select your repository. Render automatically reads `render.yaml`.
4. Enter your `MONGODB_URI` environment variable when prompted.
5. Click **Apply**. Render will automatically build the client and start the production web service:
   ```bash
   npm run build
   npm start
   ```

> 💡 **Self-Contained Live Demo**: If `MONGODB_URI` is not provided, the application automatically launches in standalone demo mode with all baseline products, materials, and suppliers seeded in its built-in in-memory document store. It will never crash or fail to start.

---

## ⌨️ Shortcuts & Pro Tips

| Shortcut / Action | Function |
|:---|:---|
| <kbd>Ctrl</kbd> + <kbd>K</kbd> | Open system-wide **Global Quick Search** |
| **Top Right User Card** | Opens **User Profile**, **Account Settings**, and **Role Switcher** |
| **Settings > Database** | Live in-app **MongoDB Database Inspector** with JSON viewer |
| **Reorder Soon** | Instantly replenishes low-stock PET preforms and bottle caps |
| **Print Icon (Header)** | Opens official **NFSA Cost Audit Sheet** formatted for print/PDF export |

---

## 📁 Repository Structure

```
aquaops-erp/
├── client/                          # React + Vite frontend application
│   ├── public/
│   │   └── images/original/         # Extracted original photographic & brand assets
│   ├── src/
│   │   ├── components/              # Sidebar, Header, Modals, Thumbnails, KPI Cards
│   │   ├── context/                 # AppContext (user profile, search, active tabs)
│   │   ├── pages/                   # Dashboard, Products, RawMaterials, Suppliers, Settings, etc.
│   │   ├── services/                # REST API client with offline fallback
│   │   ├── App.jsx                  # Main view orchestration
│   │   ├── index.css                # Tailwind directives & design tokens
│   │   └── main.jsx                 # Client entry point
│   ├── index.html                   # HTML document template
│   └── vite.config.js               # Vite build config & local proxy
├── server/                          # Node.js + Express backend application
│   ├── src/
│   │   ├── config/                  # Mongoose connection & in-memory database adapter
│   │   ├── data/                    # Seed dataset matching the original interfaces
│   │   ├── models/                  # Product, RawMaterial, Supplier, ProductionOrder schemas
│   │   ├── routes/                  # REST route controllers
│   │   ├── scripts/                 # Baseline database auto-seeder
│   │   └── index.js                 # Express server & static SPA hosting
│   ├── .env.example                 # Environment template
│   └── package.json                 # Server dependencies & scripts
├── DEPLOYMENT.md                    # Detailed step-by-step deployment guide
├── render.yaml                      # Render Blueprint automation spec
├── package.json                     # Root orchestrator scripts
└── README.md                        # Documentation
```

---

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
