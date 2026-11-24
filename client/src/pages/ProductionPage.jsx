import React, { useState } from 'react';
import {
  Factory,
  Play,
  CheckCircle,
  AlertOctagon,
  TrendingUp,
  Plus,
  Clock,
  Kanban,
  LayoutList,
  ArrowRight,
  User,
  Gauge,
  X,
  Sparkles,
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { WaterBottleIcon, WaterCupIcon, WaterPackIcon } from '../components/ProductThumbnails';
import { useApp } from '../context/AppContext';

export const ProductionPage = () => {
  const { showToast } = useApp();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'lines'
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const [orders, setOrders] = useState([
    {
      id: 'PO-1025',
      product: 'Water Bottle - 600 ml',
      planned: 10000,
      produced: 7850,
      stage: 'running', // 'planned' | 'setup' | 'running' | 'qa' | 'completed'
      line: 'Line 1 (High Speed Automated)',
      speedBph: '12,000 BPH',
      wasteRate: 2.4,
      operator: 'Ahmed Mohamed',
      priority: 'High',
    },
    {
      id: 'PO-1027',
      product: 'Water Bottle - 330 ml',
      planned: 20000,
      produced: 0,
      stage: 'planned',
      line: 'Line 1 (High Speed Automated)',
      speedBph: '14,000 BPH',
      wasteRate: 1.5,
      operator: 'Yasser Fathy',
      priority: 'Medium',
    },
    {
      id: 'PO-1028',
      product: 'Water Pack - 6 pcs',
      planned: 5000,
      produced: 1200,
      stage: 'setup',
      line: 'Line 2 (Collated Bundling)',
      speedBph: '3,000 PPH',
      wasteRate: 2.0,
      operator: 'Mahmoud Hassan',
      priority: 'Normal',
    },
    {
      id: 'PO-1026',
      product: 'Water Cup - 200 ml',
      planned: 8000,
      produced: 7600,
      stage: 'qa',
      line: 'Line 3 (Thermoforming & Sealing)',
      speedBph: '14,000 CPH',
      wasteRate: 2.1,
      operator: 'Sameh Youssef',
      priority: 'High',
    },
    {
      id: 'PO-1024',
      product: 'Water Bottle - 1.50 L',
      planned: 15000,
      produced: 15000,
      stage: 'completed',
      line: 'Line 2 (Large Volume)',
      speedBph: '6,000 BPH',
      wasteRate: 1.8,
      operator: 'Khaled Omar',
      priority: 'Completed',
    },
  ]);

  const [newOrder, setNewOrder] = useState({
    product: 'Water Bottle - 600 ml',
    planned: 12000,
    line: 'Line 1 (High Speed Automated)',
    operator: 'Ahmed Mohamed',
    priority: 'High',
  });

  const columns = [
    { id: 'planned', label: '1. Planned Queue', color: 'border-slate-300 bg-slate-50/50' },
    { id: 'setup', label: '2. Line Setup & Sanitization', color: 'border-amber-300 bg-amber-50/30' },
    { id: 'running', label: '3. In Active Bottling', color: 'border-blue-400 bg-blue-50/30' },
    { id: 'qa', label: '4. QA Incubation & Hold', color: 'border-purple-300 bg-purple-50/30' },
    { id: 'completed', label: '5. Palletized & Completed', color: 'border-emerald-400 bg-emerald-50/30' },
  ];

  const advanceStage = (orderId) => {
    const stageOrder = ['planned', 'setup', 'running', 'qa', 'completed'];
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const currentIdx = stageOrder.indexOf(ord.stage);
          if (currentIdx < stageOrder.length - 1) {
            const nextStage = stageOrder[currentIdx + 1];
            const nextProduced = nextStage === 'completed' ? ord.planned : ord.produced;
            showToast(`Order #${ord.id} advanced to ${nextStage.toUpperCase()}!`);
            return {
              ...ord,
              stage: nextStage,
              produced: nextProduced,
            };
          }
        }
        return ord;
      })
    );
  };

  const handleSimulateBatch = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId && ord.stage === 'running') {
          const next = Math.min(ord.planned, ord.produced + 1000);
          showToast(`Logged +1,000 bottles output on #${ord.id}`);
          return {
            ...ord,
            produced: next,
            stage: next >= ord.planned ? 'qa' : 'running',
          };
        }
        return ord;
      })
    );
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const created = {
      id: `PO-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newOrder,
      planned: Number(newOrder.planned),
      produced: 0,
      stage: 'planned',
      speedBph: '12,000 BPH',
      wasteRate: 2.0,
    };
    setOrders([created, ...orders]);
    setIsOrderModalOpen(false);
    showToast(`Work Order #${created.id} scheduled for ${created.product}!`);
  };

  const renderProductThumb = (prodName) => {
    if (prodName.includes('Cup') || prodName.includes('200')) return <WaterCupIcon className="w-8 h-10" />;
    if (prodName.includes('Pack')) return <WaterPackIcon className="w-8 h-8" />;
    return <WaterBottleIcon size={prodName} className="w-8 h-10" />;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Factory className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Production Execution & Line Kanban
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Live manufacturing stages, high-speed line speeds, and shift batch throughput
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white border border-slate-200/80 rounded-2xl p-1 shadow-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'kanban' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban Board</span>
            </button>
            <button
              onClick={() => setViewMode('lines')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'lines' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Bottling Lines</span>
            </button>
          </div>

          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Work Order</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KpiCard
          title="Active Bottling Lines"
          value="3 Lines Online"
          change="Line 1, 2, 3 Active"
          icon={Factory}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Overall Line Waste Rate"
          value="2.2%"
          change="-0.3% vs target"
          icon={AlertOctagon}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <KpiCard
          title="Factory Overall OEE"
          value="89.5%"
          change="+4.2% shift avg"
          icon={TrendingUp}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          title="Bottles Produced Today"
          value="31,650"
          comparisonText="78% of Daily Quota"
          icon={CheckCircle}
          iconBgColor="bg-sky-50 text-sky-600"
        />
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const columnOrders = orders.filter((o) => o.stage === col.id);
            return (
              <div key={col.id} className="flex flex-col min-w-[240px] space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-white rounded-2xl border border-slate-100 card-shadow">
                  <span className="text-xs font-bold text-slate-800">{col.label}</span>
                  <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {columnOrders.length}
                  </span>
                </div>

                {/* Column Cards Container */}
                <div className={`flex-1 rounded-3xl p-2.5 border ${col.color} space-y-3 min-h-[420px]`}>
                  {columnOrders.map((ord) => {
                    const progress = Math.min(100, Math.round((ord.produced / ord.planned) * 100));
                    return (
                      <div
                        key={ord.id}
                        className="bg-white rounded-2xl p-4 border border-slate-100 card-shadow card-hover-shadow space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-[11px] font-mono font-bold text-blue-600">#{ord.id}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                              ord.priority === 'High'
                                ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {ord.priority}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          {renderProductThumb(ord.product)}
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 leading-snug truncate">
                              {ord.product}
                            </h4>
                            <p className="text-[10px] text-slate-400 truncate">{ord.line}</p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                            <span>{progress}% Output</span>
                            <span className="font-mono text-slate-800">
                              {ord.produced.toLocaleString()} / {ord.planned.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                          <div className="flex items-center gap-1 truncate">
                            <User className="w-3 h-3 text-slate-400" />
                            <span className="truncate">{ord.operator}</span>
                          </div>
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            {ord.wasteRate}% waste
                          </span>
                        </div>

                        {/* Actions on Card */}
                        <div className="pt-1 flex items-center gap-1.5">
                          {ord.stage === 'running' && (
                            <button
                              onClick={() => handleSimulateBatch(ord.id)}
                              className="flex-1 py-1 text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" />
                              <span>+1k</span>
                            </button>
                          )}
                          {ord.stage !== 'completed' && (
                            <button
                              onClick={() => advanceStage(ord.id)}
                              className="flex-1 py-1 text-[11px] font-bold bg-slate-900 hover:bg-black text-white rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <span>Advance</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Bottling Lines Overview View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'Line 1: High Speed Automated Monoblock',
              status: 'Running at 100%',
              speed: '12,000 Bottles / Hour',
              activeOrder: 'Order #PO-1025 (Water Bottle - 600 ml)',
              oee: '92.4%',
              operator: 'Ahmed Mohamed',
            },
            {
              name: 'Line 2: Large Volume & Bundling Line',
              status: 'Setup in Progress',
              speed: '6,000 Bottles / Hour',
              activeOrder: 'Order #PO-1028 (Water Pack 6pcs)',
              oee: '84.8%',
              operator: 'Khaled Omar',
            },
            {
              name: 'Line 3: Thermoform Water Cup Filling',
              status: 'QA Sample Testing',
              speed: '14,000 Cups / Hour',
              activeOrder: 'Order #PO-1026 (Water Cup 200 ml)',
              oee: '90.1%',
              operator: 'Sameh Youssef',
            },
          ].map((line, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {line.status}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-2">{line.name}</h3>
                <p className="text-xs text-blue-600 font-semibold mt-1">{line.activeOrder}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Rated Speed:</span>
                  <span className="font-bold text-slate-900">{line.speed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Line OEE Efficiency:</span>
                  <span className="font-bold text-emerald-600">{line.oee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Shift Lead:</span>
                  <span className="font-bold text-slate-900">{line.operator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Work Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">Schedule Work Order</h3>
              <button onClick={() => setIsOrderModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product Format</label>
                <select
                  value={newOrder.product}
                  onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Water Bottle - 600 ml">Water Bottle - 600 ml</option>
                  <option value="Water Bottle - 330 ml">Water Bottle - 330 ml</option>
                  <option value="Water Bottle - 1.50 L">Water Bottle - 1.50 L</option>
                  <option value="Water Cup - 200 ml">Water Cup - 200 ml</option>
                  <option value="Water Pack - 6 pcs">Water Pack - 6 pcs</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Planned Production Volume (Units)</label>
                <input
                  type="number"
                  step="500"
                  required
                  value={newOrder.planned}
                  onChange={(e) => setNewOrder({ ...newOrder, planned: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Production Bottling Line</label>
                <select
                  value={newOrder.line}
                  onChange={(e) => setNewOrder({ ...newOrder, line: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Line 1 (High Speed Automated)">Line 1 (High Speed Automated)</option>
                  <option value="Line 2 (Large Volume)">Line 2 (Large Volume)</option>
                  <option value="Line 3 (Thermoforming & Sealing)">Line 3 (Thermoforming & Sealing)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Shift Supervisor</label>
                <input
                  type="text"
                  required
                  value={newOrder.operator}
                  onChange={(e) => setNewOrder({ ...newOrder, operator: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Dispatch to Line
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
