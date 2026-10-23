import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  X,
  ShieldCheck,
  Upload,
  CheckCircle2,
  FileText,
  AlertCircle,
  BadgeCheck,
} from 'lucide-react';

export const KycModal = ({ isOpen, onClose }) => {
  const { profile, loadProfile, auth } = useAuth();
  const { addNotification } = useNotifications();

  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [fullName, setFullName] = useState(profile?.name || '');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (pan.length !== 10) {
      setError('Please enter a valid 10-character PAN card number (e.g. ABCDE1234F).');
      return;
    }
    if (aadhaar.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      addNotification({
        title: 'KYC Verification Approved! 🛡️',
        desc: 'Your PAN & Aadhaar documents have been verified. Unlimited wallet transactions unlocked.',
        type: 'INFO',
      });

      // Reload profile
      if (auth?.mobileNumber) {
        loadProfile(auth.mobileNumber);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/60 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Complete KYC Verification</h3>
              <p className="text-xs text-emerald-200">RBI Compliant • Unlock ₹2,00,000 Limit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/25 animate-in zoom-in-75">
              <BadgeCheck className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">KYC Verified Successfully!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your identity has been authenticated. Full wallet benefits, bank transfers, and higher limits are now active.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name (As per PAN)
              </label>
              <input
                type="text"
                placeholder="e.g. Simran Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                PAN Card Number
              </label>
              <input
                type="text"
                maxLength={10}
                placeholder="ABCDE1234F"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs uppercase focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Aadhaar Card Number
              </label>
              <input
                type="text"
                maxLength={12}
                placeholder="12-digit Aadhaar number"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            {/* Document Upload Simulation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Upload Identity Document (Image / PDF)
              </label>
              <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                <Upload className="w-5 h-5 text-slate-400 mb-1" />
                <span className="text-xs font-medium text-slate-600">
                  {fileName || 'Click to upload PAN / Aadhaar document'}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, PDF up to 5MB</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating with NSDL / UIDAI...
                </span>
              ) : (
                <span>Submit & Verify KYC</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
