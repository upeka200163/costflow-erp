import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Check,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
  Plus,
  Zap,
  Printer,
  FlaskConical,
  Factory,
  User,
  Settings,
  Shield,
  Building2,
  LogOut,
  ChevronDown,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const {
    setIsSearchOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    notificationCount,
    setNotificationCount,
    setActiveTab,
    setIsCostSheetOpen,
    currentUser,
    switchRole,
    switchPlant,
    setIsProfileModalOpen,
    setIsAccountSettingsOpen,
    setIsLogoutModalOpen,
  } = useApp();

  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className="h-16 px-8 flex items-center justify-between border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-30">
      {/* Global Search Bar */}
      <div className="relative w-80 sm:w-96">
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

      {/* Right Controls: Quick Actions + Notifications + Interactive User Profile */}
      <div className="flex items-center gap-4">
        {/* Quick Actions Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Quick Action</span>
          </button>

          {isQuickActionsOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 animate-in fade-in slide-in-from-top-2 duration-150 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 block">
                Factory Shortcuts
              </span>

              <button
                onClick={() => {
                  setActiveTab('production');
                  setIsQuickActionsOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 font-semibold text-slate-700 transition-colors"
              >
                <div className="p-1 rounded-lg bg-blue-50 text-blue-600">
                  <Factory className="w-3.5 h-3.5" />
                </div>
                <span>Schedule Work Order</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('quality-control');
                  setIsQuickActionsOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 font-semibold text-slate-700 transition-colors"
              >
                <div className="p-1 rounded-lg bg-emerald-50 text-emerald-600">
                  <FlaskConical className="w-3.5 h-3.5" />
                </div>
                <span>Log Laboratory QC Test</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('bom-studio');
                  setIsQuickActionsOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 font-semibold text-slate-700 transition-colors"
              >
                <div className="p-1 rounded-lg bg-purple-50 text-purple-600">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>BOM Recipe Studio</span>
              </button>

              <button
                onClick={() => {
                  setIsCostSheetOpen(true);
                  setIsQuickActionsOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 font-semibold text-slate-700 transition-colors border-t border-slate-100 mt-1"
              >
                <div className="p-1 rounded-lg bg-amber-50 text-amber-600">
                  <Printer className="w-3.5 h-3.5" />
                </div>
                <span>Print Official Cost Sheet</span>
              </button>
            </div>
          )}
        </div>

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

        {/* Interactive User Profile Section */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 pl-2 py-1 pr-1.5 border-l border-slate-200 hover:bg-slate-100/70 rounded-2xl transition-all focus:outline-none group"
            aria-expanded={isUserMenuOpen}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-sm">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-blue-600 text-xs overflow-hidden">
                  <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" fill="#E2E8F0" />
                    <circle cx="20" cy="15" r="7" fill="#64748B" />
                    <path d="M8 36C8 29.3726 13.3726 24 20 24C26.6274 24 32 29.3726 32 36" fill="#64748B" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
            </div>

            <div className="hidden sm:block text-left">
              <h3 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors flex items-center gap-1">
                <span>{currentUser.name}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </h3>
              <p className="text-[11px] text-slate-400 font-medium truncate max-w-[120px]">{currentUser.title}</p>
            </div>
          </button>

          {/* User Account Dropdown Menu */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150 text-xs">
              {/* Account Card Header */}
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 text-white space-y-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center ring-2 ring-white/30 shrink-0">
                    AM
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm leading-tight truncate">{currentUser.name}</h4>
                    <p className="text-[11px] text-blue-200 truncate">{currentUser.email}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-slate-300 font-medium truncate max-w-[170px]">{currentUser.plant}</span>
                  <span className="font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                    Admin
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left p-2.5 hover:bg-slate-50 rounded-2xl flex items-center gap-3 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <div className="p-1.5 rounded-xl bg-blue-50 text-blue-600">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block leading-tight">My Profile</span>
                    <span className="text-[10px] text-slate-400 font-normal">View & edit employee identity</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsAccountSettingsOpen(true);
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left p-2.5 hover:bg-slate-50 rounded-2xl flex items-center gap-3 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <div className="p-1.5 rounded-xl bg-slate-100 text-slate-600">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block leading-tight">Account Settings</span>
                    <span className="text-[10px] text-slate-400 font-normal">Security, 2FA & alerts</span>
                  </div>
                </button>

                {/* Switch Role Quick Switcher */}
                <div className="p-2.5 rounded-2xl hover:bg-slate-50 transition-colors space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Switch Active Role
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                    <button
                      onClick={() => {
                        switchRole('Factory Manager', 'Factory Manager');
                        setIsUserMenuOpen(false);
                      }}
                      className={`px-2 py-1 rounded-xl text-left font-medium transition-colors ${
                        currentUser.role === 'Factory Manager'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Factory Mgr
                    </button>
                    <button
                      onClick={() => {
                        switchRole('Quality Director', 'Quality Director');
                        setIsUserMenuOpen(false);
                      }}
                      className={`px-2 py-1 rounded-xl text-left font-medium transition-colors ${
                        currentUser.role === 'Quality Director'
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Quality Lead
                    </button>
                  </div>
                </div>

                {/* Switch Plant Quick Selector */}
                <div className="p-2.5 rounded-2xl hover:bg-slate-50 transition-colors space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Switch Bottling Plant
                  </span>
                  <select
                    value={currentUser.plant}
                    onChange={(e) => {
                      switchPlant(e.target.value);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-2.5 py-1.5 text-[11px] bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                  >
                    <option value="10th Industrial Zone Plant #1 (Cairo)">10th Industrial Zone Plant #1 (Cairo)</option>
                    <option value="Sadat City Bottling Plant #2">Sadat City Bottling Plant #2</option>
                    <option value="Alexandria Free Zone Logistics Hub">Alexandria Free Zone Logistics Hub</option>
                  </select>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsLogoutModalOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left p-2.5 hover:bg-rose-50 text-rose-600 rounded-2xl flex items-center gap-3 font-bold transition-colors"
                  >
                    <div className="p-1.5 rounded-xl bg-rose-100 text-rose-600">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span>Sign Out / Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
