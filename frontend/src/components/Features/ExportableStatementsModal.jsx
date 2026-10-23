import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import {
  X,
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  Printer,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
} from 'lucide-react';

export const ExportableStatementsModal = ({ isOpen, onClose }) => {
  const { transactions } = useWallet();
  const [dateFilter, setDateFilter] = useState('ALL'); // 'ALL' | 'TODAY' | 'WEEK' | 'MONTH' | 'CUSTOM'
  const [typeFilter, setTypeFilter] = useState('ALL'); // 'ALL' | 'DEBIT' | 'CREDIT'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedForReceipt, setSelectedForReceipt] = useState(null);

  if (!isOpen) return null;

  // Filter transactions based on date & type
  const now = new Date();
  const filtered = transactions.filter((tx) => {
    // Type match
    if (typeFilter !== 'ALL' && tx.type !== typeFilter) return false;

    // Date match
    if (!tx.timestamp) return true;
    const txDate = new Date(tx.timestamp);

    if (dateFilter === 'TODAY') {
      return (
        txDate.getDate() === now.getDate() &&
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    }
    if (dateFilter === 'WEEK') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return txDate >= sevenDaysAgo;
    }
    if (dateFilter === 'MONTH') {
      return (
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear()
      );
    }
    if (dateFilter === 'CUSTOM' && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      return txDate >= start && txDate <= end;
    }

    return true;
  });

  const handleExportCSV = () => {
    if (filtered.length === 0) return;

    const headers = [
      'Transaction ID',
      'Date & Time',
      'Type',
      'Amount (INR)',
      'Party / Merchant',
      'Description',
      'Status',
    ];

    const rows = filtered.map((t) => [
      t.transactionId,
      t.timestamp ? new Date(t.timestamp).toLocaleString('en-IN') : 'N/A',
      t.type,
      t.amount,
      `"${(t.with || '').replace(/"/g, '""')}"`,
      `"${(t.remarks || '').replace(/"/g, '""')}"`,
      t.status || 'SUCCESS',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `ApnaPay_Statement_${dateFilter}_${Date.now()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = (tx) => {
    setSelectedForReceipt(tx);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] border-b border-[#A98467]/30 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-[#DDE5B6]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Export Statements & Receipts</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Custom date filters, CSV downloads & vouchers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Filter & Control Toolbar */}
        <div className="p-4 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] space-y-3 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Quick date range pills */}
            <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl text-xs font-bold border border-[#E5DEC9]">
              {[
                { id: 'ALL', label: 'All Time' },
                { id: 'TODAY', label: 'Today' },
                { id: 'WEEK', label: 'Last 7 Days' },
                { id: 'MONTH', label: 'This Month' },
                { id: 'CUSTOM', label: 'Custom Range' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setDateFilter(btn.id)}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    dateFilter === btn.id
                      ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                      : 'text-[#6C584C] hover:text-[#3D3028]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Type selector */}
            <div className="flex bg-white p-1 rounded-xl text-xs font-bold border border-[#E5DEC9]">
              {['ALL', 'DEBIT', 'CREDIT'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    typeFilter === t
                      ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                      : 'text-[#6C584C] hover:text-[#3D3028]'
                  }`}
                >
                  {t === 'ALL' ? 'All' : t === 'DEBIT' ? 'Debits' : 'Credits'}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Date Pickers */}
          {dateFilter === 'CUSTOM' && (
            <div className="flex items-center gap-3 pt-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[#8C7464] font-medium">From:</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-2.5 py-1 rounded-xl border border-[#E5DEC9] bg-white text-[#3D3028]"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#8C7464] font-medium">To:</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-2.5 py-1 rounded-xl border border-[#E5DEC9] bg-white text-[#3D3028]"
                />
              </div>
            </div>
          )}

          {/* Download Action Bar */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#8C7464] font-medium">
              Showing <strong>{filtered.length}</strong> matching transaction records
            </span>

            <button
              onClick={handleExportCSV}
              disabled={filtered.length === 0}
              className="px-4 py-2 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] disabled:opacity-50 text-[#2B221B] font-black text-xs flex items-center gap-2 shadow-md shadow-[#ADC178]/30 transition cursor-pointer active:scale-98"
            >
              <Download className="w-4 h-4 text-[#2B221B]" />
              <span>{downloadSuccess ? 'Downloaded CSV ✓' : 'Download CSV Statement'}</span>
            </button>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-y-auto p-4 divide-y divide-[#E5DEC9]/40 flex-1">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[#8C7464]">
              <FileSpreadsheet className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#6C584C]" />
              <p className="text-sm font-bold">No transactions found for selected filters</p>
            </div>
          ) : (
            filtered.map((tx, idx) => {
              const isDebit = tx.type === 'DEBIT';

              return (
                <div
                  key={tx.transactionId || idx}
                  className="py-3 px-3 hover:bg-white rounded-2xl flex items-center justify-between gap-4 transition shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isDebit ? 'bg-[#A98467]/15 text-[#A98467]' : 'bg-[#ADC178]/25 text-[#4D6321]'
                      }`}
                    >
                      {isDebit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#3D3028] truncate">
                        {tx.with || (isDebit ? 'Payment' : 'Wallet Top Up')}
                      </p>
                      <p className="text-[11px] text-[#8C7464] truncate">
                        {tx.remarks || 'ApnaPay Transaction'} • {tx.transactionId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className={`text-xs font-black font-mono ${isDebit ? 'text-[#3D3028]' : 'text-[#4D6321]'}`}>
                        {isDebit ? '-' : '+'}₹{Number(tx.amount || 0).toFixed(2)}
                      </p>
                      <span className="text-[10px] text-[#4D6321] bg-[#DDE5B6] px-2 py-0.5 rounded-full font-bold">
                        {tx.status || 'SUCCESS'}
                      </span>
                    </div>

                    <button
                      onClick={() => handlePrint(tx)}
                      className="p-2 rounded-xl border border-[#E5DEC9] bg-white hover:bg-[#F0EAD2]/50 text-[#6C584C] transition cursor-pointer shadow-xs"
                      title="Print Official Receipt"
                    >
                      <Printer className="w-4 h-4 text-[#A98467]" />
                    </button>
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
