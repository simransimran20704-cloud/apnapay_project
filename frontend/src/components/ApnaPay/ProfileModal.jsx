import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  ArrowLeft,
  User,
  Building2,
  CreditCard,
  ShieldCheck,
  Bell,
  HelpCircle,
  Info,
  ChevronRight,
  LogOut,
  Crown,
  Sparkles,
  BadgeCheck,
} from 'lucide-react';

export const ProfileModal = ({
  isOpen,
  onClose,
  onOpenBankAccounts,
  onOpenSecurity,
  onOpenUpgradePlus,
}) => {
  const { auth, profile, logoutUser } = useAuth();

  if (!isOpen) return null;

  const displayName = profile?.name || 'Simran';
  const email = profile?.email || `${displayName.toLowerCase()}20704@gmail.com`;
  const mobile = auth?.mobileNumber || '9876543210';
  const initial = displayName.charAt(0).toUpperCase();

  const menuItems = [
    { label: 'Personal Information', icon: User, action: () => {} },
    { label: 'Bank Accounts', icon: Building2, action: onOpenBankAccounts },
    { label: 'UPI Management', icon: CreditCard, action: onOpenBankAccounts },
    { label: 'Security & Privacy', icon: ShieldCheck, action: onOpenSecurity },
    { label: 'Notifications', icon: Bell, action: () => {} },
    { label: 'Help & Support', icon: HelpCircle, action: () => {} },
    { label: 'About ApnaPay', icon: Info, action: () => {} },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-[#DDE5B6] hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Profile & Settings</h3>
              <p className="text-xs text-[#DDE5B6]">Account Preferences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* User Profile Info Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex items-center gap-3.5 shadow-xs">
            <div className="w-13 h-13 rounded-2xl bg-[#6C584C] text-[#F0EAD2] flex items-center justify-center font-black text-xl shadow-md shrink-0">
              {initial}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-black text-[#3D3028] truncate">{displayName}</h4>
              <p className="text-xs text-[#8C7464] truncate font-mono">{email}</p>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DDE5B6] border border-[#ADC178]/40 text-[10px] font-bold text-[#2B221B]">
                <BadgeCheck className="w-3 h-3 text-[#2B221B]" />
                <span>KYC Verified • {mobile}</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-white hover:bg-[#F0EAD2]/40 border border-[#E5DEC9] flex items-center justify-between text-left transition cursor-pointer group shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#F0EAD2] flex items-center justify-center text-[#6C584C] group-hover:bg-[#DDE5B6] transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#3D3028] transition">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              );
            })}
          </div>

          {/* Upgrade to Premium Card */}
          <div className="p-4.5 rounded-2xl bg-gradient-to-r from-[#6C584C] via-[#A98467] to-[#6C584C] text-white border border-[#A98467]/40 flex items-center justify-between gap-3 shadow-md">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#F0EAD2]">
                <Crown className="w-4 h-4 text-[#DDE5B6]" />
                <span className="text-xs font-black">Upgrade to ApnaPay Plus</span>
              </div>
              <p className="text-[11px] text-[#DDE5B6]">
                Higher cashback, 0-fee transfers & dedicated support.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenUpgradePlus();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-bold text-xs shadow-xs transition cursor-pointer shrink-0"
            >
              Upgrade
            </button>
          </div>

          {/* Log Out Button */}
          <button
            onClick={() => {
              onClose();
              logoutUser();
            }}
            className="w-full py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
