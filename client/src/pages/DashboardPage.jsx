import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Coins,
  Tag,
  TrendingUp,
  Package,
  Calendar,
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { KpiCard } from '../components/KpiCard';
import { WaterBottleIcon, ConveyorBanner } from '../components/ProductThumbnails';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const DashboardPage = () => {
  const { setActiveTab } = useApp();
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getDashboard();
      if (res) {
        setData(res);
      }
    };
    fetchData();
  }, []);

  // Default fallback data matching Image 1 exactly
  const kpis = data?.kpis || {
    totalProduction: { value: '125,000', change: '+8%', comparison: 'vs last week' },
    manufacturingCost: { value: '178,750 EGP', change: '+5%', comparison: 'Total this period' },
    costPerUnit: { value: '1.43 EGP', change: '-2%', comparison: 'Avg. cost' },
    expectedProfit: { value: '68,750 EGP', change: '+12%', comparison: 'This period' },
    inventoryValue: { value: '420,000 EGP', change: '+6%', comparison: 'Total stock' },
  };

  const chartData = data?.productionOverview || [
    { date: 'Nov 1', production: 90000, target: 80000 },
    { date: 'Nov 8', production: 110000, target: 105000 },
    { date: 'Nov 15', production: 95000, target: 100000 },
    { date: 'Nov 22', production: 125000, target: 115000 },
    { date: 'Nov 30', production: 140000, target: 130000 },
  ];

  const costBreakdownData = [
    { name: 'Raw Materials', value: 48, color: '#2563EB' },
    { name: 'Labor', value: 22, color: '#10B981' },
    { name: 'Machines', value: 15, color: '#38BDF8' },
    { name: 'Overheads', value: 15, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="relative z-10 space-y-1.5 max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, Ahmed <span className="inline-block animate-wave text-2xl">👋</span>
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Here's what's happening in your factory today.
          </p>
        </div>

        {/* Ambient Bottling Conveyor Illustration */}
        <div className="w-full md:w-96 shrink-0">
          <ConveyorBanner className="h-28" />
        </div>
      </div>

      {/* 5 KPI Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Total Production"
          value={kpis.totalProduction.value}
          change={kpis.totalProduction.change}
          comparisonText={kpis.totalProduction.comparison}
          icon={Boxes}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Manufacturing Cost"
          value={kpis.manufacturingCost.value}
          change={kpis.manufacturingCost.change}
          comparisonText={kpis.manufacturingCost.comparison}
          icon={Coins}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <KpiCard
          title="Cost Per Unit"
          value={kpis.costPerUnit.value}
          change={kpis.costPerUnit.change}
          comparisonText={kpis.costPerUnit.comparison}
          icon={Tag}
          iconBgColor="bg-sky-50 text-sky-600"
        />
        <KpiCard
          title="Expected Profit"
          value={kpis.expectedProfit.value}
          change={kpis.expectedProfit.change}
          comparisonText={kpis.expectedProfit.comparison}
          icon={TrendingUp}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          title="Inventory Value"
          value={kpis.inventoryValue.value}
          change={kpis.inventoryValue.change}
          comparisonText={kpis.inventoryValue.comparison}
          icon={Package}
          iconBgColor="bg-amber-50 text-amber-700"
        />
      </div>

      {/* Middle Row: Production Overview + Cost Breakdown + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Production Overview Line Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Production Overview</h3>
            </div>
            <div className="relative">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60 transition-colors">
                <span>{timeRange}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Production</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-sky-300 border-t border-dashed border-sky-400" />
              <span>Target</span>
            </div>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}K`}
                />
                <Tooltip
                  formatter={(value, name) => [`${value.toLocaleString()} units`, name === 'production' ? 'Production' : 'Target']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="production"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  dot={{ r: 3.5, fill: '#2563EB', stroke: '#fff', strokeWidth: 1.5 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#93C5FD"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Breakdown Donut Chart (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <h3 className="text-sm font-bold text-slate-800">Cost Breakdown</h3>
          </div>

          <div className="flex items-center justify-between gap-2 my-auto">
            {/* Donut with center text */}
            <div className="relative w-44 h-44 shrink-0 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    innerRadius={52}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {costBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-sm font-extrabold text-slate-800 leading-tight">1.43 EGP</span>
                <span className="text-[10px] text-slate-400 font-medium">Per Unit</span>
              </div>
            </div>

            {/* Legend Labels */}
            <div className="space-y-2 text-xs font-medium shrink-0">
              {costBreakdownData.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">Top Products</h3>
            <button
              onClick={() => setActiveTab('products')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { id: 1, name: 'Water Bottle', size: '1.5 L', cost: '1.85 EGP', share: '32%' },
              { id: 2, name: 'Water Bottle', size: '600 ml', cost: '1.45 EGP', share: '28%' },
              { id: 3, name: 'Water Bottle', size: '330 ml', cost: '1.10 EGP', share: '25%' },
            ].map((p) => (
              <div
                key={p.id}
                onClick={() => setActiveTab('products')}
                className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <WaterBottleIcon size={p.size} className="w-9 h-11" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium">{p.size}</span>
                  </div>
                </div>

                <div className="text-right space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">{p.cost}</span>
                  <span className="inline-block text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    {p.share}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activities + Alerts & Notifications + Production Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Activities */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Recent Activities</h3>
            </div>
            <button
              onClick={() => setActiveTab('production')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-100">
            {[
              {
                time: '2 min ago',
                title: 'Production order #PO-1025 completed',
                detail: '(10,000 bottles)',
                dotColor: 'bg-blue-600 ring-4 ring-blue-100',
              },
              {
                time: '15 min ago',
                title: 'New raw material received',
                detail: '(PET Preform - 50,000 pcs)',
                dotColor: 'bg-emerald-500 ring-4 ring-emerald-100',
              },
              {
                time: '1 hour ago',
                title: 'Sales order #SO-458 processed',
                detail: '(25,000 bottles)',
                dotColor: 'bg-indigo-500 ring-4 ring-indigo-100',
              },
            ].map((act, i) => (
              <div key={i} className="relative group">
                <span className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ${act.dotColor}`} />
                <span className="text-[11px] font-semibold text-slate-400 block">{act.time}</span>
                <p className="text-xs font-semibold text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                  {act.title}
                </p>
                <span className="text-[11px] text-slate-500">{act.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-800">Alerts & Notifications</h3>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </div>
            <button
              onClick={() => setActiveTab('raw-materials')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: AlertTriangle,
                color: 'text-rose-500 bg-rose-50',
                title: 'Raw material (PET Preform) stock is low',
                detail: '(5,000 pcs left)',
                time: '10 min ago',
                action: () => setActiveTab('raw-materials'),
              },
              {
                icon: AlertCircle,
                color: 'text-amber-500 bg-amber-50',
                title: 'Production waste rate is higher than expected',
                detail: '(3.5% > 2%)',
                time: '30 min ago',
                action: () => setActiveTab('production'),
              },
              {
                icon: Info,
                color: 'text-blue-500 bg-blue-50',
                title: 'Maintenance due for Bottle Blowing Machine',
                detail: 'Standard diagnostic cycle',
                time: '1 hour ago',
                action: () => setActiveTab('dashboard'),
              },
            ].map((alert, i) => {
              const Icon = alert.icon;
              return (
                <div
                  key={i}
                  onClick={alert.action}
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className={`p-1.5 rounded-xl shrink-0 ${alert.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-800 leading-snug truncate group-hover:text-blue-600 transition-colors">
                        {alert.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-2">{alert.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{alert.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Production Status Active Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Production Status</h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/50">
              In Progress
            </span>
          </div>

          <div className="space-y-4">
            {/* Bottling Line Visual Preview */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0 flex items-center justify-center border border-slate-200">
                <svg viewBox="0 0 100 60" className="w-full h-full opacity-80" fill="none">
                  <rect width="100" height="60" fill="#0F172A" />
                  <path d="M0 45H100" stroke="#334155" strokeWidth="4" />
                  {[15, 35, 55, 75].map((x) => (
                    <rect key={x} x={x} y="15" width="12" height="28" rx="2" fill="#38BDF8" opacity="0.85" />
                  ))}
                  <circle cx="50" cy="10" r="4" fill="#10B981" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-slate-800 truncate">Order #PO-1025</h4>
                <p className="text-[11px] text-slate-500 font-medium">Water Bottle - 600 ml</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Progress</span>
                <span className="text-blue-600">78%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full transition-all duration-500"
                  style={{ width: '78%' }}
                />
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Produced</span>
                <span className="text-xs font-bold text-slate-800">7,850</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Planned</span>
                <span className="text-xs font-bold text-slate-800">10,000</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Remaining</span>
                <span className="text-xs font-bold text-slate-800">2,150</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
