import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useAuth } from '../../context/AuthContext';
import { playPaymentSuccessSound } from '../../utils/audio';
import {
  X,
  Building2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export const BankTransferModal = ({ isOpen, onClose, onSuccessReceipt }) => {
  const { balance, sendMoney } = useWallet();
  const { auth } = useAuth();

  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccount, setConfirmAccount] = useState('');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [holderName, setHolderName] = useState('');
  const [amount, setAmount] = useState('');
  const [mpin, setMpin] = useState('');
  const [step, setStep] = useState(1); // 1: Details, 2: MPIN
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const getBankName = (code) => {
    const prefix = (code || '').toUpperCase().slice(0, 4);
    switch (prefix) {
      case 'HDFC':
        return 'HDFC Bank Ltd.';
      case 'SBIN':
        return 'State Bank of India';
      case 'ICIC':
        return 'ICICI Bank';
      case 'UTIB':
        return 'Axis Bank';
      case 'PUNB':
        return 'Punjab National Bank';
      default:
        return 'Commercial Bank (Verified)';
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError('');

    if (accountNumber.length < 9) {
      setError('Please enter a valid Bank Account Number (minimum 9 digits).');
      return;
    }
    if (accountNumber !== confirmAccount) {
      setError('Account Number and Confirm Account Number do not match.');
      return;
    }
    if (ifsc.length < 11) {
      setError('Please enter a valid 11-character IFSC code.');
      return;
    }
    if (!holderName.trim()) {
      setError('Please enter Account Holder Name.');
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 10) {
      setError('Minimum transfer to bank is ₹10.');
      return;
    }
    if (numAmount > balance) {
      setError(`Insufficient balance. Current wallet balance is ₹${balance.toFixed(2)}.`);
      return;
    }

    setStep(2);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError('');

    if (mpin.length < 4) {
      setError('Please enter your 4-digit security MPIN.');
      return;
    }

    setLoading(true);
    try {
      const res = await sendMoney({
        toMobile: `BANK-${accountNumber.slice(-4)}`,
        amount: parseFloat(amount),
        remarks: `Withdraw to ${getBankName(ifsc)} A/C ••${accountNumber.slice(-4)} (${ifsc.toUpperCase()})`,
      });

      playPaymentSuccessSound();
      setLoading(false);
      onClose();

      if (onSuccessReceipt) {
        onSuccessReceipt({
          transactionId: res.data?.transactionId || 'TXN-BANK' + Date.now().toString().slice(-6),
          type: 'DEBIT',
          amount: parseFloat(amount),
          with: `${getBankName(ifsc)} (••${accountNumber.slice(-4)})`,
          remarks: `Bank Transfer to ${holderName}`,
          status: 'SUCCESS',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Bank transfer failed.');
    }
  };

  const resetAndClose = () => {
    setAccountNumber('');
    setConfirmAccount('');
    setIfsc('HDFC0001234');
    setHolderName('');
    setAmount('');
    setMpin('');
    setStep(1);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden">
        {/* Header (Deep Espresso Brown: #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Transfer to Bank Account</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Wallet to Bank • IMPS / NEFT (Instant)</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
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
          <form onSubmit={handleNext} className="p-6 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#6C584C] mb-1">
                Bank Account Number
              </label>
              <input
                type="text"
                placeholder="e.g. 50100234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] bg-white font-mono text-xs text-[#3D3028] placeholder:text-stone-400 focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6C584C] mb-1">
                Re-enter Account Number
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={confirmAccount}
                onChange={(e) => setConfirmAccount(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] bg-white font-mono text-xs text-[#3D3028] placeholder:text-stone-400 focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#6C584C] mb-1">IFSC Code</label>
                <input
                  type="text"
                  maxLength={11}
                  placeholder="HDFC0001234"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] bg-white font-mono text-xs uppercase text-[#3D3028] placeholder:text-stone-400 focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6C584C] mb-1">Bank Name</label>
                <div className="px-3 py-2.5 rounded-xl bg-[#F0EAD2]/50 border border-[#E5DEC9] text-xs text-[#6C584C] font-semibold truncate">
                  {getBankName(ifsc)}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6C584C] mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                placeholder="As per bank passbook"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-xs text-[#3D3028] placeholder:text-stone-400 focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-[#6C584C]">Amount (₹)</label>
                <span className="text-xs text-[#A98467] font-semibold">
                  Balance: <strong>₹{balance.toFixed(2)}</strong>
                </span>
              </div>
              <input
                type="number"
                min="10"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] bg-white font-mono text-lg font-bold text-[#3D3028] placeholder:text-stone-300 focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
            >
              <span>Proceed to Verify</span>
              <ArrowRight className="w-4 h-4 text-[#2B221B]" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleTransfer} className="p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-[#F0EAD2]/50 border border-[#DDE5B6] text-center">
              <p className="text-xs text-[#8C7464] font-medium">Withdrawing to Bank Account</p>
              <p className="text-2xl font-black text-[#6C584C] font-mono mt-1">
                ₹{parseFloat(amount || 0).toFixed(2)}
              </p>
              <p className="text-xs text-[#4A3B32] mt-1 font-semibold">
                {holderName} • {getBankName(ifsc)} (••{accountNumber.slice(-4)})
              </p>
            </div>

            <div className="text-center">
              <label className="block text-xs font-bold text-[#6C584C] uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#A98467]" />
                Enter 4-Digit MPIN
              </label>
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="••••"
                value={mpin}
                onChange={(e) => setMpin(e.target.value.replace(/\D/g, ''))}
                className="w-40 mx-auto text-center py-2.5 text-2xl font-mono tracking-widest rounded-xl border-2 border-[#A98467]/40 focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/30 focus:outline-none transition bg-white text-[#3D3028]"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-[#E5DEC9] bg-white hover:bg-[#F0EAD2]/40 text-[#6C584C] text-xs font-bold transition cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 py-3 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] disabled:opacity-50 text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
              >
                {loading ? 'Processing IMPS Transfer...' : `Confirm Transfer ₹${amount}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
