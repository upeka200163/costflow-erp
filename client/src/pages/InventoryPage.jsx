import React, { useState } from 'react';
import { Warehouse, Boxes, CheckCircle2, AlertTriangle, ArrowUpRight, Plus, RefreshCw } from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { WaterBottleIcon, WaterCupIcon, WaterPackIcon } from '../components/ProductThumbnails';
import { useApp } from '../context/AppContext';

export const InventoryPage = () => {
  const { showToast } = useApp();

  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 'FG-001',
      name: 'Water Bottle 600 ml',
      batch: 'B-202611-01',
      warehouse: 'Zone A - Cold Clean',
      quantity: 45000,
      reserved: 12000,
      unitCost: 1.45,
      totalValue: 65250,
      status: 'Ready for Dispatch',
    },
    {
      id: 'FG-002',
      name: 'Water Bottle 330 ml',
      batch: 'B-202611-02',
      warehouse: 'Zone A - Cold Clean',
      quantity: 38000,
      reserved: 8000,
      unitCost: 1.10,
      totalValue: 41800,
      status: 'Ready for Dispatch',
    },
    {
      id: 'FG-003',
      name: 'Water Bottle 1.50 L',
      batch: 'B-202611-03',
      warehouse: 'Zone B - Pallet Staging',
      quantity: 28000,
      reserved: 15000,
      unitCost: 2.20,
      totalValue: 61600,
      status: 'Quality Quarantine',
    },
    {
      id: 'FG-004',
      name: 'Water Cup 200 ml',
      batch: 'B-202611-04',
      warehouse: 'Zone C - Small Form Stacking',
      quantity: 60000,
      reserved: 20000,
      unitCost: 0.75,
      totalValue: 45000,
      status: 'Ready for Dispatch',
    },
    {
      id: 'FG-005',
      name: 'Water Pack (6 x 600ml)',
      batch: 'B-202611-05',
      warehouse: 'Zone B - Pallet Staging',
      quantity: 12500,
      reserved: 4500,
      unitCost: 8.50,
      totalValue: 106250,
      status: 'Ready for Dispatch',
    },
  ]);

  const handleAudit = () => {
    showToast('Warehouse inventory stock audited and reconciled successfully!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Warehouse className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Finished Goods Inventory
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Real-time pallet tracking, batch auditing, and warehouse stock
            </p>
          </div>
        </div>

        <button
          onClick={handleAudit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Audit Stock</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          title="Total Finished Bottles"
          value="183,500"
          change="+14% this week"
          icon={Boxes}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Total Inventory Value"
          value="319,900 EGP"
          change="+6% vs budget"
          icon={Warehouse}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          title="Warehouse Utilization"
          value="82.4%"
          comparisonText="Capacity 220,000 units"
          icon={CheckCircle2}
          iconBgColor="bg-sky-50 text-sky-600"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-800">Warehouse Finished Stock</h3>
          <span className="text-xs font-semibold text-slate-400">Cairo Central Plant</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Item Code</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Batch #</th>
                <th className="py-3.5 px-4">Storage Zone</th>
                <th className="py-3.5 px-4">On Hand</th>
                <th className="py-3.5 px-4">Reserved</th>
                <th className="py-3.5 px-4">Unit Cost</th>
                <th className="py-3.5 px-4">Total Stock Value</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 font-medium text-slate-700">
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-blue-600">{item.id}</td>
                  <td className="py-4 px-4 font-bold text-slate-800">{item.name}</td>
                  <td className="py-4 px-4 font-mono text-slate-500">{item.batch}</td>
                  <td className="py-4 px-4 text-slate-600">{item.warehouse}</td>
                  <td className="py-4 px-4 font-bold text-slate-900">{item.quantity.toLocaleString()}</td>
                  <td className="py-4 px-4 text-amber-600">{item.reserved.toLocaleString()}</td>
                  <td className="py-4 px-4">{item.unitCost.toFixed(2)} EGP</td>
                  <td className="py-4 px-4 font-bold text-slate-900">{item.totalValue.toLocaleString()} EGP</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.status.includes('Ready')
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                          : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status.includes('Ready') ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
