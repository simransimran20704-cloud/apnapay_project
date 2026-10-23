import React, { useState } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  Shield,
  Fingerprint,
  Sliders,
  AlertTriangle,
  Lock,
  Check,
} from 'lucide-react';

export const SecurityModal = ({ isOpen, onClose }) => {
  const { addNotification } = useNotifications();

  const [dailyLimit, setDailyLimit] = useState(25000);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [isFrozen, setIsFrozen] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    addNotification({
      title: 'Security Settings Updated',
      desc: `Daily limit set to ₹${dailyLimit.toLocaleString('en-IN')}. Biometric: ${
        biometricEnabled ? 'ON' : 'OFF'
      }.`,
      type: 'INFO',
    });
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleToggleFreeze = () => {
    const nextState = !isFrozen;
    setIsFrozen(nextState);
    addNotification({
      title: nextState ? '🚨 Wallet Frozen!' : '✅ Wallet Unfrozen',
      desc: nextState
        ? 'All outgoing payments are temporarily blocked for your protection.'
        : 'Your wallet has been reactivated for transactions.',
      type: 'ALERT',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-md bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Security & Limits</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Fraud Protection & Authorization</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Daily Limit Slider */}
          <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-2 shadow-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#6C584C] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#A98467]" />
                Daily Transfer Limit
              </span>
              <span className="font-mono font-black text-[#3D3028] text-sm">
                ₹{dailyLimit.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(Number(e.target.value))}
              className="w-full accent-[#ADC178] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8C7464] font-medium">
              <span>Min: ₹5,000</span>
              <span>Max: ₹1,00,000</span>
            </div>
          </div>

          {/* Biometric Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F0EAD2] text-[#6C584C] flex items-center justify-center">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#3D3028]">Biometric Authentication</p>
                <p className="text-[11px] text-[#8C7464]">Fast login with Fingerprint or Face ID</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                biometricEnabled ? 'bg-[#ADC178]' : 'bg-stone-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 shadow-xs ${
                  biometricEnabled ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Emergency Freeze Wallet */}
          <div
            className={`p-4 rounded-2xl border transition shadow-xs ${
              isFrozen ? 'bg-rose-50 border-rose-300' : 'bg-white border-[#E5DEC9]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle
                  className={`w-5 h-5 ${isFrozen ? 'text-rose-600' : 'text-[#A98467]'}`}
                />
                <div>
                  <p
                    className={`text-xs font-bold ${
                      isFrozen ? 'text-rose-900' : 'text-[#3D3028]'
                    }`}
                  >
                    Emergency Freeze Wallet
                  </p>
                  <p className="text-[11px] text-[#8C7464]">
                    {isFrozen
                      ? 'Wallet is currently FROZEN. Tap to unfreeze.'
                      : 'Instantly block all debits if phone is lost'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleFreeze}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isFrozen
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                    : 'bg-[#F0EAD2] hover:bg-[#E5DEC9] text-[#6C584C] border border-[#E5DEC9]'
                }`}
              >
                {isFrozen ? 'Unfreeze' : 'Freeze'}
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-[#2B221B]" />
                <span>Saved Changes!</span>
              </>
            ) : (
              <span>Save Security Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
