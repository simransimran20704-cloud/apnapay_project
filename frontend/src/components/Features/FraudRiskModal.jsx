import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  ShieldCheck,
  Eye,
  Info,
  Activity,
  Smartphone,
  Globe,
} from 'lucide-react';

export const FraudRiskModal = ({ isOpen, onClose }) => {
  const [walletLocked, setWalletLocked] = useState(false);
  const [riskScore, setRiskScore] = useState(96); // 96/100 = Safe
  const [resolvedAlerts, setResolvedAlerts] = useState({});

  if (!isOpen) return null;

  // Real-time simulated anomalies & guardrails
  const riskIncidents = [
    {
      id: 'alert-1',
      severity: 'HIGH',
      title: '3 Consecutive Failed Passcode Attempts',
      time: '12 mins ago',
      ruleTriggered: 'AUTH_VELOCITY_LIMIT',
      reason:
        'Multiple invalid MPIN entries were detected within 60 seconds from an unverified IP network.',
      device: 'Samsung Galaxy S22 • Android 14',
      ip: '103.21.244.12 (New Delhi)',
      actionRequired: 'Verify device credentials or temporarily freeze outgoing UPI transfers.',
    },
    {
      id: 'alert-2',
      severity: 'MEDIUM',
      title: 'Unusual Out-of-Hours Transfer Pattern',
      time: 'Yesterday, 03:42 AM',
      ruleTriggered: 'TIME_ANOMALY_HEURISTIC',
      reason:
        'High-value transfer of ₹8,500 initiated during non-typical active hours for this account.',
      device: 'Chrome Windows 11',
      ip: '49.36.128.89 (Airtel Broadband)',
      actionRequired: 'Mark as recognized transaction to update user baseline.',
    },
    {
      id: 'alert-3',
      severity: 'LOW',
      title: 'New Beneficiary Added',
      time: '2 days ago',
      ruleTriggered: 'BENEFICIARY_COOLING_PERIOD',
      reason:
        'Payment to a newly added bank account (••4321) successfully cleared with standard ₹25,000 cooling limit.',
      device: 'Mobile App',
      ip: '103.21.244.12',
      actionRequired: 'No action needed. Standard safety cooling period active.',
    },
  ];

  const handleResolve = (id) => {
    setResolvedAlerts((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header (Espresso Brown #6C584C) */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] to-[#534339] border-b border-[#A98467]/30 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ADC178]/25 border border-[#ADC178]/30 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-[#DDE5B6]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Fraud & Risk Monitoring Engine</h3>
              <p className="text-xs text-[#DDE5B6] font-medium">AI-driven pattern detection & explainable risk defense</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Risk Score & Protection Bar */}
        <div className="p-6 bg-[#F0EAD2]/50 border-b border-[#E5DEC9] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            {/* Circular Risk Score */}
            <div className="relative w-16 h-16 rounded-full bg-white border-4 border-[#ADC178] flex items-center justify-center shadow-xs">
              <div className="text-center">
                <span className="text-lg font-black text-[#556B2F]">{riskScore}</span>
                <span className="block text-[8px] uppercase font-bold text-[#8C7464]">Score</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#3D3028]">Wallet Health: Safe & Monitored</h4>
                <span className="px-2 py-0.5 rounded-full bg-[#DDE5B6] text-[#2B221B] text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-[#8C7464] mt-0.5">
                Machine learning model actively scoring outgoing UPI transfers in real-time.
              </p>
            </div>
          </div>

          {/* Quick Lock / Freeze Action */}
          <button
            onClick={() => setWalletLocked(!walletLocked)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs ${
              walletLocked
                ? 'bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B]'
                : 'bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700'
            }`}
          >
            {walletLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{walletLocked ? 'Unlock Wallet' : 'Emergency Freeze Wallet'}</span>
          </button>
        </div>

        {/* Incident Alerts List */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6C584C]">
              Pattern Anomalies & Triggered Guardrails
            </h4>
            <span className="text-xs text-[#6C584C] font-semibold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#A98467]" />
              <span>Auto-refreshing</span>
            </span>
          </div>

          <div className="space-y-3.5">
            {riskIncidents.map((inc) => {
              const isResolved = resolvedAlerts[inc.id];
              const isHigh = inc.severity === 'HIGH';
              const isMed = inc.severity === 'MEDIUM';

              return (
                <div
                  key={inc.id}
                  className={`p-4 rounded-2xl border transition-all shadow-xs ${
                    isResolved
                      ? 'bg-white/60 border-[#E5DEC9] opacity-60'
                      : isHigh
                      ? 'bg-rose-50/50 border-rose-200'
                      : isMed
                      ? 'bg-[#F0EAD2]/40 border-[#E5DEC9]'
                      : 'bg-white border-[#E5DEC9]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          isHigh
                            ? 'bg-rose-600 text-white'
                            : isMed
                            ? 'bg-[#A98467] text-white'
                            : 'bg-[#DDE5B6] text-[#2B221B]'
                        }`}
                      >
                        {inc.severity} RISK
                      </span>
                      <h5 className="text-xs font-bold text-[#3D3028]">{inc.title}</h5>
                    </div>

                    <span className="text-[10px] font-mono text-[#8C7464] shrink-0">{inc.time}</span>
                  </div>

                  {/* Explainable Reason */}
                  <div className="p-3 rounded-xl bg-white border border-[#E5DEC9] mb-3 space-y-1 text-xs">
                    <p className="font-bold text-[#6C584C] flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#A98467] shrink-0" />
                      <span>Explainable Reason:</span>
                    </p>
                    <p className="text-[#3D3028] leading-relaxed text-[11px]">{inc.reason}</p>
                    <div className="pt-1.5 flex flex-wrap gap-2 text-[10px] text-[#8C7464] font-mono">
                      <span>📱 {inc.device}</span>
                      <span>•</span>
                      <span>🌐 {inc.ip}</span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#8C7464] italic">
                      Rule: {inc.ruleTriggered}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={isResolved}
                        onClick={() => handleResolve(inc.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                          isResolved
                            ? 'bg-[#DDE5B6] text-[#2B221B]'
                            : 'bg-[#ADC178] hover:bg-[#9CB067] text-[#2B221B] shadow-xs'
                        }`}
                      >
                        {isResolved ? 'Verified & Dismissed ✓' : 'Verify & Dismiss'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
