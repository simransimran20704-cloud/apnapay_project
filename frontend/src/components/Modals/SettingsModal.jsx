import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Settings,
  Server,
  Sparkles,
  Wifi,
  WifiOff,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Info,
} from 'lucide-react';
import { authApi } from '../../api/auth';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { apiConfig, updateApiConfig, backendStatus, checkBackendHealth } = useAuth();

  const [mode, setMode] = useState(apiConfig.mode || 'gateway');
  const [gatewayUrl, setGatewayUrl] = useState(apiConfig.gatewayUrl || 'http://localhost:8080');
  const [authUrl, setAuthUrl] = useState(apiConfig.authUrl || 'http://localhost:8081');
  const [customerUrl, setCustomerUrl] = useState(apiConfig.customerUrl || 'http://localhost:8082');
  const [transactionUrl, setTransactionUrl] = useState(
    apiConfig.transactionUrl || 'http://localhost:8083'
  );

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleSave = () => {
    updateApiConfig({
      mode,
      gatewayUrl,
      authUrl,
      customerUrl,
      transactionUrl,
    });
    onClose();
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      if (mode === 'mock') {
        setTestResult({
          success: true,
          message: 'Demo Mock Mode active. All endpoints simulated locally!',
        });
      } else {
        const res = await authApi.checkHealth();
        setTestResult({
          success: true,
          message: res.message || 'Connected successfully to backend!',
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: `Failed to connect: ${err.message}. Make sure services are running.`,
      });
    } finally {
      setTesting(false);
      checkBackendHealth();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-base font-bold">API & Backend Settings</h3>
              <p className="text-xs text-slate-300">Configure connection mode and microservice endpoints</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Architecture Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Option 1: Mock Mode */}
              <button
                type="button"
                onClick={() => setMode('mock')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  mode === 'mock'
                    ? 'border-amber-500 bg-amber-50/50 text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Demo Mode</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  No database or Java backend required. Instant testing.
                </p>
              </button>

              {/* Option 2: Gateway */}
              <button
                type="button"
                onClick={() => setMode('gateway')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  mode === 'gateway'
                    ? 'border-indigo-600 bg-indigo-50/50 text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs">
                  <Server className="w-3.5 h-3.5" />
                  <span>API Gateway</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Routes through Spring Cloud Gateway on port 8080.
                </p>
              </button>

              {/* Option 3: Direct */}
              <button
                type="button"
                onClick={() => setMode('direct')}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  mode === 'direct'
                    ? 'border-indigo-600 bg-indigo-50/50 text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs">
                  <Wifi className="w-3.5 h-3.5" />
                  <span>Direct Ports</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                  Direct ports: 8081 (Auth), 8082 (Customer), 8083 (Txn).
                </p>
              </button>
            </div>
          </div>

          {/* URLs Configuration */}
          {mode === 'gateway' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                API Gateway Base URL
              </label>
              <input
                type="url"
                value={gatewayUrl}
                onChange={(e) => setGatewayUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          )}

          {mode === 'direct' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Auth Service URL (Port 8081)
                </label>
                <input
                  type="url"
                  value={authUrl}
                  onChange={(e) => setAuthUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Service URL (Port 8082)
                </label>
                <input
                  type="url"
                  value={customerUrl}
                  onChange={(e) => setCustomerUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Transaction Service URL (Port 8083)
                </label>
                <input
                  type="url"
                  value={transactionUrl}
                  onChange={(e) => setTransactionUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Connection Test Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Backend Connection (/auth/otp/test)'}</span>
            </button>

            {testResult && (
              <div
                className={`mt-2.5 p-3 rounded-xl border text-xs flex items-start gap-2 ${
                  testResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-rose-50 border-rose-200 text-rose-700'
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <WifiOff className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* Microservices Port Reference */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              <span>Backend Microservices Ports:</span>
            </div>
            <p className="font-mono text-[11px]">• API Gateway: <strong>http://localhost:8080</strong></p>
            <p className="font-mono text-[11px]">• Auth Service: <strong>http://localhost:8081</strong></p>
            <p className="font-mono text-[11px]">• Customer Service: <strong>http://localhost:8082</strong> (H2 in-memory)</p>
            <p className="font-mono text-[11px]">• Transaction Service: <strong>http://localhost:8083</strong> (MySQL)</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
