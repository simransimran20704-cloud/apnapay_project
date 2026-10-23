// Mock In-Memory and LocalStorage data store for testing and offline/demo mode

const MOCK_STORAGE_KEY = 'apnapay_mock_store';

const getDefaultStore = () => ({
  users: [
    {
      mobileNumber: '9876543210',
      name: 'Simran',
      email: 'simran@apnapay.com',
      mpin: '1234',
      status: 'ACTIVE',
      customerId: 'CUST-8a9b1c2d',
      createdAt: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    },
    {
      mobileNumber: '9123456780',
      name: 'Rahul Verma',
      email: 'rahul@gmail.com',
      mpin: '1111',
      status: 'ACTIVE',
      customerId: 'CUST-3e4f5a6b',
      createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    },
  ],
  wallets: {
    '9876543210': {
      customerId: '9876543210',
      balance: 14250.75,
      currency: 'INR',
    },
    'CUST-8a9b1c2d': {
      customerId: 'CUST-8a9b1c2d',
      balance: 14250.75,
      currency: 'INR',
    },
    '9123456780': {
      customerId: '9123456780',
      balance: 4500.0,
      currency: 'INR',
    },
  },
  transactions: [
    {
      transactionId: 'TXN-91f8b4a2',
      type: 'DEBIT',
      amount: 450.0,
      with: '9123456780',
      remarks: 'Cafe Coffee Day bill',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    },
    {
      transactionId: 'TXN-72c1a8d9',
      type: 'CREDIT',
      amount: 5000.0,
      with: 'BANK',
      remarks: 'Top up from HDFC Net Banking',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    {
      transactionId: 'TXN-43d9e2b1',
      type: 'DEBIT',
      amount: 1200.0,
      with: '9811223344',
      remarks: 'Electricity bill payment',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    },
    {
      transactionId: 'TXN-15b6f7a3',
      type: 'CREDIT',
      amount: 2500.0,
      with: '9876501234',
      remarks: 'Refund from Swiggy order',
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    },
  ],
  generatedOtps: {},
});

export const getMockStore = () => {
  const data = localStorage.getItem(MOCK_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error loading mock store', e);
    }
  }
  const defaultStore = getDefaultStore();
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(defaultStore));
  return defaultStore;
};

export const saveMockStore = (store) => {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(store));
};
