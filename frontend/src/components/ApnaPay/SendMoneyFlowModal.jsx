import React, { useState, useEffect } from 'react';
import { useWallet } from '../../context/WalletContext';
import { playPaymentSuccessSound, playClickSound } from '../../utils/audio';
import {
  X,
  ArrowLeft,
  Search,
  QrCode,
  Building2,
  Phone,
  AtSign,
  User,
  ShieldCheck,
  CheckCircle2,
  Delete,
  Sparkles,
  Lock,
  Share2,
  Download,
} from 'lucide-react';

export const SendMoneyFlowModal = ({
  isOpen,
  onClose,
  initialMobile = '',
  onPaymentSuccess,
}) => {
  const { sendMoney, balance, refreshAll } = useWallet();

  // Multi-step: 'select' -> 'amount' -> 'confirm' -> 'success'
  const [step, setStep] = useState('select');
  const [activeTab, setActiveTab] = useState('mobile'); // 'upi', 'mobile', 'bank'

  // Selected recipient
  const [recipient, setRecipient] = useState({
    name: 'Priya Singh',
    mobile: '9876543210',
    upiId: 'priya@apnapay',
    initial: 'PS',
    bank: 'HDFC Bank • 4321',
  });

  const [inputQuery, setInputQuery] = useState('');
  const [amountStr, setAmountStr] = useState('500');
  const [note, setNote] = useState('For lunch');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successReceipt, setSuccessReceipt] = useState(null);

  useEffect(() => {
    if (isOpen) {
      if (initialMobile) {
        setRecipient({
          name: 'Contact (' + initialMobile.slice(-4) + ')',
          mobile: initialMobile,
          upiId: `${initialMobile}@apnapay`,
          initial: initialMobile.slice(-2),
          bank: 'HDFC Bank • 4321',
        });
        setStep('amount');
      } else {
        setStep('select');
      }
      setAmountStr('500');
      setNote('Lunch & Bill');
      setError(null);
    }
  }, [isOpen, initialMobile]);

  if (!isOpen) return null;

  // Number to words helper (Indian format)
  const numberToWords = (num) => {
    const n = Number(num);
    if (!n) return 'Zero Rupees Only';
    if (n === 500) return 'Rupees Five Hundred Only';
    if (n === 100) return 'Rupees One Hundred Only';
    if (n === 1000) return 'Rupees One Thousand Only';
    if (n === 2000) return 'Rupees Two Thousand Only';
    return `Rupees ${n.toLocaleString('en-IN')} Only`;
  };

  // Recent Contacts with Earthy Tone avatars
  const recentContacts = [
    { name: 'Priya Singh', mobile: '9876543210', upiId: 'priya@apnapay', initial: 'PS', bg: 'bg-[#A98467]', text: 'text-white' },
    { name: 'Rohit Kumar', mobile: '8765432109', upiId: 'rohit@apnapay', initial: 'RK', bg: 'bg-[#ADC178]', text: 'text-[#2B221B]' },
    { name: 'Amit Sharma', mobile: '7654321098', upiId: 'amit@apnapay', initial: 'AM', bg: 'bg-[#DDE5B6]', text: 'text-[#364216]' },
  ];

  // Frequently Used
  const frequentlyUsed = [
    { name: 'Neha Verma', mobile: '9123456789', upiId: 'neha@apnapay', initial: 'N', bg: 'bg-[#ADC178]' },
    { name: 'Jio Prepaid', mobile: '7000012345', upiId: 'jio@recharge', initial: 'Jio', bg: 'bg-[#DDE5B6]' },
    { name: 'Electricity Bill', mobile: 'BESCOM-9921', upiId: 'bescom@bill', initial: '⚡', bg: 'bg-[#A98467]' },
  ];

  const handleSelectContact = (contact) => {
    playClickSound();
    setRecipient({
      name: contact.name,
      mobile: contact.mobile,
      upiId: contact.upiId || `${contact.mobile}@apnapay`,
      initial: contact.initial || contact.name.slice(0, 2).toUpperCase(),
      bank: 'HDFC Bank • 4321',
    });
    setStep('amount');
  };

  const handleNumpadPress = (key) => {
    playClickSound();
    if (key === 'backspace') {
      setAmountStr((prev) => (prev.length > 1 ? prev.slice(0, -1) : ''));
    } else if (key === '.') {
      if (!amountStr.includes('.')) {
        setAmountStr((prev) => (prev ? prev + '.' : '0.'));
      }
    } else {
      if (amountStr === '0') {
        setAmountStr(key);
      } else if (amountStr.length < 7) {
        setAmountStr((prev) => prev + key);
      }
    }
  };

  const handleProceedToConfirm = () => {
    const val = Number(amountStr);
    if (!val || val <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (val > balance) {
      setError(`Insufficient balance. Available: ₹${balance.toLocaleString('en-IN')}`);
      return;
    }
    setError(null);
    setStep('confirm');
  };

  const handleExecutePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const numericAmount = Number(amountStr);
      const res = await sendMoney({
        toMobile: recipient.mobile,
        amount: numericAmount,
        remarks: note || 'ApnaPay Transfer',
      });

      playPaymentSuccessSound();
      const receipt = {
        transactionId: res?.data?.transactionId || `TXN-${Date.now().toString(16).toUpperCase()}`,
        amount: numericAmount,
        recipientName: recipient.name,
        recipientMobile: recipient.mobile,
        recipientUpiId: recipient.upiId,
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        time: new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'SUCCESS',
      };

      setSuccessReceipt(receipt);
      setStep('success');
      await refreshAll();

      if (onPaymentSuccess) {
        onPaymentSuccess(receipt);
      }
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* ================= STEP 1: SELECT RECIPIENT ================= */}
        {step === 'select' && (
          <div className="flex flex-col h-full">
            {/* Header (Color 5: #6C584C Espresso) */}
            <div className="p-4 bg-[#6C584C] text-[#F0EAD2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-1 rounded-xl text-[#F0EAD2] hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-sm font-black text-white">Send Money</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-xl text-[#F0EAD2]/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              {/* Segmented Tabs (Color 1: #F0EAD2 & Color 3: #ADC178) */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F0EAD2] border border-[#E0D5BE] rounded-2xl">
                <button
                  onClick={() => setActiveTab('upi')}
                  className={`py-2 text-xs font-black rounded-xl transition cursor-pointer ${
                    activeTab === 'upi'
                      ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                      : 'text-[#6C584C] hover:text-[#382D26]'
                  }`}
                >
                  UPI ID
                </button>
                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`py-2 text-xs font-black rounded-xl transition cursor-pointer ${
                    activeTab === 'mobile'
                      ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                      : 'text-[#6C584C] hover:text-[#382D26]'
                  }`}
                >
                  Mobile No.
                </button>
                <button
                  onClick={() => setActiveTab('bank')}
                  className={`py-2 text-xs font-black rounded-xl transition cursor-pointer ${
                    activeTab === 'bank'
                      ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                      : 'text-[#6C584C] hover:text-[#382D26]'
                  }`}
                >
                  Bank Account
                </button>
              </div>

              {/* Search input with search icon */}
              <div className="relative">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={
                    activeTab === 'upi'
                      ? 'Enter UPI ID (e.g. user@apnapay)'
                      : activeTab === 'bank'
                      ? 'Enter Bank Account / IFSC'
                      : 'Enter Mobile Number'
                  }
                  className="w-full bg-white border border-[#E5DEC9] focus:bg-white text-[#3D3028] text-xs rounded-2xl pl-4 pr-10 py-3 focus:outline-none focus:border-[#ADC178] transition"
                />
                <button
                  onClick={() => {
                    if (inputQuery.trim()) {
                      handleSelectContact({
                        name: 'Contact (' + inputQuery.slice(-4) + ')',
                        mobile: inputQuery.trim(),
                        upiId: `${inputQuery.trim()}@apnapay`,
                      });
                    }
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] transition cursor-pointer shadow-2xs"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Recent Contacts */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7464]">
                    Recent Contacts
                  </span>
                  <span className="text-[11px] font-bold text-[#A98467]">See All</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {recentContacts.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleSelectContact(c)}
                      className="p-3 rounded-2xl bg-white border border-[#E5DEC9] hover:border-[#ADC178] flex flex-col items-center gap-1.5 transition cursor-pointer group shadow-2xs"
                    >
                      <div className={`w-10 h-10 rounded-full ${c.bg} ${c.text} flex items-center justify-center font-black text-xs shadow-xs group-hover:scale-105 transition-transform`}>
                        {c.initial}
                      </div>
                      <span className="text-xs font-bold text-[#3D3028] truncate max-w-[85px]">
                        {c.name}
                      </span>
                      <span className="text-[9px] text-[#8C7464] font-mono">+{c.mobile.slice(-4)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequently Used */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7464] block mb-2.5">
                  Frequently Used
                </span>

                <div className="space-y-2">
                  {frequentlyUsed.map((u) => (
                    <button
                      key={u.name}
                      onClick={() => handleSelectContact(u)}
                      className="w-full p-2.5 rounded-2xl bg-white border border-[#E5DEC9] hover:border-[#ADC178] flex items-center justify-between transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${u.bg} flex items-center justify-center text-[#2B221B] text-xs font-black group-hover:scale-105 transition-transform`}>
                          {u.initial}
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-[#3D3028]">{u.name}</p>
                          <p className="text-[10px] text-[#8C7464] font-mono">{u.mobile}</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#A98467] font-bold group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Proceed Button (Color 3: #ADC178 Moss Green) */}
            <div className="p-4 border-t border-[#E5DEC9]">
              <button
                onClick={() => {
                  if (inputQuery.trim()) {
                    handleSelectContact({
                      name: 'Contact',
                      mobile: inputQuery.trim(),
                      upiId: `${inputQuery.trim()}@apnapay`,
                    });
                  } else {
                    handleSelectContact(recentContacts[0]);
                  }
                }}
                className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 transition cursor-pointer"
              >
                Proceed
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: ENTER AMOUNT ================= */}
        {step === 'amount' && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 bg-[#6C584C] text-[#F0EAD2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep('select')}
                  className="p-1 rounded-xl text-[#F0EAD2] hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-sm font-black text-white">Enter Amount</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-xl text-[#F0EAD2]/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              {/* Recipient Card */}
              <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#A98467] text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {recipient.initial}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#3D3028]">{recipient.name}</h4>
                    <p className="text-[10px] text-[#8C7464] font-mono">+91 {recipient.mobile}</p>
                  </div>
                </div>
                <button
                  onClick={() => setStep('select')}
                  className="text-xs font-bold text-[#A98467] hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Big Amount Display (Color 1: #F0EAD2 / Cream Container) */}
              <div className="p-5 rounded-2xl bg-[#F0EAD2]/50 border border-[#E0D5BE] text-center space-y-1.5">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-black text-[#4A3B32]">₹ {amountStr || '0'}</span>
                </div>
                <p className="text-[11px] text-[#6C584C] font-bold">
                  {numberToWords(amountStr || '0')}
                </p>

                {error && (
                  <p className="text-xs text-rose-700 font-semibold bg-rose-50 py-1 px-3 rounded-xl">
                    {error}
                  </p>
                )}
              </div>

              {/* Quick Amount Chips */}
              <div className="grid grid-cols-4 gap-2">
                {['100', '500', '1000', '2000'].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      playClickSound();
                      setAmountStr(amt);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      amountStr === amt
                        ? 'bg-[#ADC178] text-[#2B221B] border-[#ADC178] shadow-xs font-black'
                        : 'bg-white text-[#4A3B32] border-[#E5DEC9] hover:border-[#ADC178]'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Add Note Input */}
              <div className="relative">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add Note (Optional)"
                  className="w-full bg-white border border-[#E5DEC9] text-[#3D3028] text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#ADC178] transition"
                />
              </div>

              {/* Custom Number Pad */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleNumpadPress(key)}
                    className="py-3 rounded-2xl bg-white hover:bg-[#F0EAD2] active:scale-95 border border-[#E5DEC9] text-[#4A3B32] font-black text-base flex items-center justify-center transition cursor-pointer shadow-2xs"
                  >
                    {key === 'backspace' ? <Delete className="w-5 h-5 text-[#8C7464]" /> : key}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Proceed to Pay Button (Color 3: #ADC178 Moss Green) */}
            <div className="p-4 border-t border-[#E5DEC9]">
              <button
                onClick={handleProceedToConfirm}
                className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 transition cursor-pointer"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: PAYMENT CONFIRMATION ================= */}
        {step === 'confirm' && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 bg-[#6C584C] text-[#F0EAD2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep('amount')}
                  className="p-1 rounded-xl text-[#F0EAD2] hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h3 className="text-sm font-black text-white">Payment Confirmation</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-xl text-[#F0EAD2]/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 flex-1 overflow-y-auto text-center">
              {/* Recipient Circle Avatar & Name */}
              <div className="flex flex-col items-center gap-2 pt-2">
                <div className="w-16 h-16 rounded-full bg-[#A98467] text-white font-black text-xl flex items-center justify-center shadow-md">
                  {recipient.initial}
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#3D3028]">{recipient.name}</h4>
                  <p className="text-xs text-[#8C7464] font-mono">+91 {recipient.mobile}</p>
                </div>
              </div>

              {/* Big Amount & Words */}
              <div className="py-2">
                <span className="text-3xl font-black text-[#4A3B32]">₹ {amountStr}</span>
                <p className="text-xs text-[#6C584C] font-bold mt-1">
                  {numberToWords(amountStr)}
                </p>
              </div>

              {/* Transaction Details Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] text-left space-y-2.5 text-xs shadow-2xs">
                <div className="flex justify-between">
                  <span className="text-[#8C7464]">UPI ID:</span>
                  <span className="text-[#3D3028] font-mono font-bold">{recipient.upiId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7464]">From:</span>
                  <span className="text-[#3D3028] font-bold">HDFC Bank • 4321</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7464]">Date & Time:</span>
                  <span className="text-[#3D3028]">
                    {new Date().toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                    , {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C7464]">Remarks:</span>
                  <span className="text-[#3D3028] font-bold">{note || 'Payment'}</span>
                </div>
              </div>

              {error && (
                <p className="text-xs text-rose-700 font-semibold bg-rose-50 py-1.5 px-3 rounded-xl">
                  {error}
                </p>
              )}

              {/* Security Note */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6C584C]">
                <Lock className="w-3.5 h-3.5 text-[#ADC178]" />
                <span>Your payment is secured by 256-bit encryption</span>
              </div>
            </div>

            {/* Bottom Pay Now Button */}
            <div className="p-4 border-t border-[#E5DEC9]">
              <button
                disabled={loading}
                onClick={handleExecutePayment}
                className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] font-black text-sm shadow-lg shadow-[#ADC178]/30 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#2B221B]/30 border-t-[#2B221B] rounded-full animate-spin"></div>
                ) : (
                  <span>Pay Now</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: PAYMENT SUCCESSFUL ================= */}
        {step === 'success' && (
          <div className="p-6 flex flex-col items-center text-center space-y-4">
            {/* Glowing checkmark (Color 3: #ADC178 Moss Green) */}
            <div className="relative my-2">
              <div className="w-20 h-20 rounded-full bg-[#ADC178] text-[#2B221B] flex items-center justify-center shadow-xl shadow-[#ADC178]/30 animate-in zoom-in-75 duration-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <Sparkles className="w-5 h-5 text-[#A98467] absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div>
              <h3 className="text-lg font-black text-[#3D3028]">Payment Successful</h3>
              <p className="text-3xl font-black text-[#4E6221] mt-1">₹ {amountStr}</p>
              <p className="text-xs text-[#8C7464] mt-0.5">{numberToWords(amountStr)}</p>
            </div>

            {/* Recipient Details Card */}
            <div className="w-full p-4 rounded-2xl bg-white border border-[#E5DEC9] text-left space-y-2 text-xs shadow-2xs">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#E5DEC9]">
                <div className="w-8 h-8 rounded-full bg-[#ADC178] text-[#2B221B] flex items-center justify-center font-bold text-xs">
                  {recipient.initial}
                </div>
                <div>
                  <p className="font-bold text-[#3D3028]">{recipient.name}</p>
                  <p className="text-[10px] text-[#8C7464] font-mono">+91 {recipient.mobile}</p>
                </div>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-[#8C7464]">UPI ID:</span>
                <span className="text-[#3D3028] font-mono font-semibold">{recipient.upiId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7464]">Ref No.:</span>
                <span className="text-[#3D3028] font-mono font-semibold">{successReceipt?.transactionId || 'TXN-98218731'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7464]">Date & Time:</span>
                <span className="text-[#3D3028]">
                  {successReceipt?.date || 'Today'}, {successReceipt?.time || 'Just now'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-2 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/25 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};