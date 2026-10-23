import { createApiClient } from './client';

export const customerApi = {
  // Register Customer
  async register(customerData) {
    const { name, mobile, email } = customerData;
    const client = createApiClient();
    const res = await client.post('/customer/register', { name, mobile, email });
    return res.data;
  },

  // Get Profile
  async getProfile(identifier) {
    const client = createApiClient();
    const res = await client.get('/customer/profile', {
      headers: {
        'X-Customer-Id': identifier,
      },
    });
    return res.data;
  },
};
