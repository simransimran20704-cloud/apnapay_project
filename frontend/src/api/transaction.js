import { createApiClient } from './client';

export const transactionApi = {
  // Get Wallet Balance
  async getBalance(customerId) {
    const client = createApiClient();
    const res = await client.get('/transaction/balance', {
      headers: {
        'X-Customer-Id': customerId,
      },
    });
    return res.data;
  },

  // Send Money to another user/mobile
  async sendMoney(fromCustomerId, { toMobile, amount, remarks, idempotencyKey }) {
    const client = createApiClient();
    const key = idempotencyKey || 'idemp_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    const res = await client.post(
      '/transaction/send',
      {
        toMobile,
        amount: parseFloat(amount),
        remarks,
      },
      {
        headers: {
          'X-Customer-Id': fromCustomerId,
          'X-Idempotency-Key': key,
        },
      }
    );
    return res.data;
  },

  // Top-Up Wallet
  async topUp(customerId, { amount, source }) {
    const client = createApiClient();
    const res = await client.post(
      '/transaction/wallet/topup',
      {
        amount: parseFloat(amount),
        source: source || 'Bank Transfer',
      },
      {
        headers: {
          'X-Customer-Id': customerId,
        },
      }
    );
    return res.data;
  },

  // Get Transaction History
  async getHistory(customerId) {
    const client = createApiClient();
    const res = await client.get('/transaction/history', {
      headers: {
        'X-Customer-Id': customerId,
      },
    });
    return res.data;
  },
};
