import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useAuth } from '../../context/AuthContext';
import {
  Wallet,
  Eye,
  EyeOff,
  Plus,
  BookOpen,
  QrCode,
  Copy,
  Check,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

export const WalletBalanceStrip = ({ onOpenTopUp, onOpenPassbook, onOpenQr }) => {
  const { balance, currency, loading, refreshBalance } = useWallet();
  const { auth, profile } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mobile = auth?.mobileNumber || '9876543210';
  const upiId = `${mobile}@payease`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
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
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-indigo-500/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Wallet Balance Display */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/60 border border-indigo-400/30 flex items-center justify-center shrink-0 shadow-inner">
            <Wallet className="w-6 h-6 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300">PayEase Digital Wallet</span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
                title={showBalance ? 'Hide' : 'Show'}
              >
                {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleManualRefresh}
                className={`text-slate-400 hover:text-white transition cursor-pointer ${
                  isRefreshing || loading ? 'animate-spin text-indigo-400' : ''
                }`}
                title="Refresh"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-baseline gap-1 mt-0.5 font-mono">
              <span className="text-xl text-indigo-300 font-sans font-medium">₹</span>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {showBalance ? formatBalance(balance) : '••••••'}
              </span>
              <span className="text-[10px] uppercase text-indigo-300/70 ml-1 font-semibold">
                {currency}
              </span>
            </div>
          </div>
        </div>

        {/* Center: UPI ID badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit">
          <span className="text-[10px] font-semibold text-slate-400 uppercase">UPI ID:</span>
          <span className="text-xs font-mono font-medium text-slate-200">{upiId}</span>
          <button
            onClick={handleCopyUpi}
            className="text-slate-400 hover:text-white transition cursor-pointer"
            title="Copy UPI ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenTopUp}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Money</span>
          </button>

          <button
            onClick={onOpenQr}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition active:scale-95 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-purple-300" />
            <span>My QR</span>
          </button>

          <button
            onClick={onOpenPassbook}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>Passbook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
