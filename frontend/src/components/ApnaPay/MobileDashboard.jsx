import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Bell,
  Eye,
  EyeOff,
  Send,
  Scan,
  Users,
  Clock,
  Plus,
  Smartphone,
  Zap,
  Tv,
  Flame,
  Droplet,
  Car,
  BadgePercent,
  ShieldCheck,
  ChevronRight,
  Gift,
  BadgeCheck,
  Sparkles,
  PieChart,
  Bot,
  Repeat,
  ShieldAlert,
  FileSpreadsheet,
} from 'lucide-react';

export const MobileDashboard = ({
  onOpenSendMoney,
  onOpenScan,
  onOpenTopUp,
  onOpenUpiCircle,
  onOpenHistory,
  onOpenOffers,
  onOpenRecharge,
  onOpenBills,
  onOpenProfile,
  onOpenNotifications,
  // 6 New Features
  onOpenAnalytics,
  onOpenSmartNotifications,
  onOpenFraudRisk,
  onOpenExportStatements,
  onOpenRecurringSimulator,
  onOpenAiAssistant,
  onOpenAllFeatures,
}) => {
  const { profile, auth } = useAuth();
  const { balance } = useWallet();
  const { unreadCount } = useNotifications();
  const [showBalance, setShowBalance] = useState(true);

  const displayName = profile?.name || 'Simran';
  const initial = displayName.charAt(0).toUpperCase();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const quickActions = [
    { id: 'mobile', label: 'Mobile Recharge', icon: Smartphone, action: () => onOpenRecharge('mobile'), bg: 'bg-[#DDE5B6]/70', text: 'text-[#364216]' },
    { id: 'electricity', label: 'Electricity Bill', icon: Zap, action: () => onOpenBills('electricity'), bg: 'bg-[#A98467]/20', text: 'text-[#7D5C43]' },
    { id: 'dth', label: 'DTH', icon: Tv, action: () => onOpenRecharge('dth'), bg: 'bg-[#F0EAD2]', text: 'text-[#6C584C]' },
    { id: 'gas', label: 'Gas Cylinder', icon: Flame, action: () => onOpenBills('gas'), bg: 'bg-[#6C584C]/15', text: 'text-[#6C584C]' },
    { id: 'water', label: 'Water Bill', icon: Droplet, action: () => onOpenBills('water'), bg: 'bg-[#ADC178]/25', text: 'text-[#48591E]' },
    { id: 'fastag', label: 'FASTag', icon: Car, action: () => onOpenBills('fastag'), bg: 'bg-[#DDE5B6]/70', text: 'text-[#364216]' },
    { id: 'loan', label: 'Loan', icon: BadgePercent, action: () => onOpenBills('loan'), bg: 'bg-[#A98467]/20', text: 'text-[#7D5C43]' },
    { id: 'insurance', label: 'Insurance', icon: ShieldCheck, action: () => onOpenBills('insurance'), bg: 'bg-[#ADC178]/25', text: 'text-[#48591E]' },
  ];

  return (
    <div className="space-y-4 pb-20 select-none">
      {/* 1. Mobile Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div
          onClick={onOpenProfile}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#6C584C] flex items-center justify-center text-[#F0EAD2] font-black text-sm shadow-sm">
              {initial}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#ADC178] border-2 border-[#FAF8F3] flex items-center justify-center text-[#2B221B]">
              <BadgeCheck className="w-2.5 h-2.5" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#3D3028] tracking-tight leading-tight">
              Hello, {displayName}
            </h2>
            <p className="text-[10px] text-[#8C7464] font-semibold">{greeting}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Quick Button */}
          <button
            onClick={onOpenAiAssistant}
            className="p-2.5 rounded-full bg-[#DDE5B6]/80 text-[#364216] border border-[#ADC178] transition cursor-pointer"
            title="AI Finance Assistant"
          >
            <Bot className="w-4 h-4 text-[#4D5E21]" />
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-full bg-white border border-[#E5DEC9] text-[#6C584C] shadow-2xs transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#A98467] text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 2. Total Balance Card (Warm Terracotta to Espresso Gradient) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6C584C] via-[#856752] to-[#A98467] text-[#F0EAD2] p-5 shadow-lg shadow-[#6C584C]/15 relative overflow-hidden">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#DDE5B6]">Total Balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-[#DDE5B6] hover:text-white cursor-pointer"
            >
              {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            onClick={onOpenTopUp}
            className="px-3.5 py-1.5 rounded-full bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] text-xs font-black transition flex items-center gap-1 cursor-pointer shadow-xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add Money</span>
          </button>
        </div>

        <div className="text-2xl font-black text-white tracking-tight font-sans">
          {showBalance ? `₹ ${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '••••••••'}
        </div>
      </div>

      {/* 3. Four Core Action Buttons (Each highlighted distinctly) */}
      <div className="grid grid-cols-4 gap-2.5">
        <button
          onClick={onOpenSendMoney}
          className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#E5DEC9] shadow-2xs hover:border-[#ADC178] transition active:scale-95 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/50 flex items-center justify-center text-[#4A5D1F] group-hover:bg-[#ADC178] group-hover:text-[#2B221B] transition-all">
            <Send className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#4A3B32] text-center leading-tight">
            Send Money
          </span>
        </button>

        <button
          onClick={onOpenScan}
          className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#E5DEC9] shadow-2xs hover:border-[#ADC178] transition active:scale-95 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#DDE5B6]/70 border border-[#ADC178]/50 flex items-center justify-center text-[#3B4718] group-hover:bg-[#DDE5B6] transition-all">
            <Scan className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#4A3B32] text-center leading-tight">
            Scan & Pay
          </span>
        </button>

        <button
          onClick={onOpenUpiCircle}
          className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#E5DEC9] shadow-2xs hover:border-[#A98467] transition active:scale-95 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#A98467]/20 border border-[#A98467]/40 flex items-center justify-center text-[#78573F] group-hover:bg-[#A98467] group-hover:text-white transition-all">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#4A3B32] text-center leading-tight">
            UPI Circle
          </span>
        </button>

        <button
          onClick={onOpenHistory}
          className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white border border-[#E5DEC9] shadow-2xs hover:border-[#6C584C] transition active:scale-95 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#6C584C]/15 border border-[#6C584C]/30 flex items-center justify-center text-[#6C584C] group-hover:bg-[#6C584C] group-hover:text-[#F0EAD2] transition-all">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#4A3B32] text-center leading-tight">
            History
          </span>
        </button>
      </div>

      {/* 3.5 All 50 Features Mobile Banner */}
      <div
        onClick={onOpenAllFeatures}
        className="rounded-2xl bg-gradient-to-r from-[#6C584C] to-[#534339] text-[#F0EAD2] p-3 flex items-center justify-between shadow-xs cursor-pointer active:scale-98 transition border border-[#A98467]/30"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center font-black">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white">50 Features Innovation Directory</h4>
            <p className="text-[10px] text-[#DDE5B6]">AI Intent • Group Split • QR Trust • Sandbox</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#DDE5B6]" />
      </div>

      {/* 4. Smart Financial Tools Strip (Mobile Quick Pills) */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onOpenAnalytics}
          className="p-2.5 rounded-2xl bg-white border border-[#E5DEC9] shadow-2xs flex items-center gap-2 text-left cursor-pointer hover:border-[#ADC178]"
        >
          <PieChart className="w-4 h-4 text-[#A98467] shrink-0" />
          <div className="truncate">
            <span className="text-[10px] font-extrabold text-[#3D3028] block truncate">Analytics</span>
            <span className="text-[9px] text-[#8C7464] block truncate">Insights</span>
          </div>
        </button>

        <button
          onClick={onOpenFraudRisk}
          className="p-2.5 rounded-2xl bg-white border border-[#E5DEC9] shadow-2xs flex items-center gap-2 text-left cursor-pointer hover:border-[#6C584C]"
        >
          <ShieldAlert className="w-4 h-4 text-[#6C584C] shrink-0" />
          <div className="truncate">
            <span className="text-[10px] font-extrabold text-[#3D3028] block truncate">Fraud Shield</span>
            <span className="text-[9px] text-[#4E6221] font-bold block truncate">96 Score</span>
          </div>
        </button>

        <button
          onClick={onOpenRecurringSimulator}
          className="p-2.5 rounded-2xl bg-white border border-[#E5DEC9] shadow-2xs flex items-center gap-2 text-left cursor-pointer hover:border-[#DDE5B6]"
        >
          <Repeat className="w-4 h-4 text-[#ADC178] shrink-0" />
          <div className="truncate">
            <span className="text-[10px] font-extrabold text-[#3D3028] block truncate">Recurring</span>
            <span className="text-[9px] text-[#8C7464] block truncate">Simulator</span>
          </div>
        </button>
      </div>

      {/* 5. Exclusive Offers Promo Banner (Soft Celadon & Cream) */}
      <div
        onClick={onOpenOffers}
        className="rounded-2xl bg-gradient-to-r from-[#DDE5B6]/80 via-[#F0EAD2] to-[#DDE5B6]/80 border border-[#C5D099] p-3.5 flex items-center justify-between cursor-pointer active:scale-98 transition group"
      >
        <div className="space-y-0.5">
          <p className="text-[10px] uppercase font-bold text-[#4B5E1E]">Save more with</p>
          <h4 className="text-xs font-black text-[#2E3914]">Exclusive Offers</h4>
          <span className="inline-block text-[10px] font-black text-[#A98467] group-hover:underline">
            Explore now →
          </span>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-white border border-[#C5D099] flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
          🎁
        </div>
      </div>

      {/* 6. Quick Actions 8-Grid */}
      <div className="rounded-2xl bg-white border border-[#E5DEC9] p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7464]">Quick Actions</h3>
          <button
            onClick={() => onOpenRecharge('all')}
            className="text-xs font-bold text-[#A98467] hover:text-[#6C584C] cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <button
                key={qa.id}
                onClick={qa.action}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-[#FAF8F3] active:scale-95 transition cursor-pointer group"
              >
                <div
                  className={`w-11 h-11 rounded-2xl ${qa.bg} ${qa.text} flex items-center justify-center transition-all shadow-2xs`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-[#4A3B32] text-center leading-tight">
                  {qa.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};