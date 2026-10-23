import React, { useState } from 'react';
import { playCashbackSound } from '../../utils/audio';
import {
  X,
  Crown,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Percent,
} from 'lucide-react';

export const UpgradePlusModal = ({ isOpen, onClose }) => {
  const [upgraded, setUpgraded] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    playCashbackSound();
    setUpgraded(true);
    setTimeout(() => {
      onClose();
      setUpgraded(false);
    }, 2000);
  };

  const perks = [
    'Unlimited 5% Cashback across 100+ partner merchants',
    'Zero Forex Markup on International Payments',
    'Priority High-Speed UPI Routing (Zero failures)',
    'Free Premium RuPay Metal Card with Airport Lounge Access',
    'Dedicated 24x7 Relationship Manager',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#DDE5B6]/30 flex items-center justify-center text-[#F0EAD2]">
              <Crown className="w-4 h-4 text-[#DDE5B6]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">ApnaPay Plus</h3>
              <p className="text-xs text-[#DDE5B6]">VIP Privileges & Highest Cashback</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Visual Membership Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#6C584C] via-[#534339] to-[#3D3028] border border-[#A98467] text-white relative overflow-hidden shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#DDE5B6]">
                  EXCLUSIVE VIP MEMBERSHIP
                </span>
                <h4 className="text-xl font-black tracking-tight mt-0.5 text-[#F0EAD2]">ApnaPay Plus</h4>
              </div>
              <Crown className="w-6 h-6 text-[#ADC178]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#DDE5B6] uppercase tracking-wider font-mono">
                Card Holder
              </span>
              <p className="text-sm font-bold tracking-wide text-white">SIMRAN</p>
            </div>

            <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 rounded-full bg-[#ADC178]/10 blur-xl"></div>
          </div>

          {/* Perks list */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#6C584C]">
              Exclusive Member Privileges
            </h5>
            {perks.map((p, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3D3028]">
                <CheckCircle2 className="w-4 h-4 text-[#ADC178] shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          {/* Price & Upgrade CTA */}
          <div className="pt-2">
            <button
              onClick={handleUpgrade}
              className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-sm shadow-lg shadow-[#ADC178]/30 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              {upgraded ? (
                <>
                  <Sparkles className="w-4 h-4 text-[#2B221B]" />
                  <span>Upgraded to Plus! ✓</span>
                </>
              ) : (
                <>
                  <Crown className="w-4 h-4 text-[#2B221B]" />
                  <span>Upgrade to Plus for ₹499/yr</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
