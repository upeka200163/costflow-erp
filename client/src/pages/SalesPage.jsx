import React from 'react';
import { Truck, MapPin, PackageCheck, UserCheck, TrendingUp } from 'lucide-react';
import { KpiCard } from '../components/KpiCard';

export const SalesPage = () => {
  const salesOrders = [
    {
      id: 'SO-458',
      client: 'Metro Supermarkets Cairo',
      product: 'Water Bottle 600 ml',
      quantity: '25,000 bottles',
      amount: '50,000 EGP',
      destination: 'Nasr City Hub',
      driver: 'Tarek Mahmoud (Truck #4)',
      status: 'In Transit',
    },
    {
      id: 'SO-457',
      client: 'HyperOne Giza',
      product: 'Water Bottle 1.50 L',
      quantity: '15,000 bottles',
      amount: '45,000 EGP',
      destination: 'Sheikh Zayed Warehouse',
      driver: 'Ibrahim Aly (Truck #2)',
      status: 'Delivered',
    },
    {
      id: 'SO-456',
      client: 'FreshMart Delta',
      product: 'Water Pack 6pcs',
      quantity: '5,000 packs',
      amount: '50,000 EGP',
      destination: 'Tanta Regional Depot',
      driver: 'Karim Nader (Truck #7)',
      status: 'Delivered',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sales & Distribution
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Customer dispatch, logistics fleet tracking, and wholesale invoicing
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          title="Monthly Dispatched Bottles"
          value="480,000"
          change="+18% vs target"
          icon={TrendingUp}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Active Delivery Fleets"
          value="8 Vehicles"
          change="100% on route"
          icon={Truck}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          title="On-Time Delivery Rate"
          value="98.2%"
          change="+1.5%"
          icon={PackageCheck}
          iconBgColor="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-800">Dispatch & Delivery Manifest</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Product & Quantity</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Destination</th>
                <th className="py-3.5 px-4">Logistics Assigned</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 font-medium text-slate-700">
              {salesOrders.map((so) => (
                <tr key={so.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-blue-600">#{so.id}</td>
                  <td className="py-4 px-4 font-bold text-slate-800">{so.client}</td>
                  <td className="py-4 px-4">{so.quantity} ({so.product})</td>
                  <td className="py-4 px-4 font-bold text-emerald-600">{so.amount}</td>
                  <td className="py-4 px-4 text-slate-600">{so.destination}</td>
                  <td className="py-4 px-4 text-slate-500">{so.driver}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        so.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {so.status}
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
