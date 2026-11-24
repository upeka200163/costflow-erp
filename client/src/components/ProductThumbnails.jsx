import React from 'react';

// Crisp, stylized SVG product and raw material renders matching the images
export const WaterBottleIcon = ({ size = '600 ml', className = 'w-10 h-10' }) => {
  const isLarge = size.includes('1.5');
  const isSmall = size.includes('330');

  return (
    <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-sky-50 to-blue-100 rounded-lg border border-blue-100/80 ${className}`}>
      <svg viewBox="0 0 40 80" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cap */}
        <rect x="15" y="4" width="10" height="6" rx="1.5" fill="#2563EB" />
        <rect x="14" y="9" width="12" height="2" rx="0.5" fill="#1D4ED8" />
        {/* Neck */}
        <path d="M16 10L16 18C16 19 14 21 12 24L10 28C8 32 8 36 8 40V68C8 72 11 74 15 74H25C29 74 32 72 32 68V40C32 36 32 32 30 28L28 24C26 21 24 19 24 18V10H16Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.2" />
        {/* Water Level */}
        <path d="M9 36C9 36 13 38 20 38C27 38 31 36 31 36V68C31 71.5 28.5 73 25 73H15C11.5 73 9 71.5 9 68V36Z" fill="#BAE6FD" fillOpacity="0.75" />
        {/* Label */}
        <rect x="8" y="43" width="24" height="15" rx="1" fill="#0284C7" />
        <path d="M11 48H29" stroke="#E0F2FE" strokeWidth="1" strokeLinecap="round" />
        <path d="M11 51H24" stroke="#93C5FD" strokeWidth="0.8" strokeLinecap="round" />
        {/* Water Ripple highlight */}
        <path d="M12 28C14 25 26 25 28 28" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <path d="M11 60V66" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
};

export const WaterCupIcon = ({ className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-sky-50 to-blue-100 rounded-lg border border-blue-100/80 ${className}`}>
    <svg viewBox="0 0 50 60" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cup Foil Lid */}
      <ellipse cx="25" cy="10" rx="20" ry="5" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1.2" />
      {/* Cup Body */}
      <path d="M7 10L12 48C12.5 52 17 54 25 54C33 54 37.5 52 38 48L43 10" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.2" />
      <path d="M9 16L13 46C13.5 49 17 51 25 51C33 51 36.5 49 37 46L41 16" fill="#BAE6FD" fillOpacity="0.8" />
      {/* Lid tab */}
      <path d="M43 10L47 9L45 12Z" fill="#2563EB" />
    </svg>
  </div>
);

export const WaterPackIcon = ({ className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-blue-50 to-indigo-100 rounded-lg border border-blue-100/80 ${className}`}>
    <svg viewBox="0 0 60 50" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shrink Wrap pack representation: 6 bottles */}
      <rect x="4" y="6" width="52" height="38" rx="6" fill="#BFDBFE" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="3 2" />
      {/* Row 1 */}
      <circle cx="14" cy="18" r="7" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
      <circle cx="30" cy="18" r="7" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
      <circle cx="46" cy="18" r="7" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
      {/* Caps in center */}
      <circle cx="14" cy="18" r="3.5" fill="#1D4ED8" />
      <circle cx="30" cy="18" r="3.5" fill="#1D4ED8" />
      <circle cx="46" cy="18" r="3.5" fill="#1D4ED8" />
      {/* Row 2 */}
      <circle cx="14" cy="33" r="7" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
      <circle cx="30" cy="33" r="7" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
      <circle cx="46" cy="33" r="7" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
      <circle cx="14" cy="33" r="3.5" fill="#1D4ED8" />
      <circle cx="30" cy="33" r="3.5" fill="#1D4ED8" />
      <circle cx="46" cy="33" r="3.5" fill="#1D4ED8" />
    </svg>
  </div>
);

export const PreformIcon = ({ className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-slate-50 to-blue-50 rounded-lg border border-slate-200 ${className}`}>
    <svg viewBox="0 0 40 50" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Threaded finish neck */}
      <rect x="14" y="6" width="12" height="8" rx="1" fill="#94A3B8" />
      <line x1="13" y1="8" x2="27" y2="8" stroke="#475569" strokeWidth="1.2" />
      <line x1="13" y1="11" x2="27" y2="11" stroke="#475569" strokeWidth="1.2" />
      {/* Tube test-tube shape */}
      <path d="M15 14V38C15 42 17 45 20 45C23 45 25 42 25 38V14H15Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
      {/* PET transparent gloss highlight */}
      <path d="M17 18V36" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
    </svg>
  </div>
);

export const BottleCapsIcon = ({ className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-blue-50 to-indigo-50 rounded-lg border border-blue-100 ${className}`}>
    <svg viewBox="0 0 50 45" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blue bottle cap with knurled ridges */}
      <ellipse cx="25" cy="14" rx="18" ry="6" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.2" />
      <path d="M7 14V26C7 29.5 15 32 25 32C35 32 43 29.5 43 26V14" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1.2" />
      {/* Ridges */}
      <line x1="12" y1="16" x2="12" y2="28" stroke="#60A5FA" strokeWidth="1" />
      <line x1="18" y1="19" x2="18" y2="30" stroke="#60A5FA" strokeWidth="1" />
      <line x1="25" y1="20" x2="25" y2="32" stroke="#60A5FA" strokeWidth="1" />
      <line x1="32" y1="19" x2="32" y2="30" stroke="#60A5FA" strokeWidth="1" />
      <line x1="38" y1="16" x2="38" y2="28" stroke="#60A5FA" strokeWidth="1" />
    </svg>
  </div>
);

export const LabelsRollIcon = ({ className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-amber-50 to-orange-50 rounded-lg border border-amber-100 ${className}`}>
    <svg viewBox="0 0 50 45" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="14" rx="16" ry="6" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
      <circle cx="25" cy="14" r="5" fill="#78350F" />
      <path d="M9 14V28C9 31.5 16 34 25 34C34 34 41 31.5 41 28V14" fill="#D97706" />
      {/* Unrolling strip */}
      <path d="M41 22C44 23 48 26 47 30C46 33 41 34 35 35" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

export const ShrinkFilmIcon = ({ className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-slate-50 to-sky-50 rounded-lg border border-slate-200 ${className}`}>
    <svg viewBox="0 0 50 45" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="22" rx="7" ry="14" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.2" />
      <ellipse cx="16" cy="22" rx="3" ry="6" fill="#64748B" />
      <path d="M16 8L38 12C42 12.5 45 18 45 23C45 28 42 33 38 34L16 36V8Z" fill="#E2E8F0" fillOpacity="0.8" stroke="#94A3B8" strokeWidth="1.2" />
      <path d="M22 14L40 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

export const ChemicalDrumIcon = ({ className = 'w-10 h-10' }) => (
  <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-cyan-50 to-blue-50 rounded-lg border border-cyan-100 ${className}`}>
    <svg viewBox="0 0 45 50" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blue chemical barrel */}
      <ellipse cx="22.5" cy="10" rx="14" ry="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1.2" />
      <circle cx="16" cy="10" r="2" fill="#E0F2FE" />
      <path d="M8.5 10V40C8.5 42.5 14.5 44 22.5 44C30.5 44 36.5 42.5 36.5 40V10" fill="#0369A1" stroke="#075985" strokeWidth="1.2" />
      {/* Barrel ribs */}
      <line x1="8.5" y1="20" x2="36.5" y2="20" stroke="#0284C7" strokeWidth="1.5" />
      <line x1="8.5" y1="30" x2="36.5" y2="30" stroke="#0284C7" strokeWidth="1.5" />
    </svg>
  </div>
);

export const ConveyorBanner = ({ className = 'h-36' }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/10 via-sky-700/10 to-blue-600/20 flex items-center justify-end ${className}`}>
    {/* Bottling Line Background Graphic */}
    <svg viewBox="0 0 500 180" className="h-full w-auto opacity-70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="conveyorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Conveyor track */}
      <path d="M0 140H500" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
      <path d="M0 152H500" stroke="#64748B" strokeWidth="3" />
      {/* Rollers */}
      {[50, 100, 150, 200, 250, 300, 350, 400, 450].map((x) => (
        <circle key={x} cx={x} cy={146} r={4} fill="#475569" />
      ))}
      {/* Bottles in motion on conveyor */}
      {[80, 140, 200, 260, 320, 380, 440].map((x, i) => (
        <g key={x} transform={`translate(${x - 15}, ${70 - (i % 2) * 5})`}>
          <rect x="10" y="0" width="10" height="5" rx="1.5" fill="#2563EB" />
          <path d="M11 5V12C11 15 7 18 6 22V65C6 68 8 70 15 70C22 70 24 68 24 65V22C23 18 19 15 19 12V5H11Z" fill="#E0F2FE" fillOpacity="0.85" stroke="#38BDF8" strokeWidth="1.2" />
          <rect x="6" y="32" width="18" height="16" rx="1" fill="#0284C7" />
          <path d="M8 25C10 23 20 23 22 25" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </g>
      ))}
      {/* Optical inspection laser effect */}
      <line x1="260" y1="20" x2="260" y2="135" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
      <circle cx="260" cy="80" r="16" fill="#38BDF8" fillOpacity="0.15" />
    </svg>
  </div>
);
