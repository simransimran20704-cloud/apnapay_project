import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  Store,
  Gift,
  Share2,
  Globe2,
  Search,
  Volume2,
  TrendingUp,
  Sparkles,
  Award,
  ArrowRight,
  DollarSign,
  Copy,
  Check,
  RotateCw,
} from 'lucide-react';

export const MerchantGrowthModal = ({ isOpen, onClose }) => {
  const { balance } = useWallet();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('merchant'); // 'merchant' | 'loyalty' | 'referral' | 'forex' | 'subscription'

  // 22. Merchant Dashboard State
  const [soundboxLang, setSoundboxLang] = useState('hi');
  const [soundPlaying, setSoundPlaying] = useState(false);

  // 23. Loyalty Points & Scratch Card
  const [coins, setCoins] = useState(1450);
  const [scratchRevealed, setScratchRevealed] = useState(false);

  // 24. Referral State
  const [copiedRef, setCopiedRef] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  // 29. Multi-Currency Forex State
  const [inrAmount, setInrAmount] = useState('5000');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const fxRates = {
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    AED: 0.044,
    SGD: 0.016,
    JPY: 1.85,
  };

  // 7. Subscription Detective State
  const [subscriptions, setSubscriptions] = useState([
    { id: 'sub-1', name: 'Netflix 4K Ultra HD', cost: 649, cycle: 'Monthly', renewDays: 4, category: 'Entertainment' },
    { id: 'sub-2', name: 'Spotify Premium Family', cost: 119, cycle: 'Monthly', renewDays: 12, category: 'Music' },
    { id: 'sub-3', name: 'Cult.fit Gym & Fitness', cost: 2499, cycle: 'Quarterly', renewDays: 18, category: 'Health' },
  ]);

  if (!isOpen) return null;

  const handlePlaySoundbox = () => {
    setSoundPlaying(true);
    const audioText =
      soundboxLang === 'hi'
        ? 'ApnaPay par ₹500 prapt hue!'
        : soundboxLang === 'en'
        ? 'Received ₹500 on ApnaPay!'
        : 'ApnaPay-il ₹500 pera-pattathu!';

    try {
      const utterance = new SpeechSynthesisUtterance(audioText);
      utterance.lang = soundboxLang === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback
    }
    setTimeout(() => setSoundPlaying(false), 2000);
  };

  const handleScratch = () => {
    if (!scratchRevealed) {
      setScratchRevealed(true);
      setCoins((p) => p + 100);
      addNotification({
        title: 'ApnaCoins Won!',
        message: 'You won 100 ApnaCoins from Scratch Card.',
        type: 'SUCCESS',
      });
    }
  };

  const handleSpinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      const wins = [50, 100, 25, 200, 500];
      const win = wins[Math.floor(Math.random() * wins.length)];
      setSpinResult(`Congratulations! You won ₹${win} Cashback!`);
      setSpinning(false);
      addNotification({
        title: 'Cashback Won!',
        message: `₹${win} credited from Lucky Wheel!`,
        type: 'SUCCESS',
      });
    }, 1500);
  };

  const convertedValue = (parseFloat(inrAmount || 0) * (fxRates[targetCurrency] || 0.012)).toFixed(2);
  const retailBankFee = (parseFloat(inrAmount || 0) * 0.035).toFixed(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/40">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Merchant, Loyalty & Growth Suite</h3>
              <p className="text-xs text-[#DDE5B6]">
                Soundbox Analytics • Loyalty Coins • Forex Simulator • Subscriptions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex overflow-x-auto p-2 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] gap-1.5 shrink-0">
          {[
            { id: 'merchant', label: '22. Merchant Soundbox', icon: Store },
            { id: 'loyalty', label: '23. Loyalty & Scratch', icon: Gift },
            { id: 'referral', label: '24. Referrals & Cashback', icon: Share2 },
            { id: 'forex', label: '29. Forex FX Simulator', icon: Globe2 },
            { id: 'subscription', label: '7. Subscription Detective', icon: Search },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                    : 'text-[#6C584C] hover:bg-[#FAF8F4]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: MERCHANT DASHBOARD & SOUNDBOX */}
          {activeTab === 'merchant' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
                  <span className="text-[10px] text-[#8C7464] font-bold block">Today's GMV</span>
                  <span className="text-sm font-mono font-black text-[#2B221B]">₹18,450</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
                  <span className="text-[10px] text-[#8C7464] font-bold block">Collections</span>
                  <span className="text-sm font-mono font-black text-[#4D6321]">24 Txns</span>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
                  <span className="text-[10px] text-[#8C7464] font-bold block">Avg Ticket</span>
                  <span className="text-sm font-mono font-black text-[#6C584C]">₹768</span>
                </div>
              </div>

              {/* Soundbox Voice Simulator */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-3 shadow-xs">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-[#ADC178]" />
                    <h5 className="text-xs font-bold text-[#2B221B]">ApnaPay Audio Soundbox Simulator</h5>
                  </div>
                  <select
                    value={soundboxLang}
                    onChange={(e) => setSoundboxLang(e.target.value)}
                    className="text-xs px-2 py-1 rounded-lg border border-[#E5DEC9] bg-white font-semibold"
                  >
                    <option value="hi">Hindi (हिन्दी)</option>
                    <option value="en">English</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                  </select>
                </div>

                <p className="text-xs text-[#8C7464]">
                  Simulate voice notification announcement when a customer pays at counter.
                </p>

                <button
                  onClick={handlePlaySoundbox}
                  className="w-full py-2.5 rounded-xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer shadow-xs active:scale-98"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{soundPlaying ? 'Playing Voice Alert...' : 'Test Play "₹500 Received"'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LOYALTY & SCRATCH CARDS */}
          {activeTab === 'loyalty' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex justify-between items-center shadow-xs">
                <div>
                  <span className="text-[10px] text-[#DDE5B6] uppercase font-bold tracking-wider">
                    ApnaCoins Loyalty Balance
                  </span>
                  <h4 className="text-xl font-mono font-black text-[#F0EAD2]">{coins} Coins</h4>
                  <p className="text-[10px] text-[#DDE5B6]/80">1 ApnaCoin earned for every ₹10 spent.</p>
                </div>
                <Award className="w-10 h-10 text-[#ADC178]" />
              </div>

              {/* Scratch Card */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] text-center space-y-3">
                <h5 className="text-xs font-bold text-[#2B221B]">Mystery Scratch Card</h5>
                <div
                  onClick={handleScratch}
                  className="w-48 h-32 mx-auto rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border-2 border-dashed shadow-sm"
                  style={{
                    backgroundColor: scratchRevealed ? '#DDE5B6' : '#6C584C',
                    borderColor: scratchRevealed ? '#ADC178' : '#A98467',
                    color: scratchRevealed ? '#2B221B' : '#F0EAD2',
                  }}
                >
                  {scratchRevealed ? (
                    <div className="animate-in zoom-in-90">
                      <Sparkles className="w-6 h-6 text-[#4D6321] mx-auto mb-1" />
                      <span className="text-sm font-black">+100 ApnaCoins</span>
                      <span className="block text-[10px] font-bold text-[#4D6321]">Credited to Wallet!</span>
                    </div>
                  ) : (
                    <div>
                      <Gift className="w-6 h-6 mx-auto mb-1 opacity-70" />
                      <span className="text-xs font-bold">Tap to Scratch</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REFERRALS & CASHBACK */}
          {activeTab === 'referral' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-3 shadow-xs">
                <h5 className="text-xs font-bold text-[#2B221B]">Invite Friends & Earn ₹50 Cashback</h5>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://apnapay.com/ref/SIMRAN88"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-[#E5DEC9] bg-[#FAF8F4] text-xs font-mono select-all"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://apnapay.com/ref/SIMRAN88');
                      setCopiedRef(true);
                      setTimeout(() => setCopiedRef(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#ADC178] text-[#2B221B] text-xs font-bold cursor-pointer"
                  >
                    {copiedRef ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Spin Wheel */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] text-center space-y-3">
                <h5 className="text-xs font-bold text-[#2B221B]">Weekly Lucky Cashback Wheel</h5>
                <button
                  onClick={handleSpinWheel}
                  disabled={spinning}
                  className="px-6 py-2.5 rounded-xl bg-[#6C584C] hover:bg-[#534339] text-[#F0EAD2] text-xs font-black shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {spinning ? 'Spinning Wheel...' : 'Spin to Win up to ₹500'}
                </button>
                {spinResult && (
                  <p className="text-xs font-bold text-[#4D6321] animate-in zoom-in-95">{spinResult}</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: FOREX SIMULATOR */}
          {activeTab === 'forex' && (
            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-xs font-bold text-[#2B221B]">Multi-Currency Conversion Simulator</h5>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DDE5B6] text-[#364216] font-bold">
                  Zero FX Markup
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#8C7464] font-bold block mb-1">You Send (INR ₹)</label>
                  <input
                    type="number"
                    value={inrAmount}
                    onChange={(e) => setInrAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5DEC9] text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8C7464] font-bold block mb-1">Target Currency</label>
                  <select
                    value={targetCurrency}
                    onChange={(e) => setTargetCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E5DEC9] text-xs font-bold bg-white"
                  >
                    <option value="USD">USD ($) - US Dollar</option>
                    <option value="EUR">EUR (€) - Euro</option>
                    <option value="GBP">GBP (£) - British Pound</option>
                    <option value="AED">AED (د.إ) - UAE Dirham</option>
                    <option value="SGD">SGD (S$) - Singapore Dollar</option>
                    <option value="JPY">JPY (¥) - Japanese Yen</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E5DEC9] flex justify-between items-center text-xs">
                <span className="font-bold text-[#2B221B]">Converted Outcome:</span>
                <span className="font-mono font-black text-sm text-[#4D6321]">
                  {convertedValue} {targetCurrency}
                </span>
              </div>

              <p className="text-[10px] text-[#8C7464]">
                💡 You save approx. <b>₹{retailBankFee}</b> in hidden forex markups vs standard cards!
              </p>
            </div>
          )}

          {/* TAB 5: SUBSCRIPTION DETECTIVE */}
          {activeTab === 'subscription' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="text-xs font-bold text-[#2B221B]">Detected Recurring Subscriptions</h5>
                  <p className="text-[10px] text-[#8C7464]">Auto-scanned from your card & UPI auto-debits.</p>
                </div>
              </div>

              <div className="space-y-2">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="p-3.5 rounded-2xl bg-white border border-[#E5DEC9] flex justify-between items-center shadow-xs">
                    <div>
                      <h6 className="text-xs font-bold text-[#2B221B]">{sub.name}</h6>
                      <p className="text-[10px] text-[#8C7464]">
                        Renews in {sub.renewDays} days • {sub.cycle}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#2B221B]">₹{sub.cost}</span>
                      <button className="block text-[10px] text-[#6C584C] underline font-bold cursor-pointer">
                        Manage / Pause
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
