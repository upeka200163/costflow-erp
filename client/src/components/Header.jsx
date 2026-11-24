import React from 'react';
import { Search, Bell, Check, Clock, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const {
    setIsSearchOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    notificationCount,
    setNotificationCount,
    setActiveTab,
  } = useApp();

  const mockNotifications = [
    {
      id: 1,
      type: 'danger',
      title: 'Raw material (PET Preform) stock is low',
      time: '10 min ago',
      icon: AlertTriangle,
      color: 'text-red-500 bg-red-50',
      action: () => setActiveTab('raw-materials'),
    },
    {
      id: 2,
      type: 'warning',
      title: 'Production waste rate higher than expected (3.5% > 2%)',
      time: '30 min ago',
      icon: AlertCircle,
      color: 'text-amber-500 bg-amber-50',
      action: () => setActiveTab('production'),
    },
    {
      id: 3,
      type: 'info',
      title: 'Maintenance due for Bottle Blowing Machine',
      time: '1 hour ago',
      icon: Info,
      color: 'text-blue-500 bg-blue-50',
      action: () => setActiveTab('dashboard'),
    },
  ];

  return (
    <header className="h-16 px-8 flex items-center justify-between border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-10">
      {/* Global Search Bar */}
      <div className="relative w-96">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-normal text-slate-400 bg-slate-100/90 hover:bg-slate-100 rounded-xl border border-slate-200/60 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search anything...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Controls: Notifications & User Profile */}
      <div className="flex items-center gap-5">
        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 text-slate-500" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                <span className="text-xs font-bold text-slate-800">Notifications ({notificationCount})</span>
                <button
                  onClick={() => setNotificationCount(0)}
                  className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              </div>
              <div className="divide-y divide-slate-50 mt-1 max-h-72 overflow-y-auto">
                {mockNotifications.map((notif) => {
                  const Icon = notif.icon;
                  return (
                    <div
                      key={notif.id}
                      onClick={() => {
                        notif.action();
                        setIsNotificationsOpen(false);
                      }}
                      className="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer flex items-start gap-2.5 transition-colors"
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${notif.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-700 leading-snug">{notif.title}</p>
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {notif.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-blue-600 text-xs overflow-hidden">
                {/* Avatar illustration / photo */}
                <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" fill="#E2E8F0" />
                  <circle cx="20" cy="15" r="7" fill="#64748B" />
                  <path d="M8 36C8 29.3726 13.3726 24 20 24C26.6274 24 32 29.3726 32 36" fill="#64748B" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="hidden sm:block text-left">
            <h3 className="text-xs font-bold text-slate-800 leading-tight">Ahmed Mohamed</h3>
            <p className="text-[11px] text-slate-400 font-medium">Factory Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};
