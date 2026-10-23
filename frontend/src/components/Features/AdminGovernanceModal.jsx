import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useWallet } from '../../context/WalletContext';
import {
  X,
  ShieldAlert,
  Moon,
  Sun,
  Languages,
  Eye,
  Sliders,
  MessageSquare,
  Search,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Filter,
  CheckCircle2,
  FileText,
  UserCheck,
} from 'lucide-react';

export const AdminGovernanceModal = ({ isOpen, onClose }) => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    isDemoMode,
    setIsDemoMode,
    fontSize,
    setFontSize,
  } = useApp();
  const { transactions } = useWallet();
  const [activeTab, setActiveTab] = useState('themes_lang'); // 'themes_lang' | 'admin_panel' | 'audit_logs' | 'support_chat' | 'search_filters'

  // 35. Role-Based Admin State
  const [adminRole, setAdminRole] = useState('SUPER_ADMIN'); // 'SUPER_ADMIN' | 'COMPLIANCE_AML' | 'SUPPORT_AGENT'

  // 45. In-App Support Chat State
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Namaste! Welcome to ApnaPay 24/7 Priority Support. How can we assist you today?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // 48. Advanced Transaction Search Filters
  const [filterQuery, setFilterQuery] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // 36. Audit Logs
  const auditLogs = [
    { id: 'LOG-1092', action: 'SPENDING_LIMIT_UPDATED', actor: 'User (Self)', timestamp: 'Today, 23:54', status: 'SUCCESS' },
    { id: 'LOG-1091', action: 'WALLET_TOPUP_AUTHORIZED', actor: 'NPCI Switch / Bank', timestamp: 'Today, 23:50', status: 'SUCCESS' },
    { id: 'LOG-1090', action: 'MPIN_LOGIN_VERIFIED', actor: 'Auth Service (Port 8081)', timestamp: 'Today, 23:45', status: 'SUCCESS' },
    { id: 'LOG-1089', action: 'DEVICE_FINGERPRINT_REGISTERED', actor: 'Client Gateway', timestamp: 'Today, 21:07', status: 'SUCCESS' },
  ];

  if (!isOpen) return null;

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: chatInput.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Thank you for reaching out! A ticket (TKT-9921) has been created. An ApnaPay officer is reviewing your query.',
        },
      ]);
    }, 600);
  };

  const filteredSearchResults = transactions.filter((t) => {
    if (filterType !== 'ALL' && t.type !== filterType) return false;
    if (minAmount && t.amount < parseFloat(minAmount)) return false;
    if (maxAmount && t.amount > parseFloat(maxAmount)) return false;
    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      const match =
        (t.with && t.with.toLowerCase().includes(q)) ||
        (t.remarks && t.remarks.toLowerCase().includes(q)) ||
        (t.transactionId && t.transactionId.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#6C584C] to-[#534339] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ADC178]/25 text-[#DDE5B6] flex items-center justify-center border border-[#ADC178]/40">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F0EAD2]">Admin, Themes & Global Preferences</h3>
              <p className="text-xs text-[#DDE5B6]">
                Role-Based Admin • Audit Logs • Dark Theme • Multilingual • Support Chat
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
            { id: 'themes_lang', label: '42, 43, 47, 50. Themes & Lang', icon: Languages },
            { id: 'admin_panel', label: '35. Role-Based Admin Panel', icon: UserCheck },
            { id: 'audit_logs', label: '36. Audit Logs Timeline', icon: FileText },
            { id: 'support_chat', label: '45. In-App Support Chat', icon: MessageSquare },
            { id: 'search_filters', label: '48. Advanced Txn Search', icon: Search },
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
          {/* TAB 1: THEMES, MULTILINGUAL & ACCESSIBILITY & DEMO MODE */}
          {activeTab === 'themes_lang' && (
            <div className="space-y-4">
              {/* 47. Dark/Light Theme */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex justify-between items-center shadow-xs">
                <div>
                  <h5 className="text-xs font-bold text-[#2B221B]">47. Earthy Theme Customization</h5>
                  <p className="text-[10px] text-[#8C7464]">
                    Switch between Warm Cream Light Mode & Deep Espresso Dark Mode.
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F0EAD2] hover:bg-[#DDE5B6] text-[#2B221B] text-xs font-bold flex items-center gap-2 cursor-pointer transition"
                >
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-[#A98467]" /> : <Sun className="w-4 h-4 text-[#ADC178]" />}
                  <span>{theme === 'dark' ? 'Espresso Dark' : 'Warm Cream Light'}</span>
                </button>
              </div>

              {/* 42. Multilingual Interface */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-2 shadow-xs">
                <h5 className="text-xs font-bold text-[#2B221B]">42. Multilingual Interface Language</h5>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'en', label: 'English' },
                    { id: 'hi', label: 'हिन्दी (Hindi)' },
                    { id: 'hinglish', label: 'Hinglish (Default)' },
                    { id: 'mr', label: 'मराठी (Marathi)' },
                    { id: 'ta', label: 'தமிழ் (Tamil)' },
                    { id: 'bn', label: 'বাংলা (Bengali)' },
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setLanguage(l.id)}
                      className={`p-2 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                        language === l.id
                          ? 'bg-[#ADC178] border-[#ADC178] text-[#2B221B]'
                          : 'bg-[#FAF8F4] border-[#E5DEC9] text-[#6C584C]'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 43. Accessibility Font Scaling */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex justify-between items-center shadow-xs">
                <div>
                  <h5 className="text-xs font-bold text-[#2B221B]">43. Accessibility Font Size</h5>
                  <p className="text-[10px] text-[#8C7464]">Scale interface readability for vision comfort.</p>
                </div>
                <div className="flex gap-1">
                  {['sm', 'md', 'lg', 'xl'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold uppercase transition cursor-pointer ${
                        fontSize === sz ? 'bg-[#ADC178] text-[#2B221B]' : 'bg-[#FAF8F4] text-[#6C584C]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* 50. Demo Mode Toggle */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] flex justify-between items-center shadow-xs">
                <div>
                  <h5 className="text-xs font-bold text-[#2B221B]">50. Demo Mode with Simulated Transactions</h5>
                  <p className="text-[10px] text-[#8C7464]">
                    Toggle mock demo environment for presentations or switch to live backend.
                  </p>
                </div>
                <button
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    isDemoMode ? 'bg-[#ADC178]' : 'bg-stone-300'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      isDemoMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ROLE-BASED ADMIN PANEL */}
          {activeTab === 'admin_panel' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {[
                  { id: 'SUPER_ADMIN', label: 'Super Admin' },
                  { id: 'COMPLIANCE_AML', label: 'Compliance & AML' },
                  { id: 'SUPPORT_AGENT', label: 'Support Agent' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setAdminRole(r.id)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      adminRole === r.id
                        ? 'bg-[#6C584C] text-[#F0EAD2] border-[#6C584C]'
                        : 'bg-white border-[#E5DEC9] text-[#6C584C]'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] space-y-3 shadow-xs">
                <h5 className="text-xs font-bold text-[#2B221B]">Role Permissions: {adminRole}</h5>
                <ul className="text-xs text-[#6C584C] space-y-1">
                  <li>• System Uptime & Microservices Orchestrator: <b className="text-emerald-700">READ / WRITE</b></li>
                  <li>• User MPIN & Security Override: <b className="text-emerald-700">ENABLED</b></li>
                  <li>• AML & Suspicious Velocity Flagging: <b className="text-emerald-700">ACTIVE</b></li>
                  <li>• Dispute & Chargeback Approval: <b className="text-emerald-700">AUTHORIZED</b></li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT LOGS */}
          {activeTab === 'audit_logs' && (
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-[#2B221B]">Immutable Security & System Audit Trail</h5>
              <div className="divide-y divide-[#E5DEC9] bg-white rounded-2xl border border-[#E5DEC9] overflow-hidden shadow-xs">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono font-bold text-[#2B221B]">{log.action}</span>
                      <p className="text-[10px] text-[#8C7464]">Actor: {log.actor} • {log.timestamp}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: IN-APP SUPPORT CHAT */}
          {activeTab === 'support_chat' && (
            <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs flex flex-col h-72">
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2.5 rounded-xl max-w-[80%] text-xs ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-[#ADC178] text-[#2B221B] font-medium'
                        : 'bg-[#FAF8F4] border border-[#E5DEC9] text-[#2B221B]'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-[#E5DEC9]">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-xl bg-[#6C584C] text-[#F0EAD2] text-xs font-bold cursor-pointer"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: ADVANCED TRANSACTION SEARCH */}
          {activeTab === 'search_filters' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] space-y-2 shadow-xs">
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Search by Payee, Remarks, or Txn ID..."
                  className="w-full px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs focus:outline-none"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    placeholder="Min ₹"
                    className="px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs"
                  />
                  <input
                    type="number"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    placeholder="Max ₹"
                    className="px-3 py-1.5 rounded-xl border border-[#E5DEC9] text-xs"
                  />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-2 py-1.5 rounded-xl border border-[#E5DEC9] text-xs bg-white"
                  >
                    <option value="ALL">All Types</option>
                    <option value="DEBIT">Debit Only</option>
                    <option value="CREDIT">Credit Only</option>
                  </select>
                </div>
              </div>

              {/* Filtered Result List */}
              <div className="divide-y divide-[#E5DEC9] bg-white rounded-2xl border border-[#E5DEC9] overflow-hidden max-h-48 overflow-y-auto">
                {filteredSearchResults.length === 0 ? (
                  <p className="p-4 text-xs text-[#8C7464] text-center">No transactions match your search filter.</p>
                ) : (
                  filteredSearchResults.map((t, idx) => (
                    <div key={t.transactionId || idx} className="p-2.5 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-[#2B221B]">{t.with || 'Payment'}</span>
                        <p className="text-[10px] text-[#8C7464]">{t.transactionId} • {t.remarks}</p>
                      </div>
                      <span className="font-mono font-bold text-[#2B221B]">₹{t.amount}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
