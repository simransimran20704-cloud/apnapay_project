import React, { useState } from 'react';
import {
  Send,
  PlusCircle,
  QrCode,
  Scan,
  Building2,
  Users,
  HandCoins,
  Gift,
  PiggyBank,
  Zap,
  PieChart,
  BookOpen,
  Shield,
  ChevronRight,
} from 'lucide-react';

export const QuickActions = ({
  onOpenSend,
  onOpenTopUp,
  onOpenQr,
  onOpenScan,
  onOpenBankTransfer,
  onOpenSplitBill,
  onOpenRequestMoney,
  onOpenScratchCard,
  onOpenVault,
  onOpenBills,
  onOpenAnalytics,
  onOpenPassbook,
  onOpenSecurity,
}) => {
  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'PAY' | 'SAVINGS'

  const primaryActions = [
    {
      id: 'scan',
      label: 'Scan QR',
      icon: Scan,
      color: 'bg-indigo-600 text-white shadow-indigo-600/20',
      onClick: onOpenScan,
    },
    {
      id: 'send',
      label: 'To Mobile',
      icon: Send,
      color: 'bg-slate-900 text-white shadow-slate-900/15',
      onClick: onOpenSend,
    },
    {
      id: 'bank',
      label: 'To Bank',
      icon: Building2,
      color: 'bg-slate-900 text-white shadow-slate-900/15',
      onClick: onOpenBankTransfer,
    },
    {
      id: 'topup',
      label: 'Add Money',
      icon: PlusCircle,
      color: 'bg-emerald-600 text-white shadow-emerald-600/20',
      onClick: onOpenTopUp,
    },
  ];

  const services = [
    {
      id: 'split',
      label: 'Split Bill',
      sub: 'With friends',
      icon: Users,
      badge: 'Popular',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      category: 'PAY',
      onClick: onOpenSplitBill,
    },
    {
      id: 'request',
      label: 'Request Money',
      sub: 'Payment link',
      icon: HandCoins,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      category: 'PAY',
      onClick: onOpenRequestMoney,
    },
    {
      id: 'gullak',
      label: 'Savings Gullak',
      sub: '6.5% interest',
      icon: PiggyBank,
      badge: 'Vault',
      color: 'bg-orange-50 text-orange-600 border-orange-100',
      category: 'SAVINGS',
      onClick: onOpenVault,
    },
    {
      id: 'rewards',
      label: 'Cashback Cards',
      sub: 'Win assured ₹',
      icon: Gift,
      badge: 'Assured',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      category: 'SAVINGS',
      onClick: onOpenScratchCard,
    },
    {
      id: 'bills',
      label: 'Recharge & Bills',
      sub: 'Mobile, Power',
      icon: Zap,
      color: 'bg-teal-50 text-teal-600 border-teal-100',
      category: 'PAY',
      onClick: onOpenBills,
    },
    {
      id: 'analytics',
      label: 'Insights & Charts',
      sub: 'Spending habits',
      icon: PieChart,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      category: 'SAVINGS',
      onClick: onOpenAnalytics,
    },
    {
      id: 'passbook',
      label: 'Passbook Ledger',
      sub: 'CSV Statement',
      icon: BookOpen,
      color: 'bg-slate-50 text-slate-700 border-slate-200/60',
      category: 'ALL',
      onClick: onOpenPassbook,
    },
    {
      id: 'security',
      label: 'Security & Limits',
      sub: 'Freeze wallet',
      icon: Shield,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      category: 'ALL',
      onClick: onOpenSecurity,
    },
  ];

  const filteredServices = services.filter((s) => {
    if (activeTab === 'ALL') return true;
    return s.category === activeTab || s.category === 'ALL';
  });

  return (
    <div className="space-y-4">
      {/* 4 Main Quick Action Pills */}
      <div className="grid grid-cols-4 gap-2.5">
        {primaryActions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.onClick}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/70 hover:border-indigo-400 hover:shadow-md transition group active:scale-95 text-center cursor-pointer"
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-1.5 shadow-sm ${act.color} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition truncate max-w-full">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Services Container Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-xs">
        {/* Header & Filter Pills */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 tracking-tight">FinTech Services</h4>
            <p className="text-[11px] text-slate-400">Everything you need in one wallet</p>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-xl text-[11px] font-semibold text-slate-600">
            {['ALL', 'PAY', 'SAVINGS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab === 'ALL' ? 'All' : tab === 'PAY' ? 'Payments' : 'Savings'}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {filteredServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                onClick={srv.onClick}
                className="flex items-center gap-2.5 p-2.5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition cursor-pointer group"
              >
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${srv.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-slate-800 truncate">{srv.label}</p>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate">{srv.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
