import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  FlaskConical,
  Droplet,
  Gauge,
  Plus,
  Printer,
  X,
  Search,
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { useApp } from '../context/AppContext';

export const QualityControlPage = () => {
  const { showToast } = useApp();

  const [tests, setTests] = useState([
    {
      id: 'QC-9941',
      batch: 'B-202611-01',
      product: 'Water Bottle 600 ml',
      time: '10:45 AM Today',
      analyst: 'Dr. Mona Samir',
      tds: 132,
      ph: 7.42,
      ozone: 0.35,
      turbidity: 0.18,
      torque: 16.4,
      status: 'Passed',
    },
    {
      id: 'QC-9940',
      batch: 'B-202611-02',
      product: 'Water Bottle 330 ml',
      time: '08:15 AM Today',
      analyst: 'Tamer Adel',
      tds: 128,
      ph: 7.38,
      ozone: 0.32,
      turbidity: 0.15,
      torque: 15.8,
      status: 'Passed',
    },
    {
      id: 'QC-9939',
      batch: 'B-202611-03',
      product: 'Water Bottle 1.50 L',
      time: 'Yesterday',
      analyst: 'Dr. Mona Samir',
      tds: 148,
      ph: 7.55,
      ozone: 0.22,
      turbidity: 0.38,
      torque: 18.2,
      status: 'Warning',
    },
    {
      id: 'QC-9938',
      batch: 'B-202611-04',
      product: 'Water Cup 200 ml',
      time: 'Yesterday',
      analyst: 'Tamer Adel',
      tds: 130,
      ph: 7.40,
      ozone: 0.36,
      turbidity: 0.16,
      torque: 14.5,
      status: 'Passed',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoa, setSelectedCoa] = useState(null);

  const [newTest, setNewTest] = useState({
    batch: 'B-202611-05',
    product: 'Water Bottle 600 ml',
    analyst: 'Dr. Mona Samir',
    tds: 134,
    ph: 7.45,
    ozone: 0.33,
    turbidity: 0.19,
    torque: 16.2,
  });

  const handleCreateTest = (e) => {
    e.preventDefault();
    const testRecord = {
      id: `QC-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newTest,
      time: 'Just now',
      status: newTest.ph >= 7.2 && newTest.ph <= 7.6 && newTest.tds <= 150 ? 'Passed' : 'Warning',
    };
    setTests([testRecord, ...tests]);
    setIsModalOpen(false);
    showToast(`Laboratory inspection logged for Batch ${testRecord.batch}: ${testRecord.status}!`);
  };

  const handlePrintCoa = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <FlaskConical className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quality Assurance & Laboratory Testing
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Chemical water standards, microbiological validation, and packaging torque integrity
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log Quality Inspection</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KpiCard
          title="Batch Compliance Rate"
          value="99.4%"
          change="+0.2% vs target"
          icon={ShieldCheck}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          title="Average Spring Water TDS"
          value="132 ppm"
          comparisonText="Target: 110 - 150 ppm"
          icon={Droplet}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Average pH Index"
          value="7.41 pH"
          comparisonText="Target: 7.20 - 7.60"
          icon={Gauge}
          iconBgColor="bg-sky-50 text-sky-600"
        />
        <KpiCard
          title="Certified Batches Released"
          value="48 Batches"
          change="100% NFSA Compliant"
          icon={FileCheck}
          iconBgColor="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Laboratory Parameters Reference Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Dissolved Solids (TDS)', current: '132 ppm', min: '110', max: '150', status: 'Optimal' },
          { label: 'pH Balance', current: '7.42 pH', min: '7.20', max: '7.60', status: 'Optimal' },
          { label: 'Residual Ozone at Bottling', current: '0.35 ppm', min: '0.20', max: '0.40', status: 'Active Disinfection' },
          { label: 'Turbidity Clarity', current: '0.18 NTU', min: '0.00', max: '< 0.50', status: 'Crystal Clear' },
        ].map((param, i) => (
          <div key={i} className="bg-white rounded-3xl p-5 border border-slate-100 card-shadow space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 block">{param.label}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-slate-800">{param.current}</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {param.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex justify-between font-mono">
              <span>Standard:</span>
              <span>{param.min} - {param.max}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Laboratory Test Logs Table */}
      <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Laboratory Quality Log</h3>
            <p className="text-xs text-slate-400">Chemical and physical integrity test archive</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">ISO 22000 / HACCP Certified</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Test ID</th>
                <th className="py-3.5 px-4">Batch Number</th>
                <th className="py-3.5 px-4">Product Format</th>
                <th className="py-3.5 px-4">Tested TDS</th>
                <th className="py-3.5 px-4">Tested pH</th>
                <th className="py-3.5 px-4">Ozone ppm</th>
                <th className="py-3.5 px-4">Cap Torque</th>
                <th className="py-3.5 px-4">QA Officer</th>
                <th className="py-3.5 px-4">Compliance</th>
                <th className="py-3.5 px-4 text-center">Certificate (CoA)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 font-medium text-slate-700">
              {tests.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-blue-600">{t.id}</td>
                  <td className="py-4 px-4 font-mono text-slate-900 font-bold">{t.batch}</td>
                  <td className="py-4 px-4 font-semibold text-slate-800">{t.product}</td>
                  <td className="py-4 px-4 font-bold">{t.tds} ppm</td>
                  <td className="py-4 px-4 font-bold">{t.ph}</td>
                  <td className="py-4 px-4">{t.ozone} ppm</td>
                  <td className="py-4 px-4">{t.torque} in-lbs</td>
                  <td className="py-4 px-4 text-slate-500">{t.analyst}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        t.status === 'Passed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                          : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          t.status === 'Passed' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => setSelectedCoa(t)}
                      className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      View CoA
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log QC Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Record Quality Laboratory Sample</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Batch Number</label>
                <input
                  type="text"
                  required
                  value={newTest.batch}
                  onChange={(e) => setNewTest({ ...newTest, batch: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Format</label>
                <select
                  value={newTest.product}
                  onChange={(e) => setNewTest({ ...newTest, product: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Water Bottle 600 ml">Water Bottle 600 ml</option>
                  <option value="Water Bottle 330 ml">Water Bottle 330 ml</option>
                  <option value="Water Bottle 1.50 L">Water Bottle 1.50 L</option>
                  <option value="Water Cup 200 ml">Water Cup 200 ml</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">TDS (ppm)</label>
                  <input
                    type="number"
                    value={newTest.tds}
                    onChange={(e) => setNewTest({ ...newTest, tds: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">pH Level</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTest.ph}
                    onChange={(e) => setNewTest({ ...newTest, ph: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ozone (ppm)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTest.ozone}
                    onChange={(e) => setNewTest({ ...newTest, ozone: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cap Torque (in-lbs)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newTest.torque}
                    onChange={(e) => setNewTest({ ...newTest, torque: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Save QA Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate of Analysis (CoA) Modal */}
      {selectedCoa && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-slate-200 space-y-6">
            <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">CostFlow Water Factory #1</h2>
                <p className="text-xs text-slate-500 font-medium">10th Industrial Zone, Cairo, Egypt</p>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 block">
                  Certificate of Analysis (CoA)
                </span>
              </div>
              <button onClick={() => setSelectedCoa(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <span className="text-slate-400 block">Batch Code:</span>
                <span className="font-mono font-bold text-slate-900">{selectedCoa.batch}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Product:</span>
                <span className="font-bold text-slate-900">{selectedCoa.product}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Inspection Date:</span>
                <span className="font-medium text-slate-700">{selectedCoa.time}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Authorized Officer:</span>
                <span className="font-medium text-slate-700">{selectedCoa.analyst}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Laboratory Chemical Assay:</h4>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                <div className="p-2.5 flex justify-between bg-slate-50/50">
                  <span>Total Dissolved Solids (TDS):</span>
                  <span className="font-mono font-bold">{selectedCoa.tds} ppm (110-150)</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>pH Potential:</span>
                  <span className="font-mono font-bold">{selectedCoa.ph} pH (7.2-7.6)</span>
                </div>
                <div className="p-2.5 flex justify-between bg-slate-50/50">
                  <span>Residual Dissolved Ozone:</span>
                  <span className="font-mono font-bold">{selectedCoa.ozone} ppm (0.2-0.4)</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>Closure Opening Torque:</span>
                  <span className="font-mono font-bold">{selectedCoa.torque} in-lbs</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>NFSA & Codex Compliant</strong>: This bottled batch meets Egyptian standard specifications (ES 1588) for natural drinking water.
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t">
              <button
                onClick={handlePrintCoa}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
