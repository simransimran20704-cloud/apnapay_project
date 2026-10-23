import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Search,
  Scan,
  Bell,
  BadgeCheck,
  ShieldCheck,
  LogOut,
  ChevronDown,
  User,
  Sparkles,
} from 'lucide-react';

export const PaytmHeader = ({
  searchQuery,
  onSearchChange,
  onOpenScan,
  onOpenNotifications,
  onOpenKyc,
  onOpenLogin,
  onOpenRegister,
  onQuickDemo,
}) => {
  const { auth, profile, isAuthenticated, logoutUser } = useAuth();
  const { unreadCount } = useNotifications();
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: User Profile Avatar with KYC Badge (Paytm style) */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {profile?.name ? profile.name[0] : (auth?.mobileNumber?.slice(-2) || 'U')}
                </div>
                {/* Verified Green Tick Badge on Avatar */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
                  <BadgeCheck className="w-3 h-3" />
                </div>
              </button>

              {/* Profile Dropdown */}
              {showDropdown && (
                <div
                  className="absolute left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-[11px] text-slate-400">Account Holder</p>
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {profile?.name || 'Customer'}
                    </p>
                    <p className="text-xs text-indigo-600 font-mono font-medium">
                      +91 {auth?.mobileNumber}
                    </p>
                  </div>

                  <div className="px-4 py-2 text-xs text-slate-600 space-y-1.5 border-b border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Account ID:</span>
                      <span className="font-mono font-semibold">{profile?.customerId || 'CUST-001'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">KYC Status:</span>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          if (onOpenKyc) onOpenKyc();
                        }}
                        className="inline-flex items-center gap-1 text-emerald-600 font-semibold hover:underline cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      logoutUser();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-indigo-600/20">
                PE
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 hidden sm:inline">
                PayEase
              </span>
            </div>
          )}
        </div>

        {/* Center: Paytm-style Universal Search Input */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 'Send Money', 'Electricity', 'Pooja'..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-indigo-400 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
            />
          </div>
        </div>

        {/* Right Controls: Scan QR & Notifications */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Scan Icon */}
          <button
            onClick={onOpenScan}
            className="p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition cursor-pointer"
            title="Scan Any QR"
          >
            <Scan className="w-5 h-5" />
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="p-2 rounded-xl text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition relative cursor-pointer"
            title="Notifications & Requests"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenLogin}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 rounded-xl transition cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={onOpenRegister}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 rounded-xl transition cursor-pointer"
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
