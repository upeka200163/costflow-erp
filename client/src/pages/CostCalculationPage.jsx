import React, { useState } from 'react';
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Layers,
  Zap,
  BarChart3,
  Scale,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

export const CostCalculationPage = () => {
  const [activeTab, setActiveTab] = useState('unit-simulator'); // 'unit-simulator' | 'break-even' | 'resin-sensitivity'

  // Input Parameters
  const [params, setParams] = useState({
    bottleVolume: 600,
    preformWeightGrams: 18,
    preformCostPerKg: 44.5,
    capCost: 0.12,
    labelCost: 0.06,
    shrinkFilmPerBottle: 0.04,
    waterFiltrationCostPerL: 0.08,
    electricKwhPerBottle: 0.035,
    electricityRatePerKwh: 1.90,
    directLaborCostPerBottle: 0.32,
    maintenanceDepreciation: 0.22,
    factoryOverhead: 0.21,
    targetProfitMargin: 30, // percent
  });

  // Break-even parameters
  const [monthlyFixedOverhead, setMonthlyFixedOverhead] = useState(250000); // 250k EGP fixed factory costs

  // Calculations
  const preformCost = (params.preformWeightGrams / 1000) * params.preformCostPerKg;
  const rawWaterCost = (params.bottleVolume / 1000) * params.waterFiltrationCostPerL;
  const powerCost = params.electricKwhPerBottle * params.electricityRatePerKwh;

  const totalRawMaterials = +(preformCost + params.capCost + params.labelCost + params.shrinkFilmPerBottle + rawWaterCost).toFixed(2);
  const totalLabor = +params.directLaborCostPerBottle.toFixed(2);
  const totalMachines = +(powerCost + params.maintenanceDepreciation).toFixed(2);
  const totalOverheads = +params.factoryOverhead.toFixed(2);

  const unitCost = +(totalRawMaterials + totalLabor + totalMachines + totalOverheads).toFixed(2);
  const sellingPrice = +(unitCost * (1 + params.targetProfitMargin / 100)).toFixed(2);
  const unitProfit = +(sellingPrice - unitCost).toFixed(2);

  // Break-even mechanics
  const contributionMarginPerUnit = +(sellingPrice - (totalRawMaterials + totalLabor + powerCost)).toFixed(2);
  const breakEvenBottles = Math.round(monthlyFixedOverhead / Math.max(0.1, contributionMarginPerUnit));

  // Break-even chart data (from 0 to 1,000,000 bottles)
  const breakEvenChartData = [
    { volume: '0', fixedCost: monthlyFixedOverhead, totalCost: monthlyFixedOverhead, revenue: 0 },
    { volume: '200K', fixedCost: monthlyFixedOverhead, totalCost: Math.round(monthlyFixedOverhead + 200000 * (unitCost - 0.2)), revenue: Math.round(200000 * sellingPrice) },
    { volume: '400K', fixedCost: monthlyFixedOverhead, totalCost: Math.round(monthlyFixedOverhead + 400000 * (unitCost - 0.2)), revenue: Math.round(400000 * sellingPrice) },
    { volume: '600K', fixedCost: monthlyFixedOverhead, totalCost: Math.round(monthlyFixedOverhead + 600000 * (unitCost - 0.2)), revenue: Math.round(600000 * sellingPrice) },
    { volume: '800K', fixedCost: monthlyFixedOverhead, totalCost: Math.round(monthlyFixedOverhead + 800000 * (unitCost - 0.2)), revenue: Math.round(800000 * sellingPrice) },
    { volume: '1.0M', fixedCost: monthlyFixedOverhead, totalCost: Math.round(monthlyFixedOverhead + 1000000 * (unitCost - 0.2)), revenue: Math.round(1000000 * sellingPrice) },
  ];

  // Resin sensitivity curve (Resin from 35 EGP/kg to 60 EGP/kg)
  const resinSensitivityData = [
    { resinPrice: '35 EGP', unitCost: +(unitCost - (params.preformCostPerKg - 35) * 0.018).toFixed(2), unitProfit: +(sellingPrice - (unitCost - (params.preformCostPerKg - 35) * 0.018)).toFixed(2) },
    { resinPrice: '40 EGP', unitCost: +(unitCost - (params.preformCostPerKg - 40) * 0.018).toFixed(2), unitProfit: +(sellingPrice - (unitCost - (params.preformCostPerKg - 40) * 0.018)).toFixed(2) },
    { resinPrice: '45 EGP', unitCost: +(unitCost - (params.preformCostPerKg - 45) * 0.018).toFixed(2), unitProfit: +(sellingPrice - (unitCost - (params.preformCostPerKg - 45) * 0.018)).toFixed(2) },
    { resinPrice: '50 EGP', unitCost: +(unitCost - (params.preformCostPerKg - 50) * 0.018).toFixed(2), unitProfit: +(sellingPrice - (unitCost - (params.preformCostPerKg - 50) * 0.018)).toFixed(2) },
    { resinPrice: '55 EGP', unitCost: +(unitCost - (params.preformCostPerKg - 55) * 0.018).toFixed(2), unitProfit: +(sellingPrice - (unitCost - (params.preformCostPerKg - 55) * 0.018)).toFixed(2) },
    { resinPrice: '60 EGP', unitCost: +(unitCost - (params.preformCostPerKg - 60) * 0.018).toFixed(2), unitProfit: +(sellingPrice - (unitCost - (params.preformCostPerKg - 60) * 0.018)).toFixed(2) },
  ];

  const donutData = [
    { name: 'Raw Materials', value: totalRawMaterials, color: '#2563EB' },
    { name: 'Labor', value: totalLabor, color: '#10B981' },
    { name: 'Machines', value: totalMachines, color: '#38BDF8' },
    { name: 'Overheads', value: totalOverheads, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Calculator className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Manufacturing Cost Engine & Break-Even
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Unit economics modeling, contribution margin, and polymer price sensitivity
            </p>
          </div>
        </div>

        {/* Navigation Tabs Switcher */}
        <div className="flex items-center p-1 bg-white rounded-2xl border border-slate-200/80 shadow-xs shrink-0">
          <button
            onClick={() => setActiveTab('unit-simulator')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'unit-simulator'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Unit Simulator
          </button>
          <button
            onClick={() => setActiveTab('break-even')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'break-even'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Break-Even Analysis
          </button>
          <button
            onClick={() => setActiveTab('resin-sensitivity')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'resin-sensitivity'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Resin Sensitivity
          </button>
        </div>
      </div>

      {/* Tab 1: Unit Simulator */}
      {activeTab === 'unit-simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 card-shadow space-y-5">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Manufacturing Input Variables</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  PET Preform Weight ({params.preformWeightGrams} g)
                </label>
                <input
                  type="range"
                  min="10"
                  max="35"
                  step="0.5"
                  value={params.preformWeightGrams}
                  onChange={(e) => setParams({ ...params, preformWeightGrams: Number(e.target.value) })}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  PET Resin Cost / Kg ({params.preformCostPerKg} EGP)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={params.preformCostPerKg}
                  onChange={(e) => setParams({ ...params, preformCostPerKg: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cap Cost ({params.capCost} EGP)</label>
                <input
                  type="number"
                  step="0.01"
                  value={params.capCost}
                  onChange={(e) => setParams({ ...params, capCost: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Label Cost ({params.labelCost} EGP)</label>
                <input
                  type="number"
                  step="0.01"
                  value={params.labelCost}
                  onChange={(e) => setParams({ ...params, labelCost: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Direct Labor / Bottle ({params.directLaborCostPerBottle} EGP)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={params.directLaborCostPerBottle}
                  onChange={(e) => setParams({ ...params, directLaborCostPerBottle: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Factory Overhead / Bottle ({params.factoryOverhead} EGP)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={params.factoryOverhead}
                  onChange={(e) => setParams({ ...params, factoryOverhead: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">Target Profit Margin</label>
                  <span className="font-bold text-emerald-600">{params.targetProfitMargin}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={params.targetProfitMargin}
                  onChange={(e) => setParams({ ...params, targetProfitMargin: Number(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between space-y-6">
            <h3 className="text-sm font-bold text-slate-800">Computed Unit Economics</h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100/80">
                <span className="text-[11px] font-medium text-slate-500 block">Unit Cost</span>
                <span className="text-2xl font-black text-blue-600 mt-1 block">{unitCost} EGP</span>
              </div>

              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100/80">
                <span className="text-[11px] font-medium text-slate-500 block">Selling Price</span>
                <span className="text-2xl font-black text-emerald-600 mt-1 block">{sellingPrice} EGP</span>
              </div>
            </div>

            <div className="relative w-44 h-44 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-slate-800">Unit Profit</span>
                <span className="text-sm font-black text-emerald-600">+{unitProfit} EGP</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Raw Materials:</span>
                <span className="font-bold text-slate-900">{totalRawMaterials} EGP</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Direct Labor:</span>
                <span className="font-bold text-slate-900">{totalLabor} EGP</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Power & Machines:</span>
                <span className="font-bold text-slate-900">{totalMachines} EGP</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Factory Overheads:</span>
                <span className="font-bold text-slate-900">{totalOverheads} EGP</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Break-Even Crossover Analysis */}
      {activeTab === 'break-even' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 card-shadow space-y-1">
              <span className="text-xs text-slate-400 font-medium">Monthly Fixed Overhead</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-extrabold text-slate-900">{monthlyFixedOverhead.toLocaleString()} EGP</h3>
              </div>
              <input
                type="range"
                min="100000"
                max="500000"
                step="25000"
                value={monthlyFixedOverhead}
                onChange={(e) => setMonthlyFixedOverhead(Number(e.target.value))}
                className="w-full accent-blue-600 mt-2"
              />
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-100 card-shadow space-y-1">
              <span className="text-xs text-slate-400 font-medium">Unit Contribution Margin</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-extrabold text-emerald-600">+{contributionMarginPerUnit} EGP</h3>
                <span className="text-xs text-slate-400">({Math.round((contributionMarginPerUnit / sellingPrice) * 100)}% CMR)</span>
              </div>
              <p className="text-[11px] text-slate-400">Selling Price ({sellingPrice} EGP) - Direct Variable Cost</p>
            </div>

            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-5 rounded-3xl text-white shadow-lg shadow-blue-500/20 space-y-1">
              <span className="text-xs text-blue-200 font-medium">Break-Even Volume</span>
              <h3 className="text-3xl font-black">{breakEvenBottles.toLocaleString()}</h3>
              <p className="text-[11px] text-blue-100">Bottles / month to cover all factory fixed overheads</p>
            </div>
          </div>

          {/* Break-Even Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Crossover Profit Chart</h3>
                <p className="text-xs text-slate-400">Revenue line vs Total Cost line with Break-Even point</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
                Profitable after ~{Math.round(breakEvenBottles / 1000)}K bottles
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={breakEvenChartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="volume" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} EGP`]} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Total Revenue" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="totalCost" name="Total Costs" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="fixedCost" name="Fixed Overhead" stroke="#94A3B8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Resin Price Sensitivity */}
      {activeTab === 'resin-sensitivity' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Virgin PET Polymer Price Sensitivity Curve</h3>
              <p className="text-xs text-slate-400">
                Simulating how raw polymer shifts (+/- 30%) affect your per-bottle unit margin
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resinSensitivityData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="resinPrice" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip formatter={(val) => [`${val} EGP`]} />
                <Legend />
                <Area type="monotone" dataKey="unitProfit" name="Profit Margin / Bottle" stroke="#10B981" fill="url(#profitGrad)" strokeWidth={2.5} />
                <Line type="monotone" dataKey="unitCost" name="Total Cost / Bottle" stroke="#2563EB" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
