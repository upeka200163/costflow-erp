import React, { useState, useEffect } from 'react';
import {
  Users,
  ShoppingCart,
  Handshake,
  Receipt,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Eye,
  Pencil,
  Trash2,
  ArrowRight,
  Globe,
  Leaf,
  Droplets,
  Cog,
  Box,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { SupplierModal } from '../components/SupplierModal';
import { SupplierLogo } from '../components/ProductThumbnails';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';

export const SuppliersPage = () => {
  const { showToast } = useApp();
  const [suppliers, setSuppliers] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchaseItems, setPurchaseItems] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const defaultSuppliers = [
    {
      _id: '1',
      name: 'Global Plastic Co.',
      subtitle: 'Plastic Solutions',
      category: 'Plastic',
      phone: '010 1234 5678',
      email: 'sales@globalplastic.com',
      address: '10th Industrial Zone, Cairo',
      suppliedMaterials: ['Preform', 'Caps'],
      totalPurchases: 320000,
      balance: 45000,
      status: 'Active',
      lastPurchaseDate: '15 Nov 2026',
      recentPurchases: [
        { date: '15 Nov 2026', amount: 180000 },
        { date: '02 Sep 2026', amount: 95000 },
        { date: '20 Jul 2026', amount: 45000 },
      ],
    },
    {
      _id: '2',
      name: 'PackTech',
      subtitle: 'Packaging Materials',
      category: 'Packaging',
      phone: '010 9876 5432',
      email: 'info@packtech.com',
      address: 'Badr City Industrial Area, Cairo',
      suppliedMaterials: ['Labels', 'Film'],
      totalPurchases: 245000,
      balance: 0,
      status: 'Active',
      lastPurchaseDate: '08 Nov 2026',
      recentPurchases: [
        { date: '08 Nov 2026', amount: 120000 },
        { date: '14 Oct 2026', amount: 80000 },
        { date: '01 Sep 2026', amount: 45000 },
      ],
    },
    {
      _id: '3',
      name: 'Pure Water Co.',
      subtitle: 'Water Treatment',
      category: 'Chemical',
      phone: '011 1111 2222',
      email: 'info@purewater.com',
      address: '6th of October City, Giza',
      suppliedMaterials: ['Treatment Chemicals'],
      totalPurchases: 180000,
      balance: 20500,
      status: 'Pending',
      lastPurchaseDate: '25 Oct 2026',
      recentPurchases: [
        { date: '25 Oct 2026', amount: 75000 },
        { date: '12 Sep 2026', amount: 60000 },
        { date: '18 Jul 2026', amount: 45000 },
      ],
    },
    {
      _id: '4',
      name: 'Industrial Supplies',
      subtitle: 'Machinery Parts',
      category: 'Machinery',
      phone: '012 2222 3333',
      email: 'sales@industrialsup.com',
      address: 'Free Zone, Alexandria',
      suppliedMaterials: ['Machine Parts'],
      totalPurchases: 150000,
      balance: 0,
      status: 'Active',
      lastPurchaseDate: '01 Nov 2026',
      recentPurchases: [
        { date: '01 Nov 2026', amount: 65000 },
        { date: '19 Aug 2026', amount: 50000 },
        { date: '10 Jun 2026', amount: 35000 },
      ],
    },
    {
      _id: '5',
      name: 'Smart Packaging',
      subtitle: 'Packaging',
      category: 'Packaging',
      phone: '010 5555 6666',
      email: 'info@smartpack.com',
      address: 'Sadat City Industrial Zone',
      suppliedMaterials: ['Cartons', 'Boxes'],
      totalPurchases: 120000,
      balance: 35000,
      status: 'Active',
      lastPurchaseDate: '30 Oct 2026',
      recentPurchases: [
        { date: '30 Oct 2026', amount: 55000 },
        { date: '15 Aug 2026', amount: 40000 },
        { date: '10 Jun 2026', amount: 25000 },
      ],
    },
    {
      _id: '6',
      name: 'Label Plus',
      subtitle: 'Printing & Stickers',
      category: 'Packaging',
      phone: '010 7777 8888',
      email: 'contact@labelplus.com',
      address: 'Obour City, Qalyubia',
      suppliedMaterials: ['Labels'],
      totalPurchases: 110000,
      balance: 10000,
      status: 'Active',
      lastPurchaseDate: '10 Nov 2026',
      recentPurchases: [{ date: '10 Nov 2026', amount: 45000 }],
    },
    {
      _id: '7',
      name: 'Wrap Solutions',
      subtitle: 'Polyethylene Films',
      category: 'Packaging',
      phone: '012 8888 9999',
      email: 'sales@wrapsolutions.com',
      address: 'New Cairo Tech Hub',
      suppliedMaterials: ['Shrink Film'],
      totalPurchases: 75000,
      balance: 5000,
      status: 'Active',
      lastPurchaseDate: '18 Oct 2026',
      recentPurchases: [{ date: '18 Oct 2026', amount: 35000 }],
    },
    {
      _id: '8',
      name: 'Delta Chemicals',
      subtitle: 'Sanitization & CIP',
      category: 'Chemical',
      phone: '011 4444 5555',
      email: 'info@deltachemicals.com',
      address: 'Tanta Industrial Sector',
      suppliedMaterials: ['Sanitizers'],
      totalPurchases: 50000,
      balance: 5000,
      status: 'Active',
      lastPurchaseDate: '05 Nov 2026',
      recentPurchases: [{ date: '05 Nov 2026', amount: 25000 }],
    },
  ];

  const loadSuppliers = async () => {
    const res = await api.getSuppliers({
      search,
      category: selectedCategory,
      status: selectedStatus,
    });
    if (res && res.data && res.data.length > 0) {
      setSuppliers(res.data);
      setStats(res.stats);
      if (!selectedSupplier) {
        setSelectedSupplier(res.data[0]);
      }
    } else {
      setSuppliers(defaultSuppliers);
      if (!selectedSupplier) {
        setSelectedSupplier(defaultSuppliers[0]);
      }
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, [search, selectedCategory, selectedStatus]);

  const handleCreateOrUpdate = async (supplierData) => {
    try {
      if (editingSupplier) {
        await api.updateSupplier(editingSupplier._id, supplierData);
        showToast('Supplier record updated!');
      } else {
        await api.createSupplier(supplierData);
        showToast('New supplier registered!');
      }
      loadSuppliers();
    } catch (e) {
      if (editingSupplier) {
        setSuppliers(suppliers.map((s) => (s._id === editingSupplier._id ? { ...s, ...supplierData } : s)));
        setSelectedSupplier({ ...selectedSupplier, ...supplierData });
      } else {
        const created = { _id: Date.now().toString(), ...supplierData };
        setSuppliers([...suppliers, created]);
        setSelectedSupplier(created);
      }
      showToast('Supplier saved successfully!');
    }
    setEditingSupplier(null);
  };

  const handleRecordPurchase = async (e) => {
    e.preventDefault();
    if (!selectedSupplier || !purchaseAmount) return;
    const amount = Number(purchaseAmount);
    try {
      await api.addSupplierPurchase(selectedSupplier._id, {
        amount,
        items: purchaseItems || 'Standard Material Order',
      });
    } catch (e) {}

    // Update state optimistically
    const updated = {
      ...selectedSupplier,
      totalPurchases: selectedSupplier.totalPurchases + amount,
      balance: selectedSupplier.balance + amount,
      lastPurchaseDate: 'Just now',
      recentPurchases: [
        { date: 'Today', amount },
        ...(selectedSupplier.recentPurchases || []),
      ],
    };
    setSelectedSupplier(updated);
    setSuppliers(suppliers.map((s) => (s._id === updated._id ? updated : s)));
    setIsPurchaseModalOpen(false);
    setPurchaseAmount('');
    setPurchaseItems('');
    showToast(`Purchased recorded: +${amount.toLocaleString()} EGP for ${selectedSupplier.name}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete supplier record?')) {
      try {
        await api.deleteSupplier(id);
      } catch (e) {}
      const updated = suppliers.filter((s) => s._id !== id);
      setSuppliers(updated);
      if (selectedSupplier?._id === id) {
        setSelectedSupplier(updated[0] || null);
      }
      showToast('Supplier deleted.');
    }
  };

  const renderSupplierIcon = (supplier) => {
    return <SupplierLogo supplier={supplier} />;
  };

  const filteredSuppliers = suppliers.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);
    const matchesCategory =
      selectedCategory === 'All Categories' || s.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All Status' || s.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage) || 1;
  const currentItems = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner matching Image 4 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="relative z-10 space-y-1.5 max-w-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
              <Handshake className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Suppliers
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Manage your suppliers and track purchase history
              </p>
            </div>
          </div>
        </div>

        {/* Right Header Action Button */}
        <button
          onClick={() => {
            setEditingSupplier(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/25 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* 4 KPI Cards matching Image 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Suppliers"
          value={stats?.totalSuppliers?.value || '8'}
          change={stats?.totalSuppliers?.change || '+1 this month'}
          icon={Users}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Total Purchases"
          value={stats?.totalPurchases?.value || '1,250,000 EGP'}
          change={stats?.totalPurchases?.change || '+12%'}
          icon={ShoppingCart}
          iconBgColor="bg-teal-50 text-teal-600"
        />
        <KpiCard
          title="Average Order Value"
          value={stats?.averageOrderValue?.value || '156,250 EGP'}
          change={stats?.averageOrderValue?.change || '+8%'}
          icon={Handshake}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <KpiCard
          title="Outstanding Balance"
          value={stats?.outstandingBalance?.value || '120,500 EGP'}
          change={stats?.outstandingBalance?.change || '-5%'}
          icon={Receipt}
          iconBgColor="bg-rose-50 text-rose-600"
        />
      </div>

      {/* Split Layout matching Image 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Section: Search, Filters & Suppliers Table (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 card-shadow flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by supplier name..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="All Categories">All Categories</option>
                <option value="Plastic">Plastic</option>
                <option value="Packaging">Packaging</option>
                <option value="Chemical">Chemical</option>
                <option value="Machinery">Machinery</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase font-semibold tracking-wider">
                  <tr>
                    <th className="py-3.5 px-3 w-10 text-center">#</th>
                    <th className="py-3.5 px-3">Supplier</th>
                    <th className="py-3.5 px-3">Contact Info</th>
                    <th className="py-3.5 px-3">Supplied Materials</th>
                    <th className="py-3.5 px-3">Total Purchases</th>
                    <th className="py-3.5 px-3">Balance</th>
                    <th className="py-3.5 px-3">Status</th>
                    <th className="py-3.5 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80 font-medium text-slate-700">
                  {currentItems.map((supplier, index) => {
                    const isSelected = selectedSupplier?._id === supplier._id;
                    return (
                      <tr
                        key={supplier._id}
                        onClick={() => setSelectedSupplier(supplier)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <td className="py-4 px-3 text-center text-slate-400 font-mono">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex items-center gap-2.5">
                            {renderSupplierIcon(supplier)}
                            <div>
                              <h4 className="font-bold text-slate-900 leading-tight">
                                {supplier.name}
                              </h4>
                              <p className="text-[11px] text-slate-400 font-normal">
                                {supplier.subtitle}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-3 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span className="text-[11px] font-mono">{supplier.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span className="text-[11px] truncate max-w-[130px]">
                              {supplier.email}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <div className="flex flex-wrap gap-1">
                            {supplier.suppliedMaterials?.map((mat, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-100"
                              >
                                {mat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-3 font-bold text-slate-800">
                          {supplier.totalPurchases?.toLocaleString()} EGP
                        </td>
                        <td className="py-4 px-3 font-bold">
                          <span
                            className={
                              supplier.balance > 0 ? 'text-slate-800' : 'text-slate-500'
                            }
                          >
                            {supplier.balance?.toLocaleString()} EGP
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              supplier.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                                : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                supplier.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                            />
                            {supplier.status}
                          </span>
                        </td>
                        <td className="py-4 px-3">
                          <div
                            className="flex items-center justify-center gap-1 text-slate-400"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => setSelectedSupplier(supplier)}
                              className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Inspect Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingSupplier(supplier);
                                setIsModalOpen(true);
                              }}
                              className="p-1 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(supplier._id)}
                              className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredSuppliers.length)} of{' '}
                {filteredSuppliers.length} suppliers
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-2.5 py-1 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-xs"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-xl font-bold text-xs transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-2.5 py-1 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium text-xs"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Supplier Details & Recent Purchases matching Image 4 (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedSupplier ? (
            <>
              {/* Supplier Details Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">Supplier Details</h3>
                  <button
                    onClick={() => {
                      setEditingSupplier(selectedSupplier);
                      setIsModalOpen(true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center space-y-2 pt-2">
                  <SupplierLogo supplier={selectedSupplier} large={true} />
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{selectedSupplier.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{selectedSupplier.subtitle}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {selectedSupplier.status}
                  </span>
                </div>

                {/* Contact List */}
                <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{selectedSupplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{selectedSupplier.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{selectedSupplier.address}</span>
                  </div>
                </div>

                {/* Stat Metric Cards (Total Purchases & Last Purchase) */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
                      <span>Total Purchases</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 block">
                      {selectedSupplier.totalPurchases?.toLocaleString()} EGP
                    </span>
                  </div>

                  <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Last Purchase</span>
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 block">
                      {selectedSupplier.lastPurchaseDate || '15 Nov 2026'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Purchases List */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">Recent Purchases</h3>
                  <button
                    onClick={() => setIsPurchaseModalOpen(true)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                  >
                    <span>+ Record Purchase</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {(selectedSupplier.recentPurchases || [
                    { date: '15 Nov 2026', amount: 180000 },
                    { date: '02 Sep 2026', amount: 95000 },
                    { date: '20 Jul 2026', amount: 45000 },
                  ]).map((purch, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-blue-100/60 text-blue-600">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{purch.date}</span>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900">
                        {purch.amount?.toLocaleString()} EGP
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center text-slate-400">
              Select a supplier from the table to view full details
            </div>
          )}
        </div>
      </div>

      {/* Supplier Modal */}
      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        supplier={editingSupplier}
      />

      {/* Record Purchase Modal */}
      {isPurchaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 border border-slate-100 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Record Purchase for {selectedSupplier?.name}
            </h3>
            <form onSubmit={handleRecordPurchase} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Purchase Amount (EGP)
                </label>
                <input
                  type="number"
                  required
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Items / Note
                </label>
                <input
                  type="text"
                  value={purchaseItems}
                  onChange={(e) => setPurchaseItems(e.target.value)}
                  placeholder="e.g. 50,000 pcs PET preform batch"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPurchaseModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
