import { createApiClient } from './client';

export const authApi = {
  // Check health
  async checkHealth() {
    const client = createApiClient();
    const res = await client.get('/auth/otp/test');
    return res.data;
  },

  // 1. Send OTP
  async sendOtp(mobileNumber) {
    const client = createApiClient();
    const res = await client.post('/auth/otp/send', { mobileNumber });
    return res.data;
  },

  // 2. Verify OTP
  async verifyOtp(mobileNumber, otp) {
    const client = createApiClient();
    const res = await client.post('/auth/otp/verify', { mobileNumber, otp });
    return res.data;
  },

  // 3. Set MPIN
  async setMpin(mobileNumber, mpin, confirmMpin) {
    const client = createApiClient();
    const res = await client.post('/auth/mpin/set', {
      mobileNumber,
      mpin,
      confirmMpin,
    });
    return res.data;
  },

  // 4. Login
  async login(mobileNumber, mpin) {
    const client = createApiClient();
    const res = await client.post('/auth/login', { mobileNumber, mpin });
    return res.data;
  },
};
