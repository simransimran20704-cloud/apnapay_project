import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useApp } from '../../context/AppContext';
import {
  X,
  AlertTriangle,
  RotateCcw,
  Layers,
  WifiOff,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  CreditCard,
  Plus,
  Send,
} from 'lucide-react';

export const PaymentReliabilityModal = ({ isOpen, onClose }) => {
  const { balance } = useWallet();
  const { offlineDrafts, addOfflineDraft, removeOfflineDraft, clearOfflineDrafts } = useApp();
  const [activeTab, setActiveTab] = useState('journey'); // 'journey' | 'duplicate' | 'recovery' | 'offline' | 'multi_wallet'

  // 18. Multi-Wallet State
  const [wallets, setWallets] = useState([
    { id: 'w-1', name: 'Primary Wallet (ApnaPay)', balance: balance || 7500, type: 'General', color: 'border-[#ADC178] bg-[#DDE5B6]/30' },
    { id: 'w-2', name: 'Fuel & Metro Transit Pocket', balance: 1200, type: 'Transit', color: 'border-[#A98467] bg-[#A98467]/10' },
    { id: 'w-3', name: 'Corporate Meal & Food Card', balance: 3400, type: 'Food', color: 'border-[#6C584C] bg-[#F0EAD2]/50' },
    { id: 'w-4', name: 'Emergency Vault Pocket', balance: 15000, type: 'Savings', color: 'border-[#ADC178] bg-[#ADC178]/15' },
  ]);

  // Offline Draft Input
  const [draftTo, setDraftTo] = useState('');
  const [draftAmount, setDraftAmount] = useState('');

  if (!isOpen) return null;

  const handleCreateDraft = (e) => {
    e.preventDefault();
    if (!draftTo || !draftAmount) return;
    addOfflineDraft({
      to: draftTo,
      amount: parseFloat(draftAmount),
      remarks: 'Offline sync draft',
    });
    setDraftTo('');
    setDraftAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/40">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Payment Reliability & Multi-Wallet</h3>
              <p className="text-xs text-[#DDE5B6]">
                Journey Explorer • Duplicate Guard • Auto-Retry • Offline Queue
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
            { id: 'journey', label: '4. Journey Explorer', icon: Activity },
            { id: 'duplicate', label: '16. Duplicate Detection', icon: AlertTriangle },
            { id: 'recovery', label: '17. Recovery & Retry', icon: RotateCcw },
            { id: 'offline', label: '41. Offline Drafts Queue', icon: WifiOff },
            { id: 'multi_wallet', label: '18. Multi-Wallet Hub', icon: Layers },
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

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: TRANSACTION JOURNEY EXPLORER */}
          {activeTab === 'journey' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#2B221B]">
                    Live Transaction Hop Inspection (TXN-EE5FA5AD)
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DDE5B6] text-[#364216] font-mono font-bold">
                    Total Time: 172ms
                  </span>
                </div>

                {/* 4 Node Interactive Flow */}
                <div className="grid grid-cols-4 gap-2 text-center pt-2">
                  {[
                    { step: '1. ApnaPay App', latency: '14ms', status: 'SUCCESS', desc: 'Auth token & MPIN validated' },
                    { step: '2. NPCI Switch', latency: '42ms', status: 'SUCCESS', desc: 'VPA resolved via DNS' },
                    { step: '3. Remitter CBS', latency: '65ms', status: 'SUCCESS', desc: 'Account balance debited' },
                    { step: '4. Payee Bank', latency: '51ms', status: 'SUCCESS', desc: 'Settled to beneficiary' },
                  ].map((node, i) => (
                    <div key={i} className="p-2.5 rounded-2xl bg-[#FAF8F4] border border-[#ADC178]/60 space-y-1">
                      <div className="w-5 h-5 rounded-full bg-[#ADC178] text-[#2B221B] font-bold text-[10px] mx-auto flex items-center justify-center">
                        ✓
                      </div>
                      <span className="text-[11px] font-bold text-[#2B221B] block">{node.step}</span>
                      <span className="text-[10px] font-mono text-[#4D6321] font-bold block">{node.latency}</span>
                      <span className="text-[9px] text-[#8C7464] block leading-tight">{node.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DUPLICATE DETECTION */}
          {activeTab === 'duplicate' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h4 className="text-xs font-bold">Active Duplicate Prevention Guard</h4>
                </div>
                <p className="text-xs">
                  If you attempt to transfer the same amount to the same recipient within 5 minutes, ApnaPay triggers an instant warning confirmation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-2">
                <span className="text-xs font-bold text-[#2B221B] block">Simulation Scenario:</span>
                <div className="p-3 rounded-xl bg-[#FAF8F4] border border-[#E5DEC9] text-xs space-y-1">
                  <p className="font-semibold text-rose-700">⚠️ Warning: Duplicate Payment Flagged!</p>
                  <p className="text-[#8C7464]">
                    "You sent ₹150 to 9123456780 just 2 minutes ago (TXN-EE5FA5AD). Proceeding will debit another ₹150."
                  </p>
                  <div className="flex gap-2 pt-2">
                    <button className="px-3 py-1 rounded-lg bg-stone-200 text-[#2B221B] text-xs font-bold">Cancel</button>
                    <button className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold">Proceed Anyway</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RECOVERY & RETRY */}
          {activeTab === 'recovery' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-3">
                <h4 className="text-xs font-bold text-[#2B221B]">Intelligent Payment Fallback & Auto-Retry</h4>
                <p className="text-xs text-[#8C7464]">
                  In the event of a partner bank timeout (e.g. SBI/HDFC downtime), ApnaPay automatically retries via alternative IMPS or secondary switch rails.
                </p>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#DDE5B6]/40 border border-[#ADC178] flex justify-between items-center text-xs">
                    <span className="font-bold text-[#2B221B]">Auto-Retry Rail 1 (IMPS Backup)</span>
                    <span className="text-[10px] font-bold text-[#4D6321]">ENABLED</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#DDE5B6]/40 border border-[#ADC178] flex justify-between items-center text-xs">
                    <span className="font-bold text-[#2B221B]">Exponential Backoff Interval</span>
                    <span className="text-[10px] font-bold text-[#4D6321]">3s • 7s • 15s</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OFFLINE TRANSACTION DRAFTS */}
          {activeTab === 'offline' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-3">
                <h4 className="text-xs font-bold text-[#2B221B]">Draft Offline Payment</h4>
                <p className="text-[11px] text-[#8C7464]">
                  No internet connection? Draft payment locally and it will broadcast as soon as connection is restored.
                </p>
                <form onSubmit={handleCreateDraft} className="flex gap-2">
                  <input
                    type="text"
                    value={draftTo}
                    onChange={(e) => setDraftTo(e.target.value)}
                    placeholder="Recipient Mobile / UPI"
                    className="flex-1 px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs focus:outline-none focus:border-[#ADC178]"
                  />
                  <input
                    type="number"
                    value={draftAmount}
                    onChange={(e) => setDraftAmount(e.target.value)}
                    placeholder="Amount ₹"
                    className="w-24 px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs focus:outline-none focus:border-[#ADC178]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-[#ADC178] text-[#2B221B] text-xs font-bold cursor-pointer"
                  >
                    Queue
                  </button>
                </form>
              </div>

              {/* Offline Queue List */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#2B221B]">Queued Offline Drafts ({offlineDrafts.length})</span>
                  {offlineDrafts.length > 0 && (
                    <button
                      onClick={clearOfflineDrafts}
                      className="text-[11px] text-[#6C584C] underline font-bold cursor-pointer"
                    >
                      Clear Queue
                    </button>
                  )}
                </div>

                {offlineDrafts.length === 0 ? (
                  <p className="text-xs text-[#8C7464] italic text-center py-4">No pending offline drafts in queue.</p>
                ) : (
                  offlineDrafts.map((d) => (
                    <div key={d.id} className="p-3 rounded-2xl bg-white border border-[#E5DEC9] flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-[#2B221B]">{d.to}</span>
                        <span className="block text-[10px] text-[#8C7464]">Queued: {new Date(d.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-[#4D6321]">₹{d.amount}</span>
                        <button
                          onClick={() => removeOfflineDraft(d.id)}
                          className="block text-[10px] text-rose-600 underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: MULTI-WALLET HUB */}
          {activeTab === 'multi_wallet' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-[#2B221B]">Your Specialized Sub-Wallets</h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {wallets.map((w) => (
                  <div key={w.id} className={`p-4 rounded-2xl border shadow-xs ${w.color} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C584C]">{w.type}</span>
                      <CreditCard className="w-3.5 h-3.5 text-[#6C584C]" />
                    </div>
                    <h5 className="text-xs font-bold text-[#2B221B] truncate">{w.name}</h5>
                    <p className="text-sm font-black font-mono text-[#2B221B]">
                      ₹{w.balance.toLocaleString('en-IN')}
                    </p>
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
