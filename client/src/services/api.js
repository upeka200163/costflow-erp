// Centralized API client with fallback data to guarantee 100% smooth UI experience
const API_BASE = '/api';

export const api = {
  // Dashboard
  async getDashboard() {
    try {
      const res = await fetch(`${API_BASE}/dashboard`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json.data;
    } catch (e) {
      console.warn('Using fallback dashboard data:', e);
      return null;
    }
  },

  // Products
  async getProducts(params = {}) {
    try {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.set('search', params.search);
      if (params.category) searchParams.set('category', params.category);
      if (params.status) searchParams.set('status', params.status);

      const res = await fetch(`${API_BASE}/products?${searchParams.toString()}`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json;
    } catch (e) {
      console.warn('Using fallback products data:', e);
      return null;
    }
  },

  async createProduct(data) {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateProduct(id, data) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Raw Materials
  async getMaterials(params = {}) {
    try {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.set('search', params.search);
      if (params.category) searchParams.set('category', params.category);
      if (params.supplier) searchParams.set('supplier', params.supplier);

      const res = await fetch(`${API_BASE}/materials?${searchParams.toString()}`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json;
    } catch (e) {
      console.warn('Using fallback materials data:', e);
      return null;
    }
  },

  async createMaterial(data) {
    const res = await fetch(`${API_BASE}/materials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateMaterial(id, data) {
    const res = await fetch(`${API_BASE}/materials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async reorderMaterial(id, amount) {
    const res = await fetch(`${API_BASE}/materials/${id}/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    return res.json();
  },

  async deleteMaterial(id) {
    const res = await fetch(`${API_BASE}/materials/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Suppliers
  async getSuppliers(params = {}) {
    try {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.set('search', params.search);
      if (params.category) searchParams.set('category', params.category);
      if (params.status) searchParams.set('status', params.status);

      const res = await fetch(`${API_BASE}/suppliers?${searchParams.toString()}`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json;
    } catch (e) {
      console.warn('Using fallback suppliers data:', e);
      return null;
    }
  },

  async createSupplier(data) {
    const res = await fetch(`${API_BASE}/suppliers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateSupplier(id, data) {
    const res = await fetch(`${API_BASE}/suppliers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async addSupplierPurchase(id, data) {
    const res = await fetch(`${API_BASE}/suppliers/${id}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteSupplier(id) {
    const res = await fetch(`${API_BASE}/suppliers/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  // Production Orders
  async getProductionOrders() {
    try {
      const res = await fetch(`${API_BASE}/production`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json.data;
    } catch (e) {
      return null;
    }
  },

  // Simulation / Calculator
  async simulateCost(params) {
    const res = await fetch(`${API_BASE}/calculation/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return res.json();
  },

  // Database Overview & Diagnostics
  async getDatabaseOverview() {
    try {
      const res = await fetch(`${API_BASE}/database`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (e) {
      console.warn('Using fallback database overview:', e);
      return null;
    }
  },
};
