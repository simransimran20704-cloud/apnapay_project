import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  PiggyBank,
  Plus,
  ArrowDownLeft,
  Sparkles,
  TrendingUp,
  Target,
} from 'lucide-react';

export const SavingsVaultModal = ({ isOpen, onClose }) => {
  const { balance, topUpWallet, sendMoney } = useWallet();
  const { addNotification } = useNotifications();

  const [vaultBalance, setVaultBalance] = useState(4850);
  const [goalAmount] = useState(15000);
  const [goalName] = useState('Goa Vacation & Emergency Fund');
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('DEPOSIT'); // 'DEPOSIT' | 'WITHDRAW'
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round((vaultBalance / goalAmount) * 100));

  const handleAction = async (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;

    setLoading(true);

    if (action === 'DEPOSIT') {
      if (num > balance) {
        alert('Insufficient wallet balance to deposit.');
        setLoading(false);
        return;
      }
      try {
        await sendMoney({
          toMobile: 'VAULT-SAVINGS',
          amount: num,
          remarks: `Deposited into Savings Gullak: ${goalName}`,
        });
        setVaultBalance((prev) => prev + num);
        addNotification({
          title: `Deposited ₹${num} into Savings Gullak`,
          desc: `Your savings vault balance is now ₹${(vaultBalance + num).toFixed(2)}.`,
          type: 'INFO',
        });
      } catch (e) {}
    } else {
      if (num > vaultBalance) {
        alert('Cannot withdraw more than vault balance.');
        setLoading(false);
        return;
      }
      try {
        await topUpWallet({
          amount: num,
          source: 'Savings Vault Withdrawal',
        });
        setVaultBalance((prev) => prev - num);
        addNotification({
          title: `Withdrawn ₹${num} to Wallet`,
          desc: `Funds transferred back to your main spending balance.`,
          type: 'INFO',
        });
      } catch (e) {}
    }

    setLoading(false);
    setAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
              <PiggyBank className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Digital Gullak (Savings Vault)</h3>
              <p className="text-xs text-amber-100">Earn up to 6.5% p.a. • Zero Lock-In</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Vault Balance Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-center shadow-lg shadow-amber-500/25">
            <span className="text-xs font-semibold text-amber-100 uppercase tracking-widest">
              Total Saved Balance
            </span>
            <p className="text-4xl font-extrabold font-mono tracking-tight mt-1">
              ₹{vaultBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Interest Accrued: +₹28.40 this month</span>
            </div>
          </div>

          {/* Savings Goal Tracker */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800 flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                {goalName}
              </span>
              <span className="font-mono font-bold text-amber-800">
                {progressPercent}%
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Saved: ₹{vaultBalance.toLocaleString('en-IN')}</span>
              <span>Target: ₹{goalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAction('DEPOSIT')}
              className={`py-2 rounded-lg transition cursor-pointer ${
                action === 'DEPOSIT'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Deposit to Vault
            </button>
            <button
              type="button"
              onClick={() => setAction('WITHDRAW')}
              className={`py-2 rounded-lg transition cursor-pointer ${
                action === 'WITHDRAW'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Withdraw to Wallet
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAction} className="space-y-3">
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <label className="font-semibold text-slate-700">Amount (₹)</label>
                <span className="text-slate-400">
                  {action === 'DEPOSIT'
                    ? `Wallet: ₹${balance.toFixed(2)}`
                    : `Vault: ₹${vaultBalance.toFixed(2)}`}
                </span>
              </div>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-base font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-lg shadow-amber-600/25 transition cursor-pointer"
            >
              {loading
                ? 'Processing...'
                : action === 'DEPOSIT'
                ? `Deposit ₹${amount || 0} to Gullak`
                : `Withdraw ₹${amount || 0} to Wallet`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
