import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { TrendingUp, TrendingDown, ArrowDownLeft, ArrowUpRight, Activity } from 'lucide-react';

export const StatsOverview = () => {
  const { transactions } = useWallet();

  const totalInflow = transactions
    .filter((t) => t.type === 'CREDIT' && t.status === 'SUCCESS')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const totalOutflow = transactions
    .filter((t) => t.type === 'DEBIT' && t.status === 'SUCCESS')
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const formatAmount = (num) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* Total Inflow */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:shadow-sm transition">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Inflow
          </span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowDownLeft className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2.5">
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
            +₹{formatAmount(totalInflow)}
          </p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
            Credits & Top-ups
          </p>
        </div>
      </div>

      {/* Total Outflow */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:shadow-sm transition">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Outflow
          </span>
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2.5">
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
            -₹{formatAmount(totalOutflow)}
          </p>
          <p className="text-[11px] text-rose-600 font-medium mt-0.5">
            Transfers & Bills
          </p>
        </div>
      </div>

      {/* Ledger Activity */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:shadow-sm transition">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Activity
          </span>
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Activity className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="mt-2.5">
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
            {transactions.length} <span className="text-xs font-normal text-slate-400">records</span>
          </p>
          <p className="text-[11px] text-indigo-600 font-medium mt-0.5">
            100% Synchronized
          </p>
        </div>
      </div>
    </div>
  );
};
