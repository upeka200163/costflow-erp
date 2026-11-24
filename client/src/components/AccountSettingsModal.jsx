import React, { useState } from 'react';
import {
  X,
  Shield,
  KeyRound,
  Smartphone,
  Bell,
  Globe2,
  CheckCircle2,
  Save,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AccountSettingsModal = ({ isOpen, onClose }) => {
  const { currentUser, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('security'); // 'security' | 'notifications' | 'preferences'
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [twoFa, setTwoFa] = useState(currentUser.twoFactorEnabled);
  const [emailAlerts, setEmailAlerts] = useState(currentUser.emailAlerts);
  const [currency, setCurrency] = useState('EGP');

  if (!isOpen) return null;

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast('New passwords do not match!', 'error');
      return;
    }
    showToast('Account password updated successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSaveSettings = () => {
    showToast('Account settings and preferences updated!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Account & Security Settings</h3>
            <p className="text-xs text-slate-400">Configure security credentials, 2FA, and preferences</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 px-6 pt-4 border-b border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 font-bold transition-all relative ${
              activeTab === 'security'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Security & Password
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`pb-3 ml-4 font-bold transition-all relative ${
              activeTab === 'notifications'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`pb-3 ml-4 font-bold transition-all relative ${
              activeTab === 'preferences'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            System Preferences
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {/* Tab 1: Security & Password */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <form onSubmit={handlePasswordChange} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  <span>Change Password</span>
                </span>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwords.currentPassword}
                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                    placeholder="••••••••"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              {/* 2FA Toggle */}
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Two-Factor Authentication (2FA)</h4>
                    <p className="text-slate-400 text-[11px]">Require authenticator code on plant logins</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFa}
                    onChange={(e) => {
                      setTwoFa(e.target.checked);
                      showToast(`Two-Factor Authentication ${e.target.checked ? 'Enabled' : 'Disabled'}`);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
              </div>
            </div>
          )}

          {/* Tab 2: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">Low Stock Alert Notifications</h4>
                    <p className="text-slate-400 text-[11px]">Instant alerts when PET preforms fall below safety threshold</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="accent-blue-600 w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <div>
                    <h4 className="font-bold text-slate-800">Production Waste Variance (Over 2%)</h4>
                    <p className="text-slate-400 text-[11px]">Notify immediately when scrap spikes on any bottling line</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <div>
                    <h4 className="font-bold text-slate-800">Machine Maintenance Due</h4>
                    <p className="text-slate-400 text-[11px]">Reminder 2 hours before scheduled conveyor lubrication</p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: System Preferences */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="EGP">Egyptian Pound (EGP)</option>
                    <option value="USD">US Dollar ($)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit of Volume Measure</label>
                  <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl">
                    <option value="metric">Metric (Milliliters & Liters)</option>
                    <option value="fluid_oz">US Fluid Ounces (fl oz)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              className="flex items-center gap-1.5 px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
