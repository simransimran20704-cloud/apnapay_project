import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { transactionApi } from '../api/transaction';
import { useAuth } from './AuthContext';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const { auth, isAuthenticated } = useAuth();
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const customerId = auth?.mobileNumber || auth?.customerId || '1';

  const refreshBalance = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await transactionApi.getBalance(customerId);
      if (res?.data) {
        setBalance(Number(res.data.balance || 0));
        setCurrency(res.data.currency || 'INR');
      }
    } catch (err) {
      console.warn('Could not fetch balance:', err.message);
    }
  }, [isAuthenticated, customerId]);

  const refreshHistory = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await transactionApi.getHistory(customerId);
      if (res?.data?.transactions) {
        setTransactions(res.data.transactions);
      }
    } catch (err) {
      console.warn('Could not fetch history:', err.message);
    }
  }, [isAuthenticated, customerId]);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    await Promise.allSettled([refreshBalance(), refreshHistory()]);
    setLoading(false);
  }, [refreshBalance, refreshHistory]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshAll();
    } else {
      setBalance(0);
      setTransactions([]);
    }
  }, [isAuthenticated, refreshAll]);

  const sendMoney = async ({ toMobile, amount, remarks }) => {
    const res = await transactionApi.sendMoney(customerId, {
      toMobile,
      amount,
      remarks,
    });
    await refreshAll();
    return res;
  };

  const topUpWallet = async ({ amount, source }) => {
    const res = await transactionApi.topUp(customerId, {
      amount,
      source,
    });
    await refreshAll();
    return res;
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        currency,
        transactions,
        loading,
        error,
        refreshBalance,
        refreshHistory,
        refreshAll,
        sendMoney,
        topUpWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
