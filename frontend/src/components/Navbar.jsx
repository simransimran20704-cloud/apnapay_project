import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import {
  Wallet,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Bell,
  BadgeCheck,
} from 'lucide-react';

export const Navbar = ({
  onOpenLogin,
  onOpenRegister,
  onQuickDemo,
  onOpenNotifications,
  onOpenKyc,
}) => {
  const { auth, profile, isAuthenticated, logoutUser } = useAuth();
  const { unreadCount } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#6C584C] to-[#2B221B] bg-clip-text text-transparent">
                ApnaPay
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Wallet
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Fast, Simple & Secure Digital Payments</p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition relative cursor-pointer"
            title="Notifications & Alerts"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {profile?.name ? profile.name[0] : (auth?.mobileNumber?.slice(-2) || 'U')}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold text-slate-800 leading-tight">
                    {profile?.name || 'Customer'}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight font-mono">
                    +91 {auth?.mobileNumber}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {profile?.name || 'Customer'}
                    </p>
                    <p className="text-xs text-indigo-600 font-mono">
                      +91 {auth?.mobileNumber}
                    </p>
                  </div>

                  <div className="px-4 py-2 border-b border-slate-100 text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Account ID:</span>
                      <span className="font-mono font-medium">{profile?.customerId || 'CUST-001'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">KYC Status:</span>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          if (onOpenKyc) onOpenKyc();
                        }}
                        className="inline-flex items-center gap-1 text-emerald-600 font-medium hover:underline cursor-pointer"
                      >
                        <BadgeCheck className="w-3.5 h-3.5" />
                        Verified
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      logoutUser();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={onQuickDemo}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-200 transition cursor-pointer"
                title="Explore wallet directly"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Quick Test Mode</span>
              </button>

              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                Log In
              </button>

              <button
                onClick={onOpenRegister}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 rounded-xl transition cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
