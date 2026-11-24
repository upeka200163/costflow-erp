import React from 'react';
import { LogOut, X, ShieldAlert, ArrowRight, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LogoutModal = ({ isOpen, onClose }) => {
  const { currentUser, handleLogout } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <LogOut className="w-6 h-6 stroke-[2]" />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-base font-bold text-slate-900">Sign Out of CostFlow ERP?</h3>
          <p className="text-xs text-slate-400">
            You will be signed out of <strong>{currentUser.plant}</strong>.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 text-xs">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold overflow-hidden shrink-0">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              'A'
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-slate-800 truncate">{currentUser.name}</h4>
            <p className="text-slate-400 text-[11px] truncate">{currentUser.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Stay Signed In
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const SessionLockOverlay = () => {
  const { currentUser, handleLogin } = useApp();

  if (currentUser.isLoggedIn) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0c1527]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border border-slate-200 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 mx-auto">
          <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 5C20 5 10 17 10 24C10 29.5228 14.4772 34 20 34C25.5228 34 30 29.5228 30 24C30 17 20 5 20 5Z" fill="white" />
          </svg>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900">CostFlow Session Locked</h2>
          <p className="text-xs text-slate-400">
            Natural Spring Water Manufacturing & Cost ERP
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 overflow-hidden shadow-sm">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
            ) : (
              'AM'
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</h4>
            <p className="text-[11px] text-slate-500 font-medium">{currentUser.title}</p>
            <span className="text-[10px] text-emerald-600 font-bold block">{currentUser.plant}</span>
          </div>
        </div>

        <button
          onClick={() => handleLogin()}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
        >
          <span>Unlock & Resume Session</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
