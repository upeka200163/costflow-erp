import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Scale,
  Droplets,
  PackageCheck,
  CheckCircle2,
  Copy,
  Save,
  Download,
  AlertCircle,
} from 'lucide-react';
import { WaterBottleIcon, WaterCupIcon, WaterPackIcon } from '../components/ProductThumbnails';
import { useApp } from '../context/AppContext';

export const BomStudioPage = () => {
  const { showToast } = useApp();

  const formats = [
    { id: '600', name: 'Water Bottle 600 ml', defaultWeight: 18, capSize: '28 mm PCO 1881', labelType: 'BOPP Wrap', baselineCost: 1.45 },
    { id: '330', name: 'Water Bottle 330 ml', defaultWeight: 13.5, capSize: '28 mm PCO 1881', labelType: 'BOPP Wrap', baselineCost: 1.10 },
    { id: '1500', name: 'Water Bottle 1.50 L', defaultWeight: 28, capSize: '28 mm PCO 1881', labelType: 'BOPP Wrap', baselineCost: 2.20 },
    { id: '200', name: 'Water Cup 200 ml', defaultWeight: 7.2, capSize: 'Alu Peel Foil', labelType: 'Printed Cup', baselineCost: 0.75 },
    { id: 'pack6', name: 'Water Pack (6 x 600ml)', defaultWeight: 108, capSize: '6x 28mm Caps', labelType: 'Bundle Pack', baselineCost: 8.50 },
  ];

  const [selectedFormat, setSelectedFormat] = useState(formats[0]);
  const [annualVolume, setAnnualVolume] = useState(15000000); // 15 million bottles / year

  // Interactive Recipe Parameters
  const [recipe, setRecipe] = useState({
    resinGrade: 'Virgin PET (Food Grade)',
    preformWeight: 18.0,
    resinPricePerKg: 44.5,
    capType: '28mm Lightweight 1.9g',
    capCost: 0.12,
    labelMicron: 38,
    labelCost: 0.06,
    shrinkFilmCost: 0.04,
    waterFiltrationCost: 0.048,
    blowingEnergyKwh: 0.035,
    kwhRate: 1.90,
    directLabor: 0.32,
    machineDeprec: 0.22,
    factoryOverhead: 0.21,
  });

  // Calculate costs
  const preformResinCost = (recipe.preformWeight / 1000) * recipe.resinPricePerKg;
  const powerCost = recipe.blowingEnergyKwh * recipe.kwhRate;
  const rawMaterialTotal = +(preformResinCost + recipe.capCost + recipe.labelCost + recipe.shrinkFilmCost + recipe.waterFiltrationCost).toFixed(3);
  const totalUnitCost = +(rawMaterialTotal + recipe.directLabor + powerCost + recipe.machineDeprec + recipe.factoryOverhead).toFixed(2);

  // Lightweight optimization scenario: e.g. reducing preform by 2.2 grams (18g -> 15.8g)
  const optimizedWeight = Math.max(10, recipe.preformWeight - 2.2);
  const optimizedPreformCost = (optimizedWeight / 1000) * recipe.resinPricePerKg;
  const optimizedUnitCost = +(totalUnitCost - (preformResinCost - optimizedPreformCost)).toFixed(2);
  const unitSavings = +(totalUnitCost - optimizedUnitCost).toFixed(2);
  const annualSavingsEGP = Math.round(unitSavings * annualVolume);
  const annualPlasticReductionTons = Math.round(((2.2 * annualVolume) / 1000000) * 10) / 10;

  const handleApplyLightweight = () => {
    setRecipe({ ...recipe, preformWeight: optimizedWeight });
    showToast(`Applied eco-lightweighting: Preform reduced to ${optimizedWeight}g!`);
  };

  const handleSaveRecipe = () => {
    showToast(`BOM Recipe saved for ${selectedFormat.name}!`);
  };

  const handleFormatChange = (fmt) => {
    setSelectedFormat(fmt);
    setRecipe({
      ...recipe,
      preformWeight: fmt.defaultWeight,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bill of Materials (BOM) & Recipe Studio
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Component-level formula engineering, resin grammage optimization, and annual cost impact
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveRecipe}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Save Recipe</span>
          </button>
        </div>
      </div>

      {/* Format Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {formats.map((fmt) => (
          <button
            key={fmt.id}
            onClick={() => handleFormatChange(fmt)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              selectedFormat.id === fmt.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600/30'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            <span>{fmt.name}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                selectedFormat.id === fmt.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {fmt.defaultWeight}g
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Detailed Recipe Formula Editor (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 card-shadow space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Formula Engineering: {selectedFormat.name}
              </h3>
              <p className="text-xs text-slate-400">Tweak physical inputs to observe live cost fluctuations</p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              BOM-REV-2026.4
            </span>
          </div>

          {/* Section 1: Preform & Resin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              <span>1. PET Preform & Polymer Resin</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Resin Grade
                </label>
                <select
                  value={recipe.resinGrade}
                  onChange={(e) => setRecipe({ ...recipe, resinGrade: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-medium"
                >
                  <option value="Virgin PET (Food Grade)">Virgin PET (Food Grade)</option>
                  <option value="25% rPET Blend">25% rPET Blend</option>
                  <option value="50% rPET Eco">50% rPET Eco</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-slate-600">Weight</label>
                  <span className="font-bold text-blue-600">{recipe.preformWeight} g</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  step="0.1"
                  value={recipe.preformWeight}
                  onChange={(e) => setRecipe({ ...recipe, preformWeight: Number(e.target.value) })}
                  className="w-full accent-blue-600 mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Polymer Cost / Kg
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={recipe.resinPricePerKg}
                  onChange={(e) => setRecipe({ ...recipe, resinPricePerKg: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                />
              </div>
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between px-1">
              <span>Calculated Preform Unit Cost:</span>
              <span className="font-bold text-slate-800">{preformResinCost.toFixed(3)} EGP</span>
            </div>
          </div>

          {/* Section 2: Closures, Labels & Packaging */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>2. Closures & Labeling Packaging</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Cap Closure Cost (EGP)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={recipe.capCost}
                  onChange={(e) => setRecipe({ ...recipe, capCost: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  BOPP Label Cost (EGP)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={recipe.labelCost}
                  onChange={(e) => setRecipe({ ...recipe, labelCost: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  PE Shrink Wrap Film (EGP)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={recipe.shrinkFilmCost}
                  onChange={(e) => setRecipe({ ...recipe, shrinkFilmCost: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Water Treatment & Utilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>3. Water Treatment, Power & Production Line</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Ozone & RO Filtration / Unit
                </label>
                <input
                  type="number"
                  step="0.005"
                  value={recipe.waterFiltrationCost}
                  onChange={(e) => setRecipe({ ...recipe, waterFiltrationCost: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Direct Labor / Unit
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={recipe.directLabor}
                  onChange={(e) => setRecipe({ ...recipe, directLabor: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Factory Overheads / Unit
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={recipe.factoryOverhead}
                  onChange={(e) => setRecipe({ ...recipe, factoryOverhead: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Cost Breakdown & Lightweighting ROI Simulator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Unit Cost Result Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Computed Unit Economics</h3>

            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-5 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <span className="text-xs text-blue-100 font-medium block">Total Manufacturing Cost</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black">{totalUnitCost.toFixed(2)} EGP</span>
                <span className="text-xs text-blue-200 font-medium">/ bottle</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/20 flex justify-between text-xs text-blue-100">
                <span>Raw Materials: {rawMaterialTotal} EGP</span>
                <span>Labor & Overheads: {(totalUnitCost - rawMaterialTotal).toFixed(2)} EGP</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">PET Preform ({recipe.preformWeight}g):</span>
                <span className="font-bold text-slate-800">{preformResinCost.toFixed(3)} EGP</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Cap Closure:</span>
                <span className="font-bold text-slate-800">{recipe.capCost.toFixed(3)} EGP</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Label & Shrink Film:</span>
                <span className="font-bold text-slate-800">{(recipe.labelCost + recipe.shrinkFilmCost).toFixed(3)} EGP</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Water Treatment & Chemical:</span>
                <span className="font-bold text-slate-800">{recipe.waterFiltrationCost.toFixed(3)} EGP</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">High-Pressure Blowing Power:</span>
                <span className="font-bold text-slate-800">{powerCost.toFixed(3)} EGP</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Direct Labor & Line Overhead:</span>
                <span className="font-bold text-slate-800">{(recipe.directLabor + recipe.machineDeprec + recipe.factoryOverhead).toFixed(2)} EGP</span>
              </div>
            </div>
          </div>

          {/* Eco-Lightweighting & Annual Savings Simulator */}
          <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-100 card-shadow space-y-4">
            <div className="flex items-center gap-2 text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold">Eco-Lightweighting Savings ROI</h3>
            </div>

            <p className="text-xs text-emerald-700 leading-relaxed">
              Engineering bottle preform from <strong>{recipe.preformWeight}g</strong> down to{' '}
              <strong>{optimizedWeight}g</strong> yields immediate margin gains at scale.
            </p>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-emerald-900">
                <span>Annual Factory Volume</span>
                <span className="font-mono">{(annualVolume / 1000000).toFixed(1)}M bottles</span>
              </div>
              <input
                type="range"
                min="5000000"
                max="50000000"
                step="1000000"
                value={annualVolume}
                onChange={(e) => setAnnualVolume(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 space-y-1">
                <span className="text-[10px] text-slate-500 font-medium block">Annual Net Profit Boost</span>
                <span className="text-lg font-black text-emerald-600">
                  +{annualSavingsEGP.toLocaleString()} EGP
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 space-y-1">
                <span className="text-[10px] text-slate-500 font-medium block">Plastic Waste Reduction</span>
                <span className="text-lg font-black text-teal-600">
                  -{annualPlasticReductionTons} Tons
                </span>
              </div>
            </div>

            <button
              onClick={handleApplyLightweight}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <TrendingDown className="w-4 h-4" />
              <span>Apply {optimizedWeight}g Lightweighting Recipe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
