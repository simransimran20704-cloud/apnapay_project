import React from 'react';
import {
  Smartphone,
  Zap,
  Tv,
  Car,
  Users,
  HandCoins,
  PieChart,
  Shield,
  ChevronRight,
} from 'lucide-react';

export const RechargeGrid = ({
  onOpenBills,
  onOpenSplitBill,
  onOpenRequestMoney,
  onOpenAnalytics,
  onOpenSecurity,
}) => {
  const items = [
    {
      id: 'mobile',
      label: 'Mobile Recharge',
      sub: 'Jio, Airtel, Vi',
      icon: Smartphone,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      badge: 'Popular',
      onClick: onOpenBills,
    },
    {
      id: 'electricity',
      label: 'Electricity Bill',
      sub: 'All State Boards',
      icon: Zap,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      onClick: onOpenBills,
    },
    {
      id: 'fastag',
      label: 'FASTag Recharge',
      sub: 'All Banks Supported',
      icon: Car,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      onClick: onOpenBills,
    },
    {
      id: 'dth',
      label: 'DTH / Broadband',
      sub: 'Tata Play, JioFiber',
      icon: Tv,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      onClick: onOpenBills,
    },
    {
      id: 'split',
      label: 'Split Bill',
      sub: 'Equal share with friends',
      icon: Users,
      color: 'bg-violet-50 text-violet-600 border-violet-100',
      badge: 'Split',
      onClick: onOpenSplitBill,
    },
    {
      id: 'request',
      label: 'Request Money',
      sub: 'Send payment links',
      icon: HandCoins,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      onClick: onOpenRequestMoney,
    },
    {
      id: 'analytics',
      label: 'Spending Insights',
      sub: 'Expense charts',
      icon: PieChart,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      onClick: onOpenAnalytics,
    },
    {
      id: 'security',
      label: 'Security & Limits',
      sub: 'Freeze wallet & limits',
      icon: Shield,
      color: 'bg-slate-100 text-slate-700 border-slate-200/60',
      onClick: onOpenSecurity,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Recharge & Bill Payments
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Pay electricity, mobile bills, FASTag & more</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all text-left group cursor-pointer"
            >
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.color} group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-bold text-slate-800 truncate">{item.label}</p>
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.sub}</p>
              </div>
              {item.badge && (
                <span className="hidden xl:inline text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
