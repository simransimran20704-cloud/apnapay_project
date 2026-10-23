import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useAuth } from '../../context/AuthContext';
import {
  Eye,
  EyeOff,
  RefreshCw,
  ArrowUpRight,
  Plus,
  QrCode,
  ShieldCheck,
  CreditCard,
  Copy,
  Check,
  Wifi,
  Sparkles,
} from 'lucide-react';

export const WalletCard = ({ onOpenSend, onOpenTopUp, onOpenQr }) => {
  const { balance, currency, loading, refreshBalance } = useWallet();
  const { profile, auth } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const rawMobile = auth?.mobileNumber || '9876543210';
  const customerId = profile?.customerId || 'CUST-' + rawMobile.slice(-6);
  const maskedCardNumber = `4528 •••• •••• ${rawMobile.slice(-4)}`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(customerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshBalance();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const formatBalance = (num) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl shadow-slate-950/15 border border-white/10 group">
      {/* Subtle Shimmer & Glow Effects */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header Row */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Metallic EMV Chip */}
          <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 p-1 shadow-inner border border-amber-200/60 flex flex-col justify-between">
            <div className="h-0.5 w-full bg-amber-800/30 rounded-xs" />
            <div className="flex justify-between">
              <div className="w-1.5 h-2 bg-amber-800/30 rounded-xs" />
              <div className="w-1.5 h-2 bg-amber-800/30 rounded-xs" />
            </div>
            <div className="h-0.5 w-full bg-amber-800/30 rounded-xs" />
          </div>

          <Wifi className="w-4 h-4 text-slate-400 rotate-90" />

          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 hidden sm:inline">
            PayEase Obsidian
          </span>
        </div>

        {/* Action Controls (Refresh & Hide) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleManualRefresh}
            className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer ${
              isRefreshing || loading ? 'animate-spin text-indigo-400' : ''
            }`}
            title="Refresh balance"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            title={showBalance ? 'Hide Balance' : 'Show Balance'}
          >
            {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Balance Section */}
      <div className="relative z-10 mt-6 sm:mt-7">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">Wallet Balance</span>
          <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
            Active
          </span>
        </div>

        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-2xl sm:text-3xl text-indigo-300 font-medium font-sans">₹</span>
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-mono">
            {showBalance ? formatBalance(balance) : '••••••'}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 font-mono">
            {currency}
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Cardholder</span>
          <p className="font-semibold text-slate-100 uppercase tracking-wide truncate max-w-[140px] sm:max-w-[200px]">
            {profile?.name || 'Customer'}
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Card Number</span>
          <p className="font-mono text-slate-300 font-medium">
            {maskedCardNumber}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Customer ID</span>
            <p className="font-mono text-indigo-300 font-medium">{customerId}</p>
          </div>
          <button
            onClick={handleCopyId}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition cursor-pointer"
            title="Copy ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="relative z-10 grid grid-cols-3 gap-2.5 mt-6">
        <button
          onClick={onOpenSend}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition active:scale-95 cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Send</span>
        </button>

        <button
          onClick={onOpenTopUp}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-md border border-white/10 transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Add Money</span>
        </button>

        <button
          onClick={onOpenQr}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-md border border-white/10 transition active:scale-95 cursor-pointer"
        >
          <QrCode className="w-4 h-4 text-purple-300" />
          <span>My QR</span>
        </button>
      </div>
    </div>
  );
};
