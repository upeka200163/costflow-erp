import React, { useState, useEffect } from 'react';
import {
  Droplets,
  ArrowRight,
  Boxes,
  Layers,
  ShieldCheck,
  TrendingUp,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingPage = ({ onComplete }) => {
  const { currentUser } = useApp();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing CostFlow Enterprise ERP v1.2...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const totalDuration = 2800; // 2.8 seconds total
    const intervalTime = 40;
    const increment = 100 / (totalDuration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Status text transitions over the 2.8 seconds
    const status1 = setTimeout(() => {
      setStatusText('Connecting to Water Factory #1 Telemetry & Line 1...');
    }, 700);

    const status2 = setTimeout(() => {
      setStatusText('Auditing BOM Recipes, PET Inventory & Resin Costs...');
    }, 1500);

    const status3 = setTimeout(() => {
      const greetingName = currentUser?.name?.split(' ')[0] || 'Ahmed';
      setStatusText(`Welcome back, ${greetingName}. Transitioning to Dashboard...`);
    }, 2200);

    // Fade out slightly before complete for seamless dissolve
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Transition completion
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2900);

    return () => {
      clearInterval(timer);
      clearTimeout(status1);
      clearTimeout(status2);
      clearTimeout(status3);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, currentUser]);

  const handleInstantEnter = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#070b14] text-white transition-opacity duration-500 ${
        isFading ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Lighting & Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[650px] h-[650px] rounded-full bg-cyan-500/15 blur-[160px]" />
        <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[130px]" />
        {/* Subtle Engineering Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Top Navbar Header */}
      <header className="relative z-10 px-6 sm:px-12 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/30 flex items-center justify-center">
            <div className="w-full h-full rounded-[14px] bg-slate-950/40 flex items-center justify-center text-white">
              <Droplets className="w-5 h-5 stroke-[2.4]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white tracking-tight">CostFlow</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                ERP v1.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Manufacturing Cost Management</p>
          </div>
        </div>

        {/* Live Facility Badge & Quick Enter Action */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Water Factory #1 • Online</span>
          </div>

          <button
            onClick={handleInstantEnter}
            className="flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10 transition-all group"
          >
            <span>Skip to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Hero Center Stage */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8 text-center my-auto space-y-7">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-indigo-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-500/10 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Bottled Water Manufacturing & Cost ERP</span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Precision Cost Control For{' '}
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Modern Bottling Plants
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Automating bill-of-materials rollups, high-speed line telemetry, vendor procurement, and real-time resin margin optimization.
          </p>
        </div>

        {/* 4 Core Pillars Preview Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-colors backdrop-blur-xs">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Executive KPIs</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">125,000 units / 1.43 EGP avg unit cost</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-colors backdrop-blur-xs">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2">
              <Boxes className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Products & BOM</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">600ml, 330ml, 1.5L, Cups & Packs</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 transition-colors backdrop-blur-xs">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">Auto-Procurement</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Preforms & caps smart buffer reorder</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 transition-colors backdrop-blur-xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white">QC Compliance</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">ES 1588 / Codex Stan 227 certified</p>
          </div>
        </div>

        {/* Animated Loading Transition Bar */}
        <div className="max-w-md mx-auto pt-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-300 flex items-center gap-2 text-[11px] truncate">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>{statusText}</span>
            </span>
            <span className="font-mono text-cyan-400 font-bold text-xs">{Math.min(100, Math.round(progress))}%</span>
          </div>

          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 rounded-full transition-all duration-75 shadow-lg shadow-cyan-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500">Auto-transitioning to factory operations in ~2 seconds...</p>
        </div>
      </main>

      {/* Footer Branding Bar */}
      <footer className="relative z-10 px-6 sm:px-12 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span>Factory Manager: <strong>{currentUser?.name || 'Ahmed Mohamed'}</strong></span>
          <span>•</span>
          <span>10th Industrial Zone B4, Cairo</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Database Synchronized
          </span>
          <span>•</span>
          <span>CostFlow ERP © 2026</span>
        </div>
      </footer>
    </div>
  );
};
