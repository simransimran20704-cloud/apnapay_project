import React from 'react';
import {
  X,
  ArrowLeft,
  BadgePercent,
  Coins,
  TrendingUp,
  Landmark,
  Utensils,
  Plane,
  ShoppingBag,
  Gift,
  Droplet,
  Flame,
  Zap,
  Car,
} from 'lucide-react';

export const MoreServicesModal = ({
  isOpen,
  onClose,
  onOpenRecharge,
  onOpenBills,
  onOpenInvestments,
}) => {
  if (!isOpen) return null;

  const financial = [
    { label: 'Personal Loan', icon: BadgePercent, action: () => onOpenBills('loan') },
    { label: 'Gold Loan', icon: Coins, action: () => onOpenBills('loan') },
    { label: 'Mutual Funds', icon: TrendingUp, action: onOpenInvestments },
    { label: 'Fixed Deposit', icon: Landmark, action: onOpenInvestments },
  ];

  const lifestyle = [
    { label: 'Food & Dining', icon: Utensils, action: () => {} },
    { label: 'Travel & Trips', icon: Plane, action: () => {} },
    { label: 'Shopping', icon: ShoppingBag, action: () => {} },
    { label: 'Gift Cards', icon: Gift, action: () => {} },
  ];

  const utilities = [
    { label: 'Water Bill', icon: Droplet, action: () => onOpenBills('water') },
    { label: 'Gas Pipeline', icon: Flame, action: () => onOpenBills('gas') },
    { label: 'Electricity', icon: Zap, action: () => onOpenBills('electricity') },
    { label: 'FASTag', icon: Car, action: () => onOpenBills('fastag') },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-[#DDE5B6] hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">All Services</h3>
              <p className="text-xs text-[#DDE5B6]">Banking, Loans, Travel & Bills</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Financial Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C584C] mb-2.5">
              Financial Services & Wealth
            </h4>
            <div className="grid grid-cols-4 gap-2.5">
              {financial.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      onClose();
                      item.action();
                    }}
                    className="p-2.5 rounded-2xl bg-white border border-[#E5DEC9] hover:border-[#ADC178] hover:bg-[#F0EAD2]/30 flex flex-col items-center gap-2 transition cursor-pointer group shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F0EAD2] flex items-center justify-center text-[#6C584C] group-hover:bg-[#DDE5B6] transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#3D3028] text-center leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lifestyle Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C584C] mb-2.5">
              Lifestyle & Bookings
            </h4>
            <div className="grid grid-cols-4 gap-2.5">
              {lifestyle.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      onClose();
                      item.action();
                    }}
                    className="p-2.5 rounded-2xl bg-white border border-[#E5DEC9] hover:border-[#ADC178] hover:bg-[#F0EAD2]/30 flex flex-col items-center gap-2 transition cursor-pointer group shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F0EAD2] flex items-center justify-center text-[#6C584C] group-hover:bg-[#DDE5B6] transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#3D3028] text-center leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Utilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C584C] mb-2.5">
              Utilities & Recharges
            </h4>
            <div className="grid grid-cols-4 gap-2.5">
              {utilities.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      onClose();
                      item.action();
                    }}
                    className="p-2.5 rounded-2xl bg-white border border-[#E5DEC9] hover:border-[#ADC178] hover:bg-[#F0EAD2]/30 flex flex-col items-center gap-2 transition cursor-pointer group shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F0EAD2] flex items-center justify-center text-[#6C584C] group-hover:bg-[#DDE5B6] transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-[#3D3028] text-center leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
