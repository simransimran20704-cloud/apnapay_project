import React, { useState } from 'react';
import {
  X,
  Search,
  Sparkles,
  Users,
  ShieldCheck,
  Activity,
  FileQuestion,
  Store,
  Code2,
  Sliders,
  ArrowRight,
  Bot,
  Mic,
  Tag,
  ShieldAlert,
  Target,
  PiggyBank,
  QrCode,
  Lock,
  Smartphone,
  KeyRound,
  RotateCcw,
  WifiOff,
  Layers,
  Zap,
  Gift,
  Share2,
  Globe2,
  Terminal,
  Play,
  Webhook,
  Languages,
  UserCheck,
  FileText,
  MessageSquare,
  Sun,
  Eye,
} from 'lucide-react';

export const AllFeaturesHubModal = ({
  isOpen,
  onClose,
  onLaunchSuite, // (suiteName, optionalTab)
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  if (!isOpen) return null;

  const allFeaturesList = [
    // 1. AI & Financial Intelligence
    { id: 1, name: 'Smart Payment Intent Engine', cat: 'AI', icon: Sparkles, suite: 'ai_smart', tab: 'intent', desc: 'AI natural language instructions (e.g. "Pay ₹750 to Rahul for pizza").' },
    { id: 14, name: 'Voice-Based Payment Assistant', cat: 'AI', icon: Mic, suite: 'ai_smart', tab: 'voice', desc: 'Speak to pay and voice command execution.' },
    { id: 15, name: 'Automatic Expense Categorization', cat: 'AI', icon: Tag, suite: 'ai_smart', tab: 'categorization', desc: 'ML-based automated ledger tagger for food, bills, shopping.' },
    { id: 5, name: 'Smart Spending Guard', cat: 'AI', icon: ShieldAlert, suite: 'ai_smart', tab: 'guard', desc: 'Real-time safety guard & midnight spend lock.' },
    { id: 25, name: 'Dynamic Spending Limits', cat: 'AI', icon: Sliders, suite: 'ai_smart', tab: 'guard', desc: 'Customizable daily & single transaction caps.' },
    { id: 13, name: 'AI Expense Insights & Budget', cat: 'AI', icon: Bot, suite: 'ai_smart', tab: 'insights', desc: 'Personalized 50-30-20 budget breakdown and habit tips.' },

    // 2. Social & Collaborative
    { id: 2, name: 'Group Wallet & Split Settlement', cat: 'SOCIAL', icon: Users, suite: 'social', tab: 'groups', desc: 'Shared group pools, bill splitting & 1-tap settlement.' },
    { id: 8, name: 'Collaborative Savings Goals', cat: 'SOCIAL', icon: PiggyBank, suite: 'social', tab: 'shared_goals', desc: 'Save together for trips, weddings and gifts.' },
    { id: 39, name: 'Shared Savings Goals', cat: 'SOCIAL', icon: PiggyBank, suite: 'social', tab: 'shared_goals', desc: 'Multi-user contributions with progress tracking.' },
    { id: 40, name: 'Financial Goal Tracker', cat: 'SOCIAL', icon: Target, suite: 'social', tab: 'goal_tracker', desc: 'Personal milestones with spare-change auto-roundups.' },

    // 3. Security, Privacy & Fraud
    { id: 11, name: 'Smart Fraud Detection & Risk Scoring', cat: 'SECURITY', icon: ShieldAlert, suite: 'security', tab: 'fraud_radar', desc: 'Explainable AI risk scoring (0-100) & anomaly defense.' },
    { id: 6, name: 'QR Trust Preview', cat: 'SECURITY', icon: QrCode, suite: 'security', tab: 'qr_trust', desc: 'Merchant safety score & phishing detection before paying.' },
    { id: 10, name: 'Privacy Control Center', cat: 'SECURITY', icon: Lock, suite: 'security', tab: 'privacy', desc: 'UPI phone number masking & incognito balance mode.' },
    { id: 26, name: 'Device & Session Management', cat: 'SECURITY', icon: Smartphone, suite: 'security', tab: 'sessions', desc: 'Inspect active sign-ins & remote session termination.' },
    { id: 27, name: 'Login Activity & Security Alerts', cat: 'SECURITY', icon: Activity, suite: 'security', tab: 'sessions', desc: 'Geolocated sign-in audit logs & alert pushes.' },
    { id: 49, name: 'Secure Account Recovery', cat: 'SECURITY', icon: KeyRound, suite: 'security', tab: 'recovery', desc: '12-word cryptographic seed phrase & trusted contacts.' },

    // 4. Payments Reliability & Recovery
    { id: 16, name: 'Duplicate Payment Detection', cat: 'RELIABILITY', icon: ShieldAlert, suite: 'reliability', tab: 'duplicate', desc: 'Prevents double billing within 5-minute window.' },
    { id: 17, name: 'Failed Payment Recovery & Retry', cat: 'RELIABILITY', icon: RotateCcw, suite: 'reliability', tab: 'recovery', desc: 'Intelligent multi-switch bank fallback & queue.' },
    { id: 4, name: 'Transaction Journey Explorer', cat: 'RELIABILITY', icon: Activity, suite: 'reliability', tab: 'journey', desc: '4-node visual tracer: App -> Switch -> Bank -> Beneficiary.' },
    { id: 41, name: 'Offline Transaction Drafts', cat: 'RELIABILITY', icon: WifiOff, suite: 'reliability', tab: 'offline', desc: 'Queue payments offline, broadcast when online.' },
    { id: 18, name: 'Multi-Wallet Management', cat: 'RELIABILITY', icon: Layers, suite: 'reliability', tab: 'multi_wallet', desc: 'Manage Primary, Fuel, Transit, Food & Vault pockets.' },

    // 5. Disputes, Refunds & Reminders
    { id: 20, name: 'Payment Dispute & Complaint Mgmt', cat: 'DISPUTES', icon: FileQuestion, suite: 'disputes', tab: 'disputes', desc: 'NPCI UDIR grievance tickets with 48h SLA timer.' },
    { id: 21, name: 'Refund Tracking System', cat: 'DISPUTES', icon: RotateCcw, suite: 'disputes', tab: 'refunds', desc: 'Real-time multi-stage e-commerce refund pipeline.' },
    { id: 38, name: 'Smart Bill Reminders', cat: 'DISPUTES', icon: Zap, suite: 'disputes', tab: 'bill_reminders', desc: 'Electricity, Broadband, Gas reminders with auto-pay.' },

    // 6. Merchant & Growth
    { id: 22, name: 'Merchant Dashboard & Soundbox', cat: 'MERCHANT', icon: Store, suite: 'merchant', tab: 'merchant', desc: 'Daily GMV, ticket analytics & audio soundbox simulator.' },
    { id: 23, name: 'Loyalty Points & Rewards Engine', cat: 'MERCHANT', icon: Gift, suite: 'merchant', tab: 'loyalty', desc: 'ApnaCoins balance, brand vouchers & mystery scratch card.' },
    { id: 24, name: 'Referral & Cashback System', cat: 'MERCHANT', icon: Share2, suite: 'merchant', tab: 'referral', desc: 'Invite friends, earn ₹50 cashback & lucky wheel spin.' },
    { id: 29, name: 'Multi-Currency Forex Simulator', cat: 'MERCHANT', icon: Globe2, suite: 'merchant', tab: 'forex', desc: 'Real-time conversion: USD, EUR, GBP, AED with 0 markup.' },
    { id: 7, name: 'Subscription Detective', cat: 'MERCHANT', icon: Search, suite: 'merchant', tab: 'subscription', desc: 'Auto-scan subscriptions (Netflix, Spotify) & pause guide.' },

    // 7. Developer & System Platform
    { id: 3, name: 'Payment Sandbox & Failure Simulator', cat: 'DEVELOPER', icon: Play, suite: 'developer', tab: 'sandbox', desc: 'Simulate 200, 400, 503, 504 network error codes.' },
    { id: 30, name: 'Developer API Playground', cat: 'DEVELOPER', icon: Terminal, suite: 'developer', tab: 'playground', desc: 'Test live Spring Boot endpoints with JSON inspector.' },
    { id: 31, name: 'Webhook Event Monitoring', cat: 'DEVELOPER', icon: Webhook, suite: 'developer', tab: 'webhooks', desc: 'Live event stream with HMAC SHA256 verification.' },
    { id: 9, name: 'Webhook Replay Lab', cat: 'DEVELOPER', icon: RotateCcw, suite: 'developer', tab: 'webhooks', desc: 'Replay delivered payloads for testing webhooks.' },
    { id: 32, name: 'Idempotency Protection', cat: 'DEVELOPER', icon: Layers, suite: 'developer', tab: 'reconciliation', desc: 'X-Idempotency-Key guard against double charges.' },
    { id: 33, name: 'Transaction Reconciliation Engine', cat: 'DEVELOPER', icon: Layers, suite: 'developer', tab: 'reconciliation', desc: '3-way ledger match vs partner bank CBS switches.' },
    { id: 34, name: 'Real-Time System Health Dashboard', cat: 'DEVELOPER', icon: Activity, suite: 'developer', tab: 'health', desc: 'Latency and uptime telemetry across Ports 8080-8083.' },
    { id: 46, name: 'Automated API Testing Dashboard', cat: 'DEVELOPER', icon: Activity, suite: 'developer', tab: 'health', desc: '1-click automated health check runner.' },

    // 8. Admin, Governance, Themes & Accessibility
    { id: 35, name: 'Role-Based Admin Panel', cat: 'ADMIN', icon: UserCheck, suite: 'admin', tab: 'admin_panel', desc: 'Super Admin, Compliance & Support views with RBAC.' },
    { id: 36, name: 'Audit Logs & Activity Timeline', cat: 'ADMIN', icon: FileText, suite: 'admin', tab: 'audit_logs', desc: 'Immutable security & system change audit trail.' },
    { id: 42, name: 'Multilingual Interface', cat: 'ADMIN', icon: Languages, suite: 'admin', tab: 'themes_lang', desc: 'Hindi, English, Hinglish, Marathi, Tamil, Bengali.' },
    { id: 43, name: 'Accessibility & Font Scaling', cat: 'ADMIN', icon: Eye, suite: 'admin', tab: 'themes_lang', desc: 'Scale UI fonts and enhance readability.' },
    { id: 47, name: 'Dark / Light Earthy Themes', cat: 'ADMIN', icon: Sun, suite: 'admin', tab: 'themes_lang', desc: 'Warm Cream Light & Deep Espresso Dark theme toggle.' },
    { id: 45, name: 'In-App Support Chat', cat: 'ADMIN', icon: MessageSquare, suite: 'admin', tab: 'support_chat', desc: 'Live 24/7 priority grievance resolution chat.' },
    { id: 48, name: 'Advanced Transaction Search', cat: 'ADMIN', icon: Search, suite: 'admin', tab: 'search_filters', desc: 'Multi-criteria filters by min/max amount, dates & type.' },
    { id: 50, name: 'Demo Mode with Simulated Txns', cat: 'ADMIN', icon: Play, suite: 'admin', tab: 'themes_lang', desc: 'Toggle between live backend and demo sandbox.' },
  ];

  const categories = [
    { id: 'ALL', label: 'All 50 Features' },
    { id: 'AI', label: 'AI & Smart' },
    { id: 'SOCIAL', label: 'Social Finance' },
    { id: 'SECURITY', label: 'Security & Fraud' },
    { id: 'RELIABILITY', label: 'Reliability & Wallets' },
    { id: 'DISPUTES', label: 'Disputes & Refunds' },
    { id: 'MERCHANT', label: 'Merchant & Growth' },
    { id: 'DEVELOPER', label: 'Developer Platform' },
    { id: 'ADMIN', label: 'Admin & Themes' },
  ];

  const filtered = allFeaturesList.filter((f) => {
    const matchCat = selectedCategory === 'ALL' || f.cat === selectedCategory;
    const matchSearch =
      !search ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2B221B]/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#FAF8F4] border border-[#E5DEC9] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4.5 bg-gradient-to-r from-[#6C584C] via-[#5A493E] to-[#45372E] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#ADC178] text-[#2B221B] flex items-center justify-center shadow-md font-black">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#F0EAD2] flex items-center gap-2">
                ApnaPay Innovation Suite
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#ADC178] text-[#2B221B] font-black uppercase">
                  50 Features Live
                </span>
              </h3>
              <p className="text-xs text-[#DDE5B6]">
                Explore all integrated AI, Social, Reliability, Security, Developer & Admin capabilities.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#DDE5B6] hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Pills */}
        <div className="p-4 border-b border-[#E5DEC9] bg-[#F0EAD2]/50 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C7464] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by feature name (e.g. Webhook, Voice, Sandbox, Split, QR Trust, Limits)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-xs text-[#2B221B] font-medium focus:outline-none focus:border-[#ADC178] shadow-2xs"
            />
          </div>

          <div className="flex overflow-x-auto gap-1.5 scrollbar-none pb-0.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-[#6C584C] text-[#F0EAD2] shadow-xs'
                    : 'bg-white text-[#6C584C] border border-[#E5DEC9] hover:bg-[#FAF8F4]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Features */}
        <div className="p-5 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    onLaunchSuite(item.suite, item.tab);
                  }}
                  className="p-4 rounded-2xl bg-white border border-[#E5DEC9] hover:border-[#ADC178] hover:bg-[#FAF8F4] transition shadow-xs cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-[#F0EAD2] text-[#6C584C] group-hover:bg-[#ADC178] group-hover:text-[#2B221B] flex items-center justify-center transition">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#8C7464] bg-[#FAF8F4] px-2 py-0.5 rounded-md border border-[#E5DEC9]">
                        #{item.id}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2B221B] group-hover:text-[#4D6321] transition">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7464] mt-0.5 leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#E5DEC9]/50 text-[11px] font-bold text-[#6C584C] group-hover:text-[#2B221B]">
                    <span>Launch Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
