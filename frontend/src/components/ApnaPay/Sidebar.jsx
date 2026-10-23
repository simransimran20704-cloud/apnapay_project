import React from 'react';
import {
  Home,
  Send,
  Scan,
  Users,
  Zap,
  Building2,
  Clock,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Gift,
  Crown,
  PieChart,
  Bell,
  ShieldAlert,
  FileSpreadsheet,
  Repeat,
  Bot,
} from 'lucide-react';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  onOpenSendMoney,
  onOpenScan,
  onOpenUpiCircle,
  onOpenRecharge,
  onOpenBankTransfer,
  onOpenHistory,
  onOpenBankAccounts,
  onOpenCards,
  onOpenInsurance,
  onOpenInvestments,
  onOpenRewards,
  onOpenUpgradePlus,
  // 6 New Features
  onOpenAnalytics,
  onOpenSmartNotifications,
  onOpenFraudRisk,
  onOpenExportStatements,
  onOpenRecurringSimulator,
  onOpenAiAssistant,
  // 50 Features Innovation Suites
  onOpenAllFeatures,
  onOpenAiSmartHub,
  onOpenSocialFinance,
  onOpenSecurityPrivacyHub,
  onOpenPaymentReliability,
  onOpenDisputesRefunds,
  onOpenMerchantGrowth,
  onOpenDeveloperPlatform,
  onOpenAdminGovernance,
}) => {
  const coreNavItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => setActiveTab('home') },
    { id: 'send', label: 'Send Money', icon: Send, action: onOpenSendMoney },
    { id: 'scan', label: 'Scan & Pay', icon: Scan, action: onOpenScan },
    { id: 'circle', label: 'UPI Circle', icon: Users, action: onOpenUpiCircle },
    { id: 'recharge', label: 'Recharge & Bills', icon: Zap, action: onOpenRecharge },
    { id: 'tobank', label: 'To Bank', icon: Building2, action: onOpenBankTransfer },
    { id: 'history', label: 'Transaction History', icon: Clock, action: onOpenHistory },
  ];

  const smartNavItems = [
    {
      id: 'ai',
      label: 'AI Finance Assistant',
      icon: Bot,
      action: onOpenAiAssistant,
      highlight: true,
      color: 'text-[#ADC178]',
      badge: 'bg-[#ADC178] text-[#2E241E]',
    },
    {
      id: 'analytics',
      label: 'Spending Analytics',
      icon: PieChart,
      action: onOpenAnalytics,
      color: 'text-[#A98467]',
    },
    {
      id: 'notifications',
      label: 'Smart Notifications',
      icon: Bell,
      action: onOpenSmartNotifications,
      color: 'text-[#ADC178]',
    },
    {
      id: 'fraud',
      label: 'Fraud & Risk Engine',
      icon: ShieldAlert,
      action: onOpenFraudRisk,
      color: 'text-[#6C584C]',
    },
    {
      id: 'export',
      label: 'Export Statements',
      icon: FileSpreadsheet,
      action: onOpenExportStatements,
      color: 'text-[#A98467]',
    },
    {
      id: 'recurring',
      label: 'Recurring Simulator',
      icon: Repeat,
      action: onOpenRecurringSimulator,
      color: 'text-[#6C584C]',
    },
    {
      id: 'rewards',
      label: 'Rewards & Offers',
      icon: Gift,
      action: onOpenRewards,
      color: 'text-[#A98467]',
    },
  ];

  return (
    <aside className="w-64 bg-[#FAF8F3] border-r border-[#E5DDCB] flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto select-none z-30 shadow-xs">
      <div className="p-5">
        {/* Brand Logo & Tagline (Color 5: #6C584C Espresso + Color 1: #F0EAD2 Cream) */}
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="w-10 h-10 rounded-2xl bg-[#6C584C] flex items-center justify-center text-[#F0EAD2] shadow-md shadow-[#6C584C]/20">
            <span className="font-black text-xl tracking-tighter">P</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#4A3B32] flex items-center gap-1">
              ApnaPay
            </h1>
            <p className="text-[11px] font-bold text-[#A98467] tracking-wider">
              Pay • Save • Grow
            </p>
          </div>
        </div>

        {/* Master Innovation Directory Pill */}
        <div className="mb-4 px-1">
          <button
            onClick={onOpenAllFeatures}
            className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-[#6C584C] to-[#534339] text-[#F0EAD2] flex items-center justify-between shadow-xs hover:brightness-110 transition cursor-pointer border border-[#A98467]/30"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ADC178] animate-ping" />
              <span className="text-xs font-black">All 50 Features</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ADC178] text-[#2B221B] font-extrabold uppercase">
              Directory
            </span>
          </button>
        </div>

        {/* Core Navigation Links */}
        <div className="space-y-1 mb-5">
          <p className="px-3 text-[10px] uppercase font-bold text-[#A98467] tracking-wider mb-2">
            Main Menu
          </p>
          {coreNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  if (item.id === 'home') setActiveTab('home');
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ADC178] text-[#2B221B] shadow-sm font-extrabold'
                    : 'text-[#6C584C] hover:text-[#382D26] hover:bg-[#F0EAD2]/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#2B221B]' : 'text-[#8C7464]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Smart & Analytics Features */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] uppercase font-bold text-[#A98467] tracking-wider mb-2">
            Smart Financial Tools
          </p>
          {smartNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  item.highlight
                    ? 'bg-[#DDE5B6]/70 text-[#3C491A] border border-[#ADC178]/50 hover:bg-[#DDE5B6]'
                    : 'text-[#6C584C] hover:text-[#382D26] hover:bg-[#F0EAD2]/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${item.color || 'text-[#8C7464]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className={`px-1.5 py-0.5 rounded-md ${item.badge} text-[9px] font-black uppercase`}>
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 50 Features Master Innovation Suites */}
        <div className="space-y-1 mt-5">
          <p className="px-3 text-[10px] uppercase font-bold text-[#A98467] tracking-wider mb-2">
            New Innovation Suites
          </p>
          {[
            { label: 'AI & Voice Smart Hub', action: onOpenAiSmartHub, color: 'text-[#ADC178]' },
            { label: 'Social & Group Split', action: onOpenSocialFinance, color: 'text-[#A98467]' },
            { label: 'Security & QR Trust', action: onOpenSecurityPrivacyHub, color: 'text-[#6C584C]' },
            { label: 'Reliability & Wallets', action: onOpenPaymentReliability, color: 'text-[#ADC178]' },
            { label: 'Disputes & Refunds', action: onOpenDisputesRefunds, color: 'text-[#A98467]' },
            { label: 'Merchant Soundbox', action: onOpenMerchantGrowth, color: 'text-[#6C584C]' },
            { label: 'Developer Sandbox', action: onOpenDeveloperPlatform, color: 'text-[#ADC178]' },
            { label: 'Admin, Theme & Lang', action: onOpenAdminGovernance, color: 'text-[#6C584C]' },
          ].map((suite) => (
            <button
              key={suite.label}
              onClick={suite.action}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-[#6C584C] hover:text-[#2B221B] hover:bg-[#F0EAD2]/70 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-1.5 h-1.5 rounded-full ${suite.color ? 'bg-[#ADC178]' : 'bg-[#6C584C]'}`} />
                <span>{suite.label}</span>
              </div>
              <span className="text-[9px] text-[#A98467] font-mono">LIVE</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upgrade to ApnaPay Plus Promotion Box (Color 4: #A98467 & Color 5: #6C584C) */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-[#A98467] to-[#6C584C] text-[#F0EAD2] relative overflow-hidden group shadow-md shadow-[#6C584C]/15">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-lg bg-[#ADC178] text-[#2B221B] flex items-center justify-center font-bold text-xs shadow-xs">
            <Crown className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-extrabold text-white">ApnaPay Plus</span>
        </div>
        <p className="text-[11px] text-[#F0EAD2]/90 leading-snug mb-3">
          5% unlimited cashback & metal card privileges.
        </p>
        <button
          onClick={onOpenUpgradePlus}
          className="w-full py-2 px-3 rounded-xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] text-xs font-black shadow-xs transition active:scale-98 cursor-pointer"
        >
          Upgrade Now
        </button>
      </div>
    </aside>
  );
};