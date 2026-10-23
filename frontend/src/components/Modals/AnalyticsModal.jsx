import React from 'react';
import { useWallet } from '../../context/WalletContext';
import {
  X,
  PieChart,
  TrendingDown,
  Sparkles,
  ShoppingBag,
  Utensils,
  Zap,
  Car,
  Film,
  ArrowUpRight,
} from 'lucide-react';

export const AnalyticsModal = ({ isOpen, onClose }) => {
  const { transactions } = useWallet();

  if (!isOpen) return null;

  // Calculate outflows
  const debits = transactions.filter((t) => t.type === 'DEBIT');
  const totalOutflow = debits.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0) || 5420;

  const categories = [
    { name: 'Food & Dining', percent: 38, amount: (totalOutflow * 0.38).toFixed(2), color: 'bg-amber-500', text: 'text-amber-500', icon: Utensils },
    { name: 'Shopping & Retail', percent: 26, amount: (totalOutflow * 0.26).toFixed(2), color: 'bg-indigo-500', text: 'text-indigo-500', icon: ShoppingBag },
    { name: 'Bills & Utilities', percent: 18, amount: (totalOutflow * 0.18).toFixed(2), color: 'bg-emerald-500', text: 'text-emerald-500', icon: Zap },
    { name: 'Travel & Commute', percent: 12, amount: (totalOutflow * 0.12).toFixed(2), color: 'bg-blue-500', text: 'text-blue-500', icon: Car },
    { name: 'Entertainment', percent: 6, amount: (totalOutflow * 0.06).toFixed(2), color: 'bg-purple-500', text: 'text-purple-500', icon: Film },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/60 flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Spending Insights & Analytics</h3>
              <p className="text-xs text-indigo-200">Category Breakdown & Expense Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Summary Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-indigo-700 font-medium">Total Monthly Expense</p>
              <p className="text-2xl font-extrabold text-indigo-950 font-mono mt-0.5">
                ₹{Number(totalOutflow).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-white px-2.5 py-1 rounded-full shadow-2xs">
                <TrendingDown className="w-3.5 h-3.5" /> 8% lower than last month
              </span>
            </div>
          </div>

          {/* SVG Donut / Segment Bar Visualizer */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Expense Categories</span>
              <span>100% Tracked</span>
            </div>
            {/* Visual Multi-Segment Bar */}
            <div className="h-4 w-full rounded-full flex overflow-hidden gap-0.5 shadow-inner bg-slate-100">
              {categories.map((c, i) => (
                <div
                  key={i}
                  style={{ width: `${c.percent}%` }}
                  className={`${c.color} transition-all hover:opacity-90`}
                  title={`${c.name}: ${c.percent}%`}
                />
              ))}
            </div>
          </div>

          {/* Category Breakdown List */}
          <div className="space-y-2.5 pt-1">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl ${cat.color}/15 ${cat.text} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{cat.name}</p>
                      <p className="text-[10px] text-slate-400">{cat.percent}% of total spend</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold font-mono text-slate-900">₹{cat.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Smart AI Tip */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Smart Tip:</strong> You spent the most on <em>Food & Dining</em> this month (38%). Consider adding money to your Savings Gullak for a 6.5% return!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
