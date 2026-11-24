import React, { useState, useEffect } from 'react';
import {
  Settings,
  Shield,
  Building2,
  Bell,
  Save,
  Database,
  Server,
  ExternalLink,
  Layers,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  FileCode,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const SettingsPage = () => {
  const { showToast } = useApp();

  const [settings, setSettings] = useState({
    factoryName: 'CostFlow Water Factory #1',
    currency: 'EGP',
    electricityRate: '1.90',
    wasteThreshold: '2.0',
    lowStockNotice: '5000',
    managerEmail: 'ahmed.mohamed@waterfactory.eg',
  });

  // Database inspection state
  const [dbData, setDbData] = useState(null);
  const [dbLoading, setDbLoading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState('products');
  const [copied, setCopied] = useState(false);

  const fetchDatabaseInfo = async () => {
    setDbLoading(true);
    try {
      const data = await api.getDatabaseOverview();
      if (data) {
        setDbData(data);
      }
    } catch (e) {
      console.warn('Failed to load database overview:', e);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseInfo();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Factory configuration settings saved!');
  };

  const copyUriTemplate = () => {
    navigator.clipboard.writeText(
      'mongodb+srv://<username>:<password>@cluster0.mongodb.net/costflow?retryWrites=true&w=majority'
    );
    setCopied(true);
    showToast('MongoDB Atlas connection template copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const collections = dbData?.collections || {
    products: { count: 5, data: [] },
    rawmaterials: { count: 5, data: [] },
    suppliers: { count: 8, data: [] },
    productionorders: { count: 5, data: [] },
    activities: { count: 3, data: [] },
    alerts: { count: 3, data: [] },
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Settings className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Settings & Database
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              System parameters, MongoDB database inspector, and Atlas connectivity
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Factory Configuration Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 card-shadow">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-800">Operational Parameters</h3>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">Factory Unit Name</label>
              <input
                type="text"
                value={settings.factoryName}
                onChange={(e) => setSettings({ ...settings, factoryName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">System Currency</label>
                <input
                  type="text"
                  disabled
                  value={settings.currency}
                  className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">Power Rate (EGP/kWh)</label>
                <input
                  type="number"
                  step="0.05"
                  value={settings.electricityRate}
                  onChange={(e) => setSettings({ ...settings, electricityRate: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">Waste Threshold (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.wasteThreshold}
                  onChange={(e) => setSettings({ ...settings, wasteThreshold: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">Min Stock Alert (pcs)</label>
                <input
                  type="number"
                  value={settings.lowStockNotice}
                  onChange={(e) => setSettings({ ...settings, lowStockNotice: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">Manager Alert Email</label>
              <input
                type="email"
                value={settings.managerEmail}
                onChange={(e) => setSettings({ ...settings, managerEmail: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all text-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Parameters</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Database Inspector & Connection Status (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Database Status Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Database Engine & Status</h3>
                  <p className="text-[11px] text-slate-400">Database Name: <code className="font-bold text-blue-600">costflow</code></p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fetchDatabaseInfo}
                  disabled={dbLoading}
                  className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  title="Refresh Database Stats"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${dbLoading ? 'animate-spin text-blue-600' : ''}`} />
                </button>
                <a
                  href="/api/database"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  <span>Raw API JSON</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Connection Banner */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
              dbData?.connectedToMongo
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                : 'bg-blue-50/70 border-blue-200 text-blue-800'
            }`}>
              <div className="flex items-center gap-2.5">
                {dbData?.connectedToMongo ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <Server className="w-5 h-5 text-blue-600 shrink-0" />
                )}
                <div>
                  <div className="text-xs font-bold">
                    {dbData?.connectionType || 'Universal In-Memory Document Store (Demo Mode)'}
                  </div>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    {dbData?.connectedToMongo
                      ? 'Live connection established with MongoDB instance.'
                      : 'Running standalone demo mode. Set MONGODB_URI to connect to MongoDB Atlas.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Collection Tabs */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">Database Collections:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(collections).map((colName) => {
                  const info = collections[colName];
                  const isSelected = selectedCollection === colName;
                  return (
                    <button
                      key={colName}
                      type="button"
                      onClick={() => setSelectedCollection(colName)}
                      className={`p-2.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                          : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-800 capitalize">{colName}</span>
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {info.count}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">documents</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Collection Inspector (JSON Preview) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-blue-600" />
                  <span>Collection: <code className="text-blue-600 font-mono">db.{selectedCollection}.find()</code></span>
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  Showing {collections[selectedCollection]?.count || 0} records
                </span>
              </div>

              <div className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-[11px] max-h-56 overflow-y-auto border border-slate-800 shadow-inner">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {JSON.stringify(collections[selectedCollection]?.data || [], null, 2)}
                </pre>
              </div>
            </div>

            {/* Quick Connect Guide */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>Connect MongoDB Atlas</span>
                </span>
                <button
                  type="button"
                  onClick={copyUriTemplate}
                  className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy URI Template'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Add <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono">MONGODB_URI</code> to your <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded font-mono">server/.env</code> file, then restart the server. You can also view and edit your database using <strong>MongoDB Compass</strong> or the <strong>MongoDB Atlas Web UI</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
