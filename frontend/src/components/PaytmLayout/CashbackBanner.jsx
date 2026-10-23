import React from 'react';
import { Gift, PiggyBank, Sparkles, ArrowRight } from 'lucide-react';

export const CashbackBanner = ({ onOpenScratchCard, onOpenVault }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      {/* Banner 1: Scratch Cards & Rewards */}
      <div
        onClick={onOpenScratchCard}
        className="relative overflow-hidden rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white border border-purple-500/20 shadow-xs hover:shadow-md transition cursor-pointer group"
      >
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-600/60 border border-purple-400/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                PayEase Cashback Club
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">Assured Scratch Cards Waiting</h4>
              <p className="text-[11px] text-slate-300">Tap to scratch & win up to ₹75 cashback</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Banner 2: Digital Gullak Savings */}
      <div
        onClick={onOpenVault}
        className="relative overflow-hidden rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-amber-900 via-orange-950 to-slate-900 text-white border border-amber-500/20 shadow-xs hover:shadow-md transition cursor-pointer group"
      >
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-600/60 border border-amber-400/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PiggyBank className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Digital Gullak Vault
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">Grow Money at 6.5% p.a.</h4>
              <p className="text-[11px] text-slate-300">Instant deposit & zero lock-in withdrawal</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
