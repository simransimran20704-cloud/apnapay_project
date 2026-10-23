import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  FileQuestion,
  RotateCcw,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight,
  Plus,
  Send,
  Zap,
} from 'lucide-react';

export const DisputesRefundsModal = ({ isOpen, onClose }) => {
  const { transactions } = useWallet();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('disputes'); // 'disputes' | 'refunds' | 'bill_reminders'

  // 20. Disputes State
  const [disputes, setDisputes] = useState([
    {
      id: 'DISP-8921',
      crn: 'CRN-782194',
      txnId: 'TXN-9AA09FF0',
      reason: 'Money debited but merchant POS timed out',
      amount: 450,
      status: 'UNDER_BANK_REVIEW',
      slaHours: '18h remaining',
    },
  ]);
  const [showNewDispute, setShowNewDispute] = useState(false);
  const [disputeTxnId, setDisputeTxnId] = useState('');
  const [disputeReason, setDisputeReason] = useState('Money debited but not received by merchant');

  // 21. Refund Tracking State
  const [refunds, setRefunds] = useState([
    {
      id: 'REF-3301',
      merchant: 'Swiggy Food Delivery',
      amount: 320,
      status: 'CREDITED',
      stages: [
        { name: 'Initiated by Swiggy', done: true, time: 'Oct 22, 10:30 AM' },
        { name: 'NPCI Switch Routed', done: true, time: 'Oct 22, 11:15 AM' },
        { name: 'Bank Cleared', done: true, time: 'Oct 22, 11:45 AM' },
        { name: 'Credited to ApnaPay', done: true, time: 'Oct 22, 11:46 AM' },
      ],
    },
    {
      id: 'REF-3302',
      merchant: 'Amazon Shopping (Order #403-991)',
      amount: 1499,
      status: 'BANK_PROCESSING',
      stages: [
        { name: 'Initiated by Amazon', done: true, time: 'Oct 23, 04:00 PM' },
        { name: 'NPCI Switch Routed', done: true, time: 'Oct 23, 06:30 PM' },
        { name: 'Bank Cleared', done: false, time: 'In Progress' },
        { name: 'Credited to ApnaPay', done: false, time: 'Expected Today' },
      ],
    },
  ]);

  // 38. Smart Bill Reminders State
  const [billReminders, setBillReminders] = useState([
    {
      id: 'bill-1',
      title: 'Torrent Power (Electricity)',
      amount: 1420,
      dueDays: 2,
      dueDate: 'Oct 26, 2026',
      autoPay: true,
    },
    {
      id: 'bill-2',
      title: 'JioFiber High-Speed Broadband',
      amount: 799,
      dueDays: 5,
      dueDate: 'Oct 29, 2026',
      autoPay: false,
    },
    {
      id: 'bill-3',
      title: 'Indane Piped Gas Pipeline',
      amount: 680,
      dueDays: 9,
      dueDate: 'Nov 02, 2026',
      autoPay: true,
    },
  ]);

  if (!isOpen) return null;

  const handleCreateDispute = (e) => {
    e.preventDefault();
    const crn = 'CRN-' + Math.floor(100000 + Math.random() * 900000);
    const newD = {
      id: 'DISP-' + Date.now().toString().slice(-4),
      crn,
      txnId: disputeTxnId || 'TXN-0DD99E24',
      reason: disputeReason,
      amount: 200,
      status: 'SUBMITTED',
      slaHours: '48h SLA guarantee',
    };
    setDisputes([newD, ...disputes]);
    setShowNewDispute(false);
    addNotification({
      title: 'Dispute Filed',
      message: `Ticket ${crn} registered with NPCI Banking Ombudsman.`,
      type: 'INFO',
    });
  };

  const toggleAutoPay = (id) => {
    setBillReminders((prev) =>
      prev.map((b) => (b.id === id ? { ...b, autoPay: !b.autoPay } : b))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/40">
              <FileQuestion className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Disputes, Refunds & Bill Reminders</h3>
              <p className="text-xs text-[#DDE5B6]">
                NPCI Ombudsman Tickets • Real-Time Refund Tracker • Smart Bill Schedules
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
            { id: 'disputes', label: '20. Payment Disputes & Tickets', icon: FileQuestion },
            { id: 'refunds', label: '21. Refund Tracking System', icon: RotateCcw },
            { id: 'bill_reminders', label: '38. Smart Bill Reminders', icon: Zap },
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
          {/* TAB 1: PAYMENT DISPUTES */}
          {activeTab === 'disputes' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-[#2B221B]">Active Grievances & Disputes</h4>
                  <p className="text-[11px] text-[#8C7464]">Direct integration with NPCI Unified Dispute & Issue Resolution (UDIR).</p>
                </div>
                <button
                  onClick={() => setShowNewDispute(!showNewDispute)}
                  className="px-3 py-1.5 rounded-xl bg-[#ADC178] text-[#2B221B] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Raise Dispute</span>
                </button>
              </div>

              {showNewDispute && (
                <form onSubmit={handleCreateDispute} className="p-4 rounded-2xl bg-white border border-[#ADC178] space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#6C584C] block mb-1">Select Transaction / ID</label>
                    <input
                      type="text"
                      value={disputeTxnId}
                      onChange={(e) => setDisputeTxnId(e.target.value)}
                      placeholder="TXN ID (e.g. TXN-9AA09FF0)"
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs focus:outline-none focus:border-[#ADC178]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6C584C] block mb-1">Grievance Category</label>
                    <select
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs bg-white focus:outline-none"
                    >
                      <option>Money debited but not received by merchant</option>
                      <option>Charged twice for the same transaction</option>
                      <option>Incorrect amount debited</option>
                      <option>Fraudulent or unrecognized charge</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-[#6C584C] text-[#F0EAD2] text-xs font-bold cursor-pointer"
                  >
                    Submit Formal Dispute
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {disputes.map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-2 shadow-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#2B221B]">{d.crn}</span>
                        <p className="text-[10px] text-[#8C7464]">Txn: {d.txnId}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#2B221B]">₹{d.amount}</span>
                    </div>
                    <p className="text-xs font-medium text-[#6C584C]">{d.reason}</p>
                    <div className="flex justify-between items-center pt-2 border-t border-[#E5DEC9] text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                        {d.status}
                      </span>
                      <span className="text-[#8C7464]">{d.slaHours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REFUND TRACKING */}
          {activeTab === 'refunds' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#2B221B]">Merchant Refunds Lifecycle</h4>

              <div className="space-y-4">
                {refunds.map((ref) => (
                  <div key={ref.id} className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-3 shadow-xs">
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="text-xs font-bold text-[#2B221B]">{ref.merchant}</h5>
                        <p className="text-[10px] text-[#8C7464]">Refund ID: {ref.id}</p>
                      </div>
                      <span className="text-sm font-mono font-bold text-[#4D6321]">
                        +₹{ref.amount}
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="grid grid-cols-4 gap-1 pt-1 text-center">
                      {ref.stages.map((st, i) => (
                        <div key={i} className="space-y-1">
                          <div
                            className={`w-4 h-4 rounded-full mx-auto flex items-center justify-center text-[9px] font-bold ${
                              st.done ? 'bg-[#ADC178] text-[#2B221B]' : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            {st.done ? '✓' : i + 1}
                          </div>
                          <span className="text-[10px] font-bold block text-[#2B221B] leading-tight">{st.name}</span>
                          <span className="text-[9px] text-[#8C7464] block">{st.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SMART BILL REMINDERS */}
          {activeTab === 'bill_reminders' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#2B221B]">Upcoming Due Bills & Auto-Pay</h4>

              <div className="space-y-3">
                {billReminders.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex justify-between items-center shadow-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-[#2B221B]">{b.title}</h5>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                          Due in {b.dueDays} days ({b.dueDate})
                        </span>
                      </div>
                      <span className="text-sm font-mono font-bold text-[#2B221B] mt-1 block">₹{b.amount}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-[#8C7464] block font-bold">Auto-Debit</span>
                        <button
                          onClick={() => toggleAutoPay(b.id)}
                          className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                            b.autoPay ? 'bg-[#ADC178]' : 'bg-stone-300'
                          }`}
                        >
                          <span
                            className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                              b.autoPay ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <button className="px-3 py-1.5 rounded-xl bg-[#6C584C] text-[#F0EAD2] text-xs font-bold cursor-pointer hover:bg-[#534339]">
                        Pay Now
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
