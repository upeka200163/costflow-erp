import React, { useState } from 'react';
import { Settings, Shield, Building2, Bell, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { showToast } = useApp();

  const [settings, setSettings] = useState({
    factoryName: 'CostFlow Water Factory #1',
    currency: 'EGP',
    electricityRate: '1.90',
    wasteThreshold: '2.0',
    lowStockNotice: '5000',
    managerEmail: 'ahmed.mohamed@waterfactory.eg',
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Factory configuration settings saved!');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <Settings className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Factory Settings
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              System parameters, currency defaults, and alert thresholds
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 card-shadow max-w-2xl">
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Factory Unit Name</label>
            <input
              type="text"
              value={settings.factoryName}
              onChange={(e) => setSettings({ ...settings, factoryName: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">System Currency</label>
              <input
                type="text"
                disabled
                value={settings.currency}
                className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">Industrial Electricity Rate (EGP/kWh)</label>
              <input
                type="number"
                step="0.05"
                value={settings.electricityRate}
                onChange={(e) => setSettings({ ...settings, electricityRate: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">Waste Rate Alert Threshold (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.wasteThreshold}
                onChange={(e) => setSettings({ ...settings, wasteThreshold: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">Default Low Stock Alert Buffer (pcs)</label>
              <input
                type="number"
                value={settings.lowStockNotice}
                onChange={(e) => setSettings({ ...settings, lowStockNotice: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Factory Manager Alert Email</label>
            <input
              type="email"
              value={settings.managerEmail}
              onChange={(e) => setSettings({ ...settings, managerEmail: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Factory Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
