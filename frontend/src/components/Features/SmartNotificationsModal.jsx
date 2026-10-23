import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  CreditCard,
  Sparkles,
  Info,
  Trash2,
} from 'lucide-react';

export const SmartNotificationsModal = ({ isOpen, onClose, onOpenTopUp }) => {
  const { balance, transactions } = useWallet();
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'PAYMENTS' | 'ALERTS'

  // Synthesize smart automated notifications based on live wallet balance & transaction state
  const isBalanceLow = balance < 1000;

  const [notifications, setNotifications] = useState([
    ...(isBalanceLow
      ? [
          {
            id: 'notif-low-balance',
            type: 'LOW_BALANCE',
            title: 'Low Balance Warning',
            message: `Your current balance is ₹${balance.toFixed(2)}, which is below your safety threshold of ₹1,000. Add funds to prevent auto-debit failures.`,
            time: 'Just now',
            actionLabel: 'Add Funds Now',
            action: onOpenTopUp,
          },
        ]
      : []),
    {
      id: 'notif-1',
      type: 'PAYMENT_SUCCESS',
      title: 'Payment Successful',
      message: '₹450 paid to Rahul Verma via ApnaPay UPI.',
      time: '15 mins ago',
    },
    {
      id: 'notif-2',
      type: 'SECURITY_ALERT',
      title: 'Security Verified',
      message: 'Biometric authorization enabled successfully for instant approvals.',
      time: '1 hour ago',
    },
    {
      id: 'notif-3',
      type: 'RECENT_ACTIVITY',
      title: 'Monthly Statement Generated',
      message: 'Your automated October spending report is ready for download in CSV.',
      time: 'Yesterday',
    },
    {
      id: 'notif-4',
      type: 'ALERT_AUTOPAY',
      title: 'Upcoming Autopay Reminder',
      message: 'Netflix subscription mandate of ₹649 will be auto-debited in 5 days.',
      time: '2 days ago',
    },
  ]);

  if (!isOpen) return null;

  const filtered =
    filter === 'ALL'
      ? notifications
      : filter === 'PAYMENTS'
      ? notifications.filter((n) => n.type.includes('PAYMENT'))
      : filter === 'ALERTS'
      ? notifications.filter((n) => n.type.includes('ALERT') || n.type === 'LOW_BALANCE')
      : notifications;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#DDE5B6]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Smart Notifications</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Payments, security alerts & balance monitoring</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] flex items-center justify-between shrink-0">
          <div className="flex bg-white p-1 rounded-xl text-xs font-bold border border-[#E5DEC9]">
            {['ALL', 'PAYMENTS', 'ALERTS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  filter === tab
                    ? 'bg-[#ADC178] text-[#2B221B] shadow-xs'
                    : 'text-[#6C584C] hover:text-[#3D3028]'
                }`}
              >
                {tab === 'ALL' ? 'All' : tab === 'PAYMENTS' ? 'Payments' : 'Alerts'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setNotifications([])}
            className="text-xs font-bold text-[#A98467] hover:text-rose-600 transition flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>

        {/* List of Notifications */}
        <div className="p-5 space-y-3 overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-[#8C7464]">
              <Bell className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#6C584C]" />
              <p className="text-sm font-bold">No notifications right now</p>
              <p className="text-xs text-[#8C7464] mt-0.5">All updates and alerts will appear here</p>
            </div>
          ) : (
            filtered.map((item) => {
              const isLow = item.type === 'LOW_BALANCE';
              const isSuccess = item.type === 'PAYMENT_SUCCESS';
              const isSecurity = item.type === 'SECURITY_ALERT';

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isLow
                      ? 'bg-[#F0EAD2]/70 border-[#DDE5B6] shadow-xs'
                      : 'bg-white border-[#E5DEC9] hover:border-[#ADC178]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isLow
                          ? 'bg-[#A98467] text-white'
                          : isSuccess
                          ? 'bg-[#ADC178] text-[#2B221B]'
                          : isSecurity
                          ? 'bg-[#6C584C] text-[#F0EAD2]'
                          : 'bg-[#DDE5B6] text-[#2B221B]'
                      }`}
                    >
                      {isLow ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : isSuccess ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <ShieldAlert className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-bold text-[#3D3028]">{item.title}</h4>
                        <span className="text-[10px] text-[#8C7464] font-medium">{item.time}</span>
                      </div>
                      <p className="text-xs text-[#8C7464] leading-relaxed">{item.message}</p>

                      {item.action && (
                        <button
                          onClick={() => {
                            onClose();
                            item.action();
                          }}
                          className="mt-2.5 px-3.5 py-1.5 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#2B221B]" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
