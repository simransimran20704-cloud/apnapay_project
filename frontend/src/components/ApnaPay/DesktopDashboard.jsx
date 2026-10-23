import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { useApp } from '../../context/AppContext';
import {
  Eye,
  EyeOff,
  Send,
  Scan,
  Plus,
  Building2,
  Smartphone,
  Zap,
  Tv,
  Flame,
  Droplet,
  Car,
  BadgePercent,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
  Gift,
  QrCode,
  TrendingUp,
  CreditCard,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  PieChart,
  Repeat,
  FileSpreadsheet,
  Bot,
} from 'lucide-react';

export const DesktopDashboard = ({
  onOpenSendMoney,
  onOpenScan,
  onOpenTopUp,
  onOpenBankTransfer,
  onOpenHistory,
  onOpenRecharge,
  onOpenBills,
  onOpenOffers,
  onOpenInvestments,
  onOpenUpiCircle,
  onOpenSecurity,
  onSelectTransaction,
  onQuickSendContact,
  // 6 New Features
  onOpenAnalytics,
  onOpenSmartNotifications,
  onOpenFraudRisk,
  onOpenExportStatements,
  onOpenRecurringSimulator,
  onOpenAiAssistant,
  // 50 Features Innovation Suites
  onOpenAllFeatures,
  onOpenAiSmartHub,
  onOpenSocialFinance,
  onOpenSecurityPrivacyHub,
  onOpenPaymentReliability,
  onOpenDisputesRefunds,
  onOpenMerchantGrowth,
  onOpenDeveloperPlatform,
  onOpenAdminGovernance,
}) => {
  const { profile, auth } = useAuth();
  const { balance, transactions } = useWallet();
  const { incognitoMode, toggleIncognito } = useApp();
  const [showBalance, setShowBalance] = useState(true);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [quickMobile, setQuickMobile] = useState('');

  const displayName = profile?.name || 'Simran';
  const mobile = auth?.mobileNumber || '9876543210';
  const upiId = `${mobile}@apnapay`;

  // Dynamic greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning,' : hour < 17 ? 'Good Afternoon,' : 'Good Evening,';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (quickMobile.trim()) {
      onQuickSendContact(quickMobile.trim());
      setQuickMobile('');
    } else {
      onOpenSendMoney();
    }
  };

  // Recent contacts styled with the Earthy Palette
  const recentContacts = [
    { name: 'Rahul', mobile: '919876543210', initial: 'R', bg: 'bg-[#DDE5B6]', text: 'text-[#364216]' },
    { name: 'Priya', mobile: '918765432109', initial: 'P', bg: 'bg-[#A98467]', text: 'text-white' },
    { name: 'Amit', mobile: '917654321098', initial: 'A', bg: 'bg-[#ADC178]', text: 'text-[#2B221B]' },
  ];

  // Quick actions with alternating Earthy Shades
  const quickActions = [
    { id: 'mobile', label: 'Mobile Recharge', icon: Smartphone, action: () => onOpenRecharge('mobile'), bg: 'bg-[#DDE5B6]/70', text: 'text-[#3E4C19]', border: 'border-[#ADC178]/50' },
    { id: 'electricity', label: 'Electricity Bill', icon: Zap, action: () => onOpenBills('electricity'), bg: 'bg-[#A98467]/20', text: 'text-[#87654D]', border: 'border-[#A98467]/30' },
    { id: 'dth', label: 'DTH', icon: Tv, action: () => onOpenRecharge('dth'), bg: 'bg-[#F0EAD2]', text: 'text-[#6C584C]', border: 'border-[#E0D5BE]' },
    { id: 'gas', label: 'Gas Cylinder', icon: Flame, action: () => onOpenBills('gas'), bg: 'bg-[#6C584C]/15', text: 'text-[#6C584C]', border: 'border-[#6C584C]/25' },
    { id: 'water', label: 'Water Bill', icon: Droplet, action: () => onOpenBills('water'), bg: 'bg-[#ADC178]/25', text: 'text-[#48591E]', border: 'border-[#ADC178]/40' },
    { id: 'fastag', label: 'Fastag', icon: Car, action: () => onOpenBills('fastag'), bg: 'bg-[#DDE5B6]/70', text: 'text-[#3E4C19]', border: 'border-[#ADC178]/50' },
    { id: 'loan', label: 'Loan', icon: BadgePercent, action: () => onOpenBills('loan'), bg: 'bg-[#A98467]/20', text: 'text-[#87654D]', border: 'border-[#A98467]/30' },
    { id: 'insurance', label: 'Insurance', icon: ShieldCheck, action: () => onOpenBills('insurance'), bg: 'bg-[#ADC178]/25', text: 'text-[#48591E]', border: 'border-[#ADC178]/40' },
  ];

  // Format transactions for display
  const displayTransactions = transactions && transactions.length > 0 ? transactions.slice(0, 5) : [
    {
      transactionId: 'TXN-01',
      recipient: 'Amit Sharma',
      category: 'UPI Transfer',
      status: 'SUCCESS',
      type: 'DEBIT',
      amount: 500.0,
      timestamp: 'Today, 6:42 PM',
      initial: 'A',
      badgeColor: 'bg-[#ADC178] text-[#2B221B]',
    },
    {
      transactionId: 'TXN-02',
      recipient: 'Jio Prepaid',
      category: 'Mobile Recharge',
      status: 'SUCCESS',
      type: 'DEBIT',
      amount: 299.0,
      timestamp: 'Today, 4:21 PM',
      initial: 'Jio',
      badgeColor: 'bg-[#DDE5B6] text-[#364216]',
    },
    {
      transactionId: 'TXN-03',
      recipient: 'Amazon',
      category: 'Shopping',
      status: 'SUCCESS',
      type: 'DEBIT',
      amount: 1250.0,
      timestamp: 'Today, 1:15 PM',
      initial: 'a',
      badgeColor: 'bg-[#A98467] text-white',
    },
    {
      transactionId: 'TXN-04',
      recipient: 'Electricity Bill',
      category: 'Bill Payment',
      status: 'SUCCESS',
      type: 'DEBIT',
      amount: 650.0,
      timestamp: 'Yesterday, 8:30 PM',
      initial: '⚡',
      badgeColor: 'bg-[#6C584C] text-[#F0EAD2]',
    },
    {
      transactionId: 'TXN-05',
      recipient: 'Rohit Verma',
      category: 'Received Money',
      status: 'SUCCESS',
      type: 'CREDIT',
      amount: 2000.0,
      timestamp: 'Yesterday, 5:12 PM',
      initial: 'R',
      badgeColor: 'bg-[#ADC178] text-[#2B221B]',
    },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* 1. Hero Welcome Banner (Color 5: #6C584C Espresso + Color 4: #A98467 Clay + Color 3: #ADC178 Moss) */}
      <div className="rounded-3xl bg-gradient-to-r from-[#6C584C] via-[#856752] to-[#A98467] text-[#F0EAD2] p-7 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl shadow-[#6C584C]/15">
        <div className="relative z-10 space-y-1.5">
          <p className="text-sm font-semibold text-[#DDE5B6]">{greeting}</p>
          <h2 className="text-3xl font-black text-white tracking-tight">{displayName}</h2>
          <p className="text-xs text-[#F0EAD2]/90 max-w-sm">
            Make your payments simple, secure and fast with natural organic elegance.
          </p>
        </div>

        {/* Scan & Pay with UPI Visual Badge (Color 3: #ADC178 Moss Green) */}
        <div
          onClick={onOpenScan}
          className="relative z-10 flex items-center gap-4 bg-white/15 hover:bg-white/20 border border-white/25 backdrop-blur-md rounded-2xl p-3 px-4.5 cursor-pointer transition-all hover:scale-102 group shrink-0"
        >
          <div className="w-12 h-12 rounded-xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center font-black shadow-md">
            <QrCode className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-white font-bold text-xs">
              <Scan className="w-3.5 h-3.5 text-[#DDE5B6]" />
              <span>Scan & Pay</span>
            </div>
            <p className="text-[10px] text-[#F0EAD2] font-medium">with Any UPI QR</p>
          </div>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute right-20 -top-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
      </div>

      {/* 2. Total Balance & Main Action Bar (4 Distinct Earthy Buttons) */}
      <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#8C7464]">Total Balance</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-[#8C7464] hover:text-[#4A3B32] transition cursor-pointer"
            >
              {showBalance ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#4A3B32] tracking-tight font-sans">
              {showBalance && !incognitoMode
                ? `₹ ${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
                : '••••••••'}
            </span>
            {incognitoMode && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A98467]/20 text-[#6C584C]">
                Incognito Active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#6C584C]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ADC178]"></span>
            <span className="font-bold text-[#4F6322]">UPI Linked</span>
            <span>•</span>
            <span className="text-[#8C7464]">2 Bank Accounts</span>
          </div>
        </div>

        {/* 4 Distinct Action Buttons (Each highlighted with an Earthy Shade) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Button 1: Send Money (Color 3: Moss Green #ADC178) */}
          <button
            onClick={onOpenSendMoney}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] text-xs font-black transition-all cursor-pointer shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-[#2B221B]" />
            <span>Send Money</span>
          </button>

          {/* Button 2: Scan & Pay (Color 2: Celadon #DDE5B6) */}
          <button
            onClick={onOpenScan}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#DDE5B6] hover:bg-[#D0DAA3] text-[#364216] text-xs font-extrabold transition-all cursor-pointer shadow-2xs border border-[#C5D099]"
          >
            <Scan className="w-3.5 h-3.5 text-[#4D5E21]" />
            <span>Scan & Pay</span>
          </button>

          {/* Button 3: Add Money (Color 5: Deep Espresso #6C584C) */}
          <button
            onClick={onOpenTopUp}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#6C584C] hover:bg-[#59473D] text-[#F0EAD2] text-xs font-black transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#DDE5B6]" />
            <span>Add Money</span>
          </button>

          {/* Button 4: To Bank (Color 4: Warm Clay #A98467) */}
          <button
            onClick={onOpenBankTransfer}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#A98467] hover:bg-[#96745A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5 text-[#F0EAD2]" />
            <span>To Bank</span>
          </button>
        </div>
      </div>

      {/* 2.5 ApnaPay 50 Features Master Innovation Ribbon */}
      <div className="rounded-2xl bg-gradient-to-r from-[#FAF8F4] via-[#F0EAD2]/50 to-[#FAF8F4] border border-[#E5DEC9] p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#ADC178] text-[#2B221B] flex items-center justify-center font-black shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#2B221B]">50 Features Innovation Suite</h4>
              <p className="text-[10px] text-[#8C7464]">AI Intent • Voice Pay • Group Wallet • QR Trust • Sandbox • Multi-Wallet</p>
            </div>
          </div>
          <button
            onClick={onOpenAllFeatures}
            className="px-3 py-1.5 rounded-xl bg-[#6C584C] hover:bg-[#534339] text-[#F0EAD2] text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
          >
            <span>Explore All 50 Features</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Quick Launch Suite Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { label: 'AI Intent & Voice', action: onOpenAiSmartHub, bg: 'bg-[#ADC178]/20 text-[#364216] border-[#ADC178]/40' },
            { label: 'Group Split & Goals', action: onOpenSocialFinance, bg: 'bg-[#A98467]/20 text-[#6C584C] border-[#A98467]/30' },
            { label: 'QR Trust & Radar', action: onOpenSecurityPrivacyHub, bg: 'bg-[#6C584C]/15 text-[#6C584C] border-[#6C584C]/25' },
            { label: 'Multi-Wallet & Queue', action: onOpenPaymentReliability, bg: 'bg-[#DDE5B6]/70 text-[#364216] border-[#ADC178]/40' },
            { label: 'Disputes & Refunds', action: onOpenDisputesRefunds, bg: 'bg-[#A98467]/15 text-[#6C584C] border-[#A98467]/30' },
            { label: 'Dev API Sandbox', action: onOpenDeveloperPlatform, bg: 'bg-[#6C584C] text-[#F0EAD2] border-[#534339]' },
          ].map((pill) => (
            <button
              key={pill.label}
              onClick={pill.action}
              className={`p-2 rounded-xl border text-[11px] font-bold text-center truncate transition cursor-pointer hover:scale-102 active:scale-98 shadow-2xs ${pill.bg}`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Quick Actions Row (Alternating Earthy Shade Tiles) */}
      <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7464]">Quick Actions</h3>
          <button
            onClick={() => onOpenRecharge('all')}
            className="text-xs font-extrabold text-[#6C584C] hover:text-[#A98467] transition cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {quickActions.map((qa) => {
            const Icon = qa.icon;
            return (
              <button
                key={qa.id}
                onClick={qa.action}
                className="flex flex-col items-center gap-2 p-2.5 rounded-2xl hover:bg-[#FAF8F3] transition-all cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${qa.bg} border ${qa.border} ${qa.text} group-hover:scale-105 flex items-center justify-center transition-all shadow-2xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-[#4A3B32] text-center leading-tight">
                  {qa.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Three-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1: Recent Transactions */}
        <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7464]">
                Recent Transactions
              </h3>
              <button
                onClick={onOpenHistory}
                className="text-xs font-extrabold text-[#6C584C] hover:text-[#A98467] transition cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {displayTransactions.map((tx, idx) => {
                const isCredit = tx.type === 'CREDIT';
                const name = tx.recipient || tx.remarks || (isCredit ? 'Money Received' : 'Payment Sent');
                const initial = tx.initial || (name ? name.charAt(0).toUpperCase() : '₹');
                const badge = tx.badgeColor || (isCredit ? 'bg-[#ADC178] text-[#2B221B]' : 'bg-[#DDE5B6] text-[#364216]');

                return (
                  <div
                    key={tx.transactionId || idx}
                    onClick={() => onSelectTransaction && onSelectTransaction(tx)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF8F3] border border-transparent hover:border-[#E5DEC9] transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${badge} flex items-center justify-center text-xs font-black shadow-2xs group-hover:scale-105 transition`}
                      >
                        {initial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#3D3028] group-hover:text-[#A98467] transition truncate max-w-[130px]">
                          {name}
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#8C7464] font-medium">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ADC178]"></span>
                          <span className="text-[#4E6221] font-bold">Success</span>
                          <span>•</span>
                          <span>
                            {tx.timestamp
                              ? typeof tx.timestamp === 'string' && tx.timestamp.includes('T')
                                ? new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                : tx.timestamp
                              : 'Today'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-black font-mono ${
                        isCredit ? 'text-[#4E6221]' : 'text-[#3D3028]'
                      }`}
                    >
                      {isCredit ? '+ ' : '- '}₹ {Number(tx.amount || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5DEC9] flex items-center justify-between">
            <button
              onClick={onOpenExportStatements}
              className="text-xs font-bold text-[#A98467] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV Statement</span>
            </button>
            <button
              onClick={onOpenAnalytics}
              className="text-xs font-bold text-[#6C584C] hover:text-[#A98467] flex items-center gap-1 cursor-pointer"
            >
              <PieChart className="w-3.5 h-3.5 text-[#ADC178]" />
              <span>Spending Insights →</span>
            </button>
          </div>
        </div>

        {/* Col 2: Your ApnaPay Wallet & Bill Payments Due */}
        <div className="space-y-6">
          {/* Card: Your ApnaPay Wallet (Color 4: #A98467 to Color 5: #6C584C Gradient) */}
          <div className="rounded-2xl bg-gradient-to-br from-[#A98467] via-[#8B6B53] to-[#6C584C] text-[#F0EAD2] p-5 shadow-lg shadow-[#6C584C]/15 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#DDE5B6]">Your ApnaPay Wallet</span>
              <Sparkles className="w-4 h-4 text-[#ADC178]" />
            </div>

            <div className="mb-4">
              <span className="text-3xl font-black text-white tracking-tight">
                ₹ {balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <p className="text-[10px] text-[#F0EAD2]/90 font-semibold">Available Balance</p>
            </div>

            {/* UPI ID Box */}
            <div className="rounded-xl bg-black/20 border border-white/15 p-2.5 flex items-center justify-between gap-2 mb-3">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#DDE5B6] font-bold">UPI ID</p>
                <p className="text-xs font-mono font-bold text-white truncate">{upiId}</p>
              </div>
              <button
                onClick={handleCopyUpi}
                className="px-2.5 py-1 rounded-lg bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] text-[11px] font-black flex items-center gap-1 transition cursor-pointer"
              >
                {copiedUpi ? <Check className="w-3 h-3 text-[#2B221B]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Sub stats */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-[#F0EAD2] font-semibold pt-1 border-t border-white/15">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#DDE5B6]" />
                <span>2 Linked Banks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#DDE5B6]" />
                <span>1 Active Card</span>
              </div>
            </div>
          </div>

          {/* Card: Bill Payments Due (Clay Highlight) */}
          <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7464]">
                Bill Payments Due
              </h3>
              <button
                onClick={() => onOpenBills('due')}
                className="text-xs font-bold text-[#A98467] hover:underline transition cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DEC9]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#A98467]/20 border border-[#A98467]/30 flex items-center justify-center text-[#87654D]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#3D3028]">Electricity Bill</p>
                    <p className="text-[10px] text-[#8C7464]">MPCD • Due in 2 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#3D3028]">₹ 650</span>
                  <button
                    onClick={() => onOpenBills('electricity')}
                    className="block text-[10px] font-black text-[#A98467] hover:underline cursor-pointer"
                  >
                    Pay Now
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F3] border border-[#E5DEC9]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#DDE5B6] border border-[#C5D099] flex items-center justify-center text-[#3B4718]">
                    <Tv className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#3D3028]">DTH Recharge</p>
                    <p className="text-[10px] text-[#8C7464]">Tata Play • Due in 5 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#3D3028]">₹ 299</span>
                  <button
                    onClick={() => onOpenRecharge('dth')}
                    className="block text-[10px] font-black text-[#A98467] hover:underline cursor-pointer"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenRecurringSimulator}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-[#F0EAD2]/70 hover:bg-[#F0EAD2] text-[#4A3B32] text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer border border-[#E0D5BE]"
            >
              <Repeat className="w-3.5 h-3.5 text-[#6C584C]" />
              <span>Manage Recurring Schedules & Simulator</span>
            </button>
          </div>
        </div>

        {/* Col 3: Send Money, Offers & Rewards, Security */}
        <div className="space-y-6">
          {/* Send Money Quick Card */}
          <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7464]">Send Money</h3>
              <button
                onClick={onOpenSendMoney}
                className="text-xs font-bold text-[#6C584C] hover:text-[#A98467] transition cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Recent Contacts Avatars Row (Shades from Earthy Palette) */}
            <div className="flex items-center justify-between mb-4 px-1">
              {recentContacts.map((c) => (
                <button
                  key={c.name}
                  onClick={() => onQuickSendContact(c.mobile)}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div
                    className={`w-11 h-11 rounded-full ${c.bg} ${c.text} flex items-center justify-center font-black text-xs shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    {c.initial}
                  </div>
                  <span className="text-[11px] font-bold text-[#3D3028] group-hover:text-[#A98467] transition">
                    {c.name}
                  </span>
                  <span className="text-[9px] text-[#8C7464] font-mono">+{c.mobile.slice(-4)}</span>
                </button>
              ))}

              <button
                onClick={onOpenSendMoney}
                className="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#F0EAD2] border border-[#E0D5BE] flex items-center justify-center text-[#6C584C] group-hover:bg-[#E5DEC9] transition-all">
                  <span className="text-sm font-bold">•••</span>
                </div>
                <span className="text-[11px] font-bold text-[#8C7464]">More</span>
              </button>
            </div>

            {/* Quick Input Form */}
            <form onSubmit={handleQuickSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={quickMobile}
                  onChange={(e) => setQuickMobile(e.target.value)}
                  placeholder="Enter Mobile Number / UPI ID"
                  className="w-full bg-[#FAF8F3] border border-[#E5DEC9] focus:bg-white text-[#3D3028] text-xs rounded-xl pl-3.5 pr-10 py-2.5 focus:outline-none focus:border-[#ADC178] transition"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] cursor-pointer transition shadow-2xs"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onOpenSendMoney}
                  className="py-2.5 rounded-xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] text-xs font-black transition shadow-xs cursor-pointer"
                >
                  Send Money
                </button>
                <button
                  type="button"
                  onClick={onOpenUpiCircle}
                  className="py-2.5 rounded-xl bg-[#F0EAD2] hover:bg-[#E5DEC9] border border-[#E0D5BE] text-[#4A3B32] text-xs font-bold transition cursor-pointer"
                >
                  Request Money
                </button>
              </div>
            </form>
          </div>

          {/* Offers & Rewards Card (Color 2: #DDE5B6 + Color 1: #F0EAD2) */}
          <div className="rounded-2xl bg-white border border-[#E5DEC9] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C7464]">
                Offers & Rewards
              </h3>
              <button
                onClick={onOpenOffers}
                className="text-xs font-bold text-[#A98467] hover:underline transition cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Big Cashback Banner */}
            <div
              onClick={onOpenOffers}
              className="rounded-xl bg-gradient-to-r from-[#DDE5B6]/80 via-[#F0EAD2] to-[#DDE5B6]/80 border border-[#C5D099] p-3.5 flex items-center justify-between gap-3 mb-3 cursor-pointer hover:border-[#ADC178] transition group"
            >
              <div>
                <p className="text-xs font-extrabold text-[#384617] group-hover:text-[#252E10] transition">
                  Flat ₹50 Cashback
                </p>
                <p className="text-[10px] text-[#615144]">on Mobile Recharge above ₹199</p>
                <span className="inline-block mt-1 text-[10px] font-black text-[#A98467] group-hover:underline">
                  Recharge Now →
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white border border-[#C5D099] flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                🎁
              </div>
            </div>

            {/* 3 Mini Reward Cards */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={onOpenOffers}
                className="p-2 rounded-xl bg-[#FAF8F3] hover:bg-[#F0EAD2] border border-[#E5DEC9] text-left transition cursor-pointer"
              >
                <span className="text-xs font-bold text-[#4A3B32] block">Upto ₹100</span>
                <span className="text-[9px] text-[#8C7464] block leading-tight">on Bill Payments</span>
              </button>
              <button
                onClick={onOpenOffers}
                className="p-2 rounded-xl bg-[#FAF8F3] hover:bg-[#F0EAD2] border border-[#E5DEC9] text-left transition cursor-pointer"
              >
                <span className="text-xs font-bold text-[#4E6221] block">5% Cashback</span>
                <span className="text-[9px] text-[#8C7464] block leading-tight">on Top-ups</span>
              </button>
              <button
                onClick={onOpenOffers}
                className="p-2 rounded-xl bg-[#FAF8F3] hover:bg-[#F0EAD2] border border-[#E5DEC9] text-left transition cursor-pointer"
              >
                <span className="text-xs font-bold text-[#A98467] block">Refer & Earn</span>
                <span className="text-[9px] text-[#8C7464] block leading-tight">Get ₹50</span>
              </button>
            </div>
          </div>

          {/* Fraud Monitoring & AI Assistant Widget (Highlighted with Earthy Tones) */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onOpenFraudRisk}
              className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#E5DEC9] hover:border-[#6C584C] text-left transition cursor-pointer shadow-xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#6C584C] text-[#F0EAD2] flex items-center justify-center mb-2 shadow-2xs">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#4A3B32]">Fraud Engine</p>
              <p className="text-[10px] text-[#4E6221] font-bold">96/100 Safe Score</p>
            </button>

            <button
              onClick={onOpenAiAssistant}
              className="p-3.5 rounded-2xl bg-[#DDE5B6]/70 border border-[#ADC178]/60 hover:border-[#ADC178] text-left transition cursor-pointer shadow-xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center mb-2 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-[#364216]">AI Genius</p>
              <p className="text-[10px] text-[#4E6221] font-extrabold">Smart Insights</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};