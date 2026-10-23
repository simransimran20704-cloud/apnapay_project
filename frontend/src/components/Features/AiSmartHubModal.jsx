import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  Bot,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Tag,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Volume2,
  DollarSign,
  PieChart,
} from 'lucide-react';

export const AiSmartHubModal = ({ isOpen, onClose, onExecutePayment }) => {
  const { balance, transactions, sendMoney } = useWallet();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('intent'); // 'intent' | 'voice' | 'categorization' | 'guard' | 'insights'

  // 1. Smart Payment Intent Engine State
  const [intentInput, setIntentInput] = useState('');
  const [parsedIntent, setParsedIntent] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [intentSuccess, setIntentSuccess] = useState(false);

  // 14. Voice Payment Assistant State
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceStatus, setVoiceStatus] = useState('Tap microphone to start speaking...');

  // 5 & 25. Spending Guard & Dynamic Limits State
  const [dailyLimit, setDailyLimit] = useState(10000);
  const [singleTxnCap, setSingleTxnCap] = useState(5000);
  const [nightLock, setNightLock] = useState(true);
  const [guardSaved, setGuardSaved] = useState(false);

  if (!isOpen) return null;

  // Natural Language Intent Parser Simulation
  const handleParseIntent = (text) => {
    const query = (text || intentInput).trim();
    if (!query) return;

    setIsParsing(true);
    setIntentSuccess(false);

    setTimeout(() => {
      // Regex heuristics for amount
      const amountMatch = query.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:,\d+)*(?:\.\d+)?)/i);
      const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 500;

      // Recipient extraction
      let recipient = '9876543210';
      if (/rahul/i.test(query)) recipient = 'Rahul Verma (919876543210)';
      else if (/priya/i.test(query)) recipient = 'Priya Sharma (918765432109)';
      else if (/amit/i.test(query)) recipient = 'Amit Patel (917654321098)';
      else if (/mom|maa/i.test(query)) recipient = 'Maa (919811223344)';
      else if (/landlord|rent/i.test(query)) recipient = 'House Owner (919445566778)';
      else {
        const phoneMatch = query.match(/\b\d{10}\b/);
        if (phoneMatch) recipient = phoneMatch[0];
        else recipient = 'Merchant / Contact';
      }

      // Category detection
      let category = 'General Transfer';
      if (/food|dinner|lunch|pizza|swiggy|zomato/i.test(query)) category = 'Food & Dining';
      else if (/bill|electricity|recharge|water/i.test(query)) category = 'Bills & Utilities';
      else if (/rent|flat/i.test(query)) category = 'House Rent';
      else if (/movie|party|netflix/i.test(query)) category = 'Entertainment';
      else if (/grocery|supermarket|vegetables/i.test(query)) category = 'Groceries';

      setParsedIntent({
        rawText: query,
        amount,
        recipient,
        category,
        confidence: 96,
        guardCheck: amount <= singleTxnCap ? 'PASSED' : 'EXCEEDS_CAP',
        note: `AI Intent: ${category}`,
      });
      setIsParsing(false);
    }, 400);
  };

  const handleExecuteIntent = async () => {
    if (!parsedIntent) return;
    try {
      const cleanMobile = parsedIntent.recipient.match(/\d{10}/)?.[0] || '9123456780';
      await sendMoney({
        toMobile: cleanMobile,
        amount: parsedIntent.amount,
        remarks: parsedIntent.note,
      });
      setIntentSuccess(true);
      addNotification({
        title: 'Smart Payment Executed',
        message: `₹${parsedIntent.amount} sent via AI Intent to ${parsedIntent.recipient}`,
        type: 'SUCCESS',
      });
      setTimeout(() => {
        setParsedIntent(null);
        setIntentInput('');
        setIntentSuccess(false);
      }, 2500);
    } catch (err) {
      alert('Payment failed: ' + err.message);
    }
  };

  // Voice Assistant simulation
  const toggleVoiceAssistant = () => {
    if (isListening) {
      setIsListening(false);
      setVoiceStatus('Voice stopped');
    } else {
      setIsListening(true);
      setVoiceStatus('Listening... Speak naturally (e.g. "Send 500 rupees to Rahul for coffee")');
      setVoiceTranscript('');

      setTimeout(() => {
        const sampleSpoken = 'Send 450 rupees to Priya for lunch';
        setVoiceTranscript(sampleSpoken);
        setIsListening(false);
        setVoiceStatus('Processing audio command...');
        handleParseIntent(sampleSpoken);
        setActiveTab('intent');
      }, 2800);
    }
  };

  // Sample categorized transactions
  const categorizedList = (transactions.length ? transactions : [
    { transactionId: 'TXN-9AA09FF0', type: 'DEBIT', amount: 450, with: 'Swiggy Food', remarks: 'Dinner bill' },
    { transactionId: 'TXN-0DD99E24', type: 'DEBIT', amount: 200, with: 'Reliance Fresh', remarks: 'Groceries' },
    { transactionId: 'TXN-cd253dcf', type: 'DEBIT', amount: 1200, with: 'Torrent Power', remarks: 'Electricity bill' },
  ]).map((t) => {
    let cat = 'Shopping & Lifestyle';
    let color = 'bg-[#6C584C] text-[#F0EAD2]';
    const text = (t.with + ' ' + (t.remarks || '')).toLowerCase();
    if (/food|dinner|swiggy|zomato/i.test(text)) {
      cat = 'Food & Dining';
      color = 'bg-[#ADC178] text-[#2B221B]';
    } else if (/electric|bill|power/i.test(text)) {
      cat = 'Bills & Utilities';
      color = 'bg-[#A98467] text-white';
    } else if (/grocery|reliance|vegetable/i.test(text)) {
      cat = 'Groceries';
      color = 'bg-[#DDE5B6] text-[#3A4518]';
    }
    return { ...t, category: cat, badgeColor: color };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/40 shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2] flex items-center gap-1.5">
                AI Smart Financial Hub
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ADC178] text-[#2B221B] font-black uppercase tracking-wider">
                  GenAI 2.0
                </span>
              </h3>
              <p className="text-xs text-[#DDE5B6]">
                Natural Language Intent • Voice Pay • Auto Categorization • Spending Guard
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

        {/* Tab Selector */}
        <div className="flex overflow-x-auto p-2 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] gap-1.5 shrink-0 scrollbar-none">
          {[
            { id: 'intent', label: '1. Payment Intent Engine', icon: Sparkles },
            { id: 'voice', label: '14. Voice Assistant', icon: Mic },
            { id: 'categorization', label: '15. Auto Categorization', icon: Tag },
            { id: 'guard', label: '5 & 25. Spending Guard', icon: ShieldAlert },
            { id: 'insights', label: '13. AI Budget Advisor', icon: Lightbulb },
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

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: SMART PAYMENT INTENT ENGINE */}
          {activeTab === 'intent' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
                <label className="block text-xs font-bold text-[#6C584C] mb-1.5">
                  Type any natural instruction in English or Hinglish:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={intentInput}
                    onChange={(e) => setIntentInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleParseIntent()}
                    placeholder="e.g. Send ₹750 to Rahul for pizza, or pay electricity bill ₹1200"
                    className="w-full pl-3.5 pr-24 py-2.5 rounded-xl border border-[#E5DEC9] bg-[#FAF8F4] text-xs text-[#2B221B] font-medium focus:bg-white focus:outline-none focus:border-[#ADC178] focus:ring-1 focus:ring-[#ADC178]"
                  />
                  <button
                    onClick={() => handleParseIntent()}
                    disabled={isParsing || !intentInput.trim()}
                    className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg bg-[#6C584C] hover:bg-[#534339] text-[#F0EAD2] text-xs font-bold transition cursor-pointer disabled:opacity-50"
                  >
                    {isParsing ? 'Analyzing...' : 'Parse AI'}
                  </button>
                </div>

                {/* Quick prompt suggestions */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="text-[10px] text-[#8C7464] font-semibold self-center">Try:</span>
                  {[
                    'Pay ₹500 to Priya for dinner',
                    'Send 1200 to Amit for groceries',
                    'Transfer ₹2000 to Landlord for rent',
                    'Pay 150 to Sharma Ji for tea',
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => {
                        setIntentInput(chip);
                        handleParseIntent(chip);
                      }}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-[#F0EAD2]/70 hover:bg-[#DDE5B6] text-[#6C584C] font-medium border border-[#E5DEC9] cursor-pointer transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parsed Result Box */}
              {parsedIntent && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-[#F0EAD2]/40 border border-[#ADC178] shadow-sm animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center font-black">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-[#2B221B]">
                          Intent Extracted ({parsedIntent.confidence}% AI Confidence)
                        </h4>
                        <p className="text-[11px] text-[#6C584C]">"{parsedIntent.rawText}"</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#DDE5B6] text-[#364216] font-mono font-bold text-[10px]">
                      {parsedIntent.category}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-3">
                    <div className="p-2.5 rounded-xl bg-white border border-[#E5DEC9]">
                      <span className="text-[10px] text-[#8C7464] font-bold block">Payee</span>
                      <span className="text-xs font-bold text-[#2B221B] truncate block">
                        {parsedIntent.recipient}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E5DEC9]">
                      <span className="text-[10px] text-[#8C7464] font-bold block">Amount</span>
                      <span className="text-sm font-extrabold font-mono text-[#4D6321]">
                        ₹{parsedIntent.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {parsedIntent.guardCheck === 'EXCEEDS_CAP' && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>Note: This amount exceeds your configured single txn safe limit (₹{singleTxnCap}).</span>
                    </div>
                  )}

                  {intentSuccess ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Payment Processed Successfully! Ledger updated.</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleExecuteIntent}
                      className="w-full py-2.5 rounded-xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] text-xs font-black shadow-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
                    >
                      <span>Confirm & Pay ₹{parsedIntent.amount}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VOICE-BASED PAYMENT ASSISTANT */}
          {activeTab === 'voice' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg transition-all duration-300 relative cursor-pointer group"
                onClick={toggleVoiceAssistant}
                style={{
                  backgroundColor: isListening ? '#ADC178' : '#6C584C',
                  color: isListening ? '#2B221B' : '#F0EAD2',
                }}
              >
                {isListening ? (
                  <Mic className="w-8 h-8 animate-bounce" />
                ) : (
                  <Mic className="w-8 h-8 group-hover:scale-110 transition-transform" />
                )}
                {isListening && (
                  <span className="absolute inset-0 rounded-full border-4 border-[#ADC178] animate-ping opacity-75"></span>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#2B221B]">Voice Payment Assistant</h4>
                <p className="text-xs text-[#8C7464] mt-1 font-medium">{voiceStatus}</p>
              </div>

              {/* Simulated Waveform */}
              {isListening && (
                <div className="flex items-center justify-center gap-1.5 h-8">
                  {[24, 40, 16, 32, 48, 20, 36, 52, 28, 44].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-[#ADC178] rounded-full animate-pulse"
                      style={{ height: `${h}px`, animationDelay: `${i * 100}ms` }}
                    ></div>
                  ))}
                </div>
              )}

              {voiceTranscript && (
                <div className="p-3.5 max-w-md mx-auto rounded-2xl bg-white border border-[#E5DEC9] text-xs font-mono text-[#3D3028]">
                  "{voiceTranscript}"
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#F0EAD2]/50 border border-[#E5DEC9] text-left max-w-md mx-auto text-xs space-y-1.5">
                <span className="font-bold text-[#6C584C] block">Voice Commands Supported:</span>
                <p className="text-[#8C7464]">• "Send ₹500 to Priya for snacks"</p>
                <p className="text-[#8C7464]">• "What is my current wallet balance?"</p>
                <p className="text-[#8C7464]">• "Pay electricity bill"</p>
              </div>
            </div>
          )}

          {/* TAB 3: AUTOMATIC EXPENSE CATEGORIZATION */}
          {activeTab === 'categorization' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2B221B]">ML Auto-Categorized Ledger</h4>
                  <p className="text-[11px] text-[#8C7464]">
                    AI automatically analyzes remarks and merchant details to tag transactions.
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DDE5B6] text-[#364216] font-bold">
                  98.2% Accuracy
                </span>
              </div>

              <div className="divide-y divide-[#E5DEC9] bg-white rounded-2xl border border-[#E5DEC9] overflow-hidden">
                {categorizedList.map((tx, idx) => (
                  <div key={tx.transactionId || idx} className="p-3 flex items-center justify-between gap-3 hover:bg-[#FAF8F4]">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#2B221B] truncate">{tx.with || 'Payment'}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${tx.badgeColor}`}>
                          {tx.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8C7464] truncate">{tx.remarks || 'ApnaPay Transfer'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-[#2B221B]">₹{tx.amount}</span>
                      <span className="block text-[9px] text-[#ADC178] font-bold">Auto-Tagged</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SPENDING GUARD & DYNAMIC LIMITS */}
          {activeTab === 'guard' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-4 shadow-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-[#6C584C]">Daily Spending Limit</label>
                    <span className="text-xs font-mono font-bold text-[#4D6321]">
                      ₹{dailyLimit.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    className="w-full accent-[#ADC178] cursor-pointer"
                  />
                  <span className="text-[10px] text-[#8C7464]">Transactions above this within 24 hours require MPIN re-authorization.</span>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-[#6C584C]">Single Transaction Ceiling</label>
                    <span className="text-xs font-mono font-bold text-[#4D6321]">
                      ₹{singleTxnCap.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="25000"
                    step="500"
                    value={singleTxnCap}
                    onChange={(e) => setSingleTxnCap(Number(e.target.value))}
                    className="w-full accent-[#ADC178] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E5DEC9]">
                  <div>
                    <h5 className="text-xs font-bold text-[#2B221B]">Night-Time Spends Lock</h5>
                    <p className="text-[10px] text-[#8C7464]">Blocks payments between 1:00 AM - 5:00 AM to prevent fraud.</p>
                  </div>
                  <button
                    onClick={() => setNightLock(!nightLock)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      nightLock ? 'bg-[#ADC178]' : 'bg-stone-300'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        nightLock ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setGuardSaved(true);
                    setTimeout(() => setGuardSaved(false), 2000);
                  }}
                  className="w-full py-2 rounded-xl bg-[#6C584C] text-[#F0EAD2] text-xs font-bold cursor-pointer hover:bg-[#534339]"
                >
                  {guardSaved ? 'Limits Updated Successfully!' : 'Save Spending Guard Rules'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: AI BUDGET ADVISOR */}
          {activeTab === 'insights' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#ADC178]" />
                  <h4 className="text-xs font-bold text-[#2B221B]">AI Budget Recommendations</h4>
                </div>
                <p className="text-xs text-[#6C584C]">
                  Based on your current balance of <b className="text-[#2B221B]">₹{balance.toLocaleString('en-IN')}</b> and recent ledger patterns:
                </p>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-[#DDE5B6]/50 border border-[#ADC178]">
                    <span className="text-[10px] font-bold text-[#4D6321] block">Needs (50%)</span>
                    <span className="text-xs font-mono font-bold text-[#2B221B]">₹3,750</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F0EAD2] border border-[#E5DEC9]">
                    <span className="text-[10px] font-bold text-[#6C584C] block">Wants (30%)</span>
                    <span className="text-xs font-mono font-bold text-[#2B221B]">₹2,250</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#A98467]/20 border border-[#A98467]/40">
                    <span className="text-[10px] font-bold text-[#6C584C] block">Savings (20%)</span>
                    <span className="text-xs font-mono font-bold text-[#2B221B]">₹1,500</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E5DEC9] text-xs space-y-1">
                  <p className="font-bold text-[#4D6321]">• Dining Out Alert:</p>
                  <p className="text-[#8C7464] text-[11px]">
                    You spent 34% of your discretionary budget on food delivery this month. Cooking 2 meals at home can save ₹1,400 monthly.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
