import React, { useState } from 'react';
import { Factory, Play, Pause, CheckCircle, AlertOctagon, TrendingUp, Plus, Clock } from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { useApp } from '../context/AppContext';

export const ProductionPage = () => {
  const { showToast } = useApp();

  const [orders, setOrders] = useState([
    {
      id: 'PO-1025',
      product: 'Water Bottle - 600 ml',
      planned: 10000,
      produced: 7850,
      remaining: 2150,
      progress: 78,
      status: 'In Progress',
      line: 'Line 1 (High Speed Automated)',
      speedBph: '12,000 BPH',
      wasteRate: 2.4,
      operator: 'Ahmed Mohamed',
    },
    {
      id: 'PO-1024',
      product: 'Water Bottle - 1.50 L',
      planned: 15000,
      produced: 15000,
      remaining: 0,
      progress: 100,
      status: 'Completed',
      line: 'Line 2 (Large Volume)',
      speedBph: '6,000 BPH',
      wasteRate: 1.8,
      operator: 'Khaled Omar',
    },
    {
      id: 'PO-1026',
      product: 'Water Cup - 200 ml',
      planned: 8000,
      produced: 2400,
      remaining: 5600,
      progress: 30,
      status: 'In Progress',
      line: 'Line 3 (Thermoforming & Sealing)',
      speedBph: '14,000 CPH',
      wasteRate: 2.1,
      operator: 'Sameh Youssef',
    },
  ]);

  const handleSimulateIncrement = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId && ord.status === 'In Progress') {
          const nextProduced = Math.min(ord.planned, ord.produced + 500);
          const nextRemaining = ord.planned - nextProduced;
          const nextProgress = Math.round((nextProduced / ord.planned) * 100);
          const isDone = nextProduced >= ord.planned;
          if (isDone) {
            showToast(`Order #${ord.id} completed 100%!`);
          } else {
            showToast(`Batch production logged: +500 bottles on Order #${ord.id}`);
          }
          return {
            ...ord,
            produced: nextProduced,
            remaining: nextRemaining,
            progress: nextProgress,
            status: isDone ? 'Completed' : 'In Progress',
          };
        }
        return ord;
      })
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Factory className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Production Orders & Lines
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Live manufacturing progress, waste rates, and bottling lines
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KpiCard
          title="Active Bottling Lines"
          value="3 of 3"
          change="100% Operational"
          icon={Factory}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Factory Overall Waste Rate"
          value="2.2%"
          change="-0.3% vs target"
          icon={AlertOctagon}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <KpiCard
          title="Average Efficiency (OEE)"
          value="89.5%"
          change="+4.2%"
          icon={TrendingUp}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          title="Today's Total Output"
          value="25,250"
          comparisonText="Units Produced"
          icon={CheckCircle}
          iconBgColor="bg-sky-50 text-sky-600"
        />
      </div>

      {/* Production Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-600">#{order.id}</span>
                <h3 className="text-base font-bold text-slate-900 leading-tight mt-0.5">{order.product}</h3>
                <p className="text-xs text-slate-400 font-medium">{order.line}</p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                  order.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    order.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'
                  }`}
                />
                {order.status}
              </span>
            </div>

            {/* Progress Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Progress ({order.progress}%)</span>
                <span>{order.produced.toLocaleString()} / {order.planned.toLocaleString()}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-300"
                  style={{ width: `${order.progress}%` }}
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center">
              <div>
                <span className="text-[10px] text-slate-400 block">Operator</span>
                <span className="text-xs font-semibold text-slate-800">{order.operator}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Speed</span>
                <span className="text-xs font-semibold text-slate-800">{order.speedBph}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Waste</span>
                <span className="text-xs font-semibold text-amber-600">{order.wasteRate}%</span>
              </div>
            </div>

            {/* Controls */}
            {order.status === 'In Progress' && (
              <button
                onClick={() => handleSimulateIncrement(order.id)}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Log +500 Bottles Produced</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
