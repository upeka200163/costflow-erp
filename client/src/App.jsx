import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { PrintableCostSheetModal } from './components/PrintableCostSheetModal';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { RawMaterialsPage } from './pages/RawMaterialsPage';
import { SuppliersPage } from './pages/SuppliersPage';
import { InventoryPage } from './pages/InventoryPage';
import { ProductionPage } from './pages/ProductionPage';
import { BomStudioPage } from './pages/BomStudioPage';
import { QualityControlPage } from './pages/QualityControlPage';
import { CostCalculationPage } from './pages/CostCalculationPage';
import { SalesPage } from './pages/SalesPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { useApp } from './context/AppContext';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

function AppContent() {
  const { activeTab, toast, isCostSheetOpen, setIsCostSheetOpen } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'products':
        return <ProductsPage />;
      case 'raw-materials':
        return <RawMaterialsPage />;
      case 'bom-studio':
        return <BomStudioPage />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'production':
      case 'production-orders':
      case 'production-lines':
        return <ProductionPage />;
      case 'quality-control':
        return <QualityControlPage />;
      case 'cost-calculation':
        return <CostCalculationPage />;
      case 'sales':
        return <SalesPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f0f4f9] text-slate-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
          {renderActivePage()}
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal />

      {/* Printable Cost Audit Sheet Modal */}
      <PrintableCostSheetModal
        isOpen={isCostSheetOpen}
        onClose={() => setIsCostSheetOpen(false)}
      />

      {/* Real-time Toast Notifications */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700/80 text-xs font-semibold">
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
