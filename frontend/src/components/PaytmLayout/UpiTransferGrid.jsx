import React from 'react';
import {
  Smartphone,
  Building2,
  PiggyBank,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const UpiTransferGrid = ({
  onOpenSendMobile,
  onOpenBankTransfer,
  onOpenVault,
  onOpenPassbook,
}) => {
  const upiItems = [
    {
      id: 'mobile',
      title: 'To Mobile No.',
      subtitle: 'Instant P2P Transfer',
      icon: Smartphone,
      color: 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25',
      onClick: onOpenSendMobile,
    },
    {
      id: 'bank',
      title: 'To Bank A/C',
      subtitle: 'IMPS Bank Payout',
      icon: Building2,
      color: 'bg-slate-900 text-white shadow-md shadow-slate-900/20',
      onClick: onOpenBankTransfer,
    },
    {
      id: 'vault',
      title: 'To Self / Gullak',
      subtitle: '6.5% Savings Vault',
      icon: PiggyBank,
      color: 'bg-amber-600 text-white shadow-md shadow-amber-600/25',
      onClick: onOpenVault,
    },
    {
      id: 'passbook',
      title: 'Check Balance',
      subtitle: 'Wallet & Passbook',
      icon: BookOpen,
      color: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25',
      onClick: onOpenPassbook,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
      {/* Paytm Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>UPI & Wallet Money Transfer</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              0% Fee
            </span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Send money to any mobile or bank instantly</p>
        </div>
      </div>

      {/* 4 Iconic Transfer Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {upiItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/60 hover:border-indigo-400 hover:shadow-md transition-all group active:scale-95 text-center cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 transition-transform group-hover:scale-110 ${item.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition truncate max-w-full">
                {item.title}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 truncate max-w-full">
                {item.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
