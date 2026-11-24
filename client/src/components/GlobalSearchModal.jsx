import React, { useState } from 'react';
import { Search, X, Package, Boxes, Users, Factory, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GlobalSearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveTab } = useApp();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const searchableItems = [
    { type: 'product', title: 'Water Bottle 600 ml', tab: 'products', category: 'Products' },
    { type: 'product', title: 'Water Bottle 330 ml', tab: 'products', category: 'Products' },
    { type: 'product', title: 'Water Bottle 1.50 L', tab: 'products', category: 'Products' },
    { type: 'product', title: 'Water Cup 200 ml', tab: 'products', category: 'Products' },
    { type: 'product', title: 'Water Pack 6 pcs', tab: 'products', category: 'Products' },
    { type: 'material', title: 'PET Preform', tab: 'raw-materials', category: 'Raw Materials' },
    { type: 'material', title: 'Bottle Caps', tab: 'raw-materials', category: 'Raw Materials' },
    { type: 'material', title: 'Labels Roll', tab: 'raw-materials', category: 'Raw Materials' },
    { type: 'material', title: 'Shrink Film', tab: 'raw-materials', category: 'Raw Materials' },
    { type: 'supplier', title: 'Global Plastic Co.', tab: 'suppliers', category: 'Suppliers' },
    { type: 'supplier', title: 'PackTech', tab: 'suppliers', category: 'Suppliers' },
    { type: 'supplier', title: 'Pure Water Co.', tab: 'suppliers', category: 'Suppliers' },
    { type: 'production', title: 'Order #PO-1025 (In Progress)', tab: 'production', category: 'Production' },
    { type: 'calc', title: 'Unit Cost Calculator', tab: 'cost-calculation', category: 'Calculations' },
  ];

  const filtered = searchableItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-24 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, materials, suppliers, production orders..."
            className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.tab)}
                  className="px-3 py-2.5 rounded-2xl hover:bg-slate-50 cursor-pointer flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                      {item.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching records found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
