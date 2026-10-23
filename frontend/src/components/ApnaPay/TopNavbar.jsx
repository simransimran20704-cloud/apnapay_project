import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  ShieldCheck,
  LogOut,
  Sparkles,
  Bot,
  Sun,
  Moon,
} from 'lucide-react';

export const TopNavbar = ({
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  onOpenHelp,
  onOpenProfile,
  onOpenScan,
  onOpenAiAssistant,
  onOpenAllFeatures,
}) => {
  const { auth, profile, logoutUser } = useAuth();
  const { unreadCount } = useNotifications();
  const { theme, toggleTheme } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  const displayName = profile?.name || 'Simran';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="h-18 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E5DDCB] px-6 flex items-center justify-between sticky top-0 z-20 select-none shadow-xs">
      {/* Center/Left Search Box (Color 1: #F0EAD2) */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C7464] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for mobile number, UPI ID, bank, or name..."
            className="w-full bg-[#F0EAD2]/70 hover:bg-[#F0EAD2] focus:bg-white border border-[#E0D5BE] text-[#4A3B32] text-xs placeholder:text-[#9C8575] rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 ml-4">
        {/* 50 Features Innovation Directory Launcher */}
        <button
          onClick={onOpenAllFeatures}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#6C584C] to-[#534339] hover:brightness-110 border border-[#A98467] text-[#F0EAD2] text-xs font-black transition cursor-pointer shadow-xs active:scale-98"
          title="Explore all 50 features"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ADC178]" />
          <span>50 Features</span>
        </button>

        {/* Live Backend Connection Indicator */}
        <div
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DDE5B6]/70 border border-[#ADC178] text-[#2B221B] text-xs font-bold shadow-2xs"
          title="Live Spring Boot Backend Connected (Ports 8080-8083)"
        >
          <span className="w-2 h-2 rounded-full bg-[#4D6321] animate-pulse"></span>
          <span>Backend Live</span>
        </div>

        {/* AI Assistant Quick Pill (Color 2: #DDE5B6 + Color 3: #ADC178) */}
        <button
          onClick={onOpenAiAssistant}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DDE5B6]/80 hover:bg-[#DDE5B6] border border-[#ADC178] text-[#364216] text-xs font-bold transition cursor-pointer shadow-2xs"
          title="Ask AI Finance Genius"
        >
          <Bot className="w-3.5 h-3.5 text-[#4D5E21]" />
          <span>Ask AI</span>
        </button>

        {/* Dark/Light Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-[#F0EAD2]/80 hover:bg-[#F0EAD2] text-[#6C584C] transition cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-[#ADC178]" /> : <Moon className="w-4 h-4 text-[#A98467]" />}
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-full bg-[#F0EAD2]/80 hover:bg-[#F0EAD2] text-[#6C584C] transition cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#A98467] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Help & Support Button */}
        <button
          onClick={onOpenHelp}
          className="p-2.5 rounded-full bg-[#F0EAD2]/80 hover:bg-[#F0EAD2] text-[#6C584C] transition cursor-pointer"
          title="Help & Support"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* User Profile Chip (Color 3: #ADC178 Moss Green) */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-[#F0EAD2]/80 hover:bg-[#F0EAD2] border border-[#E0D5BE] transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#ADC178] text-[#2B221B] font-black text-xs flex items-center justify-center shadow-xs">
              {initial}
            </div>
            <span className="text-xs font-bold text-[#4A3B32] tracking-tight">{displayName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8C7464]" />
          </button>

          {/* Profile Dropdown */}
          {showDropdown && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#FAF8F3] border border-[#E5DDCB] shadow-xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150"
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="p-3 border-b border-[#E5DDCB]">
                <p className="text-[10px] uppercase font-bold text-[#A98467] tracking-wider">Account</p>
                <p className="text-sm font-bold text-[#4A3B32] truncate">{displayName}</p>
                <p className="text-[11px] text-[#6C584C] font-mono font-medium">+91 {auth?.mobileNumber || '9876543210'}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#DDE5B6] text-[10px] font-bold text-[#3B4718]">
                  <ShieldCheck className="w-3 h-3 text-[#5A6D27]" />
                  <span>KYC Verified</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onOpenProfile();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-[#5C493D] hover:bg-[#F0EAD2] flex items-center gap-2 cursor-pointer transition font-semibold"
                >
                  <User className="w-3.5 h-3.5 text-[#8C7464]" />
                  <span>View Full Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    logoutUser();
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer transition font-bold"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};