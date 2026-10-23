import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useWallet } from '../../context/WalletContext';
import { playPaymentSuccessSound } from '../../utils/audio';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Gift,
  ArrowUpRight,
  HandCoins,
  Check,
} from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose, onOpenScratchCard }) => {
  const { notifications, markAllAsRead, clearNotification, updateNotificationStatus } =
    useNotifications();
  const { sendMoney } = useWallet();

  if (!isOpen) return null;

  const handleApproveRequest = async (notif) => {
    try {
      await sendMoney({
        toMobile: notif.fromMobile || '9811223344',
        amount: notif.amount || 100,
        remarks: `Approved request: ${notif.title}`,
      });
      playPaymentSuccessSound();
      updateNotificationStatus(notif.id, 'APPROVED');
    } catch (err) {
      alert(err.message || 'Payment approval failed');
    }
  };

  const handleDeclineRequest = (id) => {
    updateNotificationStatus(id, 'DECLINED');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200 select-none">
      <div
        className="absolute inset-0 bg-[#2B221B]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-[#FAF8F4] shadow-2xl flex flex-col border-l border-[#E5DEC9]">
          {/* Drawer Header (Espresso Brown #6C584C) */}
          <div className="p-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#DDE5B6]" />
              <h3 className="text-sm font-bold text-[#F0EAD2]">Notifications & Alerts</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="text-[11px] text-[#DDE5B6] hover:text-white underline cursor-pointer"
              >
                Mark read
              </button>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List of Alerts */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E5DEC9]/40 p-4 space-y-2.5">
            {notifications.length === 0 ? (
              <div className="py-16 text-center text-[#8C7464]">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#6C584C]" />
                <p className="text-xs font-bold">No new notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl border transition shadow-xs ${
                    n.read ? 'bg-white border-[#E5DEC9]' : 'bg-[#F0EAD2]/50 border-[#DDE5B6]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {n.type === 'REQUEST' ? (
                        <HandCoins className="w-4 h-4 text-[#A98467] shrink-0" />
                      ) : n.type === 'REWARD' ? (
                        <Gift className="w-4 h-4 text-[#A98467] shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#556B2F] shrink-0" />
                      )}
                      <p className="text-xs font-bold text-[#3D3028] leading-tight">{n.title}</p>
                    </div>
                    <button
                      onClick={() => clearNotification(n.id)}
                      className="text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
                    >
                      ×
                    </button>
                  </div>

                  <p className="text-xs text-[#8C7464] mt-1.5 leading-snug">{n.desc}</p>

                  {/* Actions for REQUEST type */}
                  {n.type === 'REQUEST' && (
                    <div className="mt-3 pt-2 border-t border-[#E5DEC9] flex items-center justify-between gap-2">
                      {n.status === 'APPROVED' ? (
                        <span className="text-[11px] font-bold text-[#556B2F] flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Approved & Paid
                        </span>
                      ) : n.status === 'DECLINED' ? (
                        <span className="text-[11px] text-stone-400 font-medium">Declined</span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleDeclineRequest(n.id)}
                            className="px-3 py-1 rounded-lg border border-[#E5DEC9] text-[11px] font-bold text-[#6C584C] hover:bg-[#F0EAD2]/40 transition cursor-pointer"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => handleApproveRequest(n)}
                            className="px-3.5 py-1 rounded-lg bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] text-[11px] font-black shadow-xs transition cursor-pointer"
                          >
                            Pay ₹{n.amount}
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Action for REWARD type */}
                  {n.type === 'REWARD' && (
                    <div className="mt-2.5">
                      <button
                        onClick={() => {
                          onClose();
                          if (onOpenScratchCard) onOpenScratchCard();
                        }}
                        className="w-full py-1.5 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] text-xs font-black shadow-xs transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Gift className="w-3.5 h-3.5 text-[#2B221B]" />
                        <span>Open Scratch Card Now</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
