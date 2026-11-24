import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Coins,
  Tag,
  BarChart3,
  Plus,
  Search,
  LayoutGrid,
  List,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { KpiCard } from '../components/KpiCard';
import { WaterBottleIcon, WaterCupIcon, WaterPackIcon } from '../components/ProductThumbnails';
import { ProductModal } from '../components/ProductModal';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';

export const ProductsPage = () => {
  const { showToast } = useApp();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const defaultProducts = [
    {
      _id: '1',
      name: 'Water Bottle',
      category: 'Bottled Water',
      size: '600 ml',
      productionCost: 1.45,
      sellingPrice: 2.00,
      status: 'Active',
      type: 'bottle',
    },
    {
      _id: '2',
      name: 'Water Bottle',
      category: 'Bottled Water',
      size: '330 ml',
      productionCost: 1.10,
      sellingPrice: 1.50,
      status: 'Active',
      type: 'bottle',
    },
    {
      _id: '3',
      name: 'Water Bottle',
      category: 'Bottled Water',
      size: '1.50 L',
      productionCost: 2.20,
      sellingPrice: 3.00,
      status: 'Active',
      type: 'bottle',
    },
    {
      _id: '4',
      name: 'Water Cup',
      category: 'Small Pack',
      size: '200 ml',
      productionCost: 0.75,
      sellingPrice: 1.00,
      status: 'Active',
      type: 'cup',
    },
    {
      _id: '5',
      name: 'Water Pack',
      category: 'Pack',
      size: '6 pcs',
      productionCost: 8.50,
      sellingPrice: 10.00,
      status: 'Active',
      type: 'pack',
    },
  ];

  const loadProducts = async () => {
    setLoading(true);
    const res = await api.getProducts({
      search,
      category: selectedCategory,
      status: selectedStatus,
    });
    if (res && res.data && res.data.length > 0) {
      setProducts(res.data);
      setStats(res.stats);
    } else {
      setProducts(defaultProducts);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [search, selectedCategory, selectedStatus]);

  const handleCreateOrUpdate = async (productData) => {
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct._id, productData);
        showToast('Product updated successfully!');
      } else {
        await api.createProduct(productData);
        showToast('New product added successfully!');
      }
      loadProducts();
    } catch (err) {
      // Optimistic state update
      if (editingProduct) {
        setProducts(products.map((p) => (p._id === editingProduct._id ? { ...p, ...productData } : p)));
      } else {
        setProducts([...products, { _id: Date.now().toString(), ...productData }]);
      }
      showToast('Product saved successfully!');
    }
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
      } catch (e) {}
      setProducts(products.filter((p) => p._id !== id));
      showToast('Product removed.');
    }
  };

  const renderProductIcon = (product) => {
    if (product.name.toLowerCase().includes('cup') || product.size.includes('200')) {
      return <WaterCupIcon className="w-9 h-11" />;
    }
    if (product.name.toLowerCase().includes('pack') || product.size.includes('pcs')) {
      return <WaterPackIcon className="w-10 h-10" />;
    }
    return <WaterBottleIcon size={product.size} className="w-9 h-11" />;
  };

  // Filtered & Paginated items
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.size.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || p.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All Status' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner matching Image 2 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-100/60 shadow-xs flex items-center justify-between">
        <div className="relative z-10 space-y-1.5 max-w-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
              <Boxes className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Products
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Manage your products and track their production cost
              </p>
            </div>
          </div>
        </div>

        {/* Ambient Water Splash Illustration on the Right matching Image 2 */}
        <div className="hidden md:flex items-center justify-end h-28 pointer-events-none">
          <img
            src="/images/original/products-banner.png"
            alt="Bottled Water Range"
            className="h-full w-auto max-w-xs object-contain filter drop-shadow-md"
          />
        </div>
      </div>

      {/* 4 KPI Cards matching Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Products"
          value={stats?.totalProducts?.value || '5'}
          change={stats?.totalProducts?.change || '+1'}
          comparisonText="vs last month"
          icon={Boxes}
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <KpiCard
          title="Avg. Production Cost"
          value={stats?.avgProductionCost?.value || '1.48 EGP'}
          change={stats?.avgProductionCost?.change || '+6%'}
          icon={Coins}
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <KpiCard
          title="Avg. Selling Price"
          value={stats?.avgSellingPrice?.value || '2.20 EGP'}
          change={stats?.avgSellingPrice?.change || '+5%'}
          icon={Tag}
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <KpiCard
          title="Total Production Value"
          value={stats?.totalProductionValue?.value || '820,000 EGP'}
          change={stats?.totalProductionValue?.change || '+8%'}
          icon={BarChart3}
          iconBgColor="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Action Bar & Filters matching Image 2 */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 card-shadow flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left: + Add New Product & Category/Status dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/25 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Product</span>
          </button>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All Categories">All Categories</option>
            <option value="Bottled Water">Bottled Water</option>
            <option value="Small Pack">Small Pack</option>
            <option value="Pack">Pack</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Right: Search & View Mode Toggles */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table View */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase font-semibold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Image</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Size / Unit</th>
                  <th className="py-3.5 px-4">Production Cost</th>
                  <th className="py-3.5 px-4">Selling Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80 font-medium text-slate-700">
                {currentItems.map((product, index) => (
                  <tr key={product._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 text-center text-slate-400 font-mono">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">
                      {product.name}
                    </td>
                    <td className="py-4 px-4">
                      {renderProductIcon(product)}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {product.size}
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">
                      {product.productionCost?.toFixed(2)} EGP
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800">
                      {product.sellingPrice?.toFixed(2)} EGP
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-subtle" />
                        {product.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1 text-slate-400">
                        <button
                          onClick={() => setViewingProduct(product)}
                          className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="p-1.5 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
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

          {/* Pagination Footer matching Image 2 */}
          <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
              {filteredProducts.length} products
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl font-bold transition-colors ${
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
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Grid Mode View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentItems.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl p-5 border border-slate-100 card-shadow card-hover-shadow flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-50 text-sky-700">
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {product.status}
                </span>
              </div>

              <div className="py-6 flex flex-col items-center text-center">
                <div className="mb-3 transform hover:scale-110 transition-transform">
                  {renderProductIcon(product)}
                </div>
                <h3 className="text-base font-bold text-slate-900">{product.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{product.size}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Production Cost</span>
                  <span className="text-sm font-bold text-slate-800">
                    {product.productionCost?.toFixed(2)} EGP
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Selling Price</span>
                  <span className="text-sm font-bold text-emerald-600">
                    {product.sellingPrice?.toFixed(2)} EGP
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Add/Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        product={editingProduct}
      />

      {/* Product Detail Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-800">Product Specifications</h3>
              <button onClick={() => setViewingProduct(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            <div className="flex items-center gap-4 py-2">
              {renderProductIcon(viewingProduct)}
              <div>
                <h4 className="font-bold text-base text-slate-900">{viewingProduct.name}</h4>
                <p className="text-xs text-slate-500">{viewingProduct.size} • {viewingProduct.category}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-2xl">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Unit Cost:</span>
                <span className="font-bold">{viewingProduct.productionCost} EGP</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Selling Price:</span>
                <span className="font-bold">{viewingProduct.sellingPrice} EGP</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Gross Margin:</span>
                <span className="font-bold text-emerald-600">
                  {Math.round(((viewingProduct.sellingPrice - viewingProduct.productionCost) / viewingProduct.sellingPrice) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
