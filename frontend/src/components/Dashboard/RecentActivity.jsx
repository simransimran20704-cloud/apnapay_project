import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
} from 'lucide-react';

export const RecentActivity = ({ onSelectTransaction }) => {
  const { transactions, loading } = useWallet();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'DEBIT' | 'CREDIT'

  const filtered = transactions.filter((t) => {
    const matchesType = filterType === 'ALL' || t.type === filterType;
    const s = search.toLowerCase();
    const matchesSearch =
      (t.with && t.with.toLowerCase().includes(s)) ||
      (t.remarks && t.remarks.toLowerCase().includes(s)) ||
      (t.transactionId && t.transactionId.toLowerCase().includes(s));
    return matchesType && matchesSearch;
  });

  const formatDate = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/70 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Recent Activity</h3>
          <p className="text-[11px] text-slate-400">Live ledger statements</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-xl text-[11px] font-semibold">
            {['ALL', 'DEBIT', 'CREDIT'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  filterType === tab
                    ? 'bg-white text-indigo-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab === 'ALL' ? 'All' : tab === 'DEBIT' ? 'Debits' : 'Credits'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-slate-100 mt-1">
        {loading && (
          <div className="py-12 text-center text-xs text-slate-400 animate-pulse">
            Loading ledger...
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-2">
              <FileText className="w-5 h-5" />
            </div>
            <p className="text-xs font-medium text-slate-700">No transactions recorded</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Send money or top up your wallet to start your ledger history!
            </p>
          </div>
        )}

        {!loading &&
          filtered.map((txn, idx) => {
            const isDebit = txn.type === 'DEBIT';
            return (
              <div
                key={txn.transactionId || idx}
                onClick={() => onSelectTransaction(txn)}
                className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/90 -mx-2 px-2 rounded-2xl transition cursor-pointer group"
              >
                {/* Icon & Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isDebit
                        ? 'bg-rose-50/60 text-rose-600 border-rose-100'
                        : 'bg-emerald-50/60 text-emerald-600 border-emerald-100'
                    }`}
                  >
                    {isDebit ? (
                      <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4 group-hover:translate-y-0.5 group-hover:-translate-x-0.5 transition-transform" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {isDebit ? `To: ${txn.with || 'Payment'}` : `From: ${txn.with || 'Top up'}`}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {txn.remarks || 'ApnaPay Transfer'}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {formatDate(txn.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right shrink-0">
                  <p
                    className={`text-sm font-bold font-mono tracking-tight ${
                      isDebit ? 'text-slate-900' : 'text-emerald-600'
                    }`}
                  >
                    {isDebit ? '-' : '+'}₹
                    {new Intl.NumberFormat('en-IN', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(txn.amount)}
                  </p>
                  <span
                    className={`inline-block text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-md mt-0.5 ${
                      isDebit
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {isDebit ? 'Debit' : 'Credit'}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
