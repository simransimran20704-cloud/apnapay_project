import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Send,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export const SendMoneyModal = ({ isOpen, onClose, onSuccessReceipt, initialMobile = '' }) => {
  const { balance, sendMoney } = useWallet();
  const { auth } = useAuth();

  const [toMobile, setToMobile] = useState(initialMobile || '');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [mpin, setMpin] = useState('');
  const [step, setStep] = useState(1); // 1: Details, 2: MPIN Confirm
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (initialMobile) {
      setToMobile(initialMobile);
    }
  }, [initialMobile, isOpen]);

  if (!isOpen) return null;

  const quickAmounts = [100, 500, 1000, 2000, 5000];
  const recentRecipients = [
    { name: 'Rahul Verma', mobile: '9123456780' },
    { name: 'Pooja Mehta', mobile: '9811223344' },
    { name: 'Aakash Singh', mobile: '9876501234' },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    setError('');

    if (!toMobile || toMobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (toMobile === auth?.mobileNumber) {
      setError('Cannot transfer money to your own mobile number.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (numAmount > balance) {
      setError(`Insufficient balance. Current balance is ₹${balance.toFixed(2)}.`);
      return;
    }

    setStep(2);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setError('');

    if (mpin.length < 4) {
      setError('Please enter your 4-digit MPIN.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendMoney({
        toMobile,
        amount: parseFloat(amount),
        remarks: remarks.trim() || 'PayEase Transfer',
      });

      // Reset and trigger receipt modal
      setLoading(false);
      onClose();
      if (onSuccessReceipt) {
        onSuccessReceipt({
          transactionId: res.data?.transactionId || 'TXN-' + Date.now().toString().slice(-8),
          type: 'DEBIT',
          amount: parseFloat(amount),
          with: toMobile,
          remarks: remarks.trim() || 'PayEase Transfer',
          status: 'SUCCESS',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Transfer failed. Check backend connection.');
    }
  };

  const handleClose = () => {
    setToMobile('');
    setAmount('');
    setRemarks('');
    setMpin('');
    setStep(1);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/60 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Send Money</h3>
              <p className="text-xs text-indigo-200">Instant Peer-to-Peer Transfer</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleNext} className="p-6 space-y-4">
            {/* Recent Contacts quick select */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Quick Contacts
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {recentRecipients.map((c) => (
                  <button
                    key={c.mobile}
                    type="button"
                    onClick={() => setToMobile(c.mobile)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs whitespace-nowrap transition cursor-pointer ${
                      toMobile === c.mobile
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <User className="w-3 h-3" />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Mobile */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recipient Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={toMobile}
                  onChange={(e) => setToMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-700">Amount (₹)</label>
                <span className="text-xs text-slate-400">
                  Balance: <strong className="text-slate-700 font-mono">₹{balance.toFixed(2)}</strong>
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 font-mono text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Quick Pills */}
              <div className="flex gap-2 mt-2">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q.toString())}
                    className="flex-1 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition cursor-pointer"
                  >
                    +₹{q}
                  </button>
                ))}
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Remarks (Optional)
              </label>
              <input
                type="text"
                maxLength={60}
                placeholder="e.g. Dinner share, Rent, Groceries"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Proceed to Pay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-5">
            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <p className="text-xs text-slate-500">You are transferring</p>
              <p className="text-3xl font-extrabold text-slate-900 font-mono mt-1">
                ₹{parseFloat(amount).toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                To: <span className="font-mono font-semibold text-slate-900">+91 {toMobile}</span>
              </p>
              {remarks && (
                <p className="text-[11px] text-slate-400 italic mt-0.5">"{remarks}"</p>
              )}
            </div>

            {/* MPIN Input */}
            <div className="text-center">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-600" />
                Enter 4-Digit Security MPIN
              </label>
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="••••"
                value={mpin}
                onChange={(e) => setMpin(e.target.value.replace(/\D/g, ''))}
                className="w-40 mx-auto text-center py-2 text-2xl font-mono tracking-widest rounded-xl border-2 border-indigo-500/40 focus:border-indigo-600 focus:outline-none"
                required
              />
              <p className="text-[11px] text-slate-400 mt-2">
                Your MPIN ensures your wallet cannot be debited without your authorization.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authorizing...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirm & Send ₹{parseFloat(amount || 0).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
