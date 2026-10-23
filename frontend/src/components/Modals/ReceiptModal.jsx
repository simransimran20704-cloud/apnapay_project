import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  Share2,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const ReceiptModal = ({ transaction, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!transaction) return null;

  const isDebit = transaction.type === 'DEBIT';

  const handleCopyTxnId = () => {
    navigator.clipboard.writeText(transaction.transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (isoString) => {
    if (!isoString) return new Date().toLocaleString();
    try {
      return new Date(isoString).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-sm bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden print:m-0 print:shadow-none">
        {/* Receipt Header Banner */}
        <div className="pt-8 pb-6 px-6 bg-gradient-to-b from-[#F0EAD2] via-[#FAF8F4] to-transparent text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-[#8C7464] hover:text-[#6C584C] transition cursor-pointer print:hidden"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Success Check Badge */}
          <div className="w-16 h-16 rounded-3xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center mx-auto shadow-xl shadow-[#ADC178]/30 mb-4 animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <p className="text-xs font-bold text-[#556B2F] uppercase tracking-widest">
            Payment Successful
          </p>

          <p className="text-3xl font-black text-[#6C584C] font-mono mt-1">
            {isDebit ? '-' : '+'}₹
            {new Intl.NumberFormat('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(transaction.amount)}
          </p>

          <p className="text-xs text-[#8C7464] mt-1 font-medium">
            {isDebit ? `Sent to ${transaction.with || 'Recipient'}` : `Received from ${transaction.with || 'Sender'}`}
          </p>
        </div>

        {/* Receipt Breakdown Details */}
        <div className="px-6 py-4 space-y-3 text-xs border-t border-dashed border-[#E5DEC9]">
          <div className="flex justify-between items-center py-1">
            <span className="text-[#8C7464] font-medium">Transaction ID</span>
            <div className="flex items-center gap-1.5 font-mono font-bold text-[#3D3028]">
              <span>{transaction.transactionId}</span>
              <button
                onClick={handleCopyTxnId}
                className="text-[#8C7464] hover:text-[#6C584C] transition print:hidden cursor-pointer"
                title="Copy ID"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-[#556B2F]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#8C7464] font-medium">Timestamp</span>
            <span className="font-bold text-[#3D3028]">{formatDate(transaction.timestamp)}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#8C7464] font-medium">Payment Type</span>
            <span className="font-bold uppercase tracking-wider text-[#3D3028]">
              {transaction.type}
            </span>
          </div>

          {transaction.remarks && (
            <div className="flex justify-between items-start py-1">
              <span className="text-[#8C7464] font-medium">Note / Remarks</span>
              <span className="font-bold text-[#3D3028] text-right max-w-[60%]">
                {transaction.remarks}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center py-1">
            <span className="text-[#8C7464] font-medium">Payment Status</span>
            <span className="inline-flex items-center gap-1 text-[#556B2F] font-black">
              <ShieldCheck className="w-3.5 h-3.5" />
              COMPLETED
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-[#F0EAD2]/40 border-t border-[#E5DEC9] flex gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl border border-[#E5DEC9] bg-white hover:bg-[#F0EAD2]/50 text-[#6C584C] text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#A98467]" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] text-xs font-black transition shadow-md shadow-[#ADC178]/30 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
