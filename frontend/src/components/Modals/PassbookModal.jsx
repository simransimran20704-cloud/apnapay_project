import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import {
  X,
  BookOpen,
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const PassbookModal = ({ isOpen, onClose, onSelectTransaction }) => {
  const { transactions } = useWallet();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = transactions.filter((t) => {
    const matchesFilter = filter === 'ALL' || t.type === filter;
    const s = search.toLowerCase();
    const matchesSearch =
      (t.with && t.with.toLowerCase().includes(s)) ||
      (t.remarks && t.remarks.toLowerCase().includes(s)) ||
      (t.transactionId && t.transactionId.toLowerCase().includes(s));
    return matchesFilter && matchesSearch;
  });

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    try {
      return new Date(isoString).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const handleExportCsv = () => {
    if (!transactions.length) return;
    const headers = ['Transaction ID', 'Type', 'Amount', 'Counterparty', 'Remarks', 'Status', 'Timestamp'];
    const rows = transactions.map((t) => [
      t.transactionId,
      t.type,
      t.amount,
      t.with,
      `"${(t.remarks || '').replace(/"/g, '""')}"`,
      t.status,
      t.timestamp,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ApnaPay_Statement_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-2xl bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] border-b border-[#A98467]/30 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Passbook & Statement</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Complete Ledger Activity ({transactions.length} records)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 border-b border-[#E5DEC9] bg-[#F0EAD2]/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search description, recipient, ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5DEC9] bg-white text-[#3D3028] text-xs focus:border-[#ADC178] focus:ring-1 focus:ring-[#ADC178] focus:outline-none transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-[#E5DEC9] p-1 rounded-xl text-xs font-bold">
              {['ALL', 'DEBIT', 'CREDIT'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    filter === tab
                      ? 'bg-[#ADC178] text-[#2B221B] shadow-xs font-bold'
                      : 'text-[#8C7464] hover:text-[#6C584C]'
                  }`}
                >
                  {tab === 'ALL' ? 'All' : tab === 'DEBIT' ? 'Debits' : 'Credits'}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCsv}
              className="p-2 rounded-xl border border-[#E5DEC9] bg-white hover:bg-[#F0EAD2]/50 text-[#6C584C] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Download CSV Statement"
            >
              <Download className="w-3.5 h-3.5 text-[#A98467]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Transactions Table / List */}
        <div className="overflow-y-auto p-4 divide-y divide-[#E5DEC9]/60 flex-1">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[#8C7464]">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-[#6C584C]" />
              <p className="text-sm font-bold">No ledger records found</p>
            </div>
          ) : (
            filtered.map((txn, idx) => {
              const isDebit = txn.type === 'DEBIT';
              return (
                <div
                  key={txn.transactionId || idx}
                  onClick={() => {
                    onClose();
                    onSelectTransaction(txn);
                  }}
                  className="py-3 px-3 hover:bg-white rounded-2xl flex items-center justify-between gap-4 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isDebit
                          ? 'bg-[#A98467]/15 text-[#A98467] border border-[#A98467]/30'
                          : 'bg-[#ADC178]/25 text-[#4D6321] border border-[#ADC178]/40'
                      }`}
                    >
                      {isDebit ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#3D3028] truncate group-hover:text-[#6C584C] transition">
                        {isDebit ? `To: ${txn.with || 'Payment'}` : `From: ${txn.with || 'Top up'}`}
                      </p>
                      <p className="text-[11px] text-[#8C7464] truncate">{txn.remarks || 'ApnaPay transaction'}</p>
                      <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                        {txn.transactionId} • {formatDate(txn.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`text-sm font-bold font-mono ${
                        isDebit ? 'text-[#3D3028]' : 'text-[#4D6321]'
                      }`}
                    >
                      {isDebit ? '-' : '+'}₹
                      {new Intl.NumberFormat('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(txn.amount)}
                    </p>
                    <span className="text-[10px] text-[#4D6321] font-bold bg-[#DDE5B6] border border-[#ADC178]/40 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      {txn.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
