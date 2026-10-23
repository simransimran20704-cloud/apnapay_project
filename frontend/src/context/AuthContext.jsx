import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import { customerApi } from '../api/customer';
import { getAuthData, saveAuthData } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => getAuthData());
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile when auth exists
  const loadProfile = async (mobileOrId) => {
    try {
      const res = await customerApi.getProfile(mobileOrId);
      if (res?.data) {
        const data = { ...res.data };
        if (!data.name || data.name === 'PayEase Member') {
          data.name = 'Simran';
        }
        if (!data.email || data.email.includes('payease.com')) {
          data.email = `${mobileOrId || 'simran'}@apnapay.com`;
        }
        setProfile(data);
      }
    } catch (err) {
      console.warn('Profile load note:', err.message);
      // Fallback display if customer is created in auth but profile record is pending
      if (!profile) {
        setProfile({
          name: 'Simran',
          mobile: mobileOrId,
          email: `${mobileOrId || 'simran'}@apnapay.com`,
          customerId: 'CUST-' + (mobileOrId ? mobileOrId.slice(-6) : '882190'),
          status: 'ACTIVE',
        });
      }
    }
  };

  useEffect(() => {
    if (auth?.mobileNumber || auth?.customerId) {
      loadProfile(auth.mobileNumber || auth.customerId);
    }
    setLoading(false);
  }, [auth]);

  const loginUser = async (mobileNumber, mpin) => {
    const res = await authApi.login(mobileNumber, mpin);
    if (res.status === 'SUCCESS' && res.data?.token) {
      const authData = {
        token: res.data.token,
        mobileNumber: res.data.mobileNumber || mobileNumber,
        tokenType: res.data.tokenType || 'Bearer',
      };
      saveAuthData(authData);
      setAuth(authData);
      await loadProfile(mobileNumber);
      return res;
    }
    throw new Error(res.message || 'Invalid Mobile Number or MPIN');
  };

  const logoutUser = () => {
    saveAuthData(null);
    setAuth(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        profile,
        isAuthenticated: !!auth?.token,
        loading,
        loginUser,
        logoutUser,
        loadProfile,
        setAuthDirect: (data) => {
          saveAuthData(data);
          setAuth(data);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
