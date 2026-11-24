# CostFlow ERP - Deployment Guide (Render & MongoDB Atlas)

This guide walks you through deploying **CostFlow ERP** (Manufacturing Cost Management Web Application) as a **free live demo** using **Render** and **MongoDB Atlas**.

---

## Architecture Overview

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Node.js, Express REST API, Mongoose
- **Database**: MongoDB Atlas (Cloud) with built-in standalone fallback
- **Production Bundle**: Express serves the optimized Vite SPA bundle directly in production, eliminating CORS configuration and reducing hosting to a **single free Render Web Service**.

---

## Part 1: Setting Up MongoDB Atlas (Free Tier)

1. **Create an Account / Sign In**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or log in.

2. **Create a Free Shared Cluster**:
   - Click **Create Deployment**.
   - Select the **M0 Free** tier (512 MB storage, free forever).
   - Choose a cloud provider (AWS, Google Cloud, or Azure) in a region near your Render service (e.g., `us-east-1` or `eu-central-1`).
   - Cluster Name: `CostFlowCluster`.

3. **Configure Database Access (User)**:
   - Go to **Security** > **Database Access**.
   - Click **Add New Database User**.
   - Choose **Password** Authentication.
   - Enter a username (e.g. `costflow_admin`) and secure password (e.g. `WaterFactory2026!`).
   - Assign the **Read and write to any database** privilege.
   - Click **Add User**.

4. **Configure Network Access (IP Whitelist)**:
   - Go to **Security** > **Network Access**.
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) so Render servers can connect.
   - Click **Confirm**.

5. **Get Connection String**:
   - Go to **Database** > **Deployments** > Click **Connect**.
   - Choose **Drivers** (Node.js).
   - Copy the connection string format:
     ```
     mongodb+srv://<username>:<password>@costflowcluster.xxxxx.mongodb.net/costflow?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials.

---

## Part 2: Deploying to Render (Free Web Service)

### Method A: One-Click Blueprint Deployment (Recommended)

1. Push your repository to **GitHub** or **GitLab**.
2. Sign in to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** > **Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically detect `render.yaml`.
6. When prompted for environment variables, add your `MONGODB_URI` from Part 1.
7. Click **Apply**. Render will run:
   - `npm run install:all`
   - `npm run build`
   - `npm start`
8. Your free live demo URL will be generated (e.g., `https://costflow-erp.onrender.com`).

---

### Method B: Manual Web Service Setup

If you prefer to configure manually without Blueprint:

1. Sign in to [Render](https://dashboard.render.com/).
2. Click **New +** > **Web Service**.
3. Connect your repository.
4. Set the following settings:
   - **Name**: `costflow-erp`
   - **Region**: Any free region (e.g. `Oregon (US West)` or `Frankfurt (EU)`)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm run install:all && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Instance Type**: `Free`
5. Click **Advanced** and add the following **Environment Variables**:
   | Key | Value | Description |
   |---|---|---|
   | `NODE_ENV` | `production` | Enables production optimizations |
   | `SERVE_CLIENT` | `true` | Serves client static build via Express |
   | `PORT` | `10000` | Port assigned by Render |
   | `MONGODB_URI` | `mongodb+srv://<user>:<pwd>@...` | MongoDB Atlas Connection String |
6. Click **Create Web Service**.

---

## Part 3: Automated Database Seeding

Upon first boot, the backend automatically runs `seedDatabase()` which populates:
- 5 Baseline Products matching the design
- 12 Raw Materials with real-world PET preforms, caps, labels, shrink film, and chemicals
- 8 Suppliers with Cairo & Alexandria industrial zones, contact numbers, and purchase orders
- Live production run order `#PO-1025` (78% completion)
- Real-time factory activities and low-stock alerts

---

## Part 4: Standalone / Offline Fallback Mode

If you deploy without configuring `MONGODB_URI`, the server detects that no cloud database is attached and **automatically starts with an internal in-memory document store**.
- **The live demo will NEVER crash or throw 500 connection errors.**
- All CRUD actions (adding products, updating stock, creating suppliers, calculating costs) continue to function smoothly in real-time.

---

## Health Check & Monitoring

- **Health Check Endpoint**: `/api/health`
  ```json
  {
    "status": "online",
    "timestamp": "2026-11-24T06:07:34.318Z",
    "service": "CostFlow ERP API",
    "version": "1.0.0",
    "environment": "production"
  }
  ```
- Render uses this path to monitor instance uptime and auto-restart if necessary.
