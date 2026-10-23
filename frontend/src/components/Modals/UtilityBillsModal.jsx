import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { playPaymentSuccessSound } from '../../utils/audio';
import {
  X,
  Smartphone,
  Zap,
  Car,
  Tv,
  Wifi,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const UtilityBillsModal = ({ isOpen, onClose, onSuccessReceipt }) => {
  const { balance, sendMoney } = useWallet();

  const [category, setCategory] = useState('MOBILE'); // 'MOBILE' | 'ELECTRICITY' | 'FASTAG' | 'DTH'
  const [operator, setOperator] = useState('Jio Prepaid');
  const [consumerNumber, setConsumerNumber] = useState('');
  const [amount, setAmount] = useState('299');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const categories = [
    { id: 'MOBILE', label: 'Mobile Recharge', icon: Smartphone, defaultOp: 'Jio Prepaid' },
    { id: 'ELECTRICITY', label: 'Electricity Bill', icon: Zap, defaultOp: 'Tata Power DDL' },
    { id: 'FASTAG', label: 'FASTag Recharge', icon: Car, defaultOp: 'Paytm FASTag' },
    { id: 'DTH', label: 'DTH / Cable', icon: Tv, defaultOp: 'Tata Play' },
  ];

  const handlePay = async (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    if (num > balance) {
      alert(`Insufficient balance. Current balance is ₹${balance.toFixed(2)}`);
      return;
    }

    setLoading(true);
    try {
      const res = await sendMoney({
        toMobile: `BILL-${operator.replace(/\s+/g, '-').toUpperCase()}`,
        amount: num,
        remarks: `${category} Bill Payment (${operator} - ${consumerNumber})`,
      });

      playPaymentSuccessSound();
      setLoading(false);
      onClose();

      if (onSuccessReceipt) {
        onSuccessReceipt({
          transactionId: res.data?.transactionId || 'TXN-BILL' + Date.now().toString().slice(-6),
          type: 'DEBIT',
          amount: num,
          with: operator,
          remarks: `Bill Payment for A/C ${consumerNumber}`,
          status: 'SUCCESS',
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      setLoading(false);
      alert(err.message || 'Payment failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-md bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Bill Payments & Recharge</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Zero Convenience Fee • Instant Receipt</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-4 gap-2 p-3 bg-[#F0EAD2]/50 border-b border-[#E5DEC9]">
          {categories.map((c) => {
            const Icon = c.icon;
            const isSelected = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCategory(c.id);
                  setOperator(c.defaultOp);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#ADC178] text-[#2B221B] shadow-xs font-bold'
                    : 'text-[#6C584C] hover:bg-white/60 font-semibold'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[10px] leading-tight font-bold">{c.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handlePay} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#6C584C] mb-1.5">
              Select Provider / Operator
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] text-xs bg-white text-[#3D3028] font-medium focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition cursor-pointer"
            >
              {category === 'MOBILE' && (
                <>
                  <option value="Jio Prepaid">Jio Prepaid</option>
                  <option value="Airtel Prepaid">Airtel Prepaid</option>
                  <option value="Vi (Vodafone Idea)">Vi (Vodafone Idea)</option>
                  <option value="BSNL Mobile">BSNL Mobile</option>
                </>
              )}
              {category === 'ELECTRICITY' && (
                <>
                  <option value="Tata Power DDL">Tata Power DDL (Delhi)</option>
                  <option value="BSES Rajdhani">BSES Rajdhani Power Ltd.</option>
                  <option value="Adani Electricity">Adani Electricity Mumbai</option>
                  <option value="MSEDCL (Mahavitaran)">MSEDCL Maharashtra</option>
                </>
              )}
              {category === 'FASTAG' && (
                <>
                  <option value="Paytm FASTag">Paytm FASTag</option>
                  <option value="ICICI Bank FASTag">ICICI Bank FASTag</option>
                  <option value="HDFC Bank FASTag">HDFC Bank FASTag</option>
                  <option value="SBI FASTag">SBI FASTag</option>
                </>
              )}
              {category === 'DTH' && (
                <>
                  <option value="Tata Play">Tata Play (Tata Sky)</option>
                  <option value="Airtel Digital TV">Airtel Digital TV</option>
                  <option value="Dish TV">Dish TV</option>
                  <option value="JioFiber">JioFiber Broadband</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6C584C] mb-1.5">
              {category === 'MOBILE'
                ? 'Mobile Number'
                : category === 'ELECTRICITY'
                ? 'CA / Consumer Number'
                : category === 'FASTAG'
                ? 'Vehicle Registration Number'
                : 'Subscriber / Smart Card ID'}
            </label>
            <input
              type="text"
              placeholder={
                category === 'MOBILE'
                  ? '10-digit Mobile Number'
                  : category === 'FASTAG'
                  ? 'e.g. DL 01 AB 1234'
                  : 'Consumer ID'
              }
              value={consumerNumber}
              onChange={(e) => setConsumerNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-[#3D3028] text-xs font-mono placeholder:text-stone-400 focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label className="font-bold text-[#6C584C]">Recharge Amount (₹)</label>
              <span className="text-[#A98467] font-semibold">
                Balance: <strong>₹{balance.toFixed(2)}</strong>
              </span>
            </div>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DEC9] bg-white font-mono text-base font-bold text-[#3D3028] placeholder:text-stone-300 focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Processing Bill Payment...' : `Pay ₹${amount || 0} via ApnaPay Wallet`}
          </button>
        </form>
      </div>
    </div>
  );
};
