import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useWallet } from '../../context/WalletContext';
import { useNotifications } from '../../context/NotificationContext';
import { playCashbackChime } from '../../utils/audio';
import {
  X,
  Gift,
  Sparkles,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

export const ScratchCardModal = ({ isOpen, onClose, initialAmount = null }) => {
  const { topUpWallet } = useWallet();
  const { addNotification } = useNotifications();

  // Generate random cashback amount between ₹15 and ₹75 if not specified
  const [cashback] = useState(
    initialAmount || Math.floor(15 + Math.random() * 60)
  );
  const [scratched, setScratched] = useState(false);
  const [credited, setCredited] = useState(false);

  if (!isOpen) return null;

  const handleScratch = async () => {
    if (scratched) return;
    setScratched(true);

    // Play chime sound
    playCashbackChime();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    // Credit cashback to wallet balance!
    try {
      await topUpWallet({
        amount: cashback,
        source: 'ApnaPay Cashback Reward',
      });
      setCredited(true);
      addNotification({
        title: `🎉 Cashback Won: ₹${cashback}`,
        desc: `Congratulations! ₹${cashback} has been directly credited to your ApnaPay wallet.`,
        type: 'REWARD',
      });
    } catch (err) {
      console.warn('Reward credit error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-sm bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/5 text-[#8C7464] hover:text-[#6C584C] transition cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 pt-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#A98467] text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-[#A98467]" />
            <span>ApnaPay Rewards Club</span>
          </div>

          <h3 className="text-xl font-black text-[#6C584C] tracking-tight">
            {scratched ? '🎉 Congratulations!' : 'You Won a Scratch Card!'}
          </h3>
          <p className="text-xs text-[#8C7464]">
            {scratched
              ? 'Cashback has been credited directly to your wallet.'
              : 'Tap or scratch to reveal your assured cashback reward!'}
          </p>

          {/* Interactive Scratch Area Card */}
          <div
            onClick={handleScratch}
            className={`w-64 h-64 mx-auto rounded-3xl relative overflow-hidden transition-all duration-500 flex flex-col items-center justify-center p-6 border-2 cursor-pointer shadow-md ${
              scratched
                ? 'bg-gradient-to-br from-[#DDE5B6] via-[#ADC178] to-[#9CB067] border-[#ADC178] text-[#2B221B] shadow-xl'
                : 'bg-gradient-to-tr from-[#6C584C] via-[#534339] to-[#3D3028] border-[#A98467]/40 text-[#F0EAD2] hover:scale-102 shadow-xl'
            }`}
          >
            {!scratched ? (
              <div className="space-y-3 text-center animate-pulse">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto shadow-inner">
                  <Gift className="w-9 h-9 text-[#DDE5B6]" />
                </div>
                <div>
                  <p className="text-sm font-black tracking-wide text-white">TAP TO SCRATCH</p>
                  <p className="text-[11px] text-[#DDE5B6] mt-1 font-medium">Assured Cashback ₹15 - ₹75</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-center animate-in zoom-in-50 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-[#2B221B]" />
                </div>
                <p className="text-xs font-black uppercase tracking-wider text-[#2B221B]">Cashback</p>
                <p className="text-5xl font-black font-mono text-[#2B221B] tracking-tight">
                  ₹{cashback}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] font-black text-[#2B221B] bg-white/40 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2B221B]" />
                  <span>Credited to Wallet</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer action */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-[#F0EAD2] hover:bg-[#E5DEC9] text-[#6C584C] text-xs font-bold border border-[#E5DEC9] transition cursor-pointer"
            >
              {scratched ? 'Claim & Done' : 'Scratch Later'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
