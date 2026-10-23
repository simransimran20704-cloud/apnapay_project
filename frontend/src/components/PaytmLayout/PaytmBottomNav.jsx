import React from 'react';
import { Home, BookOpen, Scan, PiggyBank, Shield } from 'lucide-react';

export const PaytmBottomNav = ({
  onOpenHome,
  onOpenPassbook,
  onOpenScan,
  onOpenVault,
  onOpenSecurity,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg py-2 px-4 sm:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Home */}
        <button
          onClick={onOpenHome}
          className="flex flex-col items-center gap-1 text-indigo-600 cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Passbook */}
        <button
          onClick={onOpenPassbook}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium">Passbook</span>
        </button>

        {/* Big Elevated Center Scan Any QR Button (Iconic Paytm Style) */}
        <div className="relative -top-5">
          <button
            onClick={onOpenScan}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-xl shadow-indigo-600/40 border-4 border-white flex flex-col items-center justify-center transition-transform active:scale-95 cursor-pointer"
            title="Scan Any QR"
          >
            <Scan className="w-6 h-6" />
          </button>
          <span className="block text-center text-[10px] font-bold text-slate-800 mt-1">Scan QR</span>
        </div>

        {/* Digital Gullak */}
        <button
          onClick={onOpenVault}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <PiggyBank className="w-5 h-5" />
          <span className="text-[10px] font-medium">Gullak</span>
        </button>

        {/* Security / Limits */}
        <button
          onClick={onOpenSecurity}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <Shield className="w-5 h-5" />
          <span className="text-[10px] font-medium">Security</span>
        </button>
      </div>
    </div>
  );
};
