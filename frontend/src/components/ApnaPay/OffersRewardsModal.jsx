import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { playCashbackSound } from '../../utils/audio';
import {
  X,
  ArrowLeft,
  Gift,
  Sparkles,
  CheckCircle2,
  Tag,
  Zap,
  ShoppingBag,
  Smartphone,
  Copy,
  Check,
} from 'lucide-react';

export const OffersRewardsModal = ({ isOpen, onClose, onOpenRecharge }) => {
  const { topUpWallet } = useWallet();
  const [activeTab, setActiveTab] = useState('all');
  const [claimedCards, setClaimedCards] = useState({});
  const [copiedCode, setCopiedCode] = useState(null);

  if (!isOpen) return null;

  const handleClaimCashback = async (id, amount) => {
    if (claimedCards[id]) return;
    try {
      playCashbackSound();
      await topUpWallet({
        amount,
        source: 'ApnaPay Cashback Reward',
      });
      setClaimedCards((prev) => ({ ...prev, [id]: true }));
    } catch (err) {
      console.warn('Could not auto-credit cashback:', err);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const offers = [
    {
      id: 'off-1',
      type: 'recharge',
      title: 'Mobile Recharge',
      reward: 'Flat ₹50 Cashback',
      validity: 'Valid till 31 Oct 2026',
      code: 'APNA50',
      amount: 50,
      icon: Smartphone,
    },
    {
      id: 'off-2',
      type: 'bill',
      title: 'Electricity Bill',
      reward: '₹30 Cashback',
      validity: 'Valid till 31 Oct 2026',
      code: 'POWER30',
      amount: 30,
      icon: Zap,
    },
    {
      id: 'off-3',
      type: 'bill',
      title: 'DTH Recharge',
      reward: '₹25 Cashback',
      validity: 'Valid till 31 Oct 2026',
      code: 'DTH25',
      amount: 25,
      icon: Zap,
    },
    {
      id: 'off-4',
      type: 'shopping',
      title: 'Swiggy & Zomato',
      reward: 'Flat 20% Off',
      validity: 'Valid on orders above ₹249',
      code: 'EATAPNA',
      amount: 40,
      icon: ShoppingBag,
    },
  ];

  const filtered = activeTab === 'all' ? offers : offers.filter((o) => o.type === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-[#DDE5B6] hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Offers & Rewards</h3>
              <p className="text-xs text-[#DDE5B6]">Cashback, Scratch Cards & Coupons</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Main Hero Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#6C584C] via-[#A98467] to-[#6C584C] text-white border border-[#A98467]/40 flex items-center justify-between gap-3 shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#DDE5B6] tracking-wider">Super Saver</span>
              <h4 className="text-base font-black text-white">Flat ₹50 Cashback</h4>
              <p className="text-xs text-[#F0EAD2]">on Mobile Recharge above ₹199</p>
              <button
                onClick={() => {
                  onClose();
                  onOpenRecharge('mobile');
                }}
                className="mt-2.5 px-3.5 py-1.5 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-bold text-xs shadow-md transition cursor-pointer"
              >
                Recharge Now
              </button>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl">
              🎁
            </div>
          </div>

          {/* 3 Mini Offer Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] text-center shadow-xs">
              <span className="text-xs font-bold text-[#6C584C] block">Upto ₹100</span>
              <span className="text-[10px] text-[#8C7464] block">on Bills</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] text-center shadow-xs">
              <span className="text-xs font-bold text-[#ADC178] block">5% Cashback</span>
              <span className="text-[10px] text-[#8C7464] block">on Top-ups</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] text-center shadow-xs">
              <span className="text-xs font-bold text-[#A98467] block">Refer & Earn</span>
              <span className="text-[10px] text-[#8C7464] block">Get ₹50</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F0EAD2]/60 border border-[#E5DEC9] rounded-2xl">
            {['all', 'recharge', 'bill', 'shopping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl capitalize transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                    : 'text-[#8C7464] hover:text-[#6C584C]'
                }`}
              >
                {tab === 'bill' ? 'Bills' : tab}
              </button>
            ))}
          </div>

          {/* List of Coupon / Reward Cards */}
          <div className="space-y-2.5">
            {filtered.map((item) => {
              const Icon = item.icon;
              const isClaimed = claimedCards[item.id];
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white border border-[#E5DEC9] flex items-center justify-between gap-3 shadow-xs hover:border-[#ADC178] transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#DDE5B6]/50 border border-[#DDE5B6] flex items-center justify-center text-[#6C584C]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#3D3028]">{item.title}</h5>
                      <p className="text-xs font-semibold text-[#ADC178]">{item.reward}</p>
                      <p className="text-[10px] text-[#8C7464]">{item.validity}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      disabled={isClaimed}
                      onClick={() => handleClaimCashback(item.id, item.amount)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isClaimed
                          ? 'bg-[#DDE5B6] text-[#2B221B] border border-[#ADC178]'
                          : 'bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] shadow-xs'
                      }`}
                    >
                      {isClaimed ? 'Claimed ✓' : 'Get Now'}
                    </button>
                    <button
                      onClick={() => handleCopy(item.code)}
                      className="text-[10px] font-mono text-[#8C7464] hover:text-[#6C584C] flex items-center gap-1 cursor-pointer"
                    >
                      <span>{item.code}</span>
                      {copiedCode === item.code ? <Check className="w-2.5 h-2.5 text-[#ADC178]" /> : <Copy className="w-2.5 h-2.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
