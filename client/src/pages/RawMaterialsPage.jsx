import React, { useState, useEffect } from 'react';
import {
  Database,
  Boxes,
  Building,
  AlertTriangle,
  TrendingUp,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronDown,
  ArrowRight,
  Package,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { KpiCard } from '../components/KpiCard';
import {
  PreformIcon,
  BottleCapsIcon,
  LabelsRollIcon,
  ShrinkFilmIcon,
  ChemicalDrumIcon,
} from '../components/ProductThumbnails';
import { MaterialModal } from '../components/MaterialModal';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';

export const RawMaterialsPage = () => {
  const { showToast } = useApp();
  const [materials, setMaterials] = useState([]);
  const [stats, setStats] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSupplier, setSelectedSupplier] = useState('All Suppliers');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const defaultMaterials = [
    {
      _id: '1',
      name: 'PET Preform',
      category: 'Plastic',
      supplier: 'Global Plastic Co.',
      currentStock: 50000,
      minStock: 10000,
      unit: 'Pcs',
      purchasePrice: 0.80,
      status: 'In Stock',
    },
    {
      _id: '2',
      name: 'Bottle Caps',
      category: 'Packaging',
      supplier: 'PackTech',
      currentStock: 60000,
      minStock: 15000,
      unit: 'Pcs',
      purchasePrice: 0.12,
      status: 'In Stock',
    },
    {
      _id: '3',
      name: 'Labels',
      category: 'Packaging',
      supplier: 'Label Plus',
      currentStock: 55000,
      minStock: 12000,
      unit: 'Pcs',
      purchasePrice: 0.06,
      status: 'In Stock',
    },
    {
      _id: '4',
      name: 'Shrink Film',
      category: 'Packaging',
      supplier: 'Wrap Solutions',
      currentStock: 200,
      minStock: 50,
      unit: 'Roll',
      purchasePrice: 45.00,
      status: 'In Stock',
    },
    {
      _id: '5',
      name: 'Water Treatment Materials',
      category: 'Chemical',
      supplier: 'Pure Water Co.',
      currentStock: 500,
      minStock: 100,
      unit: 'Kg',
      purchasePrice: 8.50,
      status: 'In Stock',
    },
  ];

  const defaultTrend = [
    { month: 'May', consumption: 175000 },
    { month: 'Jun', consumption: 210000 },
    { month: 'Jul', consumption: 250000 },
    { month: 'Aug', consumption: 235000 },
    { month: 'Sep', consumption: 260000 },
    { month: 'Oct', consumption: 285000 },
  ];

  const loadMaterials = async () => {
    const res = await api.getMaterials({
      search,
      category: selectedCategory,
      supplier: selectedSupplier,
    });
    if (res && res.data && res.data.length > 0) {
      setMaterials(res.data);
      setStats(res.stats);
      setTrendData(res.trend || defaultTrend);
    } else {
      setMaterials(defaultMaterials);
      setTrendData(defaultTrend);
    }
  };

  useEffect(() => {
    loadMaterials();
  }, [search, selectedCategory, selectedSupplier]);

  const handleCreateOrUpdate = async (materialData) => {
    try {
      if (editingMaterial) {
        await api.updateMaterial(editingMaterial._id, materialData);
        showToast('Raw material updated successfully!');
      } else {
        await api.createMaterial(materialData);
        showToast('New raw material added!');
      }
      loadMaterials();
    } catch (e) {
      if (editingMaterial) {
        setMaterials(materials.map((m) => (m._id === editingMaterial._id ? { ...m, ...materialData } : m)));
      } else {
        setMaterials([...materials, { _id: Date.now().toString(), ...materialData }]);
      }
      showToast('Saved raw material!');
    }
    setEditingMaterial(null);
  };

  const handleQuickReorder = async (materialName, defaultQty) => {
    const mat = materials.find((m) => m.name === materialName);
    if (mat) {
      try {
        await api.reorderMaterial(mat._id, defaultQty);
      } catch (e) {}
      setMaterials(
        materials.map((m) =>
          m.name === materialName ? { ...m, currentStock: m.currentStock + defaultQty } : m
        )
      );
      showToast(`Order dispatched: +${defaultQty.toLocaleString()} ${mat.unit} of ${mat.name}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this raw material?')) {
      try {
        await api.deleteMaterial(id);
      } catch (e) {}
      setMaterials(materials.filter((m) => m._id !== id));
      showToast('Material removed from registry.');
    }
  };

  const renderMaterialIcon = (mat) => {
    const name = mat.name.toLowerCase();
    if (name.includes('preform')) return <PreformIcon className="w-9 h-11" />;
    if (name.includes('caps')) return <BottleCapsIcon className="w-10 h-10" />;
    if (name.includes('label')) return <LabelsRollIcon className="w-10 h-10" />;
    if (name.includes('film')) return <ShrinkFilmIcon className="w-10 h-10" />;
    return <ChemicalDrumIcon className="w-9 h-10" />;
  };

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || m.category === selectedCategory;
    const matchesSupplier =
      selectedSupplier === 'All Suppliers' || m.supplier === selectedSupplier;
    return matchesSearch && matchesCategory && matchesSupplier;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner matching Image 3 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="relative z-10 space-y-1.5 max-w-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
              <Database className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Raw Materials
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Manage your raw materials and monitor stock levels
              </p>
            </div>
          </div>
        </div>

        {/* Right Header Action Button */}
        <button
          onClick={() => {
            setEditingMaterial(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/25 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Material</span>
        </button>
      </div>

      {/* 4 KPI Cards matching Image 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Materials"
          value={stats?.totalMaterials?.value || '12'}
          change={stats?.totalMaterials?.change || '+1 this month'}
          icon={Boxes}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Total Stock Value"
          value={stats?.totalStockValue?.value || '415,000 EGP'}
          change={stats?.totalStockValue?.change || '+8%'}
          icon={Building}
          iconBgColor="bg-teal-50 text-teal-600"
        />
        <KpiCard
          title="Low Stock Items"
          value={stats?.lowStockItems?.value || '2'}
          warning={stats?.lowStockItems?.warning || 'Needs Attention'}
          icon={AlertTriangle}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <KpiCard
          title="Total Consumption (this month)"
          value={stats?.totalConsumption?.value || '285,000 Units'}
          change={stats?.totalConsumption?.change || '+5%'}
          icon={TrendingUp}
          iconBgColor="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Middle Analytics & Alerts Row matching Image 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Material Consumption Trend Area Chart (8 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <h3 className="text-sm font-bold text-slate-800">Material Consumption Trend</h3>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60 transition-colors">
              <span>Last 6 Months</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="consumptionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${val / 1000}K`}
                />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()} units`, 'Consumption']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="consumption"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#consumptionGrad)"
                  dot={{ r: 4, fill: '#2563EB', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 card-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-800">Low Stock Alerts</h3>
            </div>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group">
              <span>View All</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Alert Card 1: PET Preform */}
            <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <PreformIcon className="w-10 h-12" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">PET Preform</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Current Stock: <span className="font-semibold text-rose-600">5,000 pcs</span> | Minimum: 10,000 pcs
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleQuickReorder('PET Preform', 45000)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 transition-colors shrink-0 shadow-2xs"
              >
                Reorder Soon
              </button>
            </div>

            {/* Alert Card 2: Bottle Caps */}
            <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <BottleCapsIcon className="w-10 h-11" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Bottle Caps</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Current Stock: <span className="font-semibold text-rose-600">8,000 pcs</span> | Minimum: 15,000 pcs
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleQuickReorder('Bottle Caps', 50000)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 transition-colors shrink-0 shadow-2xs"
              >
                Reorder Soon
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Materials List Filter Toolbar matching Image 3 */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 card-shadow flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-600" />
          <span>Raw Materials List</span>
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All Categories">All Categories</option>
            <option value="Plastic">Plastic</option>
            <option value="Packaging">Packaging</option>
            <option value="Chemical">Chemical</option>
          </select>

          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All Suppliers">All Suppliers</option>
            <option value="Global Plastic Co.">Global Plastic Co.</option>
            <option value="PackTech">PackTech</option>
            <option value="Label Plus">Label Plus</option>
            <option value="Wrap Solutions">Wrap Solutions</option>
            <option value="Pure Water Co.">Pure Water Co.</option>
          </select>

          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search material..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>
      </div>

      {/* Main Table matching Image 3 */}
      <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase font-semibold tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Material</th>
                <th className="py-3.5 px-4">Image</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Current Stock</th>
                <th className="py-3.5 px-4">Unit</th>
                <th className="py-3.5 px-4">Purchase Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 font-medium text-slate-700">
              {filteredMaterials.map((mat, index) => (
                <tr key={mat._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 text-center text-slate-400 font-mono">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800">
                    {mat.name}
                  </td>
                  <td className="py-4 px-4">
                    {renderMaterialIcon(mat)}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                        mat.category === 'Plastic'
                          ? 'bg-blue-50 text-blue-700 border-blue-100'
                          : mat.category === 'Packaging'
                          ? 'bg-purple-50 text-purple-700 border-purple-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}
                    >
                      {mat.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-medium">
                    {mat.supplier}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800">
                    {mat.currentStock?.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-medium">
                    {mat.unit}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800">
                    {mat.purchasePrice?.toFixed(2)} EGP
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-subtle" />
                      {mat.status || 'In Stock'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-1 text-slate-400">
                      <button
                        onClick={() => handleQuickReorder(mat.name, 10000)}
                        className="p-1.5 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Quick Restock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingMaterial(mat);
                          setIsModalOpen(true);
                        }}
                        className="p-1.5 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(mat._id)}
                        className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Material Modal */}
      <MaterialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        material={editingMaterial}
      />
    </div>
  );
};
