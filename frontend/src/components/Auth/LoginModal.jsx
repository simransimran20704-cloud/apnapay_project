import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Lock,
  Smartphone,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { loginUser } = useAuth();

  const [mobileNumber, setMobileNumber] = useState('');
  const [mpin, setMpin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mobileNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (mpin.length < 4) {
      setError('Please enter your 4-digit MPIN.');
      return;
    }

    setLoading(true);
    try {
      await loginUser(mobileNumber, mpin);
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Login failed.');
    }
  };

  const handleDemoLogin = async () => {
    setMobileNumber('9876543210');
    setMpin('1234');
    setError('');
    setLoading(true);
    try {
      await loginUser('9876543210', '1234');
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-sm bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-6 bg-gradient-to-r from-[#6C584C] to-[#534339] border-b border-[#A98467]/30 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center mb-3 shadow-md">
            <Lock className="w-6 h-6 text-[#DDE5B6]" />
          </div>
          <h3 className="text-xl font-black text-[#F0EAD2]">Welcome Back</h3>
          <p className="text-xs text-[#DDE5B6] mt-0.5 font-medium">Log in to your ApnaPay account</p>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-[#6C584C] mb-1.5">
              Registered Mobile Number
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C7464] font-mono font-bold">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-12 pr-3 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-[#3D3028] font-mono text-sm focus:outline-none focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 transition"
                required
              />
            </div>
          </div>

          {/* MPIN */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-[#6C584C]">Security MPIN</label>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[11px] text-[#A98467] font-semibold hover:underline cursor-pointer"
              >
                Forgot MPIN?
              </button>
            </div>
            <input
              type="password"
              maxLength={4}
              placeholder="••••"
              value={mpin}
              onChange={(e) => setMpin(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-[#3D3028] font-mono text-center text-lg tracking-widest focus:outline-none focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] disabled:opacity-50 text-[#2B221B] font-black text-sm shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#2B221B]/30 border-t-[#2B221B] rounded-full animate-spin" />
                <span>Authenticating...</span>
              </span>
            ) : (
              <>
                <span>Secure Sign In</span>
                <ArrowRight className="w-4 h-4 text-[#2B221B]" />
              </>
            )}
          </button>

          {/* Quick Demo Login Pill */}
          <div className="pt-1 text-center">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl border border-[#E5DEC9] bg-[#F0EAD2]/80 hover:bg-[#F0EAD2] text-[#6C584C] text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A98467]" />
              <span>Quick 1-Click Demo Login (9876543210 / 1234)</span>
            </button>
          </div>

          {/* Switch to Register */}
          <div className="text-center pt-2">
            <p className="text-xs text-[#8C7464] font-medium">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-bold text-[#A98467] hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
