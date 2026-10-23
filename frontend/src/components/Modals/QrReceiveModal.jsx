import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  QrCode,
  Copy,
  Check,
  Share2,
  ShieldCheck,
  Wallet,
} from 'lucide-react';

export const QrReceiveModal = ({ isOpen, onClose }) => {
  const { auth, profile } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mobile = auth?.mobileNumber || '9876543210';
  const name = profile?.name || 'Simran';
  const upiId = `${mobile}@apnapay`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-sm bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden text-center">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] border-b border-[#A98467]/30 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#DDE5B6]" />
            <h3 className="text-base font-bold text-[#F0EAD2]">Receive Money</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* QR Code Container */}
          <div className="p-5 bg-white rounded-3xl border border-[#E5DEC9] shadow-xs flex flex-col items-center">
            {/* User chip */}
            <div className="flex items-center gap-2 mb-4 bg-[#F0EAD2] px-3.5 py-1.5 rounded-full border border-[#DDE5B6]">
              <div className="w-6 h-6 rounded-full bg-[#6C584C] text-[#F0EAD2] flex items-center justify-center text-[10px] font-bold">
                {name[0]}
              </div>
              <span className="text-xs font-bold text-[#6C584C]">{name}</span>
            </div>

            {/* Stylized QR Graphic */}
            <div className="relative p-4 bg-[#FAF8F4] rounded-2xl border border-[#E5DEC9] shadow-inner">
              <svg
                viewBox="0 0 160 160"
                className="w-44 h-44 text-[#3D3028]"
                fill="currentColor"
              >
                {/* Outer corners / Finder patterns */}
                {/* Top-Left */}
                <rect x="10" y="10" width="40" height="40" rx="6" fill="#6C584C" />
                <rect x="18" y="18" width="24" height="24" rx="4" fill="#ffffff" />
                <rect x="24" y="24" width="12" height="12" rx="2" fill="#ADC178" />

                {/* Top-Right */}
                <rect x="110" y="10" width="40" height="40" rx="6" fill="#6C584C" />
                <rect x="118" y="18" width="24" height="24" rx="4" fill="#ffffff" />
                <rect x="124" y="24" width="12" height="12" rx="2" fill="#ADC178" />

                {/* Bottom-Left */}
                <rect x="10" y="110" width="40" height="40" rx="6" fill="#6C584C" />
                <rect x="18" y="118" width="24" height="24" rx="4" fill="#ffffff" />
                <rect x="24" y="124" width="12" height="12" rx="2" fill="#ADC178" />

                {/* Data modules & timing dots pattern */}
                <rect x="60" y="14" width="8" height="8" rx="2" />
                <rect x="76" y="14" width="8" height="8" rx="2" />
                <rect x="92" y="14" width="8" height="8" rx="2" />
                <rect x="68" y="26" width="8" height="8" rx="2" />
                <rect x="84" y="26" width="8" height="8" rx="2" />

                <rect x="14" y="60" width="8" height="8" rx="2" />
                <rect x="14" y="76" width="8" height="8" rx="2" />
                <rect x="14" y="92" width="8" height="8" rx="2" />
                <rect x="26" y="68" width="8" height="8" rx="2" />
                <rect x="26" y="84" width="8" height="8" rx="2" />

                <rect x="138" y="60" width="8" height="8" rx="2" />
                <rect x="138" y="76" width="8" height="8" rx="2" />
                <rect x="138" y="92" width="8" height="8" rx="2" />
                <rect x="126" y="68" width="8" height="8" rx="2" />
                <rect x="126" y="84" width="8" height="8" rx="2" />

                <rect x="60" y="138" width="8" height="8" rx="2" />
                <rect x="76" y="138" width="8" height="8" rx="2" />
                <rect x="92" y="138" width="8" height="8" rx="2" />

                {/* Center ApnaPay logo icon */}
                <rect x="60" y="60" width="40" height="40" rx="8" fill="#6C584C" />
                <circle cx="80" cy="80" r="12" fill="#F0EAD2" />
                <circle cx="80" cy="80" r="6" fill="#ADC178" />
              </svg>
            </div>

            <p className="text-xs font-mono font-bold text-[#6C584C] mt-3.5 tracking-wide">
              {upiId}
            </p>
            <p className="text-[11px] text-[#8C7464] font-medium">Scan using any UPI or ApnaPay app</p>
          </div>

          {/* Copy UPI Button */}
          <button
            onClick={handleCopyUpi}
            className="w-full py-3.5 px-4 rounded-xl border border-[#E5DEC9] bg-[#F0EAD2]/60 hover:bg-[#F0EAD2] flex items-center justify-center gap-2 text-xs font-bold text-[#6C584C] transition cursor-pointer shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#556B2F]" />
                <span className="text-[#556B2F]">Copied UPI ID to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#A98467]" />
                <span>Copy UPI ID ({upiId})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
