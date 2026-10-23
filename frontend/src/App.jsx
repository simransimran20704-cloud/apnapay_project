import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WalletProvider, useWallet } from './context/WalletContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import { AppProvider, useApp } from './context/AppContext';

// ApnaPay Desktop & Mobile Layout Components
import { Sidebar } from './components/ApnaPay/Sidebar';
import { TopNavbar } from './components/ApnaPay/TopNavbar';
import { DesktopDashboard } from './components/ApnaPay/DesktopDashboard';
import { MobileDashboard } from './components/ApnaPay/MobileDashboard';
import { MobileBottomNav } from './components/ApnaPay/MobileBottomNav';

// ApnaPay Core Feature Modals
import { SendMoneyFlowModal } from './components/ApnaPay/SendMoneyFlowModal';
import { BankAccountsModal } from './components/ApnaPay/BankAccountsModal';
import { ProfileModal } from './components/ApnaPay/ProfileModal';
import { OffersRewardsModal } from './components/ApnaPay/OffersRewardsModal';
import { MoreServicesModal } from './components/ApnaPay/MoreServicesModal';
import { UpgradePlusModal } from './components/ApnaPay/UpgradePlusModal';

// 6 Analytics & Smart Modals
import { SpendingAnalyticsModal } from './components/Features/SpendingAnalyticsModal';
import { SmartNotificationsModal } from './components/Features/SmartNotificationsModal';
import { FraudRiskModal } from './components/Features/FraudRiskModal';
import { ExportableStatementsModal } from './components/Features/ExportableStatementsModal';
import { RecurringSimulatorModal } from './components/Features/RecurringSimulatorModal';
import { AiFinanceAssistantModal } from './components/Features/AiFinanceAssistantModal';

// 50 Features Innovation Suites
import { AllFeaturesHubModal } from './components/Features/AllFeaturesHubModal';
import { AiSmartHubModal } from './components/Features/AiSmartHubModal';
import { SocialFinanceModal } from './components/Features/SocialFinanceModal';
import { SecurityPrivacyHubModal } from './components/Features/SecurityPrivacyHubModal';
import { PaymentReliabilityModal } from './components/Features/PaymentReliabilityModal';
import { DisputesRefundsModal } from './components/Features/DisputesRefundsModal';
import { MerchantGrowthModal } from './components/Features/MerchantGrowthModal';
import { DeveloperPlatformModal } from './components/Features/DeveloperPlatformModal';
import { AdminGovernanceModal } from './components/Features/AdminGovernanceModal';

// Standard Modals
import { TopUpModal } from './components/Modals/TopUpModal';
import { QrScannerModal } from './components/Modals/QrScannerModal';
import { QrReceiveModal } from './components/Modals/QrReceiveModal';
import { ReceiptModal } from './components/Modals/ReceiptModal';
import { PassbookModal } from './components/Modals/PassbookModal';
import { UtilityBillsModal } from './components/Modals/UtilityBillsModal';
import { NotificationDrawer } from './components/Dashboard/NotificationDrawer';
import { BankTransferModal } from './components/Modals/BankTransferModal';
import { SplitBillModal } from './components/Modals/SplitBillModal';
import { SecurityModal } from './components/Modals/SecurityModal';
import { LoginModal } from './components/Auth/LoginModal';
import { RegisterModal } from './components/Auth/RegisterModal';

import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

function ApnaPayAppContent() {
  const { isAuthenticated, profile, auth, setAuthDirect } = useAuth();
  const { refreshAll } = useWallet();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [prefilledMobile, setPrefilledMobile] = useState('');
  const [showTopUp, setShowTopUp] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [showQrReceive, setShowQrReceive] = useState(false);
  const [showPassbook, setShowPassbook] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // ApnaPay Core Modals
  const [showBankAccounts, setShowBankAccounts] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [showUpgradePlus, setShowUpgradePlus] = useState(false);
  const [showBills, setShowBills] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showSplitBill, setShowSplitBill] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  // 6 New Requested Feature Modals
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSmartNotifications, setShowSmartNotifications] = useState(false);
  const [showFraudRisk, setShowFraudRisk] = useState(false);
  const [showExportStatements, setShowExportStatements] = useState(false);
  const [showRecurringSimulator, setShowRecurringSimulator] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  // 50 Features Innovation Suites
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAiSmartHub, setShowAiSmartHub] = useState(false);
  const [showSocialFinance, setShowSocialFinance] = useState(false);
  const [showSecurityPrivacyHub, setShowSecurityPrivacyHub] = useState(false);
  const [showPaymentReliability, setShowPaymentReliability] = useState(false);
  const [showDisputesRefunds, setShowDisputesRefunds] = useState(false);
  const [showMerchantGrowth, setShowMerchantGrowth] = useState(false);
  const [showDeveloperPlatform, setShowDeveloperPlatform] = useState(false);
  const [showAdminGovernance, setShowAdminGovernance] = useState(false);

  const handleLaunchSuite = (suiteName) => {
    if (suiteName === 'ai_smart') setShowAiSmartHub(true);
    else if (suiteName === 'social') setShowSocialFinance(true);
    else if (suiteName === 'security') setShowSecurityPrivacyHub(true);
    else if (suiteName === 'reliability') setShowPaymentReliability(true);
    else if (suiteName === 'disputes') setShowDisputesRefunds(true);
    else if (suiteName === 'merchant') setShowMerchantGrowth(true);
    else if (suiteName === 'developer') setShowDeveloperPlatform(true);
    else if (suiteName === 'admin') setShowAdminGovernance(true);
    else setShowAllFeatures(true);
  };

  // Quick 1-click Demo Authenticate
  const handleQuickDemo = () => {
    setAuthDirect({
      token: 'demo_token_' + Date.now(),
      mobileNumber: '9876543210',
      tokenType: 'Bearer',
    });
  };

  const handleQuickSend = (mobile) => {
    setPrefilledMobile(mobile);
    setShowSendMoney(true);
  };

  const handleScanSuccess = ({ mobile, amount }) => {
    setShowScan(false);
    setPrefilledMobile(mobile);
    setShowSendMoney(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#3D322A] flex flex-col font-sans antialiased selection:bg-[#ADC178] selection:text-[#2E241E]">
      {!isAuthenticated ? (
        /* ================= UNAUTHENTICATED LANDING EXPERIENCE (Earthy Tones) ================= */
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-screen relative overflow-hidden select-none bg-gradient-to-b from-[#F0EAD2]/50 via-[#F8F6F0] to-white">
          {/* Subtle gradient meshes */}
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#DDE5B6]/50 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#A98467]/20 blur-3xl pointer-events-none"></div>

          <div className="max-w-md w-full mx-auto text-center space-y-6 relative z-10 bg-white p-8 rounded-3xl border border-[#E5DEC9] shadow-xl shadow-[#6C584C]/5">
            {/* Logo Badge (Color 5: #6C584C + Color 1: #F0EAD2) */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-[#6C584C] flex items-center justify-center text-[#F0EAD2] text-2xl font-black shadow-lg shadow-[#6C584C]/20">
                <span>P</span>
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-[#4A3B32]">ApnaPay</h1>
                <p className="text-xs font-bold text-[#A98467] tracking-wider mt-0.5">
                  Simple Payments, Better Tomorrow
                </p>
              </div>
            </div>

            <p className="text-xs text-[#8C7464] font-medium">
              UPI • Smart Wallet • Instant Transfers • Bill Payments
            </p>

            {/* Action Buttons (Highlighted with Earthy Tones) */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleQuickDemo}
                className="w-full py-3.5 rounded-2xl bg-[#ADC178] hover:bg-[#9BB067] text-[#2B221B] font-black text-xs shadow-md shadow-[#ADC178]/30 transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#2B221B]" />
                <span>Test Wallet Directly (Instant Demo)</span>
              </button>

              <button
                onClick={() => setShowLogin(true)}
                className="w-full py-3 rounded-2xl bg-[#F0EAD2] hover:bg-[#E5DEC9] border border-[#E0D5BE] text-[#4A3B32] font-bold text-xs transition cursor-pointer"
              >
                Log In with MPIN
              </button>

              <button
                onClick={() => setShowRegister(true)}
                className="w-full py-2 text-xs font-bold text-[#A98467] hover:underline transition cursor-pointer"
              >
                New user? Create an account
              </button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#8C7464] pt-2 border-t border-[#E5DEC9]">
              <ShieldCheck className="w-4 h-4 text-[#ADC178]" />
              <span>Bank-grade 256-bit encryption • NPCI Verified</span>
            </div>
          </div>
        </div>
      ) : (
        /* ================= AUTHENTICATED EXPERIENCE ================= */
        <div className="flex flex-1 min-h-screen">
          {/* DESKTOP SIDEBAR (Visible on lg+ screens) */}
          <div className="hidden lg:block">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenSendMoney={() => setShowSendMoney(true)}
              onOpenScan={() => setShowScan(true)}
              onOpenUpiCircle={() => setShowSplitBill(true)}
              onOpenRecharge={() => setShowBills(true)}
              onOpenBankTransfer={() => setShowBankTransfer(true)}
              onOpenHistory={() => setShowPassbook(true)}
              onOpenBankAccounts={() => setShowBankAccounts(true)}
              onOpenCards={() => setShowBankAccounts(true)}
              onOpenInsurance={() => setShowBills(true)}
              onOpenInvestments={() => setShowMoreServices(true)}
              onOpenRewards={() => setShowOffers(true)}
              onOpenUpgradePlus={() => setShowUpgradePlus(true)}
              // 6 New Features
              onOpenAnalytics={() => setShowAnalytics(true)}
              onOpenSmartNotifications={() => setShowSmartNotifications(true)}
              onOpenFraudRisk={() => setShowFraudRisk(true)}
              onOpenExportStatements={() => setShowExportStatements(true)}
              onOpenRecurringSimulator={() => setShowRecurringSimulator(true)}
              onOpenAiAssistant={() => setShowAiAssistant(true)}
              // 50 Features Innovation Suites
              onOpenAllFeatures={() => setShowAllFeatures(true)}
              onOpenAiSmartHub={() => setShowAiSmartHub(true)}
              onOpenSocialFinance={() => setShowSocialFinance(true)}
              onOpenSecurityPrivacyHub={() => setShowSecurityPrivacyHub(true)}
              onOpenPaymentReliability={() => setShowPaymentReliability(true)}
              onOpenDisputesRefunds={() => setShowDisputesRefunds(true)}
              onOpenMerchantGrowth={() => setShowMerchantGrowth(true)}
              onOpenDeveloperPlatform={() => setShowDeveloperPlatform(true)}
              onOpenAdminGovernance={() => setShowAdminGovernance(true)}
            />
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* DESKTOP TOP NAVBAR (Hidden on mobile) */}
            <div className="hidden lg:block">
              <TopNavbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onOpenNotifications={() => setShowSmartNotifications(true)}
                onOpenHelp={() => setShowMoreServices(true)}
                onOpenProfile={() => setShowProfile(true)}
                onOpenScan={() => setShowScan(true)}
                onOpenAiAssistant={() => setShowAiAssistant(true)}
                onOpenAllFeatures={() => setShowAllFeatures(true)}
              />
            </div>

            {/* DESKTOP CONTENT VIEW (lg+ screens) */}
            <main className="hidden lg:block flex-1 p-6 max-w-7xl w-full mx-auto">
              <DesktopDashboard
                onOpenSendMoney={() => setShowSendMoney(true)}
                onOpenScan={() => setShowScan(true)}
                onOpenTopUp={() => setShowTopUp(true)}
                onOpenBankTransfer={() => setShowBankTransfer(true)}
                onOpenHistory={() => setShowPassbook(true)}
                onOpenRecharge={(type) => setShowBills(true)}
                onOpenBills={(type) => setShowBills(true)}
                onOpenOffers={() => setShowOffers(true)}
                onOpenInvestments={() => setShowMoreServices(true)}
                onOpenUpiCircle={() => setShowSplitBill(true)}
                onOpenSecurity={() => setShowFraudRisk(true)}
                onSelectTransaction={(tx) => setSelectedReceipt(tx)}
                onQuickSendContact={handleQuickSend}
                // 6 New Features
                onOpenAnalytics={() => setShowAnalytics(true)}
                onOpenSmartNotifications={() => setShowSmartNotifications(true)}
                onOpenFraudRisk={() => setShowFraudRisk(true)}
                onOpenExportStatements={() => setShowExportStatements(true)}
                onOpenRecurringSimulator={() => setShowRecurringSimulator(true)}
                onOpenAiAssistant={() => setShowAiAssistant(true)}
                // 50 Features Innovation Suites
                onOpenAllFeatures={() => setShowAllFeatures(true)}
                onOpenAiSmartHub={() => setShowAiSmartHub(true)}
                onOpenSocialFinance={() => setShowSocialFinance(true)}
                onOpenSecurityPrivacyHub={() => setShowSecurityPrivacyHub(true)}
                onOpenPaymentReliability={() => setShowPaymentReliability(true)}
                onOpenDisputesRefunds={() => setShowDisputesRefunds(true)}
                onOpenMerchantGrowth={() => setShowMerchantGrowth(true)}
                onOpenDeveloperPlatform={() => setShowDeveloperPlatform(true)}
                onOpenAdminGovernance={() => setShowAdminGovernance(true)}
              />
            </main>

            {/* MOBILE CONTENT VIEW (Mobile/Tablet screens) */}
            <div className="block lg:hidden flex-1 p-4 max-w-md mx-auto w-full">
              <MobileDashboard
                onOpenSendMoney={() => setShowSendMoney(true)}
                onOpenScan={() => setShowScan(true)}
                onOpenTopUp={() => setShowTopUp(true)}
                onOpenUpiCircle={() => setShowSplitBill(true)}
                onOpenHistory={() => setShowPassbook(true)}
                onOpenOffers={() => setShowOffers(true)}
                onOpenRecharge={(type) => setShowBills(true)}
                onOpenBills={(type) => setShowBills(true)}
                onOpenProfile={() => setShowProfile(true)}
                onOpenNotifications={() => setShowSmartNotifications(true)}
                // 6 New Features
                onOpenAnalytics={() => setShowAnalytics(true)}
                onOpenSmartNotifications={() => setShowSmartNotifications(true)}
                onOpenFraudRisk={() => setShowFraudRisk(true)}
                onOpenExportStatements={() => setShowExportStatements(true)}
                onOpenRecurringSimulator={() => setShowRecurringSimulator(true)}
                onOpenAiAssistant={() => setShowAiAssistant(true)}
                onOpenAllFeatures={() => setShowAllFeatures(true)}
              />

              {/* Mobile Bottom Navigation Bar */}
              <MobileBottomNav
                activeTab={activeTab}
                onOpenHome={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenHistory={() => setShowPassbook(true)}
                onOpenScan={() => setShowScan(true)}
                onOpenOffers={() => setShowOffers(true)}
                onOpenProfile={() => setShowProfile(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= ALL 6 NEW REQUESTED FEATURE MODALS ================= */}

      {/* 5. Spending Analytics Modal */}
      <SpendingAnalyticsModal
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />

      {/* 6. Smart Notifications Modal */}
      <SmartNotificationsModal
        isOpen={showSmartNotifications}
        onClose={() => setShowSmartNotifications(false)}
        onOpenTopUp={() => {
          setShowSmartNotifications(false);
          setShowTopUp(true);
        }}
      />

      {/* 7. Fraud & Risk Monitoring Modal */}
      <FraudRiskModal
        isOpen={showFraudRisk}
        onClose={() => setShowFraudRisk(false)}
      />

      {/* 8. Exportable Statements Modal */}
      <ExportableStatementsModal
        isOpen={showExportStatements}
        onClose={() => setShowExportStatements(false)}
      />

      {/* 9. Recurring Payments Simulator Modal */}
      <RecurringSimulatorModal
        isOpen={showRecurringSimulator}
        onClose={() => setShowRecurringSimulator(false)}
      />

      {/* 10. AI Finance Assistant Modal */}
      <AiFinanceAssistantModal
        isOpen={showAiAssistant}
        onClose={() => setShowAiAssistant(false)}
      />

      {/* ================= CORE INTERACTIVE APNAPAY MODALS ================= */}

      {/* Multi-Step Send Money Flow */}
      <SendMoneyFlowModal
        isOpen={showSendMoney}
        initialMobile={prefilledMobile}
        onClose={() => {
          setShowSendMoney(false);
          setPrefilledMobile('');
        }}
        onPaymentSuccess={(receipt) => {
          setSelectedReceipt(receipt);
        }}
      />

      {/* Bank Accounts & UPI Management Modal */}
      <BankAccountsModal
        isOpen={showBankAccounts}
        onClose={() => setShowBankAccounts(false)}
      />

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onOpenBankAccounts={() => {
          setShowProfile(false);
          setShowBankAccounts(true);
        }}
        onOpenSecurity={() => {
          setShowProfile(false);
          setShowFraudRisk(true);
        }}
        onOpenUpgradePlus={() => {
          setShowProfile(false);
          setShowUpgradePlus(true);
        }}
      />

      {/* Offers & Rewards Modal */}
      <OffersRewardsModal
        isOpen={showOffers}
        onClose={() => setShowOffers(false)}
        onOpenRecharge={() => {
          setShowOffers(false);
          setShowBills(true);
        }}
      />

      {/* More Services Modal */}
      <MoreServicesModal
        isOpen={showMoreServices}
        onClose={() => setShowMoreServices(false)}
        onOpenRecharge={() => setShowBills(true)}
        onOpenBills={() => setShowBills(true)}
        onOpenInvestments={() => setShowUpgradePlus(true)}
      />

      {/* Upgrade to ApnaPay Plus Modal */}
      <UpgradePlusModal
        isOpen={showUpgradePlus}
        onClose={() => setShowUpgradePlus(false)}
      />

      {/* Add Money / Top Up Modal */}
      <TopUpModal
        isOpen={showTopUp}
        onClose={() => setShowTopUp(false)}
        onSuccessReceipt={(receipt) => setSelectedReceipt(receipt)}
      />

      {/* Scan Any QR Modal */}
      <QrScannerModal
        isOpen={showScan}
        onClose={() => setShowScan(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* Receive Money QR Modal */}
      <QrReceiveModal
        isOpen={showQrReceive}
        onClose={() => setShowQrReceive(false)}
      />

      {/* Passbook & Statement Ledger */}
      <PassbookModal
        isOpen={showPassbook}
        onClose={() => setShowPassbook(false)}
        onSelectTransaction={(txn) => setSelectedReceipt(txn)}
      />

      {/* Transaction Receipt Breakdown */}
      <ReceiptModal
        transaction={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

      {/* Utility Bills & Recharge Modal */}
      <UtilityBillsModal
        isOpen={showBills}
        onClose={() => setShowBills(false)}
        onSuccessReceipt={(receipt) => setSelectedReceipt(receipt)}
      />

      {/* Bank Transfer Modal */}
      <BankTransferModal
        isOpen={showBankTransfer}
        onClose={() => setShowBankTransfer(false)}
        onSuccessReceipt={(receipt) => setSelectedReceipt(receipt)}
      />

      {/* Split Bill Modal */}
      <SplitBillModal
        isOpen={showSplitBill}
        onClose={() => setShowSplitBill(false)}
      />

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      {/* ================= 50 FEATURES INNOVATION SUITE MODALS ================= */}

      {/* Master 50 Features Directory */}
      <AllFeaturesHubModal
        isOpen={showAllFeatures}
        onClose={() => setShowAllFeatures(false)}
        onLaunchSuite={handleLaunchSuite}
      />

      {/* Suite A: AI & Smart Financial Hub (Intent, Voice, Categorization, Spending Guard, Limits, Insights) */}
      <AiSmartHubModal
        isOpen={showAiSmartHub}
        onClose={() => setShowAiSmartHub(false)}
      />

      {/* Suite B: Social Finance & Group Wallet (Group Wallet, Split Settlement, Shared Goals, Goal Tracker) */}
      <SocialFinanceModal
        isOpen={showSocialFinance}
        onClose={() => setShowSocialFinance(false)}
      />

      {/* Suite C: Security, Privacy & Fraud Radar (Fraud Radar, QR Trust Preview, Privacy Center, Sessions, Recovery) */}
      <SecurityPrivacyHubModal
        isOpen={showSecurityPrivacyHub}
        onClose={() => setShowSecurityPrivacyHub(false)}
      />

      {/* Suite D: Payment Reliability & Multi-Wallet (Journey Explorer, Duplicate Guard, Retry, Offline Queue, Multi-Wallet) */}
      <PaymentReliabilityModal
        isOpen={showPaymentReliability}
        onClose={() => setShowPaymentReliability(false)}
      />

      {/* Suite E: Disputes, Refunds & Bill Reminders (Disputes, UDIR Tickets, Refund Pipeline, Smart Bill Reminders) */}
      <DisputesRefundsModal
        isOpen={showDisputesRefunds}
        onClose={() => setShowDisputesRefunds(false)}
      />

      {/* Suite F: Merchant & Growth Suite (Merchant Dashboard, Soundbox, Loyalty Points, Referrals, Forex, Subscriptions) */}
      <MerchantGrowthModal
        isOpen={showMerchantGrowth}
        onClose={() => setShowMerchantGrowth(false)}
      />

      {/* Suite G: Developer Platform & API Sandbox (Live Health, Playground, Failure Simulator, Webhooks, Reconciliation) */}
      <DeveloperPlatformModal
        isOpen={showDeveloperPlatform}
        onClose={() => setShowDeveloperPlatform(false)}
      />

      {/* Suite H: Admin Governance, Themes & Accessibility (Role Admin, Audit Trail, Themes, Languages, Support Chat, Txn Search) */}
      <AdminGovernanceModal
        isOpen={showAdminGovernance}
        onClose={() => setShowAdminGovernance(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <NotificationProvider>
          <AppProvider>
            <ApnaPayAppContent />
          </AppProvider>
        </NotificationProvider>
      </WalletProvider>
    </AuthProvider>
  );
}