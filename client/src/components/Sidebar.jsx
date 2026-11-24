import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Boxes,
  Users,
  Warehouse,
  Calculator,
  Truck,
  FileBarChart2,
  Settings,
  ChevronDown,
  Droplets,
  Building2,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// Sleek, modern manufacturing bottling & assembly line icon
export const ProductionIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Bottling / Assembly Conveyor Track */}
    <path d="M2 17h20" />
    <path d="M5 17v3" />
    <path d="M19 17v3" />
    <circle cx="6" cy="17" r="1.5" />
    <circle cx="12" cy="17" r="1.5" />
    <circle cx="18" cy="17" r="1.5" />
    {/* Bottles moving along the production line */}
    <path d="M5 8h2v6H5z" />
    <path d="M11 6h2v8h-2z" />
    <path d="M17 8h2v6h-2z" />
    <path d="M6 5v3" />
    <path d="M12 3v3" />
    <path d="M18 5v3" />
  </svg>
);

export const Sidebar = () => {
  const { activeTab, setActiveTab, setShowLanding } = useApp();
  const [isProductionExpanded, setIsProductionExpanded] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'raw-materials', label: 'Raw Materials', icon: Boxes },
    { id: 'bom-studio', label: 'BOM & Recipes', icon: Layers, isNew: true },
    { id: 'suppliers', label: 'Suppliers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    {
      id: 'production',
      label: 'Production',
      icon: ProductionIcon,
      hasSubmenu: true,
      subItems: [
        { id: 'production', label: 'Production Kanban' },
        { id: 'production-lines', label: 'Bottling Lines' },
      ],
    },
    { id: 'quality-control', label: 'Quality Control', icon: ShieldCheck, isNew: true },
    { id: 'cost-calculation', label: 'Cost Calculation', icon: Calculator },
    { id: 'sales', label: 'Sales & Distribution', icon: Truck },
    { id: 'reports', label: 'Reports', icon: FileBarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (item) => {
    if (item.hasSubmenu) {
      setIsProductionExpanded(!isProductionExpanded);
      setActiveTab(item.id);
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <aside className="w-64 bg-[#0c1527] text-slate-300 flex flex-col shrink-0 h-screen sticky top-0 border-r border-slate-800/80 z-20">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0">
          <Droplets className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div className="overflow-hidden">
          <h1 className="text-white font-bold text-lg tracking-tight leading-tight">CostFlow</h1>
          <p className="text-[11px] text-slate-400 font-medium truncate">Manufacturing Cost Management</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.hasSubmenu && activeTab.startsWith('production'));

          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.isNew && (
                    <span className="text-[9px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md">
                      New
                    </span>
                  )}
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isProductionExpanded ? 'rotate-180 text-white' : 'text-slate-400'
                      }`}
                    />
                  )}
                </div>
              </button>

              {/* Submenu for Production */}
              {item.hasSubmenu && isProductionExpanded && (
                <div className="pl-9 pr-2 py-1 space-y-1">
                  {item.subItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveTab('production')}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Factory Info Card */}
      <div className="p-4 border-t border-slate-800/60">
        <div className="bg-[#131f38] rounded-xl p-3 flex items-center justify-between border border-slate-700/50 shadow-inner">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-white text-xs font-semibold leading-snug truncate">Water Factory #1</h4>
              <p className="text-[10px] text-slate-400 font-mono">v1.2.0 • ISO 22000</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowLanding(true)}
            className="p-1.5 hover:bg-slate-700/60 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
            title="Replay Welcome Landing Showcase"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
