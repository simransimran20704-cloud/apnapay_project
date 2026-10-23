import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { customerApi } from '../../api/customer';
import { authApi } from '../../api/auth';
import {
  X,
  UserPlus,
  Smartphone,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Mail,
  User,
  Sparkles,
} from 'lucide-react';

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { setAuthDirect, loadProfile } = useAuth();

  // Multi-step: 1: Details, 2: OTP, 3: MPIN, 4: Done
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('');
  const [mpin, setMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [authToken, setAuthToken] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Step 1: Submit Details & Request OTP
  const handleStep1 = async (e) => {
    e.preventDefault();
    setError('');

    if (mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      try {
        await customerApi.register({ name, mobile, email });
      } catch (custErr) {
        console.warn('Customer register info:', custErr.message);
      }

      const otpRes = await authApi.sendOtp(mobile);
      if (otpRes.data?.otp) {
        setReceivedOtp(otpRes.data.otp);
      }

      setLoading(false);
      setStep(2);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Registration failed.');
    }
  };

  // Step 2: Verify OTP
  const handleStep2 = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length < 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.verifyOtp(mobile, otp);
      if (res.status === 'SUCCESS' && res.data?.token) {
        setAuthToken(res.data.token);
        setLoading(false);
        setStep(3);
      } else {
        throw new Error(res.message || 'Invalid OTP');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'OTP verification failed.');
    }
  };

  // Step 3: Set MPIN
  const handleStep3 = async (e) => {
    e.preventDefault();
    setError('');

    if (mpin.length < 4) {
      setError('MPIN must be 4 digits.');
      return;
    }
    if (mpin !== confirmMpin) {
      setError('MPIN and Confirm MPIN do not match.');
      return;
    }

    setLoading(true);
    try {
      await authApi.setMpin(mobile, mpin, confirmMpin);

      setAuthDirect({
        token: authToken,
        mobileNumber: mobile,
        tokenType: 'Bearer',
      });
      await loadProfile(mobile);

      setLoading(false);
      setStep(4);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Failed to set MPIN.');
    }
  };

  const handleFinish = () => {
    onClose();
  };

  const resetAndClose = () => {
    setStep(1);
    setName('');
    setMobile('');
    setEmail('');
    setOtp('');
    setReceivedOtp('');
    setMpin('');
    setConfirmMpin('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B221B]/60 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-md bg-[#FAF8F4] rounded-3xl shadow-2xl border border-[#E5DEC9] overflow-hidden">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white relative">
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center shadow-md">
              <UserPlus className="w-5 h-5 text-[#DDE5B6]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#F0EAD2]">Create ApnaPay Account</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">Step {step} of 3 • Instant Wallet Activation</p>
            </div>
          </div>

          {/* Stepper dots */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  step >= s ? 'bg-[#ADC178]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Personal Details */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#6C584C] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8C7464] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Simran Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-xs text-[#3D3028] focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6C584C] mb-1">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7464] font-mono font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-11 pr-3 py-2.5 rounded-xl border border-[#E5DEC9] bg-white font-mono text-sm text-[#3D3028] focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6C584C] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C7464] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-xs text-[#3D3028] focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] disabled:opacity-50 text-[#2B221B] font-black text-sm shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#2B221B]/30 border-t-[#2B221B] rounded-full animate-spin" />
                  Generating OTP...
                </span>
              ) : (
                <>
                  <span>Send OTP Verification</span>
                  <ArrowRight className="w-4 h-4 text-[#2B221B]" />
                </>
              )}
            </button>

            <div className="pt-2 text-center text-xs text-[#8C7464]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-bold text-[#A98467] hover:underline cursor-pointer"
              >
                Log In
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleStep2} className="p-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#F0EAD2]/50 border border-[#E5DEC9] text-center">
              <p className="text-xs text-[#8C7464] font-medium">OTP sent to mobile number</p>
              <p className="text-sm font-bold text-[#6C584C] font-mono mt-0.5">+91 {mobile}</p>
            </div>

            {receivedOtp && (
              <div className="p-3 rounded-xl bg-[#DDE5B6]/50 border border-[#ADC178]/40 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[#6C584C] font-bold">OTP Received in API Response:</p>
                  <p className="text-sm font-mono font-black text-[#2B221B]">{receivedOtp}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOtp(receivedOtp)}
                  className="px-3 py-1 rounded-lg bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#6C584C] uppercase tracking-wider text-center mb-2">
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                maxLength={6}
                autoFocus
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-48 mx-auto block text-center py-2.5 text-2xl font-mono tracking-widest rounded-xl border-2 border-[#A98467]/40 bg-white text-[#3D3028] focus:border-[#ADC178] focus:outline-none"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-[#E5DEC9] bg-white text-[#6C584C] hover:bg-[#F0EAD2]/50 text-xs font-bold transition cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 py-3 rounded-xl bg-[#ADC178] hover:bg-[#9CB067] disabled:opacity-50 text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                {loading ? 'Verifying OTP...' : 'Verify & Continue'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: MPIN Setup */}
        {step === 3 && (
          <form onSubmit={handleStep3} className="p-6 space-y-4">
            <div className="text-center mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#DDE5B6]/50 text-[#6C584C] flex items-center justify-center mx-auto mb-2 border border-[#ADC178]/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#6C584C]">Set Security MPIN</h4>
              <p className="text-xs text-[#8C7464]">
                Create a 4-digit PIN for logging in and approving money transfers
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6C584C] mb-1">
                Enter 4-Digit MPIN
              </label>
              <input
                type="password"
                maxLength={4}
                autoFocus
                placeholder="••••"
                value={mpin}
                onChange={(e) => setMpin(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center py-2 text-xl font-mono tracking-widest rounded-xl border border-[#E5DEC9] bg-white text-[#3D3028] focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6C584C] mb-1">
                Confirm 4-Digit MPIN
              </label>
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                value={confirmMpin}
                onChange={(e) => setConfirmMpin(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center py-2 text-xl font-mono tracking-widest rounded-xl border border-[#E5DEC9] bg-white text-[#3D3028] focus:border-[#ADC178] focus:ring-2 focus:ring-[#ADC178]/25 focus:outline-none transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] disabled:opacity-50 text-[#2B221B] font-black text-sm shadow-md shadow-[#ADC178]/30 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {loading ? 'Activating MPIN...' : 'Complete Registration'}
            </button>
          </form>
        )}

        {/* STEP 4: Success */}
        {step === 4 && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center mx-auto shadow-xl shadow-[#ADC178]/25 animate-in zoom-in-75">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-[#6C584C]">Wallet Activated!</h4>
            <p className="text-xs text-[#8C7464] max-w-xs mx-auto">
              Your ApnaPay customer profile and wallet have been set up successfully.
            </p>
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] font-black text-sm shadow-md shadow-[#ADC178]/30 transition cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
