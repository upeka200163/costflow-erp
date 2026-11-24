import React from 'react';
import { X, Printer, Droplets, CheckCircle, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrintableCostSheetModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl p-8 border border-slate-200 my-8 space-y-6 print:m-0 print:p-4 print:shadow-none print:border-none print:max-w-none">
        {/* Document Header */}
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md print:bg-black">
              <Droplets className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">COSTFLOW WATER FACTORY #1</h1>
              <p className="text-xs text-slate-500 font-medium">10th of Ramadan Industrial Zone B4, Cairo, Egypt</p>
              <p className="text-[10px] text-slate-400 font-mono">Commercial Reg: 849201 • Tax Card: 394-118-204</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-700 print:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title & Metadata */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider block">Official Document</span>
            <h2 className="text-sm font-extrabold text-slate-900">Standard Product Cost Audit Sheet</h2>
          </div>
          <div className="text-right">
            <span className="font-mono font-bold text-slate-900 block">DOC-2026-WB600</span>
            <span className="text-slate-400 text-[11px]">Audit Period: November 2026</span>
          </div>
        </div>

        {/* Product Spec Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Product Specifications</h3>
          <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[11px]">Product:</span>
              <span className="font-bold text-slate-900">Water Bottle 600 ml</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Package Format:</span>
              <span className="font-bold text-slate-900">PET Single-Serve Bottle</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Nominal Volume:</span>
              <span className="font-bold text-slate-900">600 ml (0.6 L)</span>
            </div>
          </div>
        </div>

        {/* Itemized Cost Breakdown Table */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Manufacturing Unit Cost Breakdown</h3>
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-2.5 px-3">Cost Component</th>
                <th className="py-2.5 px-3">Physical Specification</th>
                <th className="py-2.5 px-3 text-right">Unit Rate (EGP)</th>
                <th className="py-2.5 px-3 text-right">Share (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              <tr>
                <td className="py-2 px-3 font-semibold">1. PET Preform (Body)</td>
                <td className="py-2 px-3 text-slate-500">18.0g Virgin Food-Grade PET Resin</td>
                <td className="py-2 px-3 text-right font-mono font-bold">0.800 EGP</td>
                <td className="py-2 px-3 text-right text-slate-500">55.2%</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">2. Closure Cap</td>
                <td className="py-2 px-3 text-slate-500">28mm PCO 1881 HDPE Knurled Cap</td>
                <td className="py-2 px-3 text-right font-mono font-bold">0.120 EGP</td>
                <td className="py-2 px-3 text-right text-slate-500">8.3%</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">3. Wrap-Around Label</td>
                <td className="py-2 px-3 text-slate-500">38µ BOPP Printed Roll-fed Label</td>
                <td className="py-2 px-3 text-right font-mono font-bold">0.060 EGP</td>
                <td className="py-2 px-3 text-right text-slate-500">4.1%</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">4. Shrink Secondary Pack</td>
                <td className="py-2 px-3 text-slate-500">PE Shrink Wrap Film per Bottle</td>
                <td className="py-2 px-3 text-right font-mono font-bold">0.040 EGP</td>
                <td className="py-2 px-3 text-right text-slate-500">2.8%</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">5. Water & Ozonation</td>
                <td className="py-2 px-3 text-slate-500">Deep-Well RO Filtration & Minerals</td>
                <td className="py-2 px-3 text-right font-mono font-bold">0.048 EGP</td>
                <td className="py-2 px-3 text-right text-slate-500">3.3%</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">6. High-Pressure Power</td>
                <td className="py-2 px-3 text-slate-500">40-Bar Blowing & Capping Electricity</td>
                <td className="py-2 px-3 text-right font-mono font-bold">0.067 EGP</td>
                <td className="py-2 px-3 text-right text-slate-500">4.6%</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-semibold">7. Direct Line Labor</td>
                <td className="py-2 px-3 text-slate-500">Monoblock Line Operators & Palletizing</td>
                <td className="py-2 px-3 text-right font-mono font-bold">0.315 EGP</td>
                <td className="py-2 px-3 text-right text-slate-500">21.7%</td>
              </tr>
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                <td className="py-2.5 px-3 text-slate-900" colSpan={2}>TOTAL UNIT MANUFACTURING COST</td>
                <td className="py-2.5 px-3 text-right text-blue-600 font-mono text-sm">1.450 EGP</td>
                <td className="py-2.5 px-3 text-right text-slate-900">100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Commercial Pricing Analysis */}
        <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 grid grid-cols-3 gap-3 text-center text-xs">
          <div>
            <span className="text-slate-500 block">Unit Cost</span>
            <span className="text-sm font-bold text-slate-900 font-mono">1.45 EGP</span>
          </div>
          <div>
            <span className="text-slate-500 block">Wholesale Price</span>
            <span className="text-sm font-bold text-emerald-600 font-mono">2.00 EGP</span>
          </div>
          <div>
            <span className="text-slate-500 block">Gross Profit Margin</span>
            <span className="text-sm font-black text-blue-700">27.5% (+0.55 EGP)</span>
          </div>
        </div>

        {/* Quality Certification Stamp */}
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200">
          <Award className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            <strong>NFSA Inspection Approved</strong>: Production meets Egyptian Standard ES 1588 / Codex Stan 227-2001 drinking water compliance.
          </span>
        </div>

        {/* Signatures */}
        <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs">
          <div className="space-y-6">
            <span className="text-slate-400 block">Prepared By:</span>
            <div className="border-b border-slate-300 pb-1">
              <span className="font-bold text-slate-900 block">Ahmed Mohamed</span>
              <span className="text-slate-400 text-[11px]">Factory Operations Manager</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-slate-400 block">Approved & Audited By:</span>
            <div className="border-b border-slate-300 pb-1">
              <span className="font-bold text-slate-900 block">Dr. Mona Samir</span>
              <span className="text-slate-400 text-[11px]">Director of Quality & Financial Control</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="pt-3 border-t border-slate-100 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Audit Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
