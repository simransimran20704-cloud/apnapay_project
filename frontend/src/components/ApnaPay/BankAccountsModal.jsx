import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  ArrowLeft,
  Building2,
  Plus,
  CreditCard,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const BankAccountsModal = ({ isOpen, onClose }) => {
  const { auth, profile } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mobile = auth?.mobileNumber || '9876543210';
  const upiId = `${mobile}@apnapay`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-[#DDE5B6] hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Bank Accounts</h3>
              <p className="text-xs text-[#DDE5B6]">Linked Banks & UPI IDs</p>
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
          {/* Primary Bank Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#6C584C] to-[#534339] text-white border border-[#A98467] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center text-xl">
                🏦
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#F0EAD2]">HDFC Bank</h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#ADC178]/30 text-[#DDE5B6] text-[10px] font-bold">
                    Primary
                  </span>
                </div>
                <p className="text-xs text-[#DDE5B6] font-mono">•••• 4321</p>
                <p className="text-[11px] text-stone-300">Savings Account</p>
              </div>
            </div>
            <ShieldCheck className="w-6 h-6 text-[#ADC178]" />
          </div>

          {/* Add Bank Account Button */}
          <button className="w-full py-3.5 rounded-2xl bg-[#F0EAD2]/60 hover:bg-[#F0EAD2] border border-dashed border-[#A98467] text-[#6C584C] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer">
            <Plus className="w-4 h-4 text-[#6C584C]" />
            <span>Add Bank Account</span>
          </button>

          {/* UPI Services Section */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C584C]">
              UPI Services
            </h4>

            {/* UPI ID Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F0EAD2] border border-[#DDE5B6] flex items-center justify-center text-[#6C584C]">
                  <span className="font-black text-xs">UPI</span>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-[#8C7464]">UPI ID</p>
                  <p className="text-xs font-mono font-bold text-[#3D3028]">{upiId}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(upiId);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-xs font-bold text-[#A98467] hover:text-[#6C584C] transition cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Manage UPI Row */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex items-center justify-between cursor-pointer hover:border-[#ADC178] transition shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#DDE5B6]/50 flex items-center justify-center text-[#6C584C]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#3D3028]">Manage UPI Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </div>
          </div>

          {/* Linked Cards Section */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C584C]">
              Linked Cards
            </h4>

            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-8 rounded-lg bg-gradient-to-r from-[#A98467] to-[#6C584C] flex items-center justify-center text-white font-bold text-[10px] shadow-xs">
                  RuPay
                </div>
                <div>
                  <p className="text-xs font-bold text-[#3D3028]">•••• 5678</p>
                  <p className="text-[11px] text-[#8C7464]">RuPay Platinum Debit Card</p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#A98467] hover:text-[#6C584C] transition cursor-pointer">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
