import React, { useState } from 'react';

// Original photographic and logo assets extracted directly from the user's interface images
const ORIGINAL_IMAGES = {
  // Products
  prodWb600: '/images/original/prod-wb600.png',
  prodWb330: '/images/original/prod-wb330.png',
  prodWb1500: '/images/original/prod-wb1500.png',
  prodCup200: '/images/original/prod-cup200.png',
  prodPack6: '/images/original/prod-pack6.png',
  productsBanner: '/images/original/products-banner.png',
  
  // Raw Materials
  matPreform: '/images/original/mat-preform.png',
  matPreformAlert: '/images/original/mat-preform-alert.png',
  matCaps: '/images/original/mat-caps.png',
  matCapsAlert: '/images/original/mat-caps-alert.png',
  matLabels: '/images/original/mat-labels.png',
  matFilm: '/images/original/mat-film.png',
  matChemical: '/images/original/mat-chemical.png',
  
  // Dashboard & Operations
  conveyorBanner: '/images/original/dashboard-conveyor.png',
  orderPo1025: '/images/original/order-po1025.png',
  avatarAhmed: '/images/original/avatar-ahmed.png',

  // Suppliers
  suppGlobalPlastic: '/images/original/supp-globalplastic.png',
  suppGlobalPlasticLarge: '/images/original/supp-globalplastic-large.png',
  suppPacktech: '/images/original/supp-packtech.png',
  suppPurewater: '/images/original/supp-purewater.png',
  suppIndustrial: '/images/original/supp-industrial.png',
  suppSmartpack: '/images/original/supp-smartpack.png',
};

// Water Bottle Thumbnail (renders original photo based on size)
export const WaterBottleIcon = ({ size = '600 ml', className = 'w-10 h-10' }) => {
  const [imgError, setImgError] = useState(false);
  const isLarge = size.includes('1.5') || size.includes('1.9') || size.toLowerCase().includes('large');
  const isSmall = size.includes('330') || size.toLowerCase().includes('small');

  const src = isLarge
    ? ORIGINAL_IMAGES.prodWb1500
    : isSmall
    ? ORIGINAL_IMAGES.prodWb330
    : ORIGINAL_IMAGES.prodWb600;

  if (imgError) {
    return (
      <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-sky-50 to-blue-100 rounded-lg border border-blue-100/80 ${className}`}>
        <svg viewBox="0 0 40 80" className="h-full max-h-12 w-auto drop-shadow-sm" fill="none">
          <rect x="15" y="4" width="10" height="6" rx="1.5" fill="#2563EB" />
          <path d="M16 10V18L10 28V68H30V28L24 18V10H16Z" fill="#BAE6FD" stroke="#38BDF8" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-sky-50/80 to-blue-50/50 rounded-xl border border-blue-100/70 shadow-2xs overflow-hidden shrink-0 ${className}`}>
      <img
        src={src}
        alt={`Water Bottle ${size}`}
        onError={() => setImgError(true)}
        className="h-full w-full object-contain filter drop-shadow-sm transition-transform hover:scale-105"
      />
    </div>
  );
};

// Water Cup Thumbnail
export const WaterCupIcon = ({ className = 'w-10 h-10' }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-sky-50 to-blue-100 rounded-lg border border-blue-100/80 ${className}`}>
        <span className="text-xs font-bold text-blue-600">Cup</span>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-sky-50/80 to-blue-50/50 rounded-xl border border-blue-100/70 shadow-2xs overflow-hidden shrink-0 ${className}`}>
      <img
        src={ORIGINAL_IMAGES.prodCup200}
        alt="Water Cup 200 ml"
        onError={() => setImgError(true)}
        className="h-full w-full object-contain filter drop-shadow-sm transition-transform hover:scale-105"
      />
    </div>
  );
};

// Water Pack Thumbnail (6 pcs)
export const WaterPackIcon = ({ className = 'w-10 h-10' }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-blue-50 to-indigo-100 rounded-lg border border-blue-100/80 ${className}`}>
        <span className="text-xs font-bold text-blue-600">Pack</span>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center p-1 bg-gradient-to-b from-blue-50/80 to-indigo-50/50 rounded-xl border border-blue-100/70 shadow-2xs overflow-hidden shrink-0 ${className}`}>
      <img
        src={ORIGINAL_IMAGES.prodPack6}
        alt="Water Pack 6 pcs"
        onError={() => setImgError(true)}
        className="h-full w-full object-contain filter drop-shadow-sm transition-transform hover:scale-105"
      />
    </div>
  );
};

// PET Preform Thumbnail
export const PreformIcon = ({ alert = false, className = 'w-11 h-11' }) => {
  const src = alert ? ORIGINAL_IMAGES.matPreformAlert : ORIGINAL_IMAGES.matPreform;

  return (
    <div className={`relative flex items-center justify-center p-1.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden shrink-0 transition-all hover:border-blue-300 hover:shadow-xs ${className}`}>
      <img
        src={src}
        alt="PET Preform"
        className="h-full w-full object-contain filter drop-shadow-xs transition-transform hover:scale-105"
      />
    </div>
  );
};

// Bottle Caps Thumbnail
export const BottleCapsIcon = ({ alert = false, className = 'w-11 h-11' }) => {
  const src = alert ? ORIGINAL_IMAGES.matCapsAlert : ORIGINAL_IMAGES.matCaps;

  return (
    <div className={`relative flex items-center justify-center p-1.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden shrink-0 transition-all hover:border-blue-300 hover:shadow-xs ${className}`}>
      <img
        src={src}
        alt="Bottle Caps"
        className="h-full w-full object-contain filter drop-shadow-xs transition-transform hover:scale-105"
      />
    </div>
  );
};

// Labels Roll Thumbnail
export const LabelsRollIcon = ({ className = 'w-11 h-11' }) => (
  <div className={`relative flex items-center justify-center p-1.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden shrink-0 transition-all hover:border-blue-300 hover:shadow-xs ${className}`}>
    <img
      src={ORIGINAL_IMAGES.matLabels}
      alt="Labels"
      className="h-full w-full object-contain filter drop-shadow-xs transition-transform hover:scale-105"
    />
  </div>
);

// Shrink Film Thumbnail
export const ShrinkFilmIcon = ({ className = 'w-11 h-11' }) => (
  <div className={`relative flex items-center justify-center p-1.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden shrink-0 transition-all hover:border-blue-300 hover:shadow-xs ${className}`}>
    <img
      src={ORIGINAL_IMAGES.matFilm}
      alt="Shrink Film"
      className="h-full w-full object-contain filter drop-shadow-xs transition-transform hover:scale-105"
    />
  </div>
);

// Water Treatment / Chemicals Thumbnail
export const ChemicalDrumIcon = ({ className = 'w-11 h-11' }) => (
  <div className={`relative flex items-center justify-center p-1.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden shrink-0 transition-all hover:border-blue-300 hover:shadow-xs ${className}`}>
    <img
      src={ORIGINAL_IMAGES.matChemical}
      alt="Water Treatment Materials"
      className="h-full w-full object-contain filter drop-shadow-xs transition-transform hover:scale-105"
    />
  </div>
);

// Conveyor Banner (Top-right of Dashboard)
export const ConveyorBanner = ({ className = 'h-28' }) => (
  <div className={`relative overflow-hidden rounded-2xl border border-blue-100/60 shadow-sm flex items-center justify-end bg-gradient-to-r from-blue-900/10 via-transparent to-blue-600/10 ${className}`}>
    <img
      src={ORIGINAL_IMAGES.conveyorBanner}
      alt="Bottling Line Conveyor"
      className="h-full w-full object-cover object-center"
    />
  </div>
);

// Supplier Logo Component
export const SupplierLogo = ({ supplier, large = false, className = '' }) => {
  const name = supplier?.name?.toLowerCase() || '';
  const category = supplier?.category?.toLowerCase() || '';

  let src = ORIGINAL_IMAGES.suppGlobalPlastic;

  if (name.includes('global') || category.includes('plastic')) {
    src = large ? ORIGINAL_IMAGES.suppGlobalPlasticLarge : ORIGINAL_IMAGES.suppGlobalPlastic;
  } else if (name.includes('packtech') || category.includes('pack')) {
    src = ORIGINAL_IMAGES.suppPacktech;
  } else if (name.includes('pure water') || category.includes('chem')) {
    src = ORIGINAL_IMAGES.suppPurewater;
  } else if (name.includes('industrial') || category.includes('machin')) {
    src = ORIGINAL_IMAGES.suppIndustrial;
  } else if (name.includes('smart') || name.includes('carton')) {
    src = ORIGINAL_IMAGES.suppSmartpack;
  }

  if (large) {
    return (
      <div className={`w-16 h-16 rounded-full p-1 bg-white shadow-md border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 ${className}`}>
        <img
          src={src}
          alt={supplier?.name || 'Supplier Logo'}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`w-8 h-8 rounded-full bg-white border border-slate-200/80 p-0.5 shadow-2xs flex items-center justify-center overflow-hidden shrink-0 ${className}`}>
      <img
        src={src}
        alt={supplier?.name || 'Supplier'}
        className="w-full h-full object-contain"
      />
    </div>
  );
};
