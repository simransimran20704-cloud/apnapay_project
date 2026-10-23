import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import {
  X,
  PlusCircle,
  CreditCard,
  Building2,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export const TopUpModal = ({ isOpen, onClose, onSuccessReceipt }) => {
  const { topUpWallet } = useWallet();

  const [amount, setAmount] = useState('1000');
  const [source, setSource] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const quickAmounts = [500, 1000, 2000, 5000];

  const paymentSources = [
    {
      id: 'UPI',
      name: 'UPI / Instant QR',
      desc: 'Google Pay, PhonePe, Paytm, BHIM',
      icon: Smartphone,
    },
    {
      id: 'Net Banking',
      name: 'Net Banking',
      desc: 'HDFC, SBI, ICICI, Axis Bank',
      icon: Building2,
    },
    {
      id: 'Card',
      name: 'Debit / Credit Card',
      desc: 'Visa, Mastercard, RuPay',
      icon: CreditCard,
    },
  ];

  const handleTopUp = async (e) => {
    e.preventDefault();
    setError('');

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      setError('Please enter a valid top-up amount (minimum ₹1).');
      return;
    }

    setLoading(true);
    try {
      const res = await topUpWallet({
        amount: numAmount,
        source: source,
      });

      setLoading(false);
      onClose();

      if (onSuccessReceipt) {
        onSuccessReceipt({
          transactionId: res.data?.transactionId || 'TXN-' + Date.now().toString().slice(-8),
          type: 'CREDIT',
          amount: numAmount,
          with: 'BANK',
          remarks: `Top up via ${source}`,
          status: 'SUCCESS',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Top up failed.');
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-md bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden">
        {/* Header (Color 5: #6C584C) */}
        <div className="px-6 py-4.5 bg-[#6C584C] text-[#F0EAD2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Add Money to ApnaPay Wallet</h3>
              <p className="text-xs text-[#DDE5B6]">Instant Wallet Top-Up (Zero Fee)</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#F0EAD2]/80 hover:text-white transition cursor-pointer"
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

        <form onSubmit={handleTopUp} className="p-6 space-y-5">
          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-[#8C7464] uppercase tracking-wider mb-1.5">
              Top-Up Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-[#A98467]">
                ₹
              </span>
              <input
                type="number"
                min="1"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#E5DEC9] font-mono text-2xl font-black text-[#4A3B32] focus:outline-none focus:border-[#ADC178] transition"
                required
              />
            </div>

            {/* Quick Pills (Color 1: #F0EAD2 & Color 3: #ADC178) */}
            <div className="grid grid-cols-4 gap-2 mt-2.5">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q.toString())}
                  className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    amount === q.toString()
                      ? 'bg-[#ADC178] text-[#2B221B] shadow-xs font-black'
                      : 'bg-[#F0EAD2] hover:bg-[#E5DEC9] text-[#4A3B32] border border-[#E0D5BE]'
                  }`}
                >
                  ₹{q}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Source */}
          <div>
            <label className="block text-xs font-bold text-[#8C7464] uppercase tracking-wider mb-2">
              Select Payment Method
            </label>
            <div className="space-y-2">
              {paymentSources.map((ps) => {
                const Icon = ps.icon;
                const isSelected = source === ps.id;
                return (
                  <button
                    key={ps.id}
                    type="button"
                    onClick={() => setSource(ps.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'border-[#ADC178] bg-[#DDE5B6]/30 shadow-xs'
                        : 'border-[#E5DEC9] bg-white hover:border-[#ADC178]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#ADC178] text-[#2B221B]'
                            : 'bg-[#F0EAD2] text-[#6C584C]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#3D3028]">{ps.name}</p>
                        <p className="text-[10px] text-[#8C7464]">{ps.desc}</p>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#4E6221]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-[11px] text-[#8C7464] pt-1">
            <ShieldCheck className="w-4 h-4 text-[#ADC178] shrink-0" />
            <span>Funds will be instantly credited to your active wallet</span>
          </div>

          {/* Submit Button (Color 3: #ADC178 Moss Green) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] font-black text-sm shadow-md shadow-[#ADC178]/30 transition active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Processing Top-Up...' : `Add ₹${amount || '0'} to Wallet`}
          </button>
        </form>
      </div>
    </div>
  );
};
