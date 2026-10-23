import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  Lock,
  QrCode,
  Smartphone,
  Eye,
  EyeOff,
  KeyRound,
  History,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  RefreshCw,
  LogOut,
  MapPin,
  Clock,
} from 'lucide-react';

export const SecurityPrivacyHubModal = ({ isOpen, onClose }) => {
  const { profile, auth } = useAuth();
  const { incognitoMode, toggleIncognito } = useApp();
  const [activeTab, setActiveTab] = useState('fraud_radar'); // 'fraud_radar' | 'qr_trust' | 'privacy' | 'sessions' | 'recovery'

  // 6. QR Trust Preview State
  const [qrVpaInput, setQrVpaInput] = useState('');
  const [qrTrustResult, setQrTrustResult] = useState(null);
  const [isVerifyingQr, setIsVerifyingQr] = useState(false);

  // 10. Privacy Settings State
  const [maskUpiId, setMaskUpiId] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(false);
  const [adTracking, setAdTracking] = useState(false);

  // 26. Active Sessions State
  const [sessions, setSessions] = useState([
    {
      id: 'sess-1',
      device: 'Windows 11 (Chrome 122)',
      ip: '103.211.54.12',
      location: 'Jaipur, Rajasthan, India',
      isCurrent: true,
      lastActive: 'Active Now',
    },
    {
      id: 'sess-2',
      device: 'iPhone 15 Pro (iOS 17.4)',
      ip: '49.36.128.90',
      location: 'Jaipur, Rajasthan, India',
      isCurrent: false,
      lastActive: '3 hours ago',
    },
    {
      id: 'sess-3',
      device: 'iPad Air 5th Gen (Safari)',
      ip: '115.240.89.14',
      location: 'New Delhi, India',
      isCurrent: false,
      lastActive: '2 days ago',
    },
  ]);

  // 49. Account Recovery State
  const [recoveryContact, setRecoveryContact] = useState('+91 9811223344');
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const seedPhrase = 'coral timber ember olive cedar hazel summit gentle pebble horizon brass velvet';

  if (!isOpen) return null;

  const handleVerifyQr = () => {
    if (!qrVpaInput.trim()) return;
    setIsVerifyingQr(true);
    setTimeout(() => {
      const vpa = qrVpaInput.toLowerCase();
      const isSuspicious = vpa.includes('lottery') || vpa.includes('claim') || vpa.includes('free');
      setQrTrustResult({
        vpa: qrVpaInput,
        merchantName: isSuspicious ? 'UNVERIFIED ENTITY' : 'Blue Tokai Coffee Roasters',
        trustScore: isSuspicious ? 18 : 98,
        status: isSuspicious ? 'HIGH_RISK_SUSPICIOUS' : 'VERIFIED_MERCHANT',
        reportsCount: isSuspicious ? 14 : 0,
        bankSwitch: isSuspicious ? 'Unknown Switch' : 'HDFC Bank Switch (NPCI Verified)',
      });
      setIsVerifyingQr(false);
    }, 400);
  };

  const handleRevokeSession = (sessionId) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Security, Privacy & Fraud Radar</h3>
              <p className="text-xs text-[#DDE5B6]">
                QR Trust • Session Management • Privacy Controls • Account Recovery
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
            { id: 'fraud_radar', label: '11. Fraud Radar & Score', icon: ShieldAlert },
            { id: 'qr_trust', label: '6. QR Trust Preview', icon: QrCode },
            { id: 'privacy', label: '10. Privacy Controls', icon: Lock },
            { id: 'sessions', label: '26 & 27. Devices & Sessions', icon: Smartphone },
            { id: 'recovery', label: '49. Account Recovery', icon: KeyRound },
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
          {/* TAB 1: SMART FRAUD RADAR & RISK SCORE */}
          {activeTab === 'fraud_radar' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2B221B]">Account Risk Health Score</h4>
                  <p className="text-[11px] text-[#8C7464]">Calculated across velocity, IP stability, and biometric patterns.</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-[#4D6321]">4 / 100</span>
                  <span className="block text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                    Ultra Safe
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { title: 'Impossible Travel Velocity Check', status: 'PASSED', desc: 'No logins detected from geographically conflicting locations.' },
                  { title: 'Repeated Failed Payment Protection', status: 'ACTIVE', desc: 'Auto-rate limits payments after 3 consecutive failures.' },
                  { title: 'Device Fingerprint Consistency', status: 'VERIFIED', desc: 'Recognized browser and OS signature matches known whitelist.' },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-white border border-[#E5DEC9] flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-[#2B221B]">{item.title}</h5>
                      <p className="text-[10px] text-[#8C7464]">{item.desc}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#DDE5B6] text-[#364216] font-bold">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: QR TRUST PREVIEW */}
          {activeTab === 'qr_trust' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-3">
                <label className="text-xs font-bold text-[#6C584C] block">
                  Verify Merchant UPI QR Before Paying:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={qrVpaInput}
                    onChange={(e) => setQrVpaInput(e.target.value)}
                    placeholder="Enter UPI VPA or QR string (e.g. bluetokai@hdfcbank)"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#E5DEC9] text-xs focus:outline-none focus:border-[#ADC178]"
                  />
                  <button
                    onClick={handleVerifyQr}
                    disabled={isVerifyingQr || !qrVpaInput.trim()}
                    className="px-4 py-2 rounded-xl bg-[#6C584C] text-[#F0EAD2] text-xs font-bold cursor-pointer disabled:opacity-50"
                  >
                    {isVerifyingQr ? 'Inspecting...' : 'Check Trust'}
                  </button>
                </div>

                <div className="flex gap-2 text-[10px] text-[#8C7464]">
                  <span>Try:</span>
                  <button
                    onClick={() => {
                      setQrVpaInput('bluetokai@hdfcbank');
                      setIsVerifyingQr(true);
                      setTimeout(handleVerifyQr, 200);
                    }}
                    className="underline cursor-pointer"
                  >
                    bluetokai@hdfcbank (Legit)
                  </button>
                  <button
                    onClick={() => {
                      setQrVpaInput('lottery-claim-prize@ybl');
                      setIsVerifyingQr(true);
                      setTimeout(handleVerifyQr, 200);
                    }}
                    className="underline text-rose-600 cursor-pointer"
                  >
                    lottery-claim-prize@ybl (Scam)
                  </button>
                </div>
              </div>

              {qrTrustResult && (
                <div
                  className={`p-4 rounded-2xl border shadow-xs animate-in zoom-in-95 space-y-3 ${
                    qrTrustResult.status === 'VERIFIED_MERCHANT'
                      ? 'bg-emerald-50/70 border-emerald-200'
                      : 'bg-rose-50/70 border-rose-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-extrabold text-[#2B221B]">
                        {qrTrustResult.merchantName}
                      </h4>
                      <p className="text-[11px] font-mono text-[#6C584C]">{qrTrustResult.vpa}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black font-mono">
                        {qrTrustResult.trustScore}/100 Trust
                      </span>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <p className="font-semibold text-[#2B221B]">• Switch: {qrTrustResult.bankSwitch}</p>
                    <p className="font-semibold text-[#2B221B]">• Community Fraud Reports: {qrTrustResult.reportsCount}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRIVACY CONTROL CENTER */}
          {activeTab === 'privacy' && (
            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-[#2B221B]">Incognito Balance Mode</h5>
                  <p className="text-[10px] text-[#8C7464]">Blurs wallet balances in public places to protect privacy.</p>
                </div>
                <button
                  onClick={toggleIncognito}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    incognitoMode ? 'bg-[#ADC178]' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      incognitoMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E5DEC9]">
                <div>
                  <h5 className="text-xs font-bold text-[#2B221B]">UPI ID Phone Number Masking</h5>
                  <p className="text-[10px] text-[#8C7464]">Hides your mobile number and uses alias: `simran.priv@apnapay`.</p>
                </div>
                <button
                  onClick={() => setMaskUpiId(!maskUpiId)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    maskUpiId ? 'bg-[#ADC178]' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      maskUpiId ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E5DEC9]">
                <div>
                  <h5 className="text-xs font-bold text-[#2B221B]">Ad Personalization & Merchant Telemetry</h5>
                  <p className="text-[10px] text-[#8C7464]">Prevents sharing anonymized telemetry with partner brands.</p>
                </div>
                <button
                  onClick={() => setAdTracking(!adTracking)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    adTracking ? 'bg-[#ADC178]' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      adTracking ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SESSIONS & DEVICES */}
          {activeTab === 'sessions' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#2B221B]">Active Signed-In Devices</h4>
                  <p className="text-[11px] text-[#8C7464]">Manage devices with authorized access to your ApnaPay account.</p>
                </div>
                <button
                  onClick={() => setSessions(sessions.filter((s) => s.isCurrent))}
                  className="px-3 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 cursor-pointer"
                >
                  Terminate All Others
                </button>
              </div>

              <div className="space-y-2">
                {sessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#E5DEC9] flex items-center justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#2B221B]">{sess.device}</span>
                        {sess.isCurrent && (
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#DDE5B6] text-[#364216] font-bold">
                            Current Device
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[#8C7464] mt-0.5">
                        {sess.ip} • {sess.location} • {sess.lastActive}
                      </p>
                    </div>

                    {!sess.isCurrent && (
                      <button
                        onClick={() => handleRevokeSession(sess.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 cursor-pointer"
                        title="Revoke session"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ACCOUNT RECOVERY */}
          {activeTab === 'recovery' && (
            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs space-y-4">
              <div>
                <label className="text-xs font-bold text-[#6C584C] block mb-1">
                  Trusted Emergency Contact for Recovery
                </label>
                <input
                  type="text"
                  value={recoveryContact}
                  onChange={(e) => setRecoveryContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E5DEC9] text-xs focus:outline-none focus:border-[#ADC178]"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#F0EAD2]/50 border border-[#E5DEC9] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2B221B]">12-Word Cryptographic Seed Backup</span>
                  <button
                    onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                    className="text-xs text-[#6C584C] font-bold underline cursor-pointer"
                  >
                    {showSeedPhrase ? 'Hide Phrase' : 'View Seed Phrase'}
                  </button>
                </div>
                {showSeedPhrase && (
                  <p className="text-xs font-mono p-3 bg-white rounded-xl border border-[#E5DEC9] text-[#2B221B] break-words select-all">
                    {seedPhrase}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
