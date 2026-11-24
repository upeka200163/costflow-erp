import React, { useState, useRef } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  BadgeCheck,
  Camera,
  Save,
  Clock,
  Upload,
  Trash2,
  Check,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

// High-quality preset avatar options for instant 1-click selection
const PRESET_AVATARS = [
  {
    id: 'preset-ahmed',
    name: 'Ahmed Mohamed (Manager)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    fallbackBg: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'preset-quality',
    name: 'Dr. Mona Samir (QA Lead)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    fallbackBg: 'from-emerald-600 to-teal-600',
  },
  {
    id: 'preset-operations',
    name: 'Tarek Mahmoud (Operations)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    fallbackBg: 'from-amber-600 to-orange-600',
  },
  {
    id: 'preset-tech',
    name: 'Yasser Fathy (Automation)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    fallbackBg: 'from-purple-600 to-indigo-600',
  },
];

export const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile, updateProfilePhoto, removeProfilePhoto, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    title: currentUser.title,
    email: currentUser.email,
    phone: currentUser.phone,
    employeeId: currentUser.employeeId,
    department: currentUser.department,
    shift: currentUser.shift,
    plant: currentUser.plant,
  });

  const [previewPhoto, setPreviewPhoto] = useState(currentUser.avatarUrl);
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPEG, PNG, WEBP, SVG)', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('Image file size must be less than 5 MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (typeof dataUrl === 'string') {
        setPreviewPhoto(dataUrl);
        updateProfilePhoto(dataUrl);
        setIsPhotoPickerOpen(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (url) => {
    setPreviewPhoto(url);
    updateProfilePhoto(url);
    setIsPhotoPickerOpen(false);
  };

  const handleRemovePhoto = () => {
    setPreviewPhoto(null);
    removeProfilePhoto();
    setIsPhotoPickerOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      ...formData,
      avatarUrl: previewPhoto,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">User Profile</h3>
            <p className="text-xs text-slate-400">View and update your factory operator identity & photo</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          {/* Avatar Profile Card with Change Photo Feature */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-slate-50 border border-blue-100/60 space-y-3">
            <div className="flex items-center gap-4">
              {/* Avatar Preview */}
              <div className="relative group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 p-0.5 shadow-md overflow-hidden shrink-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {previewPhoto ? (
                      <img
                        src={previewPhoto}
                        alt={currentUser.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => setPreviewPhoto(null)}
                      />
                    ) : (
                      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" fill="#E2E8F0" />
                        <circle cx="20" cy="15" r="7" fill="#64748B" />
                        <path d="M8 36C8 29.3726 13.3726 24 20 24C26.6274 24 32 29.3726 32 36" fill="#64748B" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Camera Click Overlay */}
                <button
                  type="button"
                  onClick={() => setIsPhotoPickerOpen(!isPhotoPickerOpen)}
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all hover:scale-105"
                  title="Change profile photo"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* User Info & Quick Photo Actions */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</h4>
                  <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                </div>
                <p className="text-slate-500 font-medium">{currentUser.title}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsPhotoPickerOpen(!isPhotoPickerOpen)}
                    className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 bg-blue-100/70 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Change Photo</span>
                  </button>

                  {previewPhoto && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg transition-colors"
                      title="Reset to default avatar"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Hidden native file input for disk upload */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp, image/svg+xml"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Photo Picker Drawer (Upload from Device or Select Executive Preset) */}
            {isPhotoPickerOpen && (
              <div className="pt-3 border-t border-blue-200/60 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Choose Profile Photo:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-xl text-[11px] font-bold text-slate-700 hover:text-blue-600 shadow-xs transition-colors"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload from Device</span>
                  </button>
                </div>

                {/* Preset Avatars Row */}
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AVATARS.map((preset) => {
                    const isSelected = previewPhoto === preset.url;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`relative p-1 rounded-2xl border transition-all text-center flex flex-col items-center gap-1 group ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 shadow-xs ring-2 ring-blue-500/30'
                            : 'bg-white border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 relative">
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-blue-600/40 flex items-center justify-center text-white">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-[9px] font-medium text-slate-600 truncate w-full px-0.5">
                          {preset.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Factory Role / Job Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Shift</label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.shift}
                  onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Facility</label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled
                  value={formData.plant}
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
