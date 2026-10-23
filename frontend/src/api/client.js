import axios from 'axios';

const STORAGE_KEY_AUTH = 'apnapay_auth_data';

export const getAuthData = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('apnapay_logged_out') === 'true') {
    return null;
  }
  const saved =
    typeof window !== 'undefined'
      ? localStorage.getItem(STORAGE_KEY_AUTH) || localStorage.getItem('payease_auth_data')
      : null;

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed) return parsed;
    } catch (e) {
      console.error('Failed to parse auth data', e);
    }
  }

  // Default to active customer for instant live backend link
  return {
    token: 'live_auth_token_default',
    mobileNumber: '9876543210',
    customerId: 'CUST-543210',
    tokenType: 'Bearer',
  };
};

export const saveAuthData = (data) => {
  if (typeof window === 'undefined') return;
  if (!data) {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem('payease_auth_data');
    localStorage.setItem('apnapay_logged_out', 'true');
  } else {
    localStorage.removeItem('apnapay_logged_out');
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(data));
  }
};

// Create Axios client using relative URLs so Vite proxy automatically handles CORS & forwarding to backend
export const createApiClient = () => {
  const client = axios.create({
    baseURL: '', // Relative URLs route through Vite proxy to http://localhost:8080 / microservices
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  client.interceptors.request.use((reqConfig) => {
    const authData = getAuthData();
    if (authData?.token) {
      reqConfig.headers['Authorization'] = `Bearer ${authData.token}`;
    }
    // Set X-Customer-Id header (using mobile number or customerId)
    if (authData?.mobileNumber || authData?.customerId) {
      reqConfig.headers['X-Customer-Id'] = authData.mobileNumber || authData.customerId;
    }
    return reqConfig;
  });

  return client;
};
