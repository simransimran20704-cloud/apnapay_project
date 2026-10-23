import React from 'react';
import { Home, Clock, Scan, Gift, User } from 'lucide-react';

export const MobileBottomNav = ({
  activeTab,
  onOpenHome,
  onOpenHistory,
  onOpenScan,
  onOpenOffers,
  onOpenProfile,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-xl border-t border-[#E5DDCB] lg:hidden select-none px-2 py-1.5 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around relative">
        {/* Home */}
        <button
          onClick={onOpenHome}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'home' ? 'text-[#3E4E19] font-black' : 'text-[#8C7464] hover:text-[#4A3B32]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* History */}
        <button
          onClick={onOpenHistory}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'history' ? 'text-[#3E4E19] font-black' : 'text-[#8C7464] hover:text-[#4A3B32]'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px]">History</span>
        </button>

        {/* Center Elevated Scan & Pay Button (Color 3: #ADC178 Moss Green) */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={onOpenScan}
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#ADC178] to-[#98AE62] border-4 border-[#FAF8F3] text-[#2B221B] flex items-center justify-center shadow-lg shadow-[#ADC178]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Scan Any QR"
          >
            <Scan className="w-6 h-6" />
          </button>
          <span className="text-[9px] font-black text-[#4A3B32] mt-1">Scan</span>
        </div>

        {/* Offers */}
        <button
          onClick={onOpenOffers}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'offers' ? 'text-[#3E4E19] font-black' : 'text-[#8C7464] hover:text-[#4A3B32]'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="text-[10px]">Offers</span>
        </button>

        {/* Profile */}
        <button
          onClick={onOpenProfile}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeTab === 'profile' ? 'text-[#3E4E19] font-black' : 'text-[#8C7464] hover:text-[#4A3B32]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </nav>
  );
};