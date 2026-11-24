import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCcw, DollarSign, Layers, Zap, Users } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const CostCalculationPage = () => {
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

  // Calculate costs live
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

  const chartData = [
    { name: 'Raw Materials', value: totalRawMaterials, color: '#2563EB' },
    { name: 'Labor', value: totalLabor, color: '#10B981' },
    { name: 'Machines', value: totalMachines, color: '#38BDF8' },
    { name: 'Overheads', value: totalOverheads, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Calculator className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cost Calculation Engine
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Interactive unit economics simulation: raw materials, resin prices, power, and margin
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters Controls (7 cols) */}
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

        {/* Live Simulation Results (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between space-y-6">
          <h3 className="text-sm font-bold text-slate-800">Computed Unit Economics</h3>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100/80">
              <span className="text-[11px] font-medium text-slate-500 block">Unit Manufacturing Cost</span>
              <span className="text-2xl font-black text-blue-600 mt-1 block">{unitCost} EGP</span>
            </div>

            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-100/80">
              <span className="text-[11px] font-medium text-slate-500 block">Recommended Price</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">{sellingPrice} EGP</span>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="relative w-44 h-44 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-slate-800">Profit/Unit</span>
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
    </div>
  );
};
