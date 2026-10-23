import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  HandCoins,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const RequestMoneyModal = ({ isOpen, onClose }) => {
  const { addNotification } = useNotifications();

  const [fromMobile, setFromMobile] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleRequest = (e) => {
    e.preventDefault();
    setError('');

    if (fromMobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    addNotification({
      title: `Money Requested from ${name || fromMobile}`,
      desc: `You sent a payment request of ₹${num} for "${note || 'Payment'}".`,
      type: 'INFO',
    });

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFromMobile('');
      setName('');
      setAmount('');
      setNote('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-orange-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/60 flex items-center justify-center">
              <HandCoins className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Request Money</h3>
              <p className="text-xs text-amber-100">Send Payment Request to Contacts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {sent ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25 animate-in zoom-in-75">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Request Sent Successfully!</h4>
            <p className="text-xs text-slate-500">
              Notification and payment link sent to <strong>+91 {fromMobile}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRequest} className="p-6 space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payer's Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={fromMobile}
                  onChange={(e) => setFromMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-11 pr-3 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payer's Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Verma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-mono text-lg font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason / Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Cab fare, Grocery share"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Payment Request</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
