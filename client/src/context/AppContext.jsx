
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

const DEFAULT_USER = {
  name: 'Ahmed Mohamed',
  title: 'Factory Manager',
  email: 'ahmed.mohamed@waterfactory.eg',
  phone: '+20 10 1234 5678',
  employeeId: 'EMP-4892',
  department: 'Plant Operations & Manufacturing',
  plant: '10th Industrial Zone Plant #1 (Cairo)',
  role: 'Factory Manager',
  shift: 'Shift A (07:00 - 15:30)',
  twoFactorEnabled: true,
  emailAlerts: true,
  isLoggedIn: true,
  avatarUrl: '/images/original/avatar-ahmed.png', // Original photo from Image 1
};

export const AppProvider = ({ children }) => {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isCostSheetOpen, setIsCostSheetOpen] = useState(false);

  // User Profile with localStorage persistence
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('costflow_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_USER,
          ...parsed,
          avatarUrl: parsed.avatarUrl || '/images/original/avatar-ahmed.png',
        };
      }
    } catch (e) { }
    return DEFAULT_USER;
  });

  useEffect(() => {
    try {
      localStorage.setItem('costflow_user', JSON.stringify(currentUser));
    } catch (e) { }
  }, [currentUser]);

  // Account Modals State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Real-time toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const updateUserProfile = (updatedData) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
    showToast('Profile information updated successfully!');
  };

  const updateProfilePhoto = (newPhotoUrl) => {
    setCurrentUser((prev) => ({
      ...prev,
      avatarUrl: newPhotoUrl,
    }));
    showToast('Profile photo updated successfully!');
  };

  const removeProfilePhoto = () => {
    setCurrentUser((prev) => ({
      ...prev,
      avatarUrl: '/images/original/avatar-ahmed.png',
    }));
    showToast('Profile photo reset to original photo.');
  };

  const switchRole = (newRole, newTitle) => {
    setCurrentUser((prev) => ({
      ...prev,
      role: newRole,
      title: newTitle || newRole,
    }));
    showToast(`Switched account role to ${newRole}`);
  };

  const switchPlant = (plantName) => {
    setCurrentUser((prev) => ({
      ...prev,
      plant: plantName,
    }));
    showToast(`Switched active facility to ${plantName}`);
  };

  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    setIsLogoutModalOpen(false);
    showToast('You have been logged out of CostFlow ERP.', 'info');
  };

  const handleLogin = (userOverride = null) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...(userOverride || {}),
      isLoggedIn: true,
    }));
    showToast('Welcome back! Signed in as Ahmed Mohamed.');
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for global search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        notificationCount,
        setNotificationCount,
        isCostSheetOpen,
        setIsCostSheetOpen,
        currentUser,
        updateUserProfile,
        updateProfilePhoto,
        removeProfilePhoto,
        switchRole,
        switchPlant,
        handleLogout,
        handleLogin,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isAccountSettingsOpen,
        setIsAccountSettingsOpen,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
        toast,
        showToast,
        showLanding,
        setShowLanding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
