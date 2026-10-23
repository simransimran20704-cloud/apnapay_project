import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import {
  X,
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Sparkles,
  ShoppingBag,
  Utensils,
  Zap,
  Tv,
  DollarSign,
  Layers,
} from 'lucide-react';

export const SpendingAnalyticsModal = ({ isOpen, onClose }) => {
  const { balance, transactions } = useWallet();
  const [timeRange, setTimeRange] = useState('month'); // 'week' | 'month' | 'year'

  if (!isOpen) return null;

  // Categories calculation using Earthy Palette
  const categories = [
    { name: 'Shopping & E-Commerce', amount: 6450, percentage: 38, icon: ShoppingBag, color: 'bg-[#6C584C]', text: 'text-[#6C584C]' },
    { name: 'Food & Dining', amount: 3820, percentage: 22, icon: Utensils, color: 'bg-[#A98467]', text: 'text-[#A98467]' },
    { name: 'Bills & Utilities', amount: 3100, percentage: 18, icon: Zap, color: 'bg-[#ADC178]', text: 'text-[#556B2F]' },
    { name: 'UPI & Friend Transfers', amount: 2450, percentage: 14, icon: ArrowUpRight, color: 'bg-[#8C7464]', text: 'text-[#8C7464]' },
    { name: 'Entertainment & OTT', amount: 1380, percentage: 8, icon: Tv, color: 'bg-[#DDE5B6]', text: 'text-[#6C584C]' },
  ];

  const totalSpent = categories.reduce((sum, c) => sum + c.amount, 0);
  const totalIncome = 48500;
  const netSavings = totalIncome - totalSpent;
  const savingsRate = Math.round((netSavings / totalIncome) * 100);

  // Monthly trends
  const monthlyTrends = [
    { month: 'Jul', spent: 14200, income: 42000 },
    { month: 'Aug', spent: 15800, income: 45000 },
    { month: 'Sep', spent: 13900, income: 45000 },
    { month: 'Oct', spent: totalSpent, income: totalIncome },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center">
              <PieChart className="w-5 h-5 text-[#DDE5B6]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Spending Analytics & Insights</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Category breakdowns, income vs expenses & trends</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Time Selector Bar */}
        <div className="px-6 py-3 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] flex items-center justify-between shrink-0">
          <div className="flex bg-white p-1 rounded-xl text-xs font-bold border border-[#E5DEC9]">
            {['week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer ${
                  timeRange === range
                    ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                    : 'text-[#6C584C] hover:text-[#3D3028]'
                }`}
              >
                {range === 'week' ? 'This Week' : range === 'month' ? 'This Month (October)' : 'This Year (2026)'}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#8C7464] font-medium">
            <Calendar className="w-4 h-4 text-[#A98467]" />
            <span>Updated live from wallet</span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Total Expense */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#8C7464]">Total Spent</span>
                <span className="p-1 rounded-lg bg-[#A98467]/15 text-[#A98467]">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-2xl font-black text-[#3D3028]">
                ₹{totalSpent.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#556B2F] font-bold mt-1 flex items-center gap-1">
                <span>↓ 8.4% less than last month</span>
              </p>
            </div>

            {/* Total Income */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#8C7464]">Monthly Inflow</span>
                <span className="p-1 rounded-lg bg-[#ADC178]/25 text-[#556B2F]">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-2xl font-black text-[#3D3028]">
                ₹{totalIncome.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#8C7464] font-medium mt-1">Salary & Top-ups</p>
            </div>

            {/* Net Savings */}
            <div className="p-4 rounded-2xl bg-[#DDE5B6]/50 border border-[#ADC178] shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#6C584C]">Net Savings</span>
                <Sparkles className="w-4 h-4 text-[#556B2F]" />
              </div>
              <p className="text-2xl font-black text-[#2B221B]">
                ₹{netSavings.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#556B2F] font-black mt-1">
                {savingsRate}% Savings Rate (Healthy)
              </p>
            </div>
          </div>

          {/* Highest Spending Banner */}
          <div className="p-4 rounded-2xl bg-[#F0EAD2]/70 border border-[#DDE5B6] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6C584C] text-[#F0EAD2] flex items-center justify-center font-bold text-sm shadow-xs">
                🛍️
              </div>
              <div>
                <p className="text-xs font-bold text-[#6C584C]">Highest Spending: Shopping & E-Commerce</p>
                <p className="text-[11px] text-[#8C7464]">
                  ₹6,450 spent across Amazon, Myntra & Flipkart (38% of your total spend)
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#DDE5B6] text-[#2B221B] text-[10px] font-bold">
              High Velocity
            </span>
          </div>

          {/* Category-Wise Breakdown with Visual Progress Bars */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C584C]">
              Category-Wise Breakdown
            </h4>

            <div className="space-y-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.name} className="p-3.5 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl ${cat.color} text-white flex items-center justify-center shadow-xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[#3D3028]">{cat.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-[#3D3028]">₹{cat.amount.toLocaleString('en-IN')}</span>
                        <span className="text-[#8C7464] font-bold ml-2 text-[11px]">({cat.percentage}%)</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[#F0EAD2] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cat.color} transition-all duration-500`}
                        style={{ width: `${cat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Income vs. Expenses Trend Graph (CSS Bar Chart) */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5DEC9] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C584C]">
                Monthly Income vs. Expenses Trend
              </h4>
              <div className="flex items-center gap-3 text-[11px] font-bold">
                <span className="flex items-center gap-1.5 text-[#556B2F]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ADC178]"></span> Income
                </span>
                <span className="flex items-center gap-1.5 text-[#A98467]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A98467]"></span> Spent
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 pt-3">
              {monthlyTrends.map((m) => {
                const incomeHeight = Math.round((m.income / 50000) * 100);
                const spentHeight = Math.round((m.spent / 50000) * 100);

                return (
                  <div key={m.month} className="flex flex-col items-center gap-2">
                    <div className="h-28 w-full flex items-end justify-center gap-1.5 pb-1">
                      {/* Income Bar */}
                      <div
                        className="w-4 bg-[#ADC178] rounded-t-lg transition-all"
                        style={{ height: `${incomeHeight}%` }}
                        title={`Income: ₹${m.income}`}
                      ></div>
                      {/* Spent Bar */}
                      <div
                        className="w-4 bg-[#A98467] rounded-t-lg transition-all"
                        style={{ height: `${spentHeight}%` }}
                        title={`Spent: ₹${m.spent}`}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-[#3D3028]">{m.month}</span>
                    <span className="text-[10px] text-[#8C7464] font-mono font-bold">₹{(m.spent / 1000).toFixed(1)}k</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
